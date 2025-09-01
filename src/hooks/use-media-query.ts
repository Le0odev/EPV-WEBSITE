import * as React from "react"

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener("change", onChange)
    setValue(result.matches)
    
    return () => result.removeEventListener("change", onChange)
  }, [query])

  // Retorna false durante SSR para evitar problemas de hidratação
  if (!mounted) return false
  
  return value
}
