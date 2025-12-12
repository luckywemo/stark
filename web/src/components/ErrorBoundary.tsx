'use client'

import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <div className="card">
            <h2>⚠️ Something went wrong</h2>
            <p>An error occurred while rendering this component.</p>
            {this.state.error && (
              <details style={{ marginTop: '1rem' }}>
                <summary>Error details</summary>
                <pre style={{ 
                  background: '#f5f5f5', 
                  padding: '1rem', 
                  borderRadius: '6px',
                  overflow: 'auto',
                  marginTop: '0.5rem'
                }}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <button
              className="btn"
              onClick={() => this.setState({ hasError: false, error: undefined })}
              style={{ marginTop: '1rem' }}
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

