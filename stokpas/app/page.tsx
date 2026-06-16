'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/beranda')
    }, 2500)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFDF7]">
      <div className="flex flex-col items-center gap-6">
        <div className="w-32 h-32 bg-[#1a5c2a] rounded-3xl flex items-center justify-center shadow-xl">
          <span className="text-6xl">🛒</span>
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-[#1a5c2a] tracking-tight">StokPas</h1>
          <p className="text-[#40493f] mt-2 font-medium">Stok Pas, Bisnis Lancar</p>
        </div>
        <div className="flex gap-2 mt-4">
          <div className="w-2 h-2 bg-[#1a5c2a] rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-[#1a5c2a] rounded-full animate-bounce" style={{animationDelay: '200ms'}}></div>
          <div className="w-2 h-2 bg-[#1a5c2a] rounded-full animate-bounce" style={{animationDelay: '400ms'}}></div>
        </div>
      </div>
    </div>
  )
}