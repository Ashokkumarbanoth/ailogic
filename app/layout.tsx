import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import StoreProvider from '@/store/StoreProvider'

export const metadata: Metadata = {
  title: 'Ailogic',
  description: 'Ailogic is a web application that allows users to browse and purchase products.',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <StoreProvider initialAuth={{ isAuthenticated: false, email: null }}>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
} 
