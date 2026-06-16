'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const C = {
  primary: '#004317', pc: '#1a5c2a', sc: '#feae2c',
  surface: '#f7faf4', surfaceContainer: '#ecefe9',
  surfaceContainerHigh: '#e6e9e3', outline: '#717a6f',
  outlineVariant: '#c0c9bc', onSurface: '#191d19',
  onSurfaceVariant: '#40493f', white: '#ffffff',
  onSC: '#6b4500', onSFV: '#633f00',
}

const NAV = [
  { icon: 'home', label: 'Beranda', path: '/beranda' },
  { icon: 'add_circle', label: 'Input', path: '/input' },
  { icon: 'trending_up', label: 'Prediksi', path: '/prediksi' },
  { icon: 'analytics', label: 'Evaluasi', path: '/evaluasi' },
  { icon: 'history', label: 'Riwayat', path: '/riwayat' },
]

type Menu = {
  id: number | string
  nama: string
  emoji?: string
}

export default function Input() {
  const router = useRouter()
  const [tokoId, setTokoId] = useState<number | null>(null)
  const [menus, setMenus] = useState<Menu[]>([])
  const [penjualan, setPenjualan] = useState<Record<number | string, string>>({})
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const { data: toko } = await supabase.from('toko').select('id').single()
      if (toko) {
        setTokoId(toko.id)
        const { data: menuData } = await supabase
          .from('menu')
          .select('*')
          .eq('toko_id', toko.id)
          .eq('aktif', true)
        if (menuData) {
          setMenus(menuData)
          const init: Record<number | string, string> = {}
          menuData.forEach((m: any) => { init[m.id] = '' })
          setPenjualan(init)
        }
      }
    }
    fetchData()
  }, [])

  async function handleSimpan() {
    setLoading(true)
    const today = new Date().toISOString().split('T')[0]
    const rows = menus
      .filter(m => penjualan[m.id] !== '')
      .map(m => ({
        menu_id: m.id,
        toko_id: tokoId,
        tanggal: today,
        jumlah_terjual: parseInt(penjualan[m.id]) || 0,
      }))

    if (rows.length > 0) {
      await supabase.from('penjualan').insert(rows)
    }

    setSaved(true)
    setLoading(false)
    setTimeout(() => router.push('/beranda'), 1200)
  }

  return (
    <div style={{backgroundColor: C.surface, minHeight: '100vh', paddingBottom: 120, fontFamily: "'Plus Jakarta Sans', sans-serif"}}>

      {/* Header */}
      <div style={{position:'sticky', top:0, zIndex:50, backgroundColor:C.surface, boxShadow:'0 4px 12px rgba(26,92,42,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:64}}>
        <span style={{fontSize:20, fontWeight:800, color:C.primary}}>StokPas</span>
        <span style={{fontSize:18, fontWeight:700, color:C.onSurface}}>Input Penjualan</span>
        <div style={{width:40}} />
      </div>

      <div style={{padding:'16px 20px 0', display:'flex', flexDirection:'column', gap:12}}>

        <div style={{backgroundColor:'#E8F5EC', borderLeft:`3px solid ${C.pc}`, borderRadius:'0 12px 12px 0', padding:12}}>
          <p style={{fontSize:12, color:C.outline, margin:0, lineHeight:1.6}}>
            📦 Masukkan jumlah porsi yang terjual hari ini untuk setiap menu.
          </p>
        </div>

        {menus.length === 0 && (
          <div style={{textAlign:'center', padding:40, color:C.outline}}>
            <span className="material-symbols-outlined" style={{fontSize:48, display:'block', marginBottom:8}}>restaurant_menu</span>
            Belum ada menu. Setup dulu di halaman Setup.
          </div>
        )}

        {menus.map((menu) => (
          <div key={menu.id} style={{backgroundColor:C.white, borderRadius:16, border:`1px solid ${C.outlineVariant}`, padding:20, boxShadow:'0 4px 12px rgba(26,92,42,0.08)'}}>
            <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:16}}>
              <div style={{width:44, height:44, backgroundColor:'#E8F5EC', borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24}}>
                {menu.emoji || '🍽️'}
              </div>
              <span style={{fontSize:16, fontWeight:700, color:C.onSurface}}>{menu.nama}</span>
            </div>
            <div style={{backgroundColor:C.surfaceContainer, borderRadius:12, padding:16}}>
              <p style={{fontSize:12, color:C.outline, margin:'0 0 8px'}}>Terjual hari ini (porsi)</p>
              <input
                type="number"
                placeholder="0"
                value={penjualan[menu.id] || ''}
                onChange={(e) => setPenjualan(prev => ({...prev, [menu.id]: e.target.value}))}
                style={{width:'100%', border:'none', backgroundColor:'transparent', fontSize:32, fontWeight:800, color:C.primary, outline:'none', padding:0, boxSizing:'border-box'}}
              />
            </div>
          </div>
        ))}

        {saved && (
          <div style={{backgroundColor:'#E8F5EC', borderRadius:12, padding:16, textAlign:'center', color:C.pc, fontWeight:700, fontSize:16}}>
            ✅ Data tersimpan!
          </div>
        )}

        <button
          onClick={handleSimpan}
          disabled={loading || menus.length === 0}
          style={{width:'100%', backgroundColor: loading ? C.outline : C.pc, color:C.white, padding:'16px 0', borderRadius:12, fontWeight:700, fontSize:16, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:'0 4px 16px rgba(26,92,42,0.4)', opacity: menus.length === 0 ? 0.5 : 1}}
        >
          {loading ? 'Menyimpan...' : 'Simpan Penjualan Hari Ini'}
          <span className="material-symbols-outlined" style={{fontVariationSettings:"'FILL' 1"}}>check_circle</span>
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:390, zIndex:50, backgroundColor:C.surface, borderTop:`1px solid ${C.outlineVariant}`, boxShadow:'0 -4px 16px rgba(26,92,42,0.08)', borderRadius:'16px 16px 0 0', display:'flex', justifyContent:'space-around', alignItems:'center', height:80}}>
        {NAV.map((item) => (
          <button key={item.path} onClick={() => router.push(item.path)} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:2, border:'none', backgroundColor:'transparent', cursor:'pointer', color: item.path === '/input' ? C.pc : '#9ca3af'}}>
            <span className="material-symbols-outlined" style={{fontVariationSettings: item.path === '/input' ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
            <span style={{fontSize:10, fontWeight:600}}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}