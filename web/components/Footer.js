import Link from 'next/link'

const Footer = props => {
  return (
    <footer>
      <div className='container'>
        <div className='left'>
          <div className='info'>
            <Link href='/'>
              <a className='picture'>
                <img src='/static/logo.png' alt='logo' />
              </a>
            </Link>
            <div className='copy'>
              <p>Copyright © 2018 asesorvncucuta</p>
              <p>Colombia </p>
              <p>Nit: 8769348-123</p>
            </div>
          </div>
          <div className='redes'>
            <div className='menu'>
              <ul className='ulMenu'>
                <li>
                  <a href='/nuevos'>Nuevos</a>
                </li>
                <li>
                  <a href='/usados'>Usados</a>
                </li>
                <li>
                  <a href='/noticias'>Noticias</a>
                </li>
              </ul>
            </div>
            <div className='redes'>
              <ul className='ulRedes'>
                <li className='instagram'>
                  <a href='/instagram'>Instagram</a>
                </li>
                <li className='facebook'>
                  <a href='/facebook'>Facebook</a>
                </li>
                <li className='whatsapp'>
                  <a href='/whatsapp'>Whatsapp</a>
                </li>
                <li className='youtube'>
                  <a href='/youtube'>Youtube</a>
                </li>
              </ul>
            </div>
            <div className='contact'>
              <p className='cont'>Contactenos</p>
              <p>311 6589584</p>
              <p>alvaro@asesorvncucuta.com</p>
            </div>
          </div>
        </div>
        <div className='right'>
          <h3>Suscríbete y recibe las últimas noticias</h3>
          <p>
            Al suscribirse recibirá las últimas noticias y publicaciones de
            carros nuevos y usados.
          </p>
          <form id='newsletter'>
            <input type='email' placeholder='Email' required />
            <button>Suscribirme</button>
          </form>
        </div>
      </div>
      <style jsx>{`
        footer {
          background-color: #3a3a38;
          height: 235px;
          margin-top: 150px;
        }

        .container {
          display: grid;
          grid-template-columns: 755px 1fr;
          grid-template-rows: 1fr;
          height: 100%;
        }

        h3 {
          max-width: 375px;
          font-size: 36px;
          line-height: 38px;
          font-weight: 600;
          margin: 0;
          color: #ffffff;
        }

        form {
          display: flex;
          justify-content: space-between;
        }

        form input {
          max-width: 360px;
          height: 40px;
          border: none;
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
          padding: 0 0 0 15px;
          font-size: 18px;
          font-weight: 600;
          color: #3a3a38;
          outline: none;
          line-height: 0;
          width: 65%;
        }

        form button {
          border: none;
          height: 40px;
          padding: 0;
          margin: 0;
          background-color: #3a3a38;
          width: 35%;
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
          cursor: pointer;
          color: #ffffff;
          transition: 0.3s;
          font-size: 18px;
          font-weight: 600;
        }

        form button:hover {
          color: #4987b6;
        }

        form button:active {
          transform: scale(1.1);
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .left {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          padding: 20px 0 20px 65px;
        }

        .right {
          background-color: #4987b6;
          padding: 10px 30px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }

        .right p {
          width: 346px;
          font-size: 18px;
        }

        .redes {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
        }

        .picture img {
          width: 138px;
        }

        p {
          margin: 5px 0;
          color: #ffffff;
          font-size: 14px;
        }

        .cont {
          text-align: center;
        }

        .redes .ulRedes {
          padding: 0;
          list-style: none;
          margin: 0;
          display: flex;
        }

        .redes .ulRedes li {
          height: 25px;
          margin: 0 3px;
          transition: transform 0.2s;
          width: 30px;
        }

        .redes .ulRedes li:hover {
          transform: scale(0.9);
        }

        .redes ul .instagram {
          background: url('/static/redes.svg') no-repeat;
          background-position-x: -8px;
          background-position-y: -6px;
          background-size: 150px;
        }

        .redes ul .facebook {
          background: url('/static/redes.svg') no-repeat;
          background-position-x: -42px;
          background-position-y: -6px;
          background-size: 150px;
        }
        .redes ul .whatsapp {
          background: url('/static/redes.svg') no-repeat;
          background-position-x: -75px;
          background-position-y: -6px;
          background-size: 150px;
        }
        .redes ul .youtube {
          background: url('/static/redes.svg') no-repeat;
          background-position-x: -110px;
          background-position-y: -6px;
          background-size: 150px;
        }

        .redes .ulRedes li a {
          display: block;
          height: 100%;
          text-indent: -9999px;
        }

        .menu .ulMenu {
          padding: 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(3, 70px);
          grid-template-rows: 25px;
          margin: 0;
          align-items: center;
          justify-content: center;
        }

        .menu .ulMenu li {
          border-left: 1px solid #4987b6;
          padding: 4px 5px;
        }

        .menu .ulMenu li:last-child {
          border-right: 1px solid #4987b6;
        }

        .menu .ulMenu li a:hover {
          text-decoration: underline;
        }

        a {
          text-decoration: none;
          color: #ffffff;
        }
      `}</style>
    </footer>
  )
}

export default Footer
