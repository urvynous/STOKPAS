'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const C = {
  primary: '#004317',
  pc: '#1a5c2a',
  sc: '#feae2c',
  surface: '#f7faf4',
  surfaceContainer: '#ecefe9',
  surfaceContainerHigh: '#e6e9e3',
  outline: '#717a6f',
  outlineVariant: '#c0c9bc',
  onSurface: '#191d19',
  onSurfaceVariant: '#40493f',
  white: '#ffffff',
  error: '#ba1a1a',
}

const NAV = [
  { icon: 'home', label: 'Beranda', path: '/beranda' },
  { icon: 'add_circle', label: 'Input', path: '/input' },
  { icon: 'trending_up', label: 'Prediksi', path: '/prediksi' },
  { icon: 'analytics', label: 'Evaluasi', path: '/evaluasi' },
  { icon: 'history', label: 'Riwayat', path: '/riwayat' },
]

export default function Beranda() {
  const router = useRouter()

  return (
    <div style={{backgroundColor: C.surface, minHeight: '100vh', paddingBottom: 140, fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
      
      {/* Header */}
      <div style={{position: 'sticky', top: 0, zIndex: 40, backgroundColor: C.surface, boxShadow: '0 4px 12px rgba(26,92,42,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 64}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
          <Image src="/logo.png" alt="StokPas" width={32} height={32} style={{objectFit: 'contain'}} />
          <span style={{fontSize: 20, fontWeight: 800, color: C.primary}}>StokPas</span>
        </div>
        <button style={{width: 40, height: 40, borderRadius: '50%', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <span className="material-symbols-outlined" style={{color: C.onSurfaceVariant}}>notifications</span>
        </button>
      </div>

      <div style={{padding: '24px 20px 0', display: 'flex', flexDirection: 'column', gap: 24}}>

        {/* Hero Card */}
        <div style={{position: 'relative', overflow: 'hidden', borderRadius: 20, background: 'linear-gradient(135deg, #1A5C2A, #2D7A3E)', padding: 24, color: C.white, boxShadow: '0 8px 24px rgba(26,92,42,0.3)'}}>
          <span style={{display: 'inline-flex', alignItems: 'center', gap: 4, backgroundColor: '#F5A623', padding: '4px 10px', borderRadius: 9999, fontSize: 10, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase'}}>🌙 Ramadan H-14</span>
          <h2 style={{fontSize: 24, fontWeight: 700, margin: '8px 0 4px'}}>Selamat pagi, Bu Sari 👋</h2>
          <p style={{color: 'rgba(255,255,255,0.6)', fontSize: 14, margin: 0}}>Kamis, 24 April 2026</p>
          <div style={{position: 'absolute', right: -16, bottom: -16, opacity: 0.15, transform: 'rotate(-12deg)'}}>
            <Image src="/logo.png" alt="" width={128} height={128} style={{filter: 'grayscale(1) brightness(2)'}} />
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12}}>
          {[
            { icon: 'shopping_cart', label: 'Prediksi', value: '58 porsi', sub: '↑ naik 12%', subColor: '#16a34a', border: C.pc },
            { icon: 'ads_click', label: 'Akurasi', value: '91%', sub: null, border: C.sc, bar: true },
            { icon: 'payments', label: 'Hemat', value: 'Rp2,4jt', sub: 'vs bln lalu ↑', subColor: C.pc, border: C.pc },
          ].map((card, i) => (
            <div key={i} style={{backgroundColor: C.white, borderRadius: 12, padding: 14, boxShadow: '0 4px 12px rgba(26,92,42,0.08)', borderTop: `4px solid ${card.border}`}}>
              <div style={{width: 32, height: 32, borderRadius: 8, backgroundColor: card.border === C.sc ? '#FEF6E4' : '#E8F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8}}>
                <span className="material-symbols-outlined" style={{fontSize: 18, color: card.border}}>{card.icon}</span>
              </div>
              <p style={{fontSize: 10, color: '#6b7280', fontWeight: 600, margin: '0 0 2px'}}>{card.label}</p>
              <p style={{fontSize: 16, fontWeight: 800, color: card.border, margin: 0}}>{card.value}</p>
              {card.bar && <div style={{width: '100%', height: 4, backgroundColor: '#f3f4f6', borderRadius: 9999, marginTop: 4}}><div style={{width: '91%', height: '100%', backgroundColor: C.sc, borderRadius: 9999}}></div></div>}
              {card.sub && <p style={{fontSize: 10, fontWeight: 700, color: card.subColor, margin: '2px 0 0'}}>{card.sub}</p>}
            </div>
          ))}
        </div>

        {/* Alert Banner */}
        <div style={{backgroundColor: '#FEF6E4', borderLeft: `4px solid ${C.sc}`, borderRadius: '0 12px 12px 0', padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16}}>
          <div>
            <p style={{fontSize: 14, fontWeight: 700, color: C.onSurface, margin: '0 0 2px'}}>3 hari lagi Lebaran</p>
            <p style={{fontSize: 12, color: C.onSurfaceVariant, margin: 0}}>Prediksi permintaan naik 40%</p>
          </div>
          <button onClick={() => router.push('/prediksi')} style={{display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: C.pc, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap'}}>
            Lihat <span className="material-symbols-outlined" style={{fontSize: 16}}>arrow_forward</span>
          </button>
        </div>

        {/* Menu Andalan */}
        <div>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
            <h3 style={{fontSize: 20, fontWeight: 700, margin: 0}}>Menu Andalanmu</h3>
            <button style={{fontSize: 14, fontWeight: 700, color: C.pc, border: 'none', backgroundColor: 'transparent', cursor: 'pointer'}}>Lihat Semua</button>
          </div>
          <div style={{display: 'flex', overflowX: 'auto', gap: 16, paddingBottom: 8}}>
            {[{nama: 'Ayam Geprek', emoji: '🍗', porsi: 45}, {nama: 'Nasi Padang', emoji: '🍛', porsi: 32}].map((menu, i) => (
              <div key={i} style={{flexShrink: 0, width: 260, backgroundColor: C.white, borderRadius: 16, padding: 16, boxShadow: '0 4px 12px rgba(26,92,42,0.08)'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12}}>
                  <div style={{width: 64, height: 64, borderRadius: 12, backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36}}>{menu.emoji}</div>
                  <div>
                    <p style={{fontWeight: 700, fontSize: 16, margin: '0 0 4px'}}>{menu.nama}</p>
                    <span style={{backgroundColor: '#E8F5EC', color: C.pc, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 9999}}>Besok: {menu.porsi} porsi</span>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'flex-end', height: 40, gap: 4}}>
                  {[40,60,45,75,90,100].map((h, j) => (
                    <div key={j} style={{flex: 1, height: `${h}%`, backgroundColor: j === 5 ? 'rgba(26,92,42,0.6)' : 'rgba(26,92,42,0.2)', borderRadius: '2px 2px 0 0'}}></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tren Chart */}
        <div style={{backgroundColor: C.white, borderRadius: 16, padding: 16, border: '1px solid #D4E8D6', boxShadow: '0 2px 8px rgba(26,92,42,0.06)'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
            <h3 style={{fontWeight: 700, color: C.pc, display: 'flex', alignItems: 'center', gap: 8, margin: 0, fontSize: 16}}>
              <span className="material-symbols-outlined" style={{fontSize: 20}}>bar_chart</span>
              Tren Minggu Ini
            </h3>
            <span style={{border: `1px solid ${C.pc}`, borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 700, color: C.pc}}>Ayam Geprek</span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
            {[
              {hari:'Sen', porsi:42, pct:53.8, warna:'#93C5FD', label:'Sepi'},
              {hari:'Sel', porsi:51, pct:65.3, warna:C.pc, label:'Normal'},
              {hari:'Rab', porsi:55, pct:70.5, warna:C.pc, label:'Normal'},
              {hari:'Kam', porsi:60, pct:76.9, warna:'#F5A623', label:'Ramai'},
              {hari:'Jum', porsi:78, pct:100, warna:'#DC2626', label:'Sangat Ramai', today:true},
              {hari:'Sab', porsi:68, pct:87.1, warna:'#F5A623', label:'Ramai'},
              {hari:'Min', porsi:22, pct:28.2, warna:'#E5E7EB', label:'Sepi'},
            ].map((d) => (
              <div key={d.hari} style={{display:'flex', alignItems:'center', gap:12, ...(d.today ? {backgroundColor:'#FEF6E4', borderLeft:'3px solid #F5A623', margin:'0 -16px', padding:'8px 16px'} : {})}}>
                <span style={{width:32, fontSize:12, fontWeight:700, color: d.today ? C.onSurface : C.outline}}>{d.hari}</span>
                <div style={{flex:1, height:28, backgroundColor:C.surfaceContainer, borderRadius:8, overflow:'hidden'}}>
                  <div style={{width:`${d.pct}%`, height:'100%', backgroundColor:d.warna, borderRadius:8, display:'flex', alignItems:'center', paddingLeft:8}}>
                    <span style={{fontSize:10, fontWeight:700, color: d.warna === '#E5E7EB' ? C.onSurfaceVariant : C.white}}>{d.porsi}</span>
                  </div>
                </div>
                <span style={{fontSize:10, fontWeight:700, color:d.warna, minWidth:60}}>{d.label}</span>
              </div>
            ))}
            {/* Prediksi Besok */}
            <div style={{display:'flex', alignItems:'center', gap:12, backgroundColor:'#E8F5EC', margin:'0 -16px', padding:'8px 16px'}}>
              <span style={{width:32, fontSize:12, fontWeight:700, color:C.pc}}>Besok</span>
              <div style={{flex:1, height:28, backgroundColor:C.surfaceContainer, borderRadius:8, overflow:'hidden'}}>
                <div style={{width:'74.3%', height:'100%', border:`2px dashed ${C.pc}`, backgroundColor:'rgba(26,92,42,0.1)', borderRadius:8, display:'flex', alignItems:'center', paddingLeft:8}}>
                  <span style={{fontSize:10, fontWeight:700, color:C.pc}}>58</span>
                </div>
              </div>
              <span style={{backgroundColor:C.pc, color:C.white, fontSize:8, fontWeight:700, padding:'2px 6px', borderRadius:4}}>PREDIKSI ⭐</span>
            </div>
          </div>
        </div>

        {/* Belanja */}
        <div>
          <h3 style={{fontSize: 20, fontWeight: 700, marginBottom: 12}}>Belanja Hari Ini</h3>
          <div style={{backgroundColor: C.white, borderRadius: 16, padding: 20, boxShadow: '0 4px 12px rgba(26,92,42,0.08)', borderTop: `4px solid ${C.pc}`}}>
            {[
              {icon:'shopping_basket', nama:'Paha Ayam', jumlah:'5.5 Kilogram'},
              {icon:'water_drop', nama:'Minyak Goreng', jumlah:'2 Liter'},
              {icon:'bakery_dining', nama:'Tepung Terigu', jumlah:'3 Kilogram'},
            ].map((item, i) => (
              <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop: i > 0 ? 16 : 0, marginTop: i > 0 ? 16 : 0, borderTop: i > 0 ? '1px solid #f3f4f6' : 'none'}}>
                <div style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{width:40, height:40, borderRadius:'50%', backgroundColor:'#f9fafb', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <span className="material-symbols-outlined" style={{color:'#9ca3af'}}>{item.icon}</span>
                  </div>
                  <div>
                    <p style={{fontWeight:700, fontSize:14, margin:0}}>{item.nama}</p>
                    <p style={{fontSize:12, color:'#9ca3af', margin:0}}>{item.jumlah}</p>
                  </div>
                </div>
                <span className="material-symbols-outlined" style={{color:'#d1d5db'}}>chevron_right</span>
              </div>
            ))}
            <div style={{marginTop:16, paddingTop:16, borderTop:'1px dashed #d1d5db', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <p style={{fontSize:11, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.05em', margin:0}}>Estimasi Total</p>
              <p style={{fontSize:24, fontWeight:800, color:C.pc, margin:0}}>~Rp335.000</p>
            </div>
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