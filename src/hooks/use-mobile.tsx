import { useState, useEffect } from 'react'

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      // Verifica se é mobile baseado no viewport e user agent
      const isMobileViewport = window.innerWidth <= 1024
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      
      setIsMobile(isMobileViewport || isMobileUserAgent)
    }

    checkMobile()
    
    const handleResize = () => {
      checkMobile()
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Retorna false durante SSR para evitar problemas de hidratação
  if (!mounted) return false
  
  return isMobile
}
