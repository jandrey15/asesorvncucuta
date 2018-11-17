import css from 'styled-jsx/css'

export default css`
  .pauta {
    max-width: 800px;
    height: 150px;
    background-color: #505050;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-transform: uppercase;
    font-size: 25px;
  }

  .pauta300x118 {
    max-width: 300px;
    height: 118px;
    // background: #9a3737;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    text-transform: uppercase;
    font-weight: 600;
    color: #ffffff;
  }

  .link {
    margin: 0 5px;
    text-decoration: none;
    color: #4c4c4c;
  }

  .link:hover {
    text-decoration: underline;
  }

  .text {
    color: #4c4c4c;
  }

  .dondeEstoy {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 40px;
    font-size: 13px;
    box-sizing: border-box;
    color: #4c4c4c;
  }

  .dondeEstoy p {
    margin: 0 5px;
  }

  .dondeEstoy .item {
    display: flex;
  }

  .listado {
    color: #4c4c4c;
    text-decoration: none;
  }

  .listado:hover {
    text-decoration: underline;
  }

  .content {
    display: grid;
    grid-template-columns: 885px 300px;
    grid-gap: 0 15px;
  }

  .info {
    background-color: #f7f7f7;
    padding: 25px 15px;
  }

  h4 {
    font-size: 28px;
    font-weight: 600;
    margin: 60px 0 0;
    color: #2d2d2a;
  }

  .morePosts {
    font-size: 28px;
    font-weight: 600;
    margin: 60px 0 20px;
  }

  .ficha {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 20px 10px;
    max-width: 1128px;
    margin: 50px auto;
  }

  .ficha.exterior,
  .ficha.seguridad,
  .ficha.equipamiento {
    margin: 20px auto;
  }

  .ficha span {
    font-size: 21px;
    font-weght: 600;
    color: #2d2d2a;
  }

  .ficha .item {
    background-color: #f7f7f7;
    height: 70px;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h6 {
    margin: 0 0 5px;
    font-size: 18px;
    font-weight: 400;
    color: #4c4c4c;
  }

  h2 {
    font-size: 36px;
    font-weight: 600;
    margin: 0 0 20px;
    text-align: center;
    color: #2d2d2a;
  }

  h1 {
    font-size: 24px;
    line-height: 26px;
    font-weight: 400;
    margin: 0 0 15px;
    color: #4c4c4c;
  }

  .kilo {
    font-size: 14px;
    font-weight: 400;
    color: #4c4c4c;
    margin: 0 0 15px;
  }

  .financing .logo {
    margin: 0;
    max-width: 60px;
  }

  .financing .logo img {
    width: 100%;
  }

  .financing p {
    font-size: 14px;
    line-height: 16px;
    margin: 10px 0;
    color: #4c4c4c;
    width: 85%;
  }

  .financing {
    display: flex;
    align-items: center;
    margin: 20px 0;
    flex-direction: column;
  }

  .location {
    display: flex;
    align-items: flex-end;
    font-size: 14px;
    margin: 0 0 15px;
  }

  .location .icon {
    background: url('/static/locationGPS.svg') no-repeat;
    height: 25px;
    display: block;
    width: 20px;
  }

  h3 {
    margin: 15px 0 20px;
    font-size: 18px;
    font-weight: 600;
    color: #2d2d2a;
  }

  .seller span,
  .seller p {
    color: #4c4c4c;
  }

  span {
    font-size: 1rem;
    font-weight: 600;
  }

  .seller .name,
  .seller .phone {
    font-size: 0.9rem;
    font-weight: 400;
    margin: 5px 0 20px;
  }

  .info hr {
    border: none;
    height: 1px;
    background: #4887b5;
    margin: 0;
    width: 100%;
  }

  hr {
    border: none;
    height: 1px;
    background: #4887b5;
    margin: 0 auto;
    max-width: 1128px;
  }

  @media screen and (max-width: 1024px) {
    .content {
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      grid-gap: 30px 0;
    }

    .info {
      max-width: 300px;
      justify-self: center;
    }

    .ficha {
      padding: 0 10px;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    .ficha .item {
      max-width: 150px;
    }

    .text {
      margin: 0 10px;
    }

    h4 {
      padding: 0 10px;
    }
  }

  @media screen and (max-width: 380px) {
    .dondeEstoy {
      padding: 20px 0;
      height: auto;
      background-color: #f1f1f1;
      justify-content: center;
    }

    .dondeEstoy span {
      display: none;
    }
  }
`
