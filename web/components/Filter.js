import React, { Component } from 'react'

export default class Filter extends Component {
  render () {
    return (
      <section className='Filter'>
        <nav>
          <span>Nuevos</span>
          <span>Usados</span>
        </nav>
        <form>
          <div className='form'>
            <label htmlFor='marca'>Marca:</label>
            <select id='marca'>
              <option value='null'>Alguna marca</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>
          </div>
          <div className='form'>
            <label htmlFor='modelo'>Modelo:</label>
            <select id='modelo'>
              <option value='null'>Algun modelo</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>
          </div>
          <div className='form'>
            <label htmlFor='ciudad'>Ciudad:</label>
            <select id='ciudad'>
              <option value='null'>Alguna ciudad</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>
          </div>
          <div className='form'>
            <label htmlFor='color'>Color:</label>
            <select id='color'>
              <option value='null'>Algun color</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>
          </div>
          <div className='form'>
            <label htmlFor='minAno'>Min año:</label>
            <select id='minAno'>
              <option value='null'>Min</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>
          </div>
          <div className='form'>
            <label htmlFor='maxAno'>Max año:</label>
            <select id='maxAno'>
              <option value='null'>Max</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>
          </div>
          <div className='form'>
            <label htmlFor='minPrecio'>Min precio:</label>
            <select id='minPrecio'>
              <option value='null'>Min</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>
          </div>
          <div className='form'>
            <label htmlFor='maxPrecio'>Max precio:</label>
            <select id='maxPrecio'>
              <option value='null'>Max</option>
              <option value='saab'>Saab</option>
              <option value='mercedes'>Mercedes</option>
              <option value='audi'>Audi</option>
            </select>
          </div>
          <button id='btnSearch'>Buscar</button>
        </form>
      </section>
    )
  }
}
