'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const C = {
  primary: '#004317', pc: '#1a5c2a', sc: '#feae2c',
  surface: '#f7faf4', surfaceContainer: '#ecefe9',
  surfaceContainerLow: '#f1f5ef', surfaceContainerHigh: '#e6e9e3',
  outline: '#717a6f', outlineVariant: '#c0c9bc',
  onSurface: '#191d19', onSurfaceVariant: '#40493f', white: '#ffffff',
}

const NAV = [
  { icon: 'home', label: 'Beranda', path: '/beranda' },
  { icon: 'add_circle', label: 'Input', path: '/input' },
  { icon: 'trending_up', label: 'Prediksi', path: '/prediksi' },
  { icon: 'analytics', label: 'Evaluasi', path: '/evaluasi' },
  { icon: 'history', label: 'Riwayat', path: '/riwayat' },
]

const HARI_FULL = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']
const BULAN = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']

function hitungPrediksi(data: any[], hariKedepan: number = 1) {
  if (data.length === 0) return { prediksi: 50, low: 42, high: 57 }
  
  const values = data.map((d: any) => d.jumlah_terjual)
  
  // Moving average
  const ma7 = values.slice(0, 7).reduce((a: number, b: number) => a + b, 0) / Math.min(7, values.length)
  const ma3 = values.slice(0, 3).reduce((a: number, b: number) => a + b, 0) / Math.min(3, values.length)
  
  // Day of week factor
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + hariKedepan)
  const dow = targetDate.getDay()
  const factors = [0.75, 0.85, 0.9, 0.95, 1.0, 1.25, 1.15]
  
  let prediksi = (ma7 * 0.5 + ma3 * 0.5) * factors[dow]
  prediksi = Math.max(1, Math.round(prediksi))
  
  const low = Math.max(1, Math.round(prediksi * 0.85))
  const high = Math.round(prediksi * 1.15)
  
  return { prediksi, low, high }
}

function hitungBelanja(resep: any[], prediksi: number) {
  return resep.map((r: any) => ({
    nama: r.nama_bahan,
    jumlah: (r.jumlah * prediksi).toFixed(1),
    satuan: r.satuan,
    total: r.harga_per_satuan > 0 
      ? `Rp${Math.round(r.jumlah * prediksi * r.harga_per_satuan).toLocaleString('id-ID')}`
      : null
  }))
}

