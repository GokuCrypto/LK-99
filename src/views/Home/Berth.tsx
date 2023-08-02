/* eslint-disable jsx-a11y/anchor-is-valid */
import { useWeb3React } from '@web3-react/core'
import Page, { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

import { Button, useMatchBreakpoints } from '@pancakeswap/uikit'

const MintStyle = styled.div<{ isMobile: boolean }>`
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;700&display=swap');
  *:not(:empty) {
    transform-style: preserve-3d;
  }

  .scene {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: ${({ isMobile }) => (isMobile ? '210px' : '90px')};
    transform: rotateY(-90deg);
    -webkit-animation: rotateScene 36s infinite linear;
    animation: rotateScene 36s infinite linear;
  }
  @-webkit-keyframes rotateScene {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(-360deg);
    }
  }
  @keyframes rotateScene {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(-360deg);
    }
  }

  .globe {
    -webkit-animation: rotateGlobe 36s infinite linear;
    animation: rotateGlobe 36s infinite linear;
  }
  @-webkit-keyframes rotateGlobe {
    from {
      transform: translateY(20px) rotateZ(30deg) rotateY(0deg);
    }
    to {
      transform: translateY(20px) rotateZ(30deg) rotateY(1440deg);
    }
  }
  @keyframes rotateGlobe {
    from {
      transform: translateY(20px) rotateZ(30deg) rotateY(0deg);
    }
    to {
      transform: translateY(20px) rotateZ(30deg) rotateY(1440deg);
    }
  }

  .ring > div {
    position: absolute;
    width: 50px;
    height: 25px;
    transform: translate(-50%, -50%) rotateY(var(--ry, 0deg)) rotateX(var(--rx, 0deg)) translateZ(120px);
    -webkit-clip-path: var(--cp);
    clip-path: var(--cp);
    background-image: url('https://assets.codepen.io/1948355/world01.png');
    background-position: var(--bpx, 0) var(--bpy, 0);
  }
  .ring > div:nth-child(1) {
    --ry: 0deg;
    -webkit-animation-delay: -2.25s;
    animation-delay: -2.25s;
    --bpx: 0%;
  }
  .ring > div:nth-child(2) {
    --ry: 22.5deg;
    -webkit-animation-delay: -2.8125s;
    animation-delay: -2.8125s;
    --bpx: 6.25%;
  }
  .ring > div:nth-child(3) {
    --ry: 45deg;
    -webkit-animation-delay: -3.375s;
    animation-delay: -3.375s;
    --bpx: 12.5%;
  }
  .ring > div:nth-child(4) {
    --ry: 67.5deg;
    -webkit-animation-delay: -3.9375s;
    animation-delay: -3.9375s;
    --bpx: 18.75%;
  }
  .ring > div:nth-child(5) {
    --ry: 90deg;
    -webkit-animation-delay: -4.5s;
    animation-delay: -4.5s;
    --bpx: 25%;
  }
  .ring > div:nth-child(6) {
    --ry: 112.5deg;
    -webkit-animation-delay: -5.0625s;
    animation-delay: -5.0625s;
    --bpx: 31.25%;
  }
  .ring > div:nth-child(7) {
    --ry: 135deg;
    -webkit-animation-delay: -5.625s;
    animation-delay: -5.625s;
    --bpx: 37.5%;
  }
  .ring > div:nth-child(8) {
    --ry: 157.5deg;
    -webkit-animation-delay: -6.1875s;
    animation-delay: -6.1875s;
    --bpx: 43.75%;
  }
  .ring > div:nth-child(9) {
    --ry: 180deg;
    -webkit-animation-delay: -6.75s;
    animation-delay: -6.75s;
    --bpx: 50%;
  }
  .ring > div:nth-child(10) {
    --ry: 202.5deg;
    -webkit-animation-delay: -7.3125s;
    animation-delay: -7.3125s;
    --bpx: 56.25%;
  }
  .ring > div:nth-child(11) {
    --ry: 225deg;
    -webkit-animation-delay: -7.875s;
    animation-delay: -7.875s;
    --bpx: 62.5%;
  }
  .ring > div:nth-child(12) {
    --ry: 247.5deg;
    -webkit-animation-delay: -8.4375s;
    animation-delay: -8.4375s;
    --bpx: 68.75%;
  }
  .ring > div:nth-child(13) {
    --ry: 270deg;
    -webkit-animation-delay: -9s;
    animation-delay: -9s;
    --bpx: 75%;
  }
  .ring > div:nth-child(14) {
    --ry: 292.5deg;
    -webkit-animation-delay: -9.5625s;
    animation-delay: -9.5625s;
    --bpx: 81.25%;
  }
  .ring > div:nth-child(15) {
    --ry: 315deg;
    -webkit-animation-delay: -10.125s;
    animation-delay: -10.125s;
    --bpx: 87.5%;
  }
  .ring > div:nth-child(16) {
    --ry: 337.5deg;
    -webkit-animation-delay: -10.6875s;
    animation-delay: -10.6875s;
    --bpx: 93.75%;
  }
  .ring:nth-child(1) {
    --cp: polygon(20.2500828287px 0, 29.7499171713px 0, 25px 100%, 25px 100%);
    --rx: -84.375deg;
    --bi: linear-gradient(hsla(0, 0%, 6.25%, 0.46875), hsla(0, 0%, 0%, 0.5));
    --bpy: 100%;
  }
  .ring:nth-child(2) {
    --cp: polygon(15.6827023105px 0, 34.3172976895px 0, 29.7499171713px 100%, 20.2500828287px 100%);
    --rx: -73.125deg;
    --bi: linear-gradient(hsla(0, 0%, 12.5%, 0.4375), hsla(0, 0%, 6.25%, 0.46875));
    --bpy: 93.75%;
  }
  .ring:nth-child(3) {
    --cp: polygon(11.4733803173px 0, 38.5266196827px 0, 34.3172976895px 100%, 15.6827023105px 100%);
    --rx: -61.875deg;
    --bi: linear-gradient(hsla(0, 0%, 18.75%, 0.40625), hsla(0, 0%, 12.5%, 0.4375));
    --bpy: 87.5%;
  }
  .ring:nth-child(4) {
    --cp: polygon(7.7838787327px 0, 42.2161212673px 0, 38.5266196827px 100%, 11.4733803173px 100%);
    --rx: -50.625deg;
    --bi: linear-gradient(hsla(0, 0%, 25%, 0.375), hsla(0, 0%, 18.75%, 0.40625));
    --bpy: 81.25%;
  }
  .ring:nth-child(5) {
    --cp: polygon(4.7559830335px 0, 45.2440169665px 0, 42.2161212673px 100%, 7.7838787327px 100%);
    --rx: -39.375deg;
    --bi: linear-gradient(hsla(0, 0%, 31.25%, 0.34375), hsla(0, 0%, 25%, 0.375));
    --bpy: 75%;
  }
  .ring:nth-child(6) {
    --cp: polygon(2.5060535534px 0, 47.4939464466px 0, 45.2440169665px 100%, 4.7559830335px 100%);
    --rx: -28.125deg;
    --bi: linear-gradient(hsla(0, 0%, 37.5%, 0.3125), hsla(0, 0%, 31.25%, 0.34375));
    --bpy: 68.75%;
  }
  .ring:nth-child(7) {
    --cp: polygon(1.1205538204px 0, 48.8794461796px 0, 47.4939464466px 100%, 2.5060535534px 100%);
    --rx: -16.875deg;
    --bi: linear-gradient(hsla(0, 0%, 43.75%, 0.28125), hsla(0, 0%, 37.5%, 0.3125));
    --bpy: 62.5%;
  }
  .ring:nth-child(8) {
    --cp: polygon(0.6527278124px 0, 49.3472721876px 0, 48.8794461796px 100%, 1.1205538204px 100%);
    --rx: -5.625deg;
    --bi: linear-gradient(hsla(0, 0%, 50%, 0.25), hsla(0, 0%, 43.75%, 0.28125));
    --bpy: 56.25%;
  }
  .ring:nth-child(9) {
    --cp: polygon(1.1205538204px 0, 48.8794461796px 0, 49.3472721876px 100%, 0.6527278124px 100%);
    --rx: 5.625deg;
    --bi: linear-gradient(hsla(0, 0%, 56.25%, 0.21875), hsla(0, 0%, 50%, 0.25));
    --bpy: 50%;
  }
  .ring:nth-child(10) {
    --cp: polygon(2.5060535534px 0, 47.4939464466px 0, 48.8794461796px 100%, 1.1205538204px 100%);
    --rx: 16.875deg;
    --bi: linear-gradient(hsla(0, 0%, 62.5%, 0.1875), hsla(0, 0%, 56.25%, 0.21875));
    --bpy: 43.75%;
  }
  .ring:nth-child(11) {
    --cp: polygon(4.7559830335px 0, 45.2440169665px 0, 47.4939464466px 100%, 2.5060535534px 100%);
    --rx: 28.125deg;
    --bi: linear-gradient(hsla(0, 0%, 68.75%, 0.15625), hsla(0, 0%, 62.5%, 0.1875));
    --bpy: 37.5%;
  }
  .ring:nth-child(12) {
    --cp: polygon(7.7838787327px 0, 42.2161212673px 0, 45.2440169665px 100%, 4.7559830335px 100%);
    --rx: 39.375deg;
    --bi: linear-gradient(hsla(0, 0%, 75%, 0.125), hsla(0, 0%, 68.75%, 0.15625));
    --bpy: 31.25%;
  }
  .ring:nth-child(13) {
    --cp: polygon(11.4733803173px 0, 38.5266196827px 0, 42.2161212673px 100%, 7.7838787327px 100%);
    --rx: 50.625deg;
    --bi: linear-gradient(hsla(0, 0%, 81.25%, 0.09375), hsla(0, 0%, 75%, 0.125));
    --bpy: 25%;
  }
  .ring:nth-child(14) {
    --cp: polygon(15.6827023105px 0, 34.3172976895px 0, 38.5266196827px 100%, 11.4733803173px 100%);
    --rx: 61.875deg;
    --bi: linear-gradient(hsla(0, 0%, 87.5%, 0.0625), hsla(0, 0%, 81.25%, 0.09375));
    --bpy: 18.75%;
  }
  .ring:nth-child(15) {
    --cp: polygon(20.2500828287px 0, 29.7499171713px 0, 34.3172976895px 100%, 15.6827023105px 100%);
    --rx: 73.125deg;
    --bi: linear-gradient(hsla(0, 0%, 93.75%, 0.03125), hsla(0, 0%, 87.5%, 0.0625));
    --bpy: 12.5%;
  }
  .ring:nth-child(16) {
    --cp: polygon(25px 0, 25px 0, 29.7499171713px 100%, 20.2500828287px 100%);
    --rx: 84.375deg;
    --bi: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 93.75%, 0.03125));
    --bpy: 6.25%;
  }

  .text {
    position: absolute;
    top: 24px;
  }
  .text > div {
    position: absolute;
    width: 56px;
    height: 60px;
    transform: translate(-50%, -50%) rotateY(var(--ry, 0deg)) translateZ(140px);
    overflow: hidden;
    border-bottom: 2px solid;
  }
  .text > div::after {
    content: 'RENMINE RENMINE';
    position: absolute;
    top: 10px;
    font-size: 50px;
    font-weight: 300;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
  }
  .text > div:nth-child(1) {
    --ry: 0deg;
  }
  .text > div:nth-child(1)::after {
    left: 32px;
  }
  .text > div:nth-child(2) {
    --ry: 22.5deg;
  }
  .text > div:nth-child(2)::after {
    left: -24px;
  }
  .text > div:nth-child(3) {
    --ry: 45deg;
  }
  .text > div:nth-child(3)::after {
    left: -80px;
  }
  .text > div:nth-child(4) {
    --ry: 67.5deg;
  }
  .text > div:nth-child(4)::after {
    left: -136px;
  }
  .text > div:nth-child(5) {
    --ry: 90deg;
  }
  .text > div:nth-child(5)::after {
    left: -192px;
  }
  .text > div:nth-child(6) {
    --ry: 112.5deg;
  }
  .text > div:nth-child(6)::after {
    left: -248px;
  }
  .text > div:nth-child(7) {
    --ry: 135deg;
  }
  .text > div:nth-child(7)::after {
    left: -304px;
  }
  .text > div:nth-child(8) {
    --ry: 157.5deg;
  }
  .text > div:nth-child(8)::after {
    left: -360px;
  }
  .text > div:nth-child(9) {
    --ry: 180deg;
  }
  .text > div:nth-child(9)::after {
    left: 32px;
  }
  .text > div:nth-child(10) {
    --ry: 202.5deg;
  }
  .text > div:nth-child(10)::after {
    left: -24px;
  }
  .text > div:nth-child(11) {
    --ry: 225deg;
  }
  .text > div:nth-child(11)::after {
    left: -80px;
  }
  .text > div:nth-child(12) {
    --ry: 247.5deg;
  }
  .text > div:nth-child(12)::after {
    left: -136px;
  }
  .text > div:nth-child(13) {
    --ry: 270deg;
  }
  .text > div:nth-child(13)::after {
    left: -192px;
  }
  .text > div:nth-child(14) {
    --ry: 292.5deg;
  }
  .text > div:nth-child(14)::after {
    left: -248px;
  }
  .text > div:nth-child(15) {
    --ry: 315deg;
  }
  .text > div:nth-child(15)::after {
    left: -304px;
  }
  .text > div:nth-child(16) {
    --ry: 337.5deg;
  }
  .text > div:nth-child(16)::after {
    left: -360px;
  }

  .textBlack {
    position: absolute;
    top: 32px;
  }
  .textBlack > div {
    position: absolute;
    width: 49px;
    height: 60px;
    transform: translate(-50%, -50%) rotateY(var(--ry, 0deg)) translateZ(123px);
    overflow: hidden;
  }
  .textBlack > div::after {
    content: 'RENMINE RENMINE';
    position: absolute;
    top: 10px;
    color: #0000;
    font-size: 50px;
    font-weight: 700;
    width: -webkit-max-content;
    width: -moz-max-content;
    width: max-content;
    transform: scaleX(79%);
    transform-origin: left;
    text-shadow: 0 0 10px #000a;
  }
  .textBlack > div:nth-child(1) {
    --ry: 0deg;
  }
  .textBlack > div:nth-child(1)::after {
    left: 32px;
  }
  .textBlack > div:nth-child(2) {
    --ry: 22.5deg;
  }
  .textBlack > div:nth-child(2)::after {
    left: -17px;
  }
  .textBlack > div:nth-child(3) {
    --ry: 45deg;
  }
  .textBlack > div:nth-child(3)::after {
    left: -66px;
  }
  .textBlack > div:nth-child(4) {
    --ry: 67.5deg;
  }
  .textBlack > div:nth-child(4)::after {
    left: -115px;
  }
  .textBlack > div:nth-child(5) {
    --ry: 90deg;
  }
  .textBlack > div:nth-child(5)::after {
    left: -164px;
  }
  .textBlack > div:nth-child(6) {
    --ry: 112.5deg;
  }
  .textBlack > div:nth-child(6)::after {
    left: -213px;
  }
  .textBlack > div:nth-child(7) {
    --ry: 135deg;
  }
  .textBlack > div:nth-child(7)::after {
    left: -262px;
  }
  .textBlack > div:nth-child(8) {
    --ry: 157.5deg;
  }
  .textBlack > div:nth-child(8)::after {
    left: -311px;
  }
  .textBlack > div:nth-child(9) {
    --ry: 180deg;
  }
  .textBlack > div:nth-child(9)::after {
    left: 32px;
  }
  .textBlack > div:nth-child(10) {
    --ry: 202.5deg;
  }
  .textBlack > div:nth-child(10)::after {
    left: -17px;
  }
  .textBlack > div:nth-child(11) {
    --ry: 225deg;
  }
  .textBlack > div:nth-child(11)::after {
    left: -66px;
  }
  .textBlack > div:nth-child(12) {
    --ry: 247.5deg;
  }
  .textBlack > div:nth-child(12)::after {
    left: -115px;
  }
  .textBlack > div:nth-child(13) {
    --ry: 270deg;
  }
  .textBlack > div:nth-child(13)::after {
    left: -164px;
  }
  .textBlack > div:nth-child(14) {
    --ry: 292.5deg;
  }
  .textBlack > div:nth-child(14)::after {
    left: -213px;
  }
  .textBlack > div:nth-child(15) {
    --ry: 315deg;
  }
  .textBlack > div:nth-child(15)::after {
    left: -262px;
  }
  .textBlack > div:nth-child(16) {
    --ry: 337.5deg;
  }
  .textBlack > div:nth-child(16)::after {
    left: -311px;
  }
`
const erth: React.FC = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()
  return (
    <>
      <MintStyle isMobile={isMobile}>
        <div className="scene">
          <div className="globe">
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <div className="text">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className="textBlack">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </MintStyle>
    </>
  )
}

export default erth
