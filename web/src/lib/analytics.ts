// Analytics utility functions

type EventName = 
  | 'pass_purchased'
  | 'pass_renewed'
  | 'pass_used'
  | 'wallet_connected'
  | 'referral_link_copied'
  | 'transaction_viewed'

interface EventData {
  [key: string]: any
}

class Analytics {
  private enabled: boolean = true

  init(enabled: boolean = true) {
    this.enabled = enabled
  }

  track(event: EventName, data?: EventData) {
    if (!this.enabled || typeof window === 'undefined') return

    try {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', event, data)
      }

      // Add your analytics service here (e.g., Mixpanel, Amplitude, etc.)
      // Example:
      // if (window.mixpanel) {
      //   window.mixpanel.track(event, data)
      // }
    } catch (error) {
      console.error('Analytics error:', error)
    }
  }

  identify(userId: string, traits?: EventData) {
    if (!this.enabled || typeof window === 'undefined') return

    try {
      // Add your analytics service here
      // Example:
      // if (window.mixpanel) {
      //   window.mixpanel.identify(userId, traits)
      // }
    } catch (error) {
      console.error('Analytics identify error:', error)
    }
  }

  page(name: string, properties?: EventData) {
    if (!this.enabled || typeof window === 'undefined') return

    try {
      // Track page views
      this.track('page_view' as EventName, { page: name, ...properties })
    } catch (error) {
      console.error('Analytics page error:', error)
    }
  }
}

export const analytics = new Analytics()



