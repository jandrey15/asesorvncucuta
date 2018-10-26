import React from 'react'
import globalStyle from './globalStyle'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = url => {
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

export default props => {
  const { children, title, searching } = props
  return (
    <div id='Layout'>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>

      <Header searching={searching} />

      {children}

      <Footer />

      <style jsx global>
        {globalStyle}
      </style>
    </div>
  )
}
