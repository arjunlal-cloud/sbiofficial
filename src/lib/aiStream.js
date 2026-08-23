export async function streamAi(url, body, onChunk, signal) {
  const timeoutController = new AbortController()
  const timeoutId = window.setTimeout(() => timeoutController.abort(), 15000)
  const abortRequest = () => timeoutController.abort()
  signal?.addEventListener('abort', abortRequest, { once: true })
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: timeoutController.signal,
    })
    if (!res.ok || !res.body) {
      return { ok: false, error: `Request failed (${res.status})` }
    }
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let error = null
    for (;;) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) continue
        let parsed
        try {
          parsed = JSON.parse(trimmed.slice(5).trim())
        } catch {
          continue
        }
        if (parsed.error) error = parsed.error
        if (parsed.content) onChunk(parsed.content)
        if (parsed.done) return error ? { ok: false, error } : { ok: true }
      }
    }
    return error ? { ok: false, error } : { ok: true }
  } catch (err) {
    if (err?.name === 'AbortError') return { ok: false, error: 'The Concierge took too long to respond. Please try again.' }
    return { ok: false, error: 'Connection failed.' }
  } finally {
    window.clearTimeout(timeoutId)
    signal?.removeEventListener('abort', abortRequest)
  }
}
