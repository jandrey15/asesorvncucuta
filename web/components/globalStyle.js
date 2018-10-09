import normalize from './normalize'
import css from 'styled-jsx/css'

export default css`
  @import url('https://fonts.googleapis.com/css?family=Nunito:400,600');
  ${normalize} body {
    font-family: 'Nunito', system-ui, sans-serif;
    font-size: 16px;
  }

  .container {
    margin: 0 auto;
    max-width: 1200px;
    flex: 1;
    width: 100%;
  }

  #Layout {
    display: flex;
    flex-direction: column;
    margin: 0;
    min-height: 100vh;
  }

  .text img,
  .text figure img,
  .text .instagram-media,
  .text iframe,
  .text figure {
    max-width: 900px;
    margin: 0;
    object-fit: contain;
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background: #ffffff;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
  /* Fancy blur effect */
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #ffffff, 0 0 5px #ffffff;
    opacity: 1;
    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }
  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: block;
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }
  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: #ffffff;
    border-left-color: #ffffff;
    border-radius: 50%;
    -webkit-animation: nprogress-spinner 400ms linear infinite;
    animation: nprogress-spinner 400ms linear infinite;
  }
  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }
  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
