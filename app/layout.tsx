import '@/styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { FC } from 'react'

type Props = {
  children: React.ReactNode
}

export const metadata = {
  title: 'Promptopia',
  desciption: 'Discover & Share'
}

const RootLayout:  FC<Props> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout