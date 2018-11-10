import React, { Component } from 'react'
import 'isomorphic-fetch'
import { Router } from '../routes'
import slug from '../helpers/slug'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const { API_URL } = publicRuntimeConfig

export default class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      usado: true,
      nuevo: false,
      condicion: 'usado',
      marcas: [],
      modelos: [],
      anos: [],
      color: [],
      ciudades: [],
      valueMarca: '',
      valueModelo: '',
      valueCiudad: '',
      valueColor: '',
      minAno: '',
      maxAno: '',
      statusCode: 200
    }
  }

  async componentDidMount () {
    try {
      let [
        reqMarcas,
        reqModelos,
        reqAnos,
        reqColor,
        reqCiudades
      ] = await Promise.all([
        fetch(
          `${API_URL}/wp-json/wp/v2/marcas?per_page=50&parent=0`
        ),
        fetch(`${API_URL}/wp-json/wp/v2/marcas?per_page=50`),
        fetch(`${API_URL}/wp-json/wp/v2/anos?per_page=50`),
        fetch(`${API_URL}/wp-json/wp/v2/color?per_page=50`),
        fetch(`${API_URL}/wp-json/wp/v2/ciudades?per_page=50`)
      ])

      if (reqMarcas.status >= 400) {
        this.setState({
          statusCode: reqMarcas.status
        })
      }

      let marcas = await reqMarcas.json()
      let modelos = await reqModelos.json()
      let anos = await reqAnos.json()
      let color = await reqColor.json()
      let ciudades = await reqCiudades.json()

      this.setState({
        marcas,
        modelos,
        anos,
        color,
        ciudades,
        statusCode: 200
      })
    } catch (err) {
      this.setState({
        marcas: [],
        modelos: [],
        anos: [],
        color: [],
        ciudades: [],
        statusCode: 503
      })
    }
  }

  handleNew = () => {
    // console.log('nuevo')
    if (!this.state.nuevo) {
      this.setState(prevState => ({
        nuevo: !prevState.nuevo,
        usado: !prevState.usado,
        condicion: 'nuevo'
      }))
    }
  }

  handleUsed = () => {
    // console.log('usado')
    if (!this.state.usado) {
      this.setState(prevState => ({
        nuevo: !prevState.nuevo,
        usado: !prevState.usado,
        condicion: 'usado'
      }))
    }
  }

  handleChange = event => {
    // console.log(event.target.value)
    this.setState({ valueMarca: event.target.value })
    // console.log('marca -> ' + event.target.value)

    const marcaParent = event.target.value
    this.modelos(marcaParent)
  }

  async modelos (value) {
    let parent

    // console.log(parent)
    try {
      if (value !== '') {
        let reqParent = await fetch(
          `${API_URL}/wp-json/wp/v2/marcas?slug=${value}`
        )
        let [{ id }] = await reqParent.json()
        parent = `parent=${id}`
      }

      let req = await fetch(
        `${API_URL}/wp-json/wp/v2/marcas?${parent}&per_page=50`
      )

      let modelos = await req.json()

      this.setState({
        modelos
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleChangeModelo = event => {
    this.setState({ valueModelo: event.target.value })
    // console.log('modelo -> ' + event.target.value)
  }

  handleChangeCiudad = event => {
    this.setState({ valueCiudad: event.target.value })
    // console.log('ciudad -> ' + event.target.value)
  }

  handleChangeColor = event => {
    this.setState({ valueColor: event.target.value })
  }

  handleChangeMinAno = event => {
    this.setState({ minAno: event.target.value })
  }

  handleChangeMaxAno = event => {
    this.setState({ maxAno: event.target.value })
  }

  // handleChangeMinPrecio = event => {
  //   this.setState({ minPrecio: event.target.value })
  // }

  // handleChangeMaxPrecio = event => {
  //   this.setState({ maxPrecio: event.target.value })
  // }

  setInputRefMin = element => {
    this.inputMinPrecio = element
  };

  setInputRefMax = element => {
    this.inputMaxPrecio = element
  };

  handleSubmit = event => {
    event.preventDefault()

    const {
      condicion,
      valueMarca,
      valueModelo,
      valueCiudad,
      valueColor,
      minAno,
      maxAno
    } = this.state

    const minPrecio = this.inputMinPrecio.value || '0'
    const maxPrecio = this.inputMaxPrecio.value || '0'

    let priceRagnge = minPrecio !== '0' || maxPrecio !== '0' ? `_PriceRange_${minPrecio}_${maxPrecio}` : ''

    if (
      valueMarca !== '' &&
      valueModelo !== '' &&
      valueCiudad !== '' &&
      valueColor !== ''
    ) {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          Router.pushRoute('searchFilter', {
            slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo,
            slugCiudad: valueCiudad,
            slugColor: valueColor
          })
        } else if (minAno !== '') {
          Router.pushRoute('searchFilter', {
            slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo,
            slugCiudad: valueCiudad,
            slugColor: valueColor
          })
        } else if (maxAno !== '') {
          Router.pushRoute('searchFilter', {
            slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo,
            slugCiudad: valueCiudad,
            slugColor: valueColor
          })
        } else {
          Router.pushRoute('searchFilter', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo,
            slugCiudad: valueCiudad,
            slugColor: valueColor
          })
        }
      } else {
        Router.pushRoute('searchFilter', {
          slugCondicion: slug(`${condicion}${priceRagnge}`),
          slugMarca: valueMarca,
          slugModelo: valueModelo,
          slugCiudad: valueCiudad,
          slugColor: valueColor
        })
      }
    } else if (
      (valueMarca !== '' && valueModelo !== '' && valueColor !== '') ||
      (valueMarca !== '' && valueModelo !== '' && valueCiudad !== '')
    ) {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          if (valueColor !== '') {
            Router.pushRoute('searchFilterColorCiudad', {
              slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugModelo: valueModelo,
              slugColorCiudad: valueColor
            })
          } else {
            Router.pushRoute('searchFilterColorCiudad', {
              slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugModelo: valueModelo,
              slugColorCiudad: valueCiudad
            })
          }
        } else if (minAno !== '') {
          if (valueColor !== '') {
            Router.pushRoute('searchFilterColorCiudad', {
              slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugModelo: valueModelo,
              slugColorCiudad: valueColor
            })
          } else {
            Router.pushRoute('searchFilterColorCiudad', {
              slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugModelo: valueModelo,
              slugColorCiudad: valueCiudad
            })
          }
        } else if (maxAno !== '') {
          if (valueColor !== '') {
            Router.pushRoute('searchFilterColorCiudad', {
              slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugModelo: valueModelo,
              slugColorCiudad: valueColor
            })
          } else {
            Router.pushRoute('searchFilterColorCiudad', {
              slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugModelo: valueModelo,
              slugColorCiudad: valueCiudad
            })
          }
        } else {
          if (valueColor !== '') {
            Router.pushRoute('searchFilterColorCiudad', {
              slugCondicion: slug(`${condicion}${priceRagnge}`),
              slugMarca: valueMarca,
              slugModelo: valueModelo,
              slugColorCiudad: valueColor
            })
          } else {
            Router.pushRoute('searchFilterColorCiudad', {
              slugCondicion: slug(`${condicion}${priceRagnge}`),
              slugMarca: valueMarca,
              slugModelo: valueModelo,
              slugColorCiudad: valueCiudad
            })
          }
        }
      } else {
        if (valueColor !== '') {
          Router.pushRoute('searchFilterColorCiudad', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo,
            slugColorCiudad: valueColor
          })
        } else {
          Router.pushRoute('searchFilterColorCiudad', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo,
            slugColorCiudad: valueCiudad
          })
        }
      }
    } else if (
      (valueMarca !== '' && valueColor !== '') ||
      (valueMarca !== '' && valueCiudad !== '')
    ) {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          if (valueColor !== '') {
            Router.pushRoute('searchFilterMcolorCiudad', {
              slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugColorCiudad: valueColor
            })
          } else {
            Router.pushRoute('searchFilterMcolorCiudad', {
              slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugColorCiudad: valueCiudad
            })
          }
        } else if (minAno !== '') {
          if (valueColor !== '') {
            Router.pushRoute('searchFilterMcolorCiudad', {
              slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugColorCiudad: valueColor
            })
          } else {
            Router.pushRoute('searchFilterMcolorCiudad', {
              slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugColorCiudad: valueCiudad
            })
          }
        } else if (maxAno !== '') {
          if (valueColor !== '') {
            Router.pushRoute('searchFilterMcolorCiudad', {
              slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugColorCiudad: valueColor
            })
          } else {
            Router.pushRoute('searchFilterMcolorCiudad', {
              slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
              slugMarca: valueMarca,
              slugColorCiudad: valueCiudad
            })
          }
        } else {
          if (valueColor !== '') {
            Router.pushRoute('searchFilterMcolorCiudad', {
              slugCondicion: slug(`${condicion}${priceRagnge}`),
              slugMarca: valueMarca,
              slugColorCiudad: valueColor
            })
          } else {
            Router.pushRoute('searchFilterMcolorCiudad', {
              slugCondicion: slug(`${condicion}${priceRagnge}`),
              slugMarca: valueMarca,
              slugColorCiudad: valueCiudad
            })
          }
        }
      } else {
        if (valueColor !== '') {
          Router.pushRoute('searchFilterMcolorCiudad', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugMarca: valueMarca,
            slugColorCiudad: valueColor
          })
        } else {
          Router.pushRoute('searchFilterMcolorCiudad', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugMarca: valueMarca,
            slugColorCiudad: valueCiudad
          })
        }
      }
    } else if (valueMarca !== '' && valueModelo !== '') {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          Router.pushRoute('searchFilterModelo', {
            slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo
          })
        } else if (minAno !== '') {
          Router.pushRoute('searchFilterModelo', {
            slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo
          })
        } else if (maxAno !== '') {
          Router.pushRoute('searchFilterModelo', {
            slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo
          })
        } else {
          Router.pushRoute('searchFilterModelo', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugMarca: valueMarca,
            slugModelo: valueModelo
          })
        }
      } else {
        Router.pushRoute('searchFilterModelo', {
          slugCondicion: slug(`${condicion}${priceRagnge}`),
          slugMarca: valueMarca,
          slugModelo: valueModelo
        })
      }
    } else if (valueMarca !== '') {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          Router.pushRoute('searchFilterMarca', {
            slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
            slugMarca: valueMarca
          })
        } else if (minAno !== '') {
          Router.pushRoute('searchFilterMarca', {
            slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
            slugMarca: valueMarca
          })
        } else if (maxAno !== '') {
          Router.pushRoute('searchFilterMarca', {
            slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
            slugMarca: valueMarca
          })
        } else {
          Router.pushRoute('searchFilterMarca', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugMarca: valueMarca
          })
        }
      } else {
        Router.pushRoute('searchFilterMarca', {
          slugCondicion: slug(`${condicion}${priceRagnge}`),
          slugMarca: valueMarca
        })
      }
    } else if (valueModelo !== '' && valueCiudad !== '' && valueColor !== '') {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          Router.pushRoute('searchFilterAnything3', {
            slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
            slugModelo: valueModelo,
            slugCiudad: valueCiudad,
            slugColor: valueColor
          })
        } else if (minAno !== '') {
          Router.pushRoute('searchFilterAnything3', {
            slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
            slugModelo: valueModelo,
            slugCiudad: valueCiudad,
            slugColor: valueColor
          })
        } else if (maxAno !== '') {
          Router.pushRoute('searchFilterAnything3', {
            slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
            slugModelo: valueModelo,
            slugCiudad: valueCiudad,
            slugColor: valueColor
          })
        } else {
          Router.pushRoute('searchFilterAnything3', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugModelo: valueModelo,
            slugCiudad: valueCiudad,
            slugColor: valueColor
          })
        }
      } else {
        Router.pushRoute('searchFilterAnything3', {
          slugCondicion: slug(`${condicion}${priceRagnge}`),
          slugModelo: valueModelo,
          slugCiudad: valueCiudad,
          slugColor: valueColor
        })
      }
    } else if (
      (valueModelo !== '' && valueCiudad !== '') ||
      (valueModelo !== '' && valueColor !== '')
    ) {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          if (valueCiudad !== '') {
            Router.pushRoute('searchFilterAnything2', {
              slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
              slugModelo: valueModelo,
              slugAnything: valueCiudad
            })
          } else {
            Router.pushRoute('searchFilterAnything2', {
              slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
              slugModelo: valueModelo,
              slugAnything: valueColor
            })
          }
        } else if (minAno !== '') {
          if (valueCiudad !== '') {
            Router.pushRoute('searchFilterAnything2', {
              slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
              slugModelo: valueModelo,
              slugAnything: valueCiudad
            })
          } else {
            Router.pushRoute('searchFilterAnything2', {
              slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
              slugModelo: valueModelo,
              slugAnything: valueColor
            })
          }
        } else if (maxAno !== '') {
          if (valueCiudad !== '') {
            Router.pushRoute('searchFilterAnything2', {
              slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
              slugModelo: valueModelo,
              slugAnything: valueCiudad
            })
          } else {
            Router.pushRoute('searchFilterAnything2', {
              slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
              slugModelo: valueModelo,
              slugAnything: valueColor
            })
          }
        } else {
          if (valueCiudad !== '') {
            Router.pushRoute('searchFilterAnything2', {
              slugCondicion: slug(`${condicion}${priceRagnge}`),
              slugModelo: valueModelo,
              slugAnything: valueCiudad
            })
          } else {
            Router.pushRoute('searchFilterAnything2', {
              slugCondicion: slug(`${condicion}${priceRagnge}`),
              slugModelo: valueModelo,
              slugAnything: valueColor
            })
          }
        }
      } else {
        if (valueCiudad !== '') {
          Router.pushRoute('searchFilterAnything2', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugModelo: valueModelo,
            slugAnything: valueCiudad
          })
        } else {
          Router.pushRoute('searchFilterAnything2', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugModelo: valueModelo,
            slugAnything: valueColor
          })
        }
      }
    } else if (valueModelo !== '') {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
            slugAnything: valueModelo
          })
        } else if (minAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
            slugAnything: valueModelo
          })
        } else if (maxAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
            slugAnything: valueModelo
          })
        } else {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugAnything: valueModelo
          })
        }
      } else {
        Router.pushRoute('searchFilterAnything', {
          slugCondicion: slug(`${condicion}${priceRagnge}`),
          slugAnything: valueModelo
        })
      }
    } else if (valueCiudad !== '' && valueColor !== '') {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
            slugAnything: slug(`${valueCiudad}-${valueColor}`)
          })
        } else if (minAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
            slugAnything: slug(`${valueCiudad}-${valueColor}`)
          })
        } else if (maxAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
            slugAnything: slug(`${valueCiudad}-${valueColor}`)
          })
        } else {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugAnything: slug(`${valueCiudad}-${valueColor}`)
          })
        }
      } else {
        Router.pushRoute('searchFilterAnything', {
          slugCondicion: slug(`${condicion}${priceRagnge}`),
          slugAnything: slug(`${valueCiudad}-${valueColor}`)
        })
      }
    } else if (valueCiudad !== '') {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
            slugAnything: valueCiudad
          })
        } else if (minAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
            slugAnything: valueCiudad
          })
        } else if (maxAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
            slugAnything: valueCiudad
          })
        } else {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugAnything: valueCiudad
          })
        }
      } else {
        Router.pushRoute('searchFilterAnything', {
          slugCondicion: slug(`${condicion}${priceRagnge}`),
          slugAnything: valueCiudad
        })
      }
    } else if (valueColor !== '') {
      if (condicion !== 'nuevo') {
        if (minAno !== '' && maxAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`),
            slugAnything: valueColor
          })
        } else if (minAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Min_${minAno}${priceRagnge}`),
            slugAnything: valueColor
          })
        } else if (maxAno !== '') {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}_Max_${maxAno}${priceRagnge}`),
            slugAnything: valueColor
          })
        } else {
          Router.pushRoute('searchFilterAnything', {
            slugCondicion: slug(`${condicion}${priceRagnge}`),
            slugAnything: valueColor
          })
        }
      } else {
        Router.pushRoute('searchFilterAnything', {
          slugCondicion: slug(`${condicion}${priceRagnge}`),
          slugAnything: valueColor
        })
      }
    } else if (condicion) {
      if (condicion !== 'nuevo') {
        if ((minAno !== '' && maxAno !== '')) {
          Router.pushRoute('search', {
            slug: slug(`${condicion}_Min_${minAno}_Max_${maxAno}${priceRagnge}`)
          })
        } else if (minAno !== '') {
          Router.pushRoute('search', {
            slug: slug(`${condicion}_Min_${minAno}${priceRagnge}`)
          })
        } else if (maxAno !== '') {
          Router.pushRoute('search', {
            slug: slug(`${condicion}_Max_${maxAno}${priceRagnge}`)
          })
        } else {
          Router.pushRoute('search', {
            slug: slug(`${condicion}${priceRagnge}`)
          })
        }
      } else {
        Router.pushRoute('search', {
          slug: slug(`${condicion}${priceRagnge}`)
        })
      }
    }
  }

  // Router.pushRoute('search', {
  //   slug: slug(`${condicion}_PriceRange_${minPrecio}_${maxPrecio}`)
  // })

  render () {
    const {
      usado,
      nuevo,
      condicion,
      marcas,
      modelos,
      anos,
      color,
      ciudades,
      statusCode
    } = this.state

    const { movil } = this.props

    if (statusCode !== 200) {
      console.log('error...' + statusCode)
      // return <Error statusCode={ statusCode }/>
    }

    return (
      <section className='Filter' style={movil ? { margin: '0' } : null}>
        <nav>
          <span
            className={usado ? `usados is-active` : `usados`}
            onClick={this.handleUsed}
          >
            Usados
          </span>
          <span
            className={nuevo ? `nuevos is-active` : `nuevos`}
            onClick={this.handleNew}
          >
            Nuevos
          </span>
        </nav>
        <form action='/search' method='GET' onSubmit={this.handleSubmit}>
          <input type='hidden' name='condicion' value={condicion} />
          <div className='form'>
            <label htmlFor='marca'>Marca:</label>
            <select id='marca' name='marca' onChange={this.handleChange}>
              <option value=''>Todas las marcas</option>
              {marcas.map(marca => (
                <option value={marca.slug} key={marca.id}>
                  {marca.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form'>
            <label htmlFor='modelo'>Modelo:</label>
            <select
              id='modelo'
              name='modelo'
              onChange={this.handleChangeModelo}
            >
              <option value=''>Todos los modelos</option>
              {modelos.map(
                modelo =>
                  modelo.parent !== 0 && (
                    <option value={modelo.slug} key={modelo.id}>
                      {modelo.name}
                    </option>
                  )
              )}
            </select>
          </div>
          <div className='form'>
            <label htmlFor='ciudad'>Ciudad:</label>
            <select
              id='ciudad'
              name='ciudad'
              onChange={this.handleChangeCiudad}
            >
              <option value=''>Todas las ciudades</option>
              {ciudades.map(ciudad => (
                <option value={ciudad.slug} key={ciudad.id}>
                  {ciudad.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form'>
            <label htmlFor='color'>Color:</label>
            <select id='color' name='color' onChange={this.handleChangeColor}>
              <option value=''>Todos los colores</option>
              {color.map(color => (
                <option value={color.slug} key={color.id}>
                  {color.name}
                </option>
              ))}
            </select>
          </div>

          <div
            className='form'
            style={this.state.nuevo ? { display: 'none' } : null}
          >
            <div className='group'>
              <div className='content'>
                <label htmlFor='minAno'>Min año:</label>
                <select
                  id='minAno'
                  name='minAno'
                  onChange={this.handleChangeMinAno}
                >
                  <option value=''>Min</option>
                  {anos.map(ano => (
                    <option value={ano.name} key={ano.id}>
                      {ano.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='content'>
                <label htmlFor='maxAno'>Max año:</label>
                <select
                  id='maxAno'
                  name='maxAno'
                  onChange={this.handleChangeMaxAno}
                >
                  <option value=''>Max</option>
                  {anos.map(ano => (
                    <option value={ano.name} key={ano.id}>
                      {ano.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className='form'>
            <div className='group'>
              <div className='content'>
                <label htmlFor='minPrecio'>Min precio:</label>
                <input
                  type='number'
                  id='minPrecio'
                  name='minPrecio'
                  placeholder='Mínimo'
                  min='0'
                  step='1000000'
                  ref={this.setInputRefMin}
                />
              </div>

              <div className='content'>
                <label htmlFor='maxPrecio'>Max precio:</label>
                <input
                  type='number'
                  id='maxPrecio'
                  name='maxPrecio'
                  placeholder='Máximo'
                  min='0'
                  step='1000000'
                  ref={this.setInputRefMax}
                />
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
            background-color: #dadbdb;
            transition: 0.2s;
          }

          .nuevos:hover,
          .usados:hover {
            background-color: transparent;
            opacity: 0.9;
            color: #337ab7;
          }

          .usados {
            border-right: 1px solid #dadbdb;
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
            justify-content: space-between;
          }

          .group .content select,
          .group .content input {
            width: 95px;
          }

          .group .content {
            width: 95px;
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
            color: #2d2d2a;
          }

          select,
          input {
            color: #2d2d2a;
            border: 1px solid #dadbdb;
            height: 29px;
            opacity: 0.6;
          }

          input {
            padding-left: 5px;
            box-sizing: border-box;
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
