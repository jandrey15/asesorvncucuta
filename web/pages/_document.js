// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file
import Document, { Head, Main, NextScript } from 'next/document'
// We wrap our scripts below in Fragment to avoid unnecessary mark up
import { Fragment } from 'react'

import { GA_TRACKING_ID } from '../helpers/gtag'

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const isProduction = process.env.NODE_ENV === 'production'
    const initialProps = await Document.getInitialProps(ctx)

    return { ...initialProps, isProduction }
  }

  setGoogleTags () {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${GA_TRACKING_ID}');
      `
    }
  }

  render () {
    const { isProduction } = this.props
    // console.log(isProduction)

    return (
      <html lang='es'>
        <Head>
          {isProduction && (
            <Fragment>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
            </Fragment>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />

          {
            <Fragment>
              <script
                type='text/javascript'
                src='//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5bd761be568eebc5'
              />
              <script src='https://www.google.com/recaptcha/api.js?render=6Lf-yncUAAAAAHD_rf6AKVpyNYVgxyXNSL9Kq8IG' />
            </Fragment>
          }
        </body>
      </html>
    )
  }
}
