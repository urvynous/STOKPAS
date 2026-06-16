'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

const BELANJA = [
  { emoji: '🍗', nama: 'Paha Ayam', harga: 'Rp3.000 / buah', jumlah: '60 buah (~7,5 kg)', total: 'Rp180.000' },
  { emoji: '🫙', nama: 'Minyak Goreng', harga: 'Rp23.000 / liter', jumlah: '1,2 liter', total: 'Rp27.600' },
  { emoji: '🌾', nama: 'Tepung', harga: 'Rp12.000 / kg', jumlah: '1,8 kg', total: 'Rp21.600' },
  { emoji: '🧅', nama: 'Bawang Merah', harga: 'Rp18.000 / kg', jumlah: '500 gram', total: 'Rp9.000' },
  { emoji: '🧄', nama: 'Bawang Putih', harga: 'Rp22.000 / kg', jumlah: '200 gram', total: 'Rp4.400' },
]

export default function Prediksi() {
  const router = useRouter()
  const [mode, setMode] = useState(1)
  const modes = [{ label: 'Hemat', value: 49 }, { label: 'Normal', value: 58 }, { label: 'Aman', value: 67 }]

  return (
    <div style={{backgroundColor: C.surface, minHeight: '100vh', paddingBottom: 100, fontFamily: "'Plus Jakarta Sans', sans-serif"}}>

      {/* Header */}
      <div style={{position:'fixed', top:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:390, zIndex:50, backgroundColor:C.surface, boxShadow:'0 4px 12px rgba(26,92,42,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:64}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <div style={{width:32, height:32, backgroundColor:C.pc, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <span className="material-symbols-outlined" style={{fontSize:20, color:C.white, fontVariationSettings:"'FILL' 1"}}>eco</span>
          </div>
          <span style={{fontSize:24, fontWeight:700, color:C.primary}}>StokPas</span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{backgroundColor:'#E8F5EC', color:C.pc, padding:'6px 12px', borderRadius:9999, display:'flex', alignItems:'center', gap:6, fontSize:14, fontWeight:600}}>
            <span className="material-symbols-outlined" style={{fontSize:16}}>calendar_today</span>
            Jumat, 25 Apr
          </div>
          <button style={{width:40, height:40, borderRadius:'50%', border:'none', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <span className="material-symbols-outlined" style={{color:C.onSurfaceVariant}}>notifications</span>
          </button>
        </div>
      </div>

      <div style={{paddingTop:80, padding:'80px 20px 0', display:'flex', flexDirection:'column', gap:24}}>

        {/* Hero Card */}
        <div style={{background:'linear-gradient(135deg, #1A5C2A, #0F3D1A)', borderRadius:24, padding:24, boxShadow:'0 8px 24px rgba(26,92,42,0.4)', color:C.white, position:'relative', overflow:'hidden'}}>
          <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:16, opacity:0.9}}>
            <span className="material-symbols-outlined" style={{color:C.sc}}>stars</span>
            <p style={{fontSize:12, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em', margin:0}}>REKOMENDASI UTAMA</p>
          </div>
          <h2 style={{fontSize:24, fontWeight:700, margin:'0 0 4px'}}>Ayam Geprek</h2>
          <div style={{display:'flex', alignItems:'baseline', gap:8, marginBottom:16}}>
            <span style={{fontSize:72, fontWeight:800, lineHeight:1}}>58</span>
            <span style={{fontSize:18, opacity:0.8}}>porsi besok</span>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:8, backgroundColor:'rgba(255,255,255,0.1)', borderRadius:12, padding:12}}>
            <span className="material-symbols-outlined" style={{color:'#aef3b1'}}>trending_up</span>
            <p style={{fontSize:16, margin:0}}>+12% dari Jumat lalu</p>
          </div>
        </div>

        {/* Mode Selector */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
          {modes.map((m, i) => (
            <button key={i} onClick={() => setMode(i)} style={{
              display:'flex', flexDirection:'column', alignItems:'center', padding:12,
              borderRadius:16, backgroundColor:C.white, cursor:'pointer',
              border: mode === i ? `2px solid ${C.primary}` : `1px solid ${C.outlineVariant}`,
              boxShadow: mode === i ? '0 4px 12px rgba(26,92,42,0.2)' : '0 2px 6px rgba(0,0,0,0.05)'
            }}>
              <span style={{fontSize:14, fontWeight: mode===i ? 700 : 500, marginBottom:4, color: mode===i ? C.pc : C.onSurfaceVariant}}>{m.label}</span>
              <span style={{fontSize:20, fontWeight:700, color: mode===i ? C.primary : C.pc}}>{m.value}</span>
            </button>
          ))}
        </div>

        {/* Rentang */}
        <div style={{backgroundColor:C.white, borderRadius:24, padding:24, boxShadow:'0 4px 16px rgba(26,92,42,0.08)', display:'flex', flexDirection:'column', gap:20}}>
          <h3 style={{fontSize:20, fontWeight:700, color:C.onSurface, display:'flex', alignItems:'center', gap:8, margin:0}}>
            <span className="material-symbols-outlined" style={{color:C.primary}}>analytics</span>
            Rentang Kemungkinan
          </h3>
          <div style={{position:'relative', paddingTop:28, paddingBottom:8}}>
            <div style={{height:12, width:'100%', backgroundColor:C.surfaceContainer, borderRadius:9999, overflow:'hidden', display:'flex'}}>
              <div style={{width:'25%', height:'100%', backgroundColor:'rgba(26,92,42,0.2)'}}></div>
              <div style={{width:'50%', height:'100%', background:'linear-gradient(90deg, rgba(26,92,42,0.4), #1a5c2a, rgba(26,92,42,0.4))'}}></div>
              <div style={{width:'25%', height:'100%', backgroundColor:'rgba(26,92,42,0.2)'}}></div>
            </div>
            <div style={{position:'absolute', top:0, left:'58%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center'}}>
              <div style={{backgroundColor:C.primary, color:C.white, fontSize:12, fontWeight:700, padding:'2px 8px', borderRadius:6, marginBottom:4}}>58 ★</div>
              <div style={{width:6, height:6, backgroundColor:C.primary, borderRadius:'50%'}}></div>
            </div>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
            {[{label:'Min', value:42, active:false},{label:'Modus', value:58, active:true},{label:'Maks', value:74, active:false}].map((item) => (
              <div key={item.label} style={{padding:8, borderRadius:12, backgroundColor:C.surfaceContainerLow, textAlign:'center', borderBottom: item.active ? `2px solid ${C.primary}` : 'none'}}>
                <p style={{fontSize:10, color:C.onSurfaceVariant, fontWeight:700, textTransform:'uppercase', margin:'0 0 2px'}}>{item.label}</p>
                <p style={{fontWeight:700, color:C.pc, margin:0}}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Daftar Belanja */}
        <div style={{backgroundColor:C.white, borderRadius:16, border:'1px solid #D4E8D6', padding:16, boxShadow:'0 2px 8px rgba(26,92,42,0.06)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:4}}>
            <h3 style={{fontWeight:700, color:C.pc, display:'flex', alignItems:'center', gap:8, margin:0, fontSize:16}}>🛒 Belanja Besok</h3>
            <button style={{display:'flex', alignItems:'center', gap:4, color:C.pc, fontSize:14, fontWeight:600, border:'none', backgroundColor:'transparent', cursor:'pointer'}}>
              <span className="material-symbols-outlined" style={{fontSize:20}}>content_copy</span>Salin
            </button>
          </div>
          <p style={{fontSize:12, color:C.onSurfaceVariant, marginBottom:16}}>Berdasarkan prediksi 58 porsi Ayam Geprek besok</p>

          {BELANJA.map((item, i) => (
            <div key={i} style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom: i < BELANJA.length-1 ? '1px solid #F5F5F5' : 'none'}}>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <span style={{fontSize:20}}>{item.emoji}</span>
                <div>
                  <p style={{fontWeight:700, color:C.onSurface, margin:0, fontSize:15}}>{item.nama}</p>
                  <p style={{fontSize:12, color:C.onSurfaceVariant, margin:0}}>{item.harga}</p>
                </div>
              </div>
              <div style={{textAlign:'right'}}>
                <p style={{fontWeight:700, color:C.pc, margin:0, fontSize:15}}>{item.jumlah}</p>
                <p style={{fontSize:12, color:C.onSurfaceVariant, margin:0}}>= {item.total}</p>
              </div>
            </div>
          ))}

          <div style={{marginTop:16, padding:16, borderRadius:12, background:'linear-gradient(90deg, #E8F5EC, #FAFDF7)'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
              <p style={{color:C.onSurfaceVariant, fontSize:14, fontWeight:600, margin:0}}>Total Belanja Besok</p>
              <p style={{fontSize:20, fontWeight:700, color:C.pc, margin:0}}>Rp242.600</p>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <p style={{color:'#F5A623', fontWeight:700, fontSize:12, margin:0}}>💡 Hemat Rp95.000 vs minggu lalu</p>
              <p style={{color:C.outline, fontSize:12, margin:0}}>per porsi: ~Rp4.183</p>
            </div>
          </div>
        </div>

        <button style={{width:'100%', padding:'16px 0', border:`2px solid ${C.pc}`, borderRadius:16, color:C.pc, fontWeight:700, fontSize:16, backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
          Lihat Prediksi 7 Hari Lengkap
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
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