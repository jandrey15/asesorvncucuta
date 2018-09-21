import React, { Component } from 'react'
import Layout from '../components/Layout'
import SlideShow from '../components/SlideShow'
import ListEntradas from '../components/ListEntradas'
import Filter from '../components/Filter'

export default class Home extends Component {
  render () {
    return (
      <Layout title='Home'>
        <section id='Home'>
          <div className='dondeEstoy'>Estoy en : carros nuevos</div>
          <div className='container'>
            <Filter />
            <SlideShow />
            <ListEntradas />
          </div>
        </section>
      </Layout>
    )
  }
}
