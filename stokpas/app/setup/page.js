'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const COLORS = {
  primary: '#004317',
  primaryContainer: '#1a5c2a',
  secondary: '#835500',
  secondaryContainer: '#feae2c',
  surface: '#f7faf4',
  surfaceContainer: '#ecefe9',
  surfaceContainerHigh: '#e6e9e3',
  surfaceContainerLowest: '#ffffff',
  outline: '#717a6f',
  outlineVariant: '#c0c9bc',
  onSurface: '#191d19',
  onSurfaceVariant: '#40493f',
  onSecondaryContainer: '#6b4500',
  onSecondaryFixedVariant: '#633f00',
  primaryFixed: '#aef3b1',
  onPrimary: '#ffffff',
}

export default function Setup() {
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState(0)
  const [ingredients, setIngredients] = useState([
    { icon: 'restaurant', nama: 'Paha Ayam', value: '1.0', satuan: 'Pcs' },
    { icon: 'opacity', nama: 'Minyak', value: '50', satuan: 'Ml' },
    { icon: 'grain', nama: 'Tepung', value: '100', satuan: 'Gr' },
    { icon: 'nutrition', nama: 'Bawang Putih', value: '2', satuan: 'Sio' },
  ])

  const menus = [
    { label: '🍗 Ayam Geprek' },
    { label: '🍛 Nasi Padang' },
  ]

  return (
    <div style={{backgroundColor: COLORS.surface, minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Plus Jakarta Sans', sans-serif"}}>
      
      {/* Progress Header */}
      <div style={{paddingTop: 32, paddingLeft: 20, paddingRight: 20, paddingBottom: 16}}>
        <div style={{display: 'flex', gap: 8, marginBottom: 12}}>
          <div style={{flex: 1, height: 4, backgroundColor: COLORS.primaryFixed, borderRadius: 9999, overflow: 'hidden'}}>
            <div style={{width: '33%', height: '100%', backgroundColor: COLORS.primaryContainer}}></div>
          </div>
          <div style={{flex: 1, height: 4, backgroundColor: COLORS.primaryFixed, borderRadius: 9999, overflow: 'hidden'}}>
            <div style={{width: '100%', height: '100%', backgroundColor: COLORS.primaryContainer}}></div>
          </div>
          <div style={{flex: 1, height: 4, backgroundColor: COLORS.surfaceContainerHigh, borderRadius: 9999}}></div>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 4}}>
            <span className="material-symbols-outlined" style={{fontSize: 16, color: COLORS.primaryContainer, fontVariationSettings: "'FILL' 1"}}>check_circle</span>
            <span style={{fontSize: 12, color: COLORS.primaryContainer, fontWeight: 700}}>Profil Toko</span>
          </div>
          <div style={{borderBottom: `2px solid ${COLORS.primaryContainer}`, paddingBottom: 4}}>
            <span style={{fontSize: 12, color: COLORS.primaryContainer, fontWeight: 700}}>Setup Resep</span>
          </div>
          <div style={{opacity: 0.4}}>
            <span style={{fontSize: 12, color: COLORS.onSurfaceVariant, fontWeight: 700}}>Selesai</span>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div style={{flex: 1, overflowY: 'auto', paddingLeft: 20, paddingRight: 20, paddingBottom: 140}}>
        
        {/* Illustration */}
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: 24, paddingBottom: 24}}>
          <div style={{width: 192, height: 192, backgroundColor: COLORS.surfaceContainerLowest, borderRadius: '50%', border: `1px solid ${COLORS.outlineVariant}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80}}>
            📋
          </div>
        </div>

        {/* Title */}
        <div style={{textAlign: 'center', marginBottom: 32}}>
          <h1 style={{fontSize: 28, fontWeight: 700, color: COLORS.primaryContainer, lineHeight: '36px', marginBottom: 8}}>Berapa Bahan untuk 1 Porsi?</h1>
          <p style={{fontSize: 16, color: COLORS.onSurfaceVariant}}>Atur kebutuhan bahan per porsi untuk memudahkan prediksi stok otomatis.</p>
        </div>

        {/* Tab Menu */}
        <div style={{display: 'flex', gap: 12, marginBottom: 24, overflowX: 'auto', paddingBottom: 8}}>
          {menus.map((menu, i) => (
            <button key={i} onClick={() => setActiveMenu(i)} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 9999, whiteSpace: 'nowrap', border: 'none', cursor: 'pointer',
              backgroundColor: activeMenu === i ? COLORS.primaryContainer : COLORS.surfaceContainerHigh,
              color: activeMenu === i ? '#ffffff' : COLORS.onSurfaceVariant,
              fontWeight: 600, fontSize: 14
            }}>
              {menu.label}
              {activeMenu === i && <div style={{width: 8, height: 8, backgroundColor: COLORS.secondaryContainer, borderRadius: '50%'}}></div>}
            </button>
          ))}
          <button style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none', cursor: 'pointer',
            backgroundColor: COLORS.surfaceContainerHigh, color: COLORS.primaryContainer,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        {/* Recipe Card */}
        <div style={{
          backgroundColor: COLORS.surfaceContainerLowest, borderRadius: 12,
          padding: 20, boxShadow: '0 4px 12px rgba(26,92,42,0.08)',
          borderTop: `4px solid ${COLORS.primaryContainer}`, marginBottom: 24
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24}}>
            <div style={{width: 64, height: 64, backgroundColor: COLORS.surfaceContainer, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, flexShrink: 0}}>
              {activeMenu === 0 ? '🍗' : '🍛'}
            </div>
            <div>
              <h3 style={{fontSize: 20, fontWeight: 700, color: COLORS.primaryContainer, margin: 0}}>{activeMenu === 0 ? 'Ayam Geprek' : 'Nasi Padang'}</h3>
              <p style={{fontSize: 14, color: COLORS.secondary, margin: 0, fontWeight: 600}}>Estimasi Resep Dasar</p>
            </div>
          </div>

          {/* Ingredients */}
          <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            {ingredients.map((item, i) => (
              <div key={i} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 12, flex: 1}}>
                  <div style={{width: 32, height: 32, borderRadius: '50%', backgroundColor: '#E8F5EC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.primaryContainer}}>
                    <span className="material-symbols-outlined" style={{fontSize: 18}}>{item.icon}</span>
                  </div>
                  <span style={{color: COLORS.onSurface, fontSize: 16}}>{item.nama}</span>
                </div>
                <div style={{width: 96, position: 'relative'}}>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => {
                      const updated = [...ingredients]
                      updated[i].value = e.target.value
                      setIngredients(updated)
                    }}
                    style={{
                      width: '100%', padding: '8px 12px', paddingLeft: 28,
                      border: `1px solid ${COLORS.outlineVariant}`, borderRadius: 8,
                      textAlign: 'right', fontWeight: 700, fontSize: 16,
                      backgroundColor: COLORS.surface, outline: 'none', boxSizing: 'border-box'
                    }}
                  />
                  <span style={{position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', fontSize: 10, color: COLORS.outline, fontWeight: 600}}>{item.satuan}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Add Button */}
          <button style={{
            width: '100%', marginTop: 24, padding: '12px 0',
            border: `2px dashed ${COLORS.primaryContainer}`, borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            color: COLORS.primaryContainer, fontWeight: 600, backgroundColor: 'transparent', cursor: 'pointer'
          }}>
            <span className="material-symbols-outlined">add_circle</span>
            Tambah Bahan Lain
          </button>
        </div>

        {/* Tips */}
        <div style={{backgroundColor: '#FEF6E4', borderLeft: `4px solid ${COLORS.secondaryContainer}`, borderRadius: '0 12px 12px 0', padding: 16, marginBottom: 16}}>
          <div style={{display: 'flex', gap: 12}}>
            <span style={{fontSize: 20}}>💡</span>
            <p style={{fontSize: 14, color: COLORS.onSecondaryFixedVariant, lineHeight: '1.5', margin: 0}}>
              Tidak perlu tepat 100%. Masukkan estimasi rata-rata penggunaan agar StokPas bisa mengingatkan kapan harus belanja.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 390, backgroundColor: COLORS.surface,
        padding: 20, borderTop: `1px solid ${COLORS.outlineVariant}`,
        display: 'flex', flexDirection: 'column', gap: 12,
        boxShadow: '0 -8px 24px rgba(0,0,0,0.04)'
      }}>
        <button
          onClick={() => router.push('/beranda')}
          style={{
            width: '100%', height: 56, backgroundColor: COLORS.primaryContainer,
            color: '#ffffff', borderRadius: 12, fontWeight: 700, fontSize: 18,
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
          }}
        >
          Simpan & Lanjutkan
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <button
          onClick={() => router.push('/beranda')}
          style={{width: '100%', height: 40, color: COLORS.outline, fontWeight: 600, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: 14}}
        >
          Lewati dulu
        </button>
      </div>
    </div>
  )
}