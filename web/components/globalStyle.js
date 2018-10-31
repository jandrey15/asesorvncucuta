// import normalize from './normalize'
import css from 'styled-jsx/css'

export default css`
  @import url('https://fonts.googleapis.com/css?family=Nunito:400,600');

  /*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */
  button,
  hr,
  input {
    overflow: visible;
  }
  progress,
  sub,
  sup {
    vertical-align: baseline;
  }
  [type='checkbox'],
  [type='radio'],
  legend {
    box-sizing: border-box;
    padding: 0;
  }
  html {
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
  }
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  hr {
    box-sizing: content-box;
    height: 0;
  }
  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  a {
    background-color: transparent;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }
  b,
  strong {
    font-weight: bolder;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  img {
    border-style: none;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit;
    font-size: 100%;
    line-height: 1.15;
    margin: 0;
  }
  button,
  select {
    text-transform: none;
  }
  [type='button'],
  [type='reset'],
  [type='submit'],
  button {
    -webkit-appearance: button;
  }
  [type='button']::-moz-focus-inner,
  [type='reset']::-moz-focus-inner,
  [type='submit']::-moz-focus-inner,
  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  [type='button']:-moz-focusring,
  [type='reset']:-moz-focusring,
  [type='submit']:-moz-focusring,
  button:-moz-focusring {
    outline: ButtonText dotted 1px;
  }
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  legend {
    color: inherit;
    display: table;
    max-width: 100%;
    white-space: normal;
  }
  textarea {
    overflow: auto;
  }
  [type='number']::-webkit-inner-spin-button,
  [type='number']::-webkit-outer-spin-button {
    height: auto;
  }
  [type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  [type='search']::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  details {
    display: block;
  }
  summary {
    display: list-item;
  }
  [hidden],
  template {
    display: none;
  }

  body {
    font-family: 'Nunito', system-ui, sans-serif;
    font-size: 16px;
    margin: 0;
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

  .grecaptcha-badge {
    display: none;
  }

  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background: #ef1424;
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
    box-shadow: 0 0 10px #ef1424, 0 0 5px #ef1424;
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
    border-top-color: #ef1424;
    border-left-color: #ef1424;
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

  @media screen and (max-width: 1024px) {
    .text img,
    .text figure img,
    .text .instagram-media,
    .text iframe,
    .text figure {
      width: 100% !important;
      margin: 0 auto;
      height: auto;
      object-fit: none;
    }
  }
`
