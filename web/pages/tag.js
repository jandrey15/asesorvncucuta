import React, { Component } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'

export default class Tag extends Component {
  static async getInitialProps ({ res, query }) {
    const name = query.name
    const id = query.id
    // https://rafarjonilla.com/tutorial/cambiar-foto-de-perfil-en-wordpress-gravatar/
    try {
      let req = await fetch(
        `http://api.docker.test/wp-json/wp/v2/articulo?tags=${id}&_embed`
      )

      let [tags] = await req.json()

      return { tags, name, statusCode: 200 }
    } catch (err) {
      res.statusCode = 503
      return { tags: [], name: null, statusCode: 503 }
    }
  }

  render () {
    const { tags, name, statusCode } = this.props
    // console.log(article)
    if (statusCode !== 200) {
      console.log('error...')
      // return <Error statusCode={ statusCode }/>
    }

    return (
      <Layout title={name}>
        <article id='Tags'>{console.log(tags)}</article>
        <style jsx>{``}</style>
      </Layout>
    )
  }
}
