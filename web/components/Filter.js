import React, { Component } from 'react'

export default class Filter extends Component {
  render () {
    return (
      <section className='Filter'>
        <nav>
          <span className='usados is-active'>Usados</span>
          <span className='nuevos'>Nuevos</span>
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
            <div className='group'>
              <div className='content'>
                <label htmlFor='minAno'>Min año:</label>
                <select id='minAno'>
                  <option value='null'>Min</option>
                  <option value='saab'>Saab</option>
                  <option value='mercedes'>Mercedes</option>
                  <option value='audi'>Audi</option>
                </select>
              </div>
              <div className='content'>
                <label htmlFor='maxAno'>Max año:</label>
                <select id='maxAno'>
                  <option value='null'>Max</option>
                  <option value='saab'>Saab</option>
                  <option value='mercedes'>Mercedes</option>
                  <option value='audi'>Audi</option>
                </select>
              </div>
            </div>
          </div>
          <div className='form'>
            <div className='group'>
              <div className='content'>
                <label htmlFor='minPrecio'>Min precio:</label>
                <select id='minPrecio'>
                  <option value='null'>Min</option>
                  <option value='saab'>Saab</option>
                  <option value='mercedes'>Mercedes</option>
                  <option value='audi'>Audi</option>
                </select>
              </div>

              <div className='content'>
                <label htmlFor='maxPrecio'>Max precio:</label>
                <select id='maxPrecio'>
                  <option value='null'>Max</option>
                  <option value='saab'>Saab</option>
                  <option value='mercedes'>Mercedes</option>
                  <option value='audi'>Audi</option>
                </select>
              </div>
            </div>
          </div>
          <button id='btnSearch'>Buscar</button>
        </form>
        <style jsx>{`
          .Filter {
            background-color: #f7f7f7;
            margin: 0px auto 0 20px;
            width: 260px;
          }

          nav {
            display: grid;
            grid-template-columns: repeat(2, 130px);
            height: 32px;
            margin-bottom: 20px;
          }

          .nuevos,
          .usados {
            font-size: 21px;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            color: #2d2d2a;
            background-color: #cccccc;
            transition: 0.2s;
          }

          .nuevos:hover,
          .usados:hover {
            background-color: transparent;
            opacity: 0.9;
            color: #337ab7;
          }

          .usados {
            border-right: 1px solid #cccccc;
          }
          .nuevos.is-active {
            color: #337ab7;
            background-color: transparent;
          }

          .usados.is-active {
            color: #337ab7;
            background-color: transparent;
          }

          .group {
            display: flex;
          }

          form {
            padding: 0 20px 20px;
          }

          .form {
            display: flex;
            flex-direction: column;
            margin-bottom: 15px;
          }

          label {
            color: #2c2c2a;
          }

          select {
            color: #2c2c2a;
            border: 1px solid #cccccc;
            height: 29px;
            opacity: 0.6;
          }

          button {
            border: none;
            color: #ffffff;
            background-color: #337ab7;
            width: 115px;
            margin: 30px auto 0 auto;
            height: 33px;
            display: block;
            padding: 0;
            border-radius: 2px;
            cursor: pointer;
            text-transform: uppercase;
            transition: 0.2s;
            font-weight: 600;
          }

          button:hover {
            opacity: 0.9;
          }
          button:active {
            transform: scale(0.9);
          }
        `}</style>
      </section>
    )
  }
}
