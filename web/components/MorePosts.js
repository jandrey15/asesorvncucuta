// import Link from 'next/link'
import { Link } from '../routes'
import slug from '../helpers/slug'

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
        <div className='post' key={post.id}>
          <Link
            route='entrada'
            params={{
              name: slug(post.slug)
            }}
            prefetch
          >
            <a className='picture'>
              <img
                src={
                  post._embedded['wp:featuredmedia']
                    ? post._embedded['wp:featuredmedia'][0].media_details.sizes[
                      'thumbnail'
                    ].source_url
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
            <Link
              route='entrada'
              params={{
                name: slug(post.slug)
              }}
              prefetch
            >
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
          color: #4c4c4c;
          margin: 0;
        }

        aside {
          margin-top: 5px;
        }

        .kilo {
          font-size: 14px;
          border-bottom: 1px solid #5b91b2;
          padding-bottom: 8px;
        }

        a {
          text-decoration: none;
          color: #2d2d2a;
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

        @media screen and (max-width: 768px) {
          .posts {
            grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
            justify-items: center;
            grid-gap: 30px 18px;
          }
        }
      `}</style>
    </article>
  )
}

export default MorePosts
