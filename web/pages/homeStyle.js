import css from 'styled-jsx/css'

export default css`
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
    color: #4c4c4c;
  }

  .dondeEstoy span {
    color: #4c4c4c;
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
    position: relative;
  }

  hr {
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #cccccc;
    margin: 0 auto;
    border: none;
    top: 18px;
    left: 0;
    right: 0;
    z-index: -1;
    max-width: 80%;
  }
  #postsNews h3,
  #postsUsed h3 {
    margin: 0 auto 40px;
    font-size: 28px;
    font-weight: 600;
    max-width: 550px;
    color: #2d2d2a;
    background-color: #ffffff;
    text-align: center;
    padding: 0 5px;
  }
`
