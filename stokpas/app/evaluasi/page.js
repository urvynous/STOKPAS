'use client'
import { useRouter } from 'next/navigation'

const C = {
  primary: '#004317', pc: '#1a5c2a', sc: '#feae2c',
  surface: '#f7faf4', surfaceContainer: '#ecefe9',
  surfaceContainerLow: '#f1f5ef', surfaceContainerHigh: '#e6e9e3',
  outline: '#717a6f', outlineVariant: '#c0c9bc',
  onSurface: '#191d19', onSurfaceVariant: '#40493f', white: '#ffffff',
  onSC: '#6b4500', error: '#ba1a1a',
}

const NAV = [
  { icon: 'home', label: 'Beranda', path: '/beranda' },
  { icon: 'add_circle', label: 'Input', path: '/input' },
  { icon: 'trending_up', label: 'Prediksi', path: '/prediksi' },
  { icon: 'analytics', label: 'Evaluasi', path: '/evaluasi' },
  { icon: 'history', label: 'Riwayat', path: '/riwayat' },
]

export default function Evaluasi() {
  const router = useRouter()

  return (
    <div style={{backgroundColor: C.surface, minHeight: '100vh', paddingBottom: 100, fontFamily: "'Plus Jakarta Sans', sans-serif"}}>

      {/* Header */}
      <div style={{position:'sticky', top:0, zIndex:50, backgroundColor:C.surface, boxShadow:'0 4px 12px rgba(26,92,42,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:64}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{width:40, height:40, backgroundColor:C.pc, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #aef3b1'}}>
            <span className="material-symbols-outlined" style={{fontSize:18, color:C.white, fontVariationSettings:"'FILL' 1"}}>eco</span>
          </div>
          <span style={{fontSize:18, fontWeight:700, color:C.primary}}>Seberapa Akurat StokPas?</span>
        </div>
        <button style={{width:40, height:40, borderRadius:'50%', border:'none', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <span className="material-symbols-outlined" style={{color:C.onSurfaceVariant}}>notifications</span>
        </button>
      </div>

      <div style={{padding:'24px 20px 0', display:'flex', flexDirection:'column', gap:32}}>

        {/* Akurasi Utama */}
        <div style={{background:'linear-gradient(135deg, #1A5C2A, #0F3D1A)', borderRadius:16, padding:24, color:C.white, boxShadow:'0 8px 24px rgba(26,92,42,0.3)', position:'relative', overflow:'hidden'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            {/* Ring */}
            <div style={{width:128, height:128, borderRadius:'50%', background:'conic-gradient(#feae2c 91%, rgba(255,255,255,0.1) 0)', padding:12, flexShrink:0}}>
              <div style={{width:'100%', height:'100%', borderRadius:'50%', backgroundColor:'#0F3D1A', border:`4px solid ${C.pc}`, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                <span style={{fontSize:28, fontWeight:700, color:C.sc}}>91%</span>
                <span style={{fontSize:9, textTransform:'uppercase', letterSpacing:'0.05em', color:'#aef3b1'}}>Akurat</span>
              </div>
            </div>
            {/* Stats */}
            <div style={{display:'flex', flexDirection:'column', gap:16, paddingLeft:16, borderLeft:'1px solid rgba(255,255,255,0.1)'}}>
              {[
                {icon:'inventory', bg:'rgba(255,255,255,0.1)', iconColor:C.sc, label:'Total Tebakan', value:'28 Kali', valueColor:C.white},
                {icon:'check_circle', bg:'rgba(34,197,94,0.2)', iconColor:'#4ade80', label:'Tepat Sasaran', value:'26 Kali', valueColor:'#4ade80'},
                {icon:'cancel', bg:'rgba(239,68,68,0.2)', iconColor:'#f87171', label:'Kurang Tepat', value:'2 Kali', valueColor:'#f87171'},
              ].map((s) => (
                <div key={s.label} style={{display:'flex', alignItems:'center', gap:12}}>
                  <div style={{backgroundColor:s.bg, padding:8, borderRadius:8}}>
                    <span className="material-symbols-outlined" style={{fontSize:16, color:s.iconColor}}>{s.icon}</span>
                  </div>
                  <div>
                    <p style={{fontSize:11, color:'#aef3b1', margin:0}}>{s.label}</p>
                    <p style={{fontWeight:700, fontSize:18, color:s.valueColor, margin:0}}>{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Perbandingan */}
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          <h2 style={{fontSize:20, fontWeight:700, color:C.primary, display:'flex', alignItems:'center', gap:8, margin:0}}>
            <span className="material-symbols-outlined">balance</span>
            Beda Cara Lama vs StokPas
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <div style={{backgroundColor:'#FEF6E4', padding:16, borderRadius:12, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
              <span style={{fontSize:36, marginBottom:8}}>😟</span>
              <p style={{fontWeight:700, fontSize:14, fontStyle:'italic', margin:'0 0 4px', color:C.onSurface}}>Kira-kira Sendiri</p>
              <p style={{fontSize:12, color:'#633f00', lineHeight:1.4, margin:'0 0 12px'}}>24 dari 100 kali salah hitung stok</p>
              <div style={{borderTop:'1px solid rgba(99,63,0,0.1)', paddingTop:12, width:'100%'}}>
                <p style={{fontSize:10, color:'#633f00', textTransform:'uppercase', margin:'0 0 2px'}}>Uang Terbuang</p>
                <p style={{fontWeight:700, color:C.error, margin:0}}>Rp500rb<span style={{fontSize:10, fontWeight:400}}>/bln</span></p>
              </div>
            </div>
            <div style={{backgroundColor:'#E8F5EC', padding:16, borderRadius:12, display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
              <span style={{fontSize:36, marginBottom:8}}>😊</span>
              <p style={{fontWeight:700, fontSize:14, color:C.primary, margin:'0 0 4px'}}>Pakai StokPas</p>
              <p style={{fontSize:12, color:'rgba(0,67,23,0.7)', lineHeight:1.4, margin:'0 0 12px'}}>Cuma 8 dari 100 kali yang meleset</p>
              <div style={{borderTop:'1px solid rgba(0,67,23,0.1)', paddingTop:12, width:'100%'}}>
                <p style={{fontSize:10, color:'rgba(0,67,23,0.7)', textTransform:'uppercase', margin:'0 0 2px'}}>Uang Terbuang</p>
                <p style={{fontWeight:700, color:C.primary, margin:0}}>Rp160rb<span style={{fontSize:10, fontWeight:400}}>/bln</span></p>
              </div>
            </div>
          </div>
          <div style={{backgroundColor:C.sc, borderRadius:12, padding:16, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{backgroundColor:'rgba(255,255,255,0.2)', padding:8, borderRadius:'50%'}}>
                <span className="material-symbols-outlined" style={{color:C.onSC}}>military_tech</span>
              </div>
              <span style={{fontWeight:700, color:C.onSC, fontSize:18}}>🏆 StokPas 3× Lebih Akurat</span>
            </div>
            <span className="material-symbols-outlined" style={{color:'rgba(107,69,0,0.5)'}}>arrow_forward_ios</span>
          </div>
        </div>

        {/* Laporan Minggu Ini */}
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          <h2 style={{fontSize:20, fontWeight:700, color:C.primary, display:'flex', alignItems:'center', gap:8, margin:0}}>
            <span className="material-symbols-outlined">calendar_today</span>
            Laporan Minggu Ini
          </h2>
          <div style={{backgroundColor:C.white, borderRadius:16, overflow:'hidden', boxShadow:'0 4px 16px rgba(26,92,42,0.08)', border:`1px solid rgba(192,201,188,0.3)`}}>
            <table style={{width:'100%', borderCollapse:'collapse'}}>
              <thead>
                <tr style={{backgroundColor:C.surfaceContainerLow}}>
                  <th style={{padding:'12px 16px', textAlign:'left', fontSize:11, fontWeight:700, color:C.onSurfaceVariant, textTransform:'uppercase'}}>Hari</th>
                  <th style={{padding:'12px 16px', textAlign:'center', fontSize:11, fontWeight:700, color:C.onSurfaceVariant, textTransform:'uppercase'}}>Hasil</th>
                  <th style={{padding:'12px 16px', textAlign:'right', fontSize:11, fontWeight:700, color:C.onSurfaceVariant, textTransform:'uppercase'}}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {hari:'Senin', emoji:'😊', status:'TEPAT', bg:'#dcfce7', color:'#15803d', highlight:false},
                  {hari:'Selasa', emoji:'🎯', status:'SEMPURNA', bg:C.sc, color:C.onSC, highlight:true},
                  {hari:'Rabu', emoji:'😐', status:'LUMAYAN', bg:'#fef3c7', color:'#b45309', highlight:false},
                  {hari:'Kamis', emoji:'😊', status:'TEPAT', bg:'#dcfce7', color:'#15803d', highlight:false},
                  {hari:'Jumat', emoji:'🎯', status:'SEMPURNA', bg:C.sc, color:C.onSC, highlight:true},
                  {hari:'Sabtu', emoji:'😊', status:'TEPAT', bg:'#dcfce7', color:'#15803d', highlight:false},
                  {hari:'Minggu', emoji:'😊', status:'TEPAT', bg:'#dcfce7', color:'#15803d', highlight:false},
                ].map((row, i) => (
                  <tr key={i} style={{borderTop:`1px solid rgba(192,201,188,0.2)`, backgroundColor: row.highlight ? `rgba(254,174,44,0.1)` : 'transparent', ...(row.highlight ? {borderLeft:`4px solid ${C.sc}`} : {})}}>
                    <td style={{padding:'12px 16px', fontWeight: row.highlight ? 700 : 500}}>{row.hari}</td>
                    <td style={{padding:'12px 16px', textAlign:'center', fontSize:20}}>{row.emoji}</td>
                    <td style={{padding:'12px 16px', textAlign:'right'}}>
                      <span style={{backgroundColor:row.bg, color:row.color, padding:'4px 8px', borderRadius:9999, fontSize:10, fontWeight:700}}>{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Status Sistem */}
        <div style={{backgroundColor:C.white, padding:20, borderRadius:16, border:`1px solid rgba(192,201,188,0.3)`, display:'flex', flexDirection:'column', gap:16}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <span className="material-symbols-outlined" style={{fontSize:16, color:C.primary}}>settings_suggest</span>
              <h3 style={{fontWeight:700, color:C.primary, margin:0}}>Status Pencatat</h3>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:6, backgroundColor:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:9999, padding:'4px 12px'}}>
              <div style={{width:8, height:8, backgroundColor:'#22c55e', borderRadius:'50%'}}></div>
              <span style={{fontSize:10, fontWeight:700, color:'#15803d', textTransform:'uppercase'}}>Sistem Normal</span>
            </div>
          </div>

          <div style={{display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:8, backgroundColor:C.surfaceContainerLow, padding:12, borderRadius:12}}>
            {[['🎯','Sempurna'],['😊','Tepat'],['😐','Lumayan'],['😟','Meleset']].map(([e,l]) => (
              <div key={l} style={{display:'flex', alignItems:'center', gap:6}}>
                <span style={{fontSize:16}}>{e}</span>
                <span style={{fontSize:10, color:C.onSurfaceVariant}}>{l}</span>
              </div>
            ))}
          </div>

          <div style={{display:'flex', flexDirection:'column', gap:8}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <p style={{fontSize:12, fontWeight:700, color:C.onSurfaceVariant, margin:0}}>Kecerdasan Sistem</p>
              <p style={{fontSize:12, color:C.primary, fontWeight:700, margin:0}}>91% — Terus Membaik</p>
            </div>
            <div style={{width:'100%', height:12, backgroundColor:C.surfaceContainerHigh, borderRadius:9999, overflow:'hidden'}}>
              <div style={{width:'91%', height:'100%', backgroundColor:C.primary, borderRadius:9999}}></div>
            </div>
            <p style={{fontSize:10, color:C.outline, textAlign:'center', margin:0}}>StokPas belajar dari transaksi harian Anda setiap jam 00:00</p>
          </div>

          <button style={{width:'100%', padding:'12px 16px', border:`2px solid ${C.primary}`, borderRadius:12, color:C.primary, fontWeight:700, fontSize:16, backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
            <span className="material-symbols-outlined">sync</span>
            Perbarui Sistem Sekarang
          </button>
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:390, zIndex:50, backgroundColor:C.surface, borderTop:`1px solid ${C.outlineVariant}`, boxShadow:'0 -4px 16px rgba(26,92,42,0.08)', borderRadius:'16px 16px 0 0', display:'flex', justifyContent:'space-around', alignItems:'center', height:80}}>
        {NAV.map((item) => (
          <button key={item.path} onClick={() => router.push(item.path)} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:2, border:'none', backgroundColor:'transparent', cursor:'pointer', color: item.path === '/evaluasi' ? C.pc : '#9ca3af'}}>
            <span className="material-symbols-outlined" style={{fontVariationSettings: item.path === '/evaluasi' ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
            <span style={{fontSize:10, fontWeight:600}}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}