'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const C = {
  primary: '#004317', pc: '#1a5c2a', sc: '#feae2c',
  surface: '#f7faf4', surfaceContainer: '#ecefe9',
  surfaceContainerHigh: '#e6e9e3', outline: '#717a6f',
  outlineVariant: '#c0c9bc', onSurface: '#191d19',
  onSurfaceVariant: '#40493f', white: '#ffffff', error: '#ba1a1a',
}

const NAV = [
  { icon: 'home', label: 'Beranda', path: '/beranda' },
  { icon: 'add_circle', label: 'Input', path: '/input' },
  { icon: 'trending_up', label: 'Prediksi', path: '/prediksi' },
  { icon: 'analytics', label: 'Evaluasi', path: '/evaluasi' },
  { icon: 'history', label: 'Riwayat', path: '/riwayat' },
]

const HARI = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const HARI_FULL = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const BULAN = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']

function getTanggalHari() {
  const now = new Date()
  return `${HARI_FULL[now.getDay()]}, ${now.getDate()} ${BULAN[now.getMonth()]} ${now.getFullYear()}`
}

function getWarna(porsi) {
  if (porsi >= 70) return { warna: '#DC2626', label: 'Sangat Ramai' }
  if (porsi >= 55) return { warna: '#F5A623', label: 'Ramai' }
  if (porsi >= 40) return { warna: '#1a5c2a', label: 'Normal' }
  return { warna: '#93C5FD', label: 'Sepi' }
}

