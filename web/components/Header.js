import Link from 'next/link'

export default props => {
  return (
    <header>
      <div className='container'>
        <figure className='logo'>
          <Link href='/'>
            <a className='linkLogo'>
              <img src='/static/logo.png' alt='asesorvncucuta' />
            </a>
          </Link>
        </figure>

        <div className='search'>
          <form className='formHeader'>
            <input type='text' placeholder='Mazda' />
            <button className='btnSearch'>
              <i className='icon' />
            </button>
          </form>
        </div>

        <div className='menu'>
          <ul>
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
          <ul>
            <li>
              <a href='/instagram'>Instagram</a>
            </li>
            <li>
              <a href='/facebook'>Facebook</a>
            </li>
            <li>
              <a href='/whatsapp'>Whatsapp</a>
            </li>
            <li>
              <a href='/youtube'>Youtube</a>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        header {
          color: #fff;
          background: #3499cd;
          height: 50px;
        }
        header a {
          color: #fff;
          text-decoration: none;
        }

        .container {
          display: grid;
          margin: 0 auto;
          grid-template-columns: 270px 500px 220px 160px;
          grid-template-rows: 50px;
          max-width: 1200px;
        }

        .logo {
          margin: 0;
          grid-column: 1 / 2;
          justify-self: center;
          align-self: center;
          height: 38px;
          width: 130px;
        }

        .logo .linkLogo {
          display: block;
        }

        .logo img {
          width: 100%;
        }

        .search {
          grid-column: 2/3;
          align-self: center;
          height: 35px;
          width: 400px;
        }

        .search .formHeader {
          height: 100%;
          display: flex;
          position: relative;
        }

        .search .formHeader input {
          padding: 0;
          border: none;
          padding-left: 5px;
          box-sizing: border-box;
          border-radius: 2px;
          width: 100%;
        }

        .search .formHeader button {
          border: none;
          padding: 0;
          border-radius: 2px;
          border-left: 1px solid #707070;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          background-color: #dbdbdb;
          position: absolute;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          height: 35px;
          width: 38px;
        }

        .search .formHeader button .icon {
          background: url('/static/search.svg');
          background-size: 100%;
          display: block;
          height: 23px;
          width: 23px;
        }

        .menu {
          grid-column: 3/4;
          align-self: center;
        }

        .menu ul {
          padding: 0;
          list-style: none;
          display: grid;
          grid-template-columns: repeat(3, 70px);
          grid-template-rows: 25px;
          margin: 0;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </header>
  )
}
