import React, { Component } from 'react'
import globalStyle from './globalStyle'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'

import NProgress from 'nprogress'
import Router from 'next/router'
import * as gtag from '../helpers/gtag'
import { DEFAULT_SEO } from '../config'

Router.onRouteChangeStart = url => {
  NProgress.start()
}
Router.onRouteChangeComplete = url => {
  NProgress.done()
  gtag.trackPageView(url)
}
Router.onRouteChangeError = () => NProgress.done()

export default class Layout extends Component {
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // https://developers.google.com/search/docs/data-types/article
  addJSONLD (post, info, url) {
    return {
      __html: `{
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${url}"
      },
      "headline": "${post.og_title[0].text}",
      "image": [
        "${post.og_image.url}"
      ],
      "datePublished": "${info.first_publication_date}",
      "dateModified": "${info.first_publication_date}",
      "author": {
        "@type": "Person",
        "name": "Gary Meehan"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Gary Meehan",
        "logo": {
          "@type": "ImageObject",
          "url": "https://prismic-io.s3.amazonaws.com/gary-blog%2Fa64f6d7e-5c0e-4190-b852-2122e087ae2b_gm.jpg"
        }
      },
      "description": "${post.og_description[0].text}"
    }`
    }
  }

  render () {
    const { children, SEO, searching } = this.props
    return (
      <div id='Layout'>
        <Head>
          <title key='title'>
            {SEO ? SEO.title : DEFAULT_SEO.openGraph.title}
          </title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, user-scalable=no'
          />
          <meta
            key='description'
            name='description'
            content={SEO ? SEO.description : DEFAULT_SEO.description}
          />
          <meta
            key='twitter:card'
            name='twitter:card'
            content={DEFAULT_SEO.twitter.cardType}
          />
          <meta
            key='twitter:site'
            name='twitter:site'
            content={DEFAULT_SEO.twitter.handle}
          />
          <meta
            key='twitter:title'
            name='twitter:title'
            content={DEFAULT_SEO.openGraph.title}
          />
          <meta
            key='twitter:description'
            name='twitter:description'
            content={DEFAULT_SEO.openGraph.description}
          />
          <meta
            key='twitter:url'
            name='twitter:url'
            content={DEFAULT_SEO.openGraph.url}
          />
          <meta
            name='twitter:image:src'
            content={DEFAULT_SEO.openGraph.image}
          />
          <meta
            key='og:url'
            property='og:url'
            content={DEFAULT_SEO.openGraph.url}
          />
          <meta
            key='og:type'
            property='og:type'
            content={DEFAULT_SEO.openGraph.type}
          />
          <meta
            key='og:title'
            property='og:title'
            content={DEFAULT_SEO.openGraph.title}
          />
          <meta
            key='og:description'
            property='og:description'
            content={DEFAULT_SEO.openGraph.description}
          />
          <meta
            key='og:image'
            property='og:image'
            content={DEFAULT_SEO.openGraph.image}
          />
          <meta
            key='og:image:width'
            property='og:image:width'
            content={DEFAULT_SEO.openGraph.imageWidth}
          />
          <meta
            key='og:image:height'
            property='og:image:height'
            content={DEFAULT_SEO.openGraph.imageHeight}
          />
          <meta
            key='og:locale'
            property='og:locale'
            content={DEFAULT_SEO.openGraph.locale}
          />
        </Head>

        <Header searching={searching} />

        {children}

        <Footer />

        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={this.addJSONLD(post, info, url)}
        /> */}

        <style jsx global>
          {globalStyle}
        </style>
      </div>
    )
  }
}
