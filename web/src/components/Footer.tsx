'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer style={{
      background: '#2d3748',
      color: 'white',
      padding: '2rem 0',
      marginTop: '4rem',
      textAlign: 'center'
    }}>
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <p style={{ margin: '0.5rem 0' }}>
          Pass Manager - Built for Stacks Builder Challenge
        </p>
        <p style={{ 
          margin: '0.5rem 0', 
          fontSize: '0.85rem',
          color: '#a0aec0'
        }}>
          © {currentYear} | Powered by Stacks & Clarity
        </p>
        <div style={{ 
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          fontSize: '0.9rem'
        }}>
          <a 
            href="https://docs.stacks.co" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#667eea', textDecoration: 'none' }}
          >
            Stacks Docs
          </a>
          <a 
            href="https://explorer.stacks.co" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#667eea', textDecoration: 'none' }}
          >
            Explorer
          </a>
          <a 
            href="https://github.com/luckywemo/stark" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: '#667eea', textDecoration: 'none' }}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

