import { useSyncExternalStore } from 'react'

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

/** Live clock string for a time zone, ticking once a minute. */
export function useLocalTime(timeZone: string) {
  return useSyncExternalStore(
    (onChange) => {
      const id = window.setInterval(onChange, 15_000)
      return () => window.clearInterval(id)
    },
    () =>
      new Intl.DateTimeFormat('en-US', { timeZone, hour: '2-digit', minute: '2-digit', hour12: false }).format(
        new Date(),
      ),
    () => '',
  )
}
