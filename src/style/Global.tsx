import { createGlobalStyle } from 'styled-components'
import { PancakeTheme } from '@pancakeswap/uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
/*   @font-face {
    font-family: 'FZXS';
    src: url('/fonts/FZXS24.ttf');
    font-style: normal;
  } */
  * {
    font-family: YaHei,HYHeiFang,sans-serif;
  }
  /*  body {
    background: url("/images/raid/swap/bj.png");
    background-size: 100% 100%;
    background-repeat:no-repeat;
    img {
      height: auto;
      max-width: 100%;
    }
  }*/

  
 
    .bg-primary {
      background-color: black !important;
    }
    .text-primary {
      color: black !important;
    }
 


  @media screen and (max-width:968px) {
    /*body {
      background: url("/images/raid/swap/mobg.png");
      background-size: 100% 100%;
      background-repeat:no-repeat;
      img {
        height: auto;
        max-width: 100%;
      }
    }*/
    .cAVJGw{
      margin-top:  5px!important;     
    }
  }
`

export default GlobalStyle
