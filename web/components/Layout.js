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
  const NODE_ENV = process.env.NODE_ENV
  if (NODE_ENV !== 'development') {
    gtag.trackPageView(url)
  }
}
Router.onRouteChangeError = () => NProgress.done()

export default class Layout extends Component {
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // https://developers.google.com/search/docs/data-types/article
  addJSONLD (title, description, url, image, date, modified) {
    return {
      __html: `{
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "${url}"
      },
      "headline": "${title}",
      "image": [
        "${image}"
      ],
      "datePublished": "${date}",
      "dateModified": "${modified}",
      "author": {
        "@type": "Person",
        "name": "Alvaro Serrano"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Asesorvncucuta",
        "logo": {
          "@type": "ImageObject",
          "url": "https://scontent.fbog4-1.fna.fbcdn.net/v/t31.0-8/12375335_1123779814308321_6033382701965429938_o.jpg?_nc_cat=107&_nc_ht=scontent.fbog4-1.fna&oh=5c8899fd02f0424fb72448fc28e30e75&oe=5C3FB0C5"
        }
      },
      "description": "${description}"
    }`
    }
  }

  render () {
    const { children, SEO, searching } = this.props
    let title = SEO
      ? SEO.title !== undefined
        ? SEO.title
        : DEFAULT_SEO.openGraph.title
      : DEFAULT_SEO.openGraph.title
    let description = SEO
      ? SEO.description !== undefined
        ? SEO.description
        : DEFAULT_SEO.description
      : DEFAULT_SEO.description
    const url = SEO
      ? SEO.url !== undefined
        ? SEO.url
        : DEFAULT_SEO.openGraph.url
      : DEFAULT_SEO.openGraph.url
    const image = SEO
      ? SEO.image !== undefined
        ? SEO.image
        : DEFAULT_SEO.openGraph.image
      : DEFAULT_SEO.openGraph.image
    const date = SEO ? (SEO.date !== undefined ? SEO.date : null) : null
    const modified = SEO
      ? SEO.modified !== undefined
        ? SEO.modified
        : null
      : null

    return (
      <div id='Layout'>
        <Head>
          <title key='title'>{title}</title>
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1, user-scalable=no'
          />
          <meta key='description' name='description' content={description} />
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
            content={
              SEO
                ? SEO.titleOpenGraph !== undefined
                  ? SEO.titleOpenGraph
                  : DEFAULT_SEO.openGraph.title
                : DEFAULT_SEO.openGraph.title
            }
          />
          <meta
            key='twitter:description'
            name='twitter:description'
            content={description}
          />
          <meta key='twitter:url' name='twitter:url' content={url} />
          <meta name='twitter:image:src' content={image} />
          <meta key='og:url' property='og:url' content={url} />
          <meta
            key='og:type'
            property='og:type'
            content={DEFAULT_SEO.openGraph.type}
          />
          <meta
            key='og:title'
            property='og:title'
            content={
              SEO
                ? SEO.titleOpenGraph !== undefined
                  ? SEO.titleOpenGraph
                  : DEFAULT_SEO.openGraph.title
                : DEFAULT_SEO.openGraph.title
            }
          />
          <meta
            key='og:description'
            property='og:description'
            content={description}
          />
          <meta key='og:image' property='og:image' content={image} />
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

        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={this.addJSONLD(
            title,
            description,
            url,
            image,
            date,
            modified
          )}
        />

        <style jsx global>
          {globalStyle}
        </style>
      </div>
    )
  }
}
