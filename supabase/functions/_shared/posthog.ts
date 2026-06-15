import { PostHog } from 'npm:posthog-node'

export async function trackEvent(
  distinctId: string,
  event: string,
  properties?: Record<string, any>
) {
  const apiKey = Deno.env.get('POSTHOG_API_KEY')
  const host = Deno.env.get('POSTHOG_HOST') || 'https://us.i.posthog.com'

  if (!apiKey) {
    console.warn('POSTHOG_API_KEY is not set. Skipping tracking.')
    return
  }

  const client = new PostHog(apiKey, {
    host,
    // Optimize for short-lived serverless functions
    flushAt: 1,
    flushInterval: 0,
  })

  try {
    client.capture({
      distinctId,
      event,
      properties,
    })
    await client.shutdown()
  } catch (error) {
    console.error('PostHog backend tracking failed:', error)
  }
}
