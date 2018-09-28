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
    min-height: 1805px;
  }
`
