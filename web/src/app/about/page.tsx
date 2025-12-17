export default function AboutPage() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div className="card">
        <h1>About Pass Manager</h1>
        
        <section style={{ marginTop: '2rem' }}>
          <h2>What is Pass Manager?</h2>
          <p>
            Pass Manager is a decentralized application built on Stacks that provides
            a pass-based access system with fee splitting and referral rewards.
            It was created as part of the Stacks Builder Challenge to demonstrate
            Clarity 4 capabilities, onchain activity, and GitHub contributions.
          </p>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>How It Works</h2>
          <p>
            Users can purchase passes that grant access to the service for a limited time.
            Each pass usage generates fees that are split between the contract owner
            and a community vault. Referral discounts incentivize user growth while
            supporting the platform's sustainability.
          </p>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Technology Stack</h2>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Smart Contracts:</strong> Clarity 4 on Stacks</li>
            <li><strong>Frontend:</strong> Next.js 15 with TypeScript</li>
            <li><strong>Wallet:</strong> Stacks Connect</li>
            <li><strong>Testing:</strong> Clarinet test framework</li>
            <li><strong>Deployment:</strong> Stacks Testnet/Mainnet</li>
          </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Stacks Builder Challenge</h2>
          <p>
            This project is part of the Stacks Builder Challenge, demonstrating:
          </p>
          <ul style={{ lineHeight: '1.8' }}>
            <li>Use of Clarity 4 functions in smart contracts</li>
            <li>Onchain user activity and fee generation</li>
            <li>Active GitHub contributions and development</li>
          </ul>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Open Source</h2>
          <p>
            Pass Manager is open source and available on GitHub.
            Contributions, issues, and feedback are welcome!
          </p>
          <p>
            <a 
              href="https://github.com/luckywemo/stark" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#667eea', textDecoration: 'none' }}
            >
              View on GitHub →
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}



