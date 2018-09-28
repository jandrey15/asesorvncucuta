import Link from 'next/link'

const MorePosts = props => {
  const { posts } = props

  const formatNumber = {
    separador: '.', // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear: function (num) {
      num += ''
      let splitStr = num.split('.')
      let splitLeft = splitStr[0]
      let splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : ''
      let regx = /(\d+)(\d{3})/
      while (regx.test(splitLeft)) {
        splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2')
      }
      return this.simbol + splitLeft + splitRight
    },
    new: function (num, simbol) {
      this.simbol = simbol || ''
      return this.formatear(num)
    }
  }

  return (
    <article className='posts'>
      {posts.map(post => (
        <div className='post'>
          <Link href={`/entrada?name=${post.slug}`} prefetch>
            <a className='channel'>
              <img
                src={
                  post._embedded['wp:featuredmedia']
                    ? post._embedded['wp:featuredmedia'][0].source_url
                    : '/static/default.jpg'
                }
                alt={
                  post._embedded['wp:featuredmedia']
                    ? post._embedded['wp:featuredmedia'][0].alt_text
                    : post.title.rendered
                }
              />
            </a>
          </Link>

          <div className='info'>
            <p className='kilo'>
              {post._embedded['wp:term'][3][0]
                ? post._embedded['wp:term'][3][0].name
                : '0'}{' '}
              - {post.recorrido} km
            </p>
            <Link href={`/entrada?name=${post.slug}`} prefetch>
              <a className='title'>
                <h2>{post.title.rendered}</h2>
              </a>
            </Link>
            <p className='price'>${formatNumber.new(post.precio)}</p>
            <aside>
              {post._embedded['wp:term'][6][0]
                ? post._embedded['wp:term'][6][0].name
                : null}
            </aside>
          </div>
        </div>
      ))}
      <style jsx>{`
        .post {
          background-color: #f7f7f7;
          max-width: 225px;
          transition: 0.3s;
        }

        .post:hover {
          box-shadow: 0px 18px 18px 0px rgba(48, 48, 48, 0.3686274509803922);
        }

        .posts {
          display: grid;
          grid-template-columns: repeat(5, minmax(225px, 1fr));
          grid-gap: 0 18px;
        }

        .info {
          padding: 15px 10px 20px;
        }

        p,
        aside {
          color: #7a7a7a;
          margin: 0;
        }

        aside {
          margin-top: 5px;
        }

        .kilo {
          font-size: 14px;
          border-bottom: 1px solid #a5c4d9;
          padding-bottom: 8px;
        }

        a {
          text-decoration: none;
          color: #2e2e2e;
        }

        h2 {
          font-size: 19px;
          line-height: 21px;
          font-weight: 600;
          margin: 15px 0 10px;
        }

        h2:hover {
          opacity: 0.9;
        }

        img {
          max-width: 225px;
          min-height: 225px;
          border-top-left-radius: 2px;
          border-top-right-radius: 2px;
          object-fit: cover;
        }
      `}</style>
    </article>
  )
}

export default MorePosts
