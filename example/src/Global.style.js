import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Bg from './assets/img/brick-wall-dark.png';

const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing:border-box;
  }

  body{
    min-height:100vh;
    position: relative;
    background-image:url(${Bg});
    background-repeat:repeat;
    background-color:#d1d9e0;
  }
  #root{
    min-height:100vh;
  }

`;

export default GlobalStyle;
