'use client'
import { useState } from 'react'
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

const DATA = [
  {
    tanggal: 'Jumat, 25 Apr 2025', highlight: true,
    items: [
      { emoji: '🍗', nama: 'Ayam Geprek', prediksi: 58, aktual: 61, status: 'TEPAT', statusBg: '#dcfce7', statusColor: '#15803d' },
      { emoji: '🍛', nama: 'Nasi Padang', prediksi: 32, aktual: 30, status: 'TEPAT', statusBg: '#dcfce7', statusColor: '#15803d' },
    ]
  },
  {
    tanggal: 'Kamis, 24 Apr 2025', highlight: false,
    items: [
      { emoji: '🍗', nama: 'Ayam Geprek', prediksi: 55, aktual: 60, status: 'LUMAYAN', statusBg: '#fef3c7', statusColor: '#b45309' },
      { emoji: '🍛', nama: 'Nasi Padang', prediksi: 28, aktual: 28, status: 'SEMPURNA', statusBg: C.sc, statusColor: C.onSC },
    ]
  },
  {
    tanggal: 'Rabu, 23 Apr 2025', highlight: false,
    items: [
      { emoji: '🍗', nama: 'Ayam Geprek', prediksi: 50, aktual: 49, status: 'SEMPURNA', statusBg: C.sc, statusColor: C.onSC },
      { emoji: '🍛', nama: 'Nasi Padang', prediksi: 30, aktual: 22, status: 'MELESET', statusBg: '#fee2e2', statusColor: '#b91c1c' },
    ]
  },
  {
    tanggal: 'Selasa, 22 Apr 2025', highlight: false,
    items: [
      { emoji: '🍗', nama: 'Ayam Geprek', prediksi: 45, aktual: 47, status: 'TEPAT', statusBg: '#dcfce7', statusColor: '#15803d' },
      { emoji: '🍛', nama: 'Nasi Padang', prediksi: 25, aktual: 26, status: 'TEPAT', statusBg: '#dcfce7', statusColor: '#15803d' },
    ]
  },
]