export default function Beranda() {
  const router = useRouter()
  const [toko, setToko] = useState(null)
  const [menus, setMenus] = useState([])
  const [tren, setTren] = useState([])
  const [totalHariIni, setTotalHariIni] = useState(0)
  const [prediksiHariIni, setPrediksiHariIni] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      // Fetch toko
      const { data: tokoData } = await supabase.from('toko').select('*').single()
      setToko(tokoData)

      // Fetch menus
      const { data: menuData } = await supabase
        .from('menu').select('*')
        .eq('toko_id', tokoData.id).eq('aktif', true)
      setMenus(menuData || [])

      // Fetch penjualan 7 hari terakhir untuk menu pertama
      if (menuData && menuData.length > 0) {
        const menu1 = menuData[0]
        const { data: penjualanData } = await supabase
          .from('penjualan')
          .select('*')
          .eq('menu_id', menu1.id)
          .order('tanggal', { ascending: false })
          .limit(8)

        if (penjualanData) {
          const sorted = [...penjualanData].reverse()
          const trenData = sorted.slice(0, 7).map((p) => {
            const d = new Date(p.tanggal)
            const { warna, label } = getWarna(p.jumlah_terjual)
            const max = Math.max(...sorted.map((x) => x.jumlah_terjual))
            return {
              hari: HARI[d.getDay()],
              porsi: p.jumlah_terjual,
              pct: (p.jumlah_terjual / max) * 100,
              warna, label
            }
          })
          setTren(trenData)

          // Prediksi sederhana: rata-rata 7 hari
          const avg = Math.round(sorted.reduce((a, b) => a + b.jumlah_terjual, 0) / sorted.length)
          setPrediksiHariIni(avg)
        }

        // Total terjual hari ini
        const today = new Date().toISOString().split('T')[0]
        const { data: hariIni } = await supabase
          .from('penjualan')
          .select('jumlah_terjual')
          .eq('toko_id', tokoData.id)
          .eq('tanggal', today)
        const total = (hariIni || []).reduce((a, b) => a + b.jumlah_terjual, 0)
        setTotalHariIni(total)
      }

      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:C.surface}}>
      <div style={{textAlign:'center', color:C.pc}}>
        <span className="material-symbols-outlined" style={{fontSize:48, display:'block', marginBottom:8}}>hourglass_top</span>
        <p style={{fontWeight:700}}>Memuat data...</p>
      </div>
    </div>
  )

  const maxPorsi = tren.length > 0 ? Math.max(...tren.map(t => t.porsi)) : 100

  return (
    <div style={{backgroundColor: C.surface, minHeight: '100vh', paddingBottom: 140, fontFamily: "'Plus Jakarta Sans', sans-serif"}}>

      {/* Header */}
      <div style={{position:'sticky', top:0, zIndex:40, backgroundColor:C.surface, boxShadow:'0 4px 12px rgba(26,92,42,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:64}}>
        <span style={{fontSize:20, fontWeight:800, color:C.primary}}>StokPas</span>
        <button style={{width:40, height:40, borderRadius:'50%', border:'none', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <span className="material-symbols-outlined" style={{color:C.onSurfaceVariant}}>notifications</span>
        </button>
      </div>

      <div style={{padding:'24px 20px 0', display:'flex', flexDirection:'column', gap:24}}>

        {/* Hero Card */}
        <div style={{position:'relative', overflow:'hidden', borderRadius:20, background:'linear-gradient(135deg, #1A5C2A, #2D7A3E)', padding:24, color:C.white, boxShadow:'0 8px 24px rgba(26,92,42,0.3)'}}>
          <h2 style={{fontSize:24, fontWeight:700, margin:'8px 0 4px'}}>Halo, {toko?.pemilik || 'Pemilik'} 👋</h2>
          <p style={{color:'rgba(255,255,255,0.6)', fontSize:14, margin:0}}>{getTanggalHari()}</p>
        </div>

        {/* 3 Metric Cards */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
          {[
            { icon:'shopping_cart', label:'Terjual Hari Ini', value: totalHariIni > 0 ? `${totalHariIni} porsi` : '-', border:C.pc },
            { icon:'ads_click', label:'Prediksi Besok', value:`${prediksiHariIni} porsi`, border:C.sc, bar:true },
            { icon:'restaurant_menu', label:'Total Menu', value:`${menus.length} menu`, border:C.pc },
          ].map((card, i) => (
            <div key={i} style={{backgroundColor:C.white, borderRadius:12, padding:14, boxShadow:'0 4px 12px rgba(26,92,42,0.08)', borderTop:`4px solid ${card.border}`}}>
              <div style={{width:32, height:32, borderRadius:8, backgroundColor: card.border === C.sc ? '#FEF6E4' : '#E8F5EC', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8}}>
                <span className="material-symbols-outlined" style={{fontSize:18, color:card.border}}>{card.icon}</span>
              </div>
              <p style={{fontSize:10, color:'#6b7280', fontWeight:600, margin:'0 0 2px'}}>{card.label}</p>
              <p style={{fontSize:14, fontWeight:800, color:card.border, margin:0}}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Tren Chart */}
        {tren.length > 0 && (
          <div style={{backgroundColor:C.white, borderRadius:16, padding:16, border:'1px solid #D4E8D6', boxShadow:'0 2px 8px rgba(26,92,42,0.06)'}}>
            <h3 style={{fontWeight:700, color:C.pc, display:'flex', alignItems:'center', gap:8, margin:'0 0 16px', fontSize:16}}>
              <span className="material-symbols-outlined" style={{fontSize:20}}>bar_chart</span>
              Tren 7 Hari Terakhir — {menus[0]?.nama}
            </h3>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {tren.map((d, i) => (
                <div key={i} style={{display:'flex', alignItems:'center', gap:12}}>
                  <span style={{width:32, fontSize:12, fontWeight:700, color:C.outline}}>{d.hari}</span>
                  <div style={{flex:1, height:28, backgroundColor:C.surfaceContainer, borderRadius:8, overflow:'hidden'}}>
                    <div style={{width:`${d.pct}%`, height:'100%', backgroundColor:d.warna, borderRadius:8, display:'flex', alignItems:'center', paddingLeft:8}}>
                      <span style={{fontSize:10, fontWeight:700, color:C.white}}>{d.porsi}</span>
                    </div>
                  </div>
                  <span style={{fontSize:10, fontWeight:700, color:d.warna, minWidth:70}}>{d.label}</span>
                </div>
              ))}
              {/* Prediksi */}
              <div style={{display:'flex', alignItems:'center', gap:12, backgroundColor:'#E8F5EC', margin:'4px -16px 0', padding:'8px 16px'}}>
                <span style={{width:32, fontSize:12, fontWeight:700, color:C.pc}}>Besok</span>
                <div style={{flex:1, height:28, backgroundColor:C.surfaceContainer, borderRadius:8, overflow:'hidden'}}>
                  <div style={{width:`${(prediksiHariIni/maxPorsi)*100}%`, height:'100%', border:`2px dashed ${C.pc}`, backgroundColor:'rgba(26,92,42,0.1)', borderRadius:8, display:'flex', alignItems:'center', paddingLeft:8}}>
                    <span style={{fontSize:10, fontWeight:700, color:C.pc}}>{prediksiHariIni}</span>
                  </div>
                </div>
                <span style={{backgroundColor:C.pc, color:C.white, fontSize:8, fontWeight:700, padding:'2px 6px', borderRadius:4}}>PREDIKSI ⭐</span>
              </div>
            </div>
          </div>
        )}

        {/* Menu List */}
        <div>
          <h3 style={{fontSize:20, fontWeight:700, margin:'0 0 12px'}}>Menu Aktif</h3>
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            {menus.map((menu, i) => (
              <div key={i} style={{backgroundColor:C.white, borderRadius:16, padding:16, boxShadow:'0 4px 12px rgba(26,92,42,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:48, height:48, borderRadius:12, backgroundColor:'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:28}}>{menu.emoji}</div>
                  <div>
                    <p style={{fontWeight:700, fontSize:15, margin:'0 0 4px'}}>{menu.nama}</p>
                    <span style={{backgroundColor:'#E8F5EC', color:C.pc, fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:9999}}>Aktif</span>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{color:C.outlineVariant}}>chevron_right</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <div style={{position:'fixed', bottom:88, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:390, padding:'0 20px', zIndex:40}}>
        <button onClick={() => router.push('/input')} style={{width:'100%', backgroundColor:C.pc, color:C.white, padding:'16px 0', borderRadius:12, fontWeight:700, fontSize:16, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:'0 4px 16px rgba(26,92,42,0.4)'}}>
          <span className="material-symbols-outlined">edit_square</span>
          Input Penjualan Hari Ini
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:390, zIndex:50, backgroundColor:C.surface, borderTop:`1px solid ${C.outlineVariant}`, boxShadow:'0 -4px 16px rgba(26,92,42,0.08)', borderRadius:'16px 16px 0 0', display:'flex', justifyContent:'space-around', alignItems:'center', height:80}}>
        {NAV.map((item) => (
          <button key={item.path} onClick={() => router.push(item.path)} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:2, border:'none', backgroundColor:'transparent', cursor:'pointer', color: item.path === '/beranda' ? C.pc : '#9ca3af'}}>
            <span className="material-symbols-outlined" style={{fontVariationSettings: item.path === '/beranda' ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
            <span style={{fontSize:10, fontWeight:600}}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}