import React from 'react'
import globalStyle from './globalStyle'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

export default props => {
  const { children, title } = props
  return (
    <div id='Layout'>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <Header />

      {children}

      <Footer />

      <style jsx global>
        {globalStyle}
      </style>
    </div>
  )
}