export default function Riwayat() {
  const router = useRouter()
  const [filter, setFilter] = useState('Semua')
  const filters = ['Semua', 'Tepat', 'Lumayan', 'Meleset']

  return (
    <div style={{backgroundColor: C.surface, minHeight: '100vh', paddingBottom: 100, fontFamily: "'Plus Jakarta Sans', sans-serif"}}>

      {/* Header */}
      <div style={{position:'sticky', top:0, zIndex:50, backgroundColor:C.surface, boxShadow:'0 4px 12px rgba(26,92,42,0.08)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', height:64}}>
        <div style={{display:'flex', alignItems:'center', gap:10}}>
          <div style={{width:40, height:40, backgroundColor:C.pc, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', border:'2px solid #aef3b1'}}>
            <span className="material-symbols-outlined" style={{fontSize:18, color:C.white, fontVariationSettings:"'FILL' 1"}}>eco</span>
          </div>
          <span style={{fontSize:18, fontWeight:700, color:C.primary}}>Riwayat Penjualan</span>
        </div>
        <button style={{width:40, height:40, borderRadius:'50%', border:'none', backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <span className="material-symbols-outlined" style={{color:C.onSurfaceVariant}}>notifications</span>
        </button>
      </div>

      <div style={{padding:'24px 20px 0', display:'flex', flexDirection:'column', gap:20}}>

        {/* Summary Cards */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12}}>
          {[
            { label: 'Total Hari', value: '28', icon: 'calendar_today', color: C.pc, bg: '#E8F5EC' },
            { label: 'Rata Akurasi', value: '91%', icon: 'ads_click', color: '#b45309', bg: '#fef3c7' },
            { label: 'Terbaik', value: '100%', icon: 'military_tech', color: C.onSC, bg: '#FEF6E4' },
          ].map((card) => (
            <div key={card.label} style={{backgroundColor:C.white, borderRadius:12, padding:14, boxShadow:'0 4px 12px rgba(26,92,42,0.08)', borderTop:`4px solid ${card.color}`}}>
              <div style={{width:32, height:32, borderRadius:8, backgroundColor:card.bg, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:8}}>
                <span className="material-symbols-outlined" style={{fontSize:18, color:card.color}}>{card.icon}</span>
              </div>
              <p style={{fontSize:10, color:C.outline, fontWeight:600, margin:'0 0 2px'}}>{card.label}</p>
              <p style={{fontSize:18, fontWeight:800, color:card.color, margin:0}}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{display:'flex', gap:8, overflowX:'auto', paddingBottom:4}}>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding:'8px 16px', borderRadius:9999, border:'none', cursor:'pointer',
              whiteSpace:'nowrap', fontWeight:600, fontSize:13,
              backgroundColor: filter === f ? C.pc : C.surfaceContainerHigh,
              color: filter === f ? C.white : C.onSurfaceVariant,
            }}>
              {f}
            </button>
          ))}
        </div>

        {/* List Riwayat */}
        {DATA.map((group, gi) => (
          <div key={gi} style={{display:'flex', flexDirection:'column', gap:8}}>
            {/* Tanggal Header */}
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <span style={{fontSize:13, fontWeight:700, color: group.highlight ? C.pc : C.outline}}>
                {group.highlight && '📍 '}{group.tanggal}
              </span>
              {group.highlight && (
                <span style={{backgroundColor:'#E8F5EC', color:C.pc, fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:9999}}>HARI INI</span>
              )}
            </div>

            {/* Card */}
            <div style={{backgroundColor:C.white, borderRadius:16, overflow:'hidden', boxShadow:'0 4px 12px rgba(26,92,42,0.08)', border: group.highlight ? `2px solid ${C.pc}` : `1px solid ${C.outlineVariant}`}}>
              {group.items.map((item, ii) => (
                <div key={ii} style={{
                  padding:16,
                  borderTop: ii > 0 ? `1px solid ${C.outlineVariant}` : 'none',
                  display:'flex', alignItems:'center', justifyContent:'space-between', gap:12
                }}>
                  <div style={{display:'flex', alignItems:'center', gap:12}}>
                    <div style={{width:44, height:44, backgroundColor:C.surfaceContainerLow, borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center', fontSize:24}}>
                      {item.emoji}
                    </div>
                    <div>
                      <p style={{fontWeight:700, fontSize:14, color:C.onSurface, margin:'0 0 4px'}}>{item.nama}</p>
                      <div style={{display:'flex', alignItems:'center', gap:8}}>
                        <span style={{fontSize:12, color:C.outline}}>Prediksi: <b style={{color:C.pc}}>{item.prediksi}</b></span>
                        <span style={{fontSize:12, color:C.outline}}>Aktual: <b style={{color:C.onSurface}}>{item.aktual}</b></span>
                      </div>
                    </div>
                  </div>
                  <span style={{
                    backgroundColor:item.statusBg, color:item.statusColor,
                    fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:9999, whiteSpace:'nowrap'
                  }}>
                    {item.status}
                  </span>
                </div>
              ))}

              {/* Footer total */}
              <div style={{backgroundColor:C.surfaceContainerLow, padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <span style={{fontSize:12, color:C.outline}}>Total terjual</span>
                <span style={{fontSize:14, fontWeight:700, color:C.pc}}>
                  {group.items.reduce((a, b) => a + b.aktual, 0)} porsi
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Load More */}
        <button style={{width:'100%', padding:'14px 0', border:`2px solid ${C.pc}`, borderRadius:12, color:C.pc, fontWeight:700, fontSize:15, backgroundColor:'transparent', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8}}>
          <span className="material-symbols-outlined">expand_more</span>
          Muat Riwayat Lebih Lama
        </button>
      </div>

      {/* Bottom Nav */}
      <div style={{position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)', width:'100%', maxWidth:390, zIndex:50, backgroundColor:C.surface, borderTop:`1px solid ${C.outlineVariant}`, boxShadow:'0 -4px 16px rgba(26,92,42,0.08)', borderRadius:'16px 16px 0 0', display:'flex', justifyContent:'space-around', alignItems:'center', height:80}}>
        {NAV.map((item) => (
          <button key={item.path} onClick={() => router.push(item.path)} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:2, border:'none', backgroundColor:'transparent', cursor:'pointer', color: item.path === '/riwayat' ? C.pc : '#9ca3af'}}>
            <span className="material-symbols-outlined" style={{fontVariationSettings: item.path === '/riwayat' ? "'FILL' 1" : "'FILL' 0"}}>{item.icon}</span>
            <span style={{fontSize:10, fontWeight:600}}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}