export default function Prediksi() {
  const router = useRouter()
  const [menus, setMenus] = useState<any[]>([])
  const [selectedMenu, setSelectedMenu] = useState<any>(null)
  const [resep, setResep] = useState<any[]>([])
  const [penjualan, setPenjualan] = useState<any[]>([])
  const [mode, setMode] = useState(1)
  const [hasil, setHasil] = useState<any>(null)
  const [belanja, setBelanja] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const modes = [
    { label: 'Hemat', multiplier: 0.85 },
    { label: 'Normal', multiplier: 1.0 },
    { label: 'Aman', multiplier: 1.15 },
  ]

  useEffect(() => {
    async function fetchData() {
      const { data: toko } = await supabase.from('toko').select('id').single()
      if (!toko) return

      const { data: menuData } = await supabase
        .from('menu').select('*')
        .eq('toko_id', toko.id).eq('aktif', true)

      if (menuData && menuData.length > 0) {
        setMenus(menuData)
        setSelectedMenu(menuData[0])
        await loadMenuData(menuData[0].id)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  async function loadMenuData(menuId: string) {
    // Fetch penjualan 30 hari
    const { data: penjualanData } = await supabase
      .from('penjualan')
      .select('*')
      .eq('menu_id', menuId)
      .order('tanggal', { ascending: false })
      .limit(30)

    // Fetch resep
    const { data: resepData } = await supabase
      .from('resep')
      .select('*')
      .eq('menu_id', menuId)

    const pData = penjualanData || []
    const rData = resepData || []
    setPenjualan(pData)
    setResep(rData)

    const h = hitungPrediksi(pData, 1)
    setHasil(h)
    setBelanja(hitungBelanja(rData, h.prediksi))
  }

  async function handleMenuChange(menu: any) {
    setSelectedMenu(menu)
    setLoading(true)
    await loadMenuData(menu.id)
    setLoading(false)
  }

  const prediksiWithMode = hasil 
    ? Math.round(hasil.prediksi * modes[mode].multiplier)
    : 0

  const totalBelanja = resep.reduce((acc: number, r: any) => {
    return acc + (r.jumlah * prediksiWithMode * r.harga_per_satuan)
  }, 0)

  const besok = new Date()
  besok.setDate(besok.getDate() + 1)
  const tanggalBesok = `${HARI_FULL[besok.getDay()]}, ${besok.getDate()} ${BULAN[besok.getMonth()]}`

  if (loading) return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:C.surface}}>
      <div style={{textAlign:'center', color:C.pc}}>
        <span className="material-symbols-outlined" style={{fontSize:48, display:'block', marginBottom:8}}>hourglass_top</span>
        <p style={{fontWeight:700}}>Menghitung prediksi...</p>
      </div>
    </div>
  )

  return (
    <div style={{backgroundColor: C.surface, minHeight: '100vh', paddingBottom: 100, fontFamily: "'Plus Jakarta Sans', sans-serif"}}>

      {/* Header */}
      <div style={{position:'sticky', top:0, zIndex:50, backgroundColor:C.surface, boxShadow:'0 4px 12px rgba(26,92,42,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:64}}>
        <span style={{fontSize:20, fontWeight:800, color:C.primary}}>StokPas</span>
        <div style={{backgroundColor:'#E8F5EC', color:C.pc, padding:'6px 12px', borderRadius:9999, fontSize:13, fontWeight:600}}>
          {tanggalBesok}
        </div>
      </div>

      <div style={{padding:'24px 20px 0', display:'flex', flexDirection:'column', gap:24}}>

        {/* Tab Menu */}
        <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:4}}>
          {menus.map((menu) => (
            <button key={menu.id} onClick={() => handleMenuChange(menu)} style={{
              padding:'8px 16px', borderRadius:9999, border:'none', cursor:'pointer',
              whiteSpace:'nowrap', fontWeight:600, fontSize:13,
              backgroundColor: selectedMenu?.id === menu.id ? C.pc : C.surfaceContainerHigh,
              color: selectedMenu?.id === menu.id ? C.white : C.onSurfaceVariant,
            }}>
              {menu.emoji} {menu.nama}
            </button>
          ))}
        </div>

        {/* Hero Card */}
        <div style={{background:'linear-gradient(135deg, #1A5C2A, #0F3D1A)', borderRadius:24, padding:24, boxShadow:'0 8px 24px rgba(26,92,42,0.4)', color:C.white}}>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:12, opacity:0.9}}>
            <span className="material-symbols-outlined" style={{color:C.sc}}>stars</span>
            <p style={{fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', margin:0}}>PREDIKSI BESOK</p>
          </div>
          <h2 style={{fontSize:22, fontWeight:700, margin:'0 0 4px'}}>{selectedMenu?.nama}</h2>
          <div style={{display:'flex', alignItems:'baseline', gap:8, marginBottom:16}}>
            <span style={{fontSize:72, fontWeight:800, lineHeight:1}}>{prediksiWithMode}</span>
            <span style={{fontSize:18, opacity:0.8}}>porsi</span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:8, backgroundColor:'rgba(255,255,255,0.1)', borderRadius:12, padding:12}}>
            <span className="material-symbols-outlined" style={{color:'#aef3b1'}}>database</span>
            <p style={{fontSize:14, margin:0}}>Dari {penjualan.length} hari data penjualan</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
          {modes.map((m, i) => (
            <button key={i} onClick={() => setMode(i)} style={{
              display:'flex', flexDirection:'column', alignItems:'center', padding:12,
              borderRadius:16, backgroundColor:C.white, cursor:'pointer',
              border: mode === i ? `2px solid ${C.primary}` : `1px solid ${C.outlineVariant}`,
              boxShadow: mode === i ? '0 4px 12px rgba(26,92,42,0.2)' : 'none'
            }}>
              <span style={{fontSize:13, fontWeight: mode===i ? 700 : 500, marginBottom:4, color: mode===i ? C.pc : C.onSurfaceVariant}}>{m.label}</span>
              <span style={{fontSize:20, fontWeight:700, color: mode===i ? C.primary : C.pc}}>
                {Math.round((hasil?.prediksi || 0) * m.multiplier)}
              </span>
            </button>
          ))}
        </div>

        {/* Rentang */}
        {hasil && (
          <div style={{backgroundColor:C.white, borderRadius:16, padding:20, boxShadow:'0 4px 16px rgba(26,92,42,0.08)'}}>
            <h3 style={{fontSize:16, fontWeight:700, margin:'0 0 16px', display:'flex', alignItems:'center', gap:8}}>
              <span className="material-symbols-outlined" style={{color:C.primary}}>analytics</span>
              Rentang Kemungkinan
            </h3>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
              {[
                {label:'Min', value: hasil.low},
                {label:'Modus', value: hasil.prediksi, active:true},
                {label:'Maks', value: hasil.high},
              ].map((item) => (
                <div key={item.label} style={{padding:12, borderRadius:12, backgroundColor:C.surfaceContainerLow, textAlign:'center', borderBottom: item.active ? `3px solid ${C.primary}` : 'none'}}>
                  <p style={{fontSize:10, color:C.onSurfaceVariant, fontWeight:700, textTransform:'uppercase', margin:'0 0 4px'}}>{item.label}</p>
                  <p style={{fontWeight:700, color:C.pc, margin:0, fontSize:18}}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Daftar Belanja */}
        {resep.length > 0 && (
          <div style={{backgroundColor:C.white, borderRadius:16, padding:16, boxShadow:'0 2px 8px rgba(26,92,42,0.06)', border:'1px solid #D4E8D6'}}>
            <h3 style={{fontWeight:700, color:C.pc, margin:'0 0 4px', fontSize:16}}>🛒 Belanja Besok</h3>
            <p style={{fontSize:12, color:C.onSurfaceVariant, margin:'0 0 16px'}}>Untuk {prediksiWithMode} porsi {selectedMenu?.nama}</p>

            {hitungBelanja(resep, prediksiWithMode).map((item: any, i: number) => (
              <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom: i < resep.length-1 ? '1px solid #F5F5F5' : 'none'}}>
                <div>
                  <p style={{fontWeight:700, color:C.onSurface, margin:0, fontSize:15}}>{item.nama}</p>
                  <p style={{fontSize:12, color:C.onSurfaceVariant, margin:0}}>{item.satuan}</p>
                </div>
                <div style={{textAlign:'right'}}>
                  <p style={{fontWeight:700, color:C.pc, margin:0}}>{item.jumlah} {item.satuan}</p>
                  {item.total && <p style={{fontSize:12, color:C.onSurfaceVariant, margin:0}}>{item.total}</p>}
                </div>
              </div>
            ))}

            {totalBelanja > 0 && (
              <div style={{marginTop:16, padding:16, borderRadius:12, background:'linear-gradient(90deg, #E8F5EC, #FAFDF7)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <p style={{color:C.onSurfaceVariant, fontSize:14, fontWeight:600, margin:0}}>Estimasi Total</p>
                <p style={{fontSize:20, fontWeight:700, color:C.pc, margin:0}}>Rp{Math.round(totalBelanja).toLocaleString('id-ID')}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:390, zIndex:50, backgroundColor:C.surface, borderTop:`1px solid ${C.outlineVariant}`, boxShadow:'0 -4px 16px rgba(26,92,42,0.08)', borderRadius:'16px 16px 0 0', display:'flex', justifyContent:'space-around', alignItems:'center', height:80}}>
        {NAV.map((item) => (
          <button key={item.path} onClick={() => router.push(item.path)} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:2, border:'none', backgroundColor:'transparent', cursor:'pointer', color: item.path === '/prediksi' ? C.pc : '#9ca3af'}}>
            <span className="material-symbols-outlined" style={{fontVariationSettings: item.path === '/prediksi' ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
            <span style={{fontSize:10, fontWeight:600}}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}