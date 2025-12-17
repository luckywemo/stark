'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'What is a pass?',
    answer: 'A pass is a time-limited access token that allows you to use the Pass Manager service. Passes can be purchased and renewed, and each usage generates fees that support the platform.',
  },
  {
    question: 'How long does a pass last?',
    answer: 'By default, a pass lasts for 144 blocks, which is approximately 24 hours (assuming 10-minute block times). You can check the exact expiration time in your pass status.',
  },
  {
    question: 'What is the referral discount?',
    answer: 'When you purchase a pass with a referrer address, you get a 5% discount on the pass price. Referrers help grow the platform and users save money!',
  },
  {
    question: 'How are fees split?',
    answer: 'Fees from pass purchases and usage are split between the contract owner (80%) and the community vault (20%). This ensures sustainable operation while supporting the community.',
  },
  {
    question: 'Can I use an expired pass?',
    answer: 'No, expired passes cannot be used. You will need to renew your pass or purchase a new one to continue using the service.',
  },
  {
    question: 'What happens if I renew my pass?',
    answer: 'Renewing extends your pass expiration time while preserving your usage count and referrer. You still get the referral discount if you had one.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="card">
      <h2>❓ Frequently Asked Questions</h2>
      <div style={{ marginTop: '1.5rem' }}>
        {faqData.map((item, index) => (
          <div
            key={index}
            style={{
              borderBottom: '1px solid #e2e8f0',
              paddingBottom: '1rem',
              marginBottom: '1rem'
            }}
          >
            <button
              onClick={() => toggle(index)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>{item.question}</span>
              <span style={{
                fontSize: '1.5rem',
                color: '#667eea',
                transform: openIndex === index ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s'
              }}>
                +
              </span>
            </button>
            {openIndex === index && (
              <p style={{
                marginTop: '0.75rem',
                color: '#666',
                lineHeight: '1.6',
                paddingLeft: '1rem',
                borderLeft: '3px solid #667eea'
              }}>
                {item.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}



