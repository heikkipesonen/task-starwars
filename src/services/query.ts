export const remoteQuery = <T>(
  url: string
): { query: Promise<T>; abort: () => void } => {
  const controller = new AbortController()
  return {
    query: fetch(url, { signal: controller.signal }).then((response) => response.json()),
    abort: () => {
      try {
        controller.abort()
      } catch {
        // void
      }
    },
  }
}
