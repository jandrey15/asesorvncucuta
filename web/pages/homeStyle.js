import css from 'styled-jsx/css'

export default css`
  .container {
    margin: 0 auto;
    max-width: 1200px;
  }

  .dondeEstoy {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 40px;
    font-size: 13px;
    box-sizing: border-box;
    color: #505050;
  }

  .dondeEstoy p {
    margin: 0 5px;
  }

  #sectionPrincipal {
    display: grid;
    grid-template-columns: 308px 1fr;
    grid-template-rows: repeat(auto-fill, 360px);
    height: 2300px;
  }

  #postsNews,
  #postsUsed {
    margin: 30px 0;
  }
  #postsNews h3,
  #postsUsed h3 {
    margin: 0 auto 40px;
    font-size: 28px;
    font-weight: 600;
    max-width: 550px;
    color: #303030;
  }
`
