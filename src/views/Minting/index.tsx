/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
import { useWeb3React } from '@web3-react/core'
import Page from 'components/Layout/Page'
import tokens from 'config/constants/tokens'
import { useTranslation } from 'contexts/Localization'
import { ethers } from 'ethers'
import useToast from 'hooks/useToast'
import useTokenBalance from 'hooks/useTokenBalance'
import { Constants } from 'hooks/WolfConfig'
import React, { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { formatUnits } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'

import { getContractHandler } from 'hooks/ethereum'
import { ToastDescriptionWithTx } from 'components/Toast'
import Bigg from 'bignumber.js'
/* import { useMint } from './hooks/useMint' */
const MintStyle = createGlobalStyle`
  
 


  
/*   
  @-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
}
.mint_imgs{
    -webkit-transform: rotate(360deg);
    animation: rotation 10s linear infinite;
    -moz-animation: rotation 10s linear infinite;
    -webkit-animation: rotation 10s linear infinite;
    -o-animation: rotation 10s linear infinite;
}
.mint_imgs{border-radius: 250px;} */

@media screen and (min-width:968px) {
      .g-container {
        position:relative;
        width: 600px; 
        height: 50px;

        border:thin ridge black;
        border-radius: 25px; 
        left:23%;
        

      }

      .g-progress { 
        position:relative;
        height: inherit;

        border-radius: 25px 0 0 25px;

        background: #b90a0a;

      }

     .g-span{
      height: 50px;
      width: 160px;
      border-style: solid;
      position:relative;
      border:thin ridge black; 
      border-style: solid;
      text-align:center; 
      
     }

     .g-span1{
      
      position:relative; 
      top:10px;
      
     }

     .g-span2{
      
      position:relative; 
      top:10px;
      
     }

   

      .g-left{ 
        top:-50px;
        left:0px; 
        border-radius: 25px 0 0 25px; 
        width:240px!important;
      }
      .g-center{ 
        top:-100px;
        left:240px; 
        width:120px!important;
      }
      .g-right{ 
        top:-150px;
        margin-left:360px;  
        width:240px!important;
        border-radius: 0 25px 25px 0; 
      }


      /* 数据布局 */
      .mint_head{
        position: relative;
        width: 98%;
        top: 50px;
      }
 
      .mint_bg{
        position: relative;
        top: 10px;
        width: 100%;
        float:left;
      }
      .mint_imgs{
        position: relative;
        top: -520px ;
        width: 30%;
        left: 35%;
        float:left;
      }

      .wolf_mint{
        position: relative;
        top: -480px ;
        width: 15%;
        left: 13%;
        float:left;
      }


      
    .wool_mint_wool{
      position: relative;
      top: -105px ;
      width: 24%;
      left: -6%; 
    }
      .wool_mint{
        position: relative;
        top: -100px;
        width: 15%;
        left: -1%;
      }

      .mint_data{
        position: relative;
        top: -383px;
        width: 50px;
        left: 48%;
        back

       }

       .g-span3{
        color:#fff;
        position:relative; 
        top:-12px;
        left:50px;
        font-family:YaHei!important;
       }

       .mintDiv {  
        position: relative;
        width: 97.5%;
        text-align: center;
        top:-30%;
      }

       .c-text{
        position: relative;
       
        width: 100%;
        
       }

       .d-text{
        position: relative;
        left: 23%;
        width: 77%;
        background:url("/images/mint/buy.png") no-repeat;
       } 

       .mint_h1{
        margin: 30px;
        position: relative; 
        color: #673821; 
        font-weight: bolder;
        WebkitTextStroke: 1px #673821;
        left:-28%;
        font-size:130%;
     }

     .mint_buy2{
        position: relative; 
        top:-175px;
        left:48%;
        text-align: center;
        width:194px;
        cursor:pointer;
        -webkit-user-select:none;user-select:none;
     }

     .mint_buy2_span{
      position: relative; 
     
      width:194px;
   }

     .mint_h11{
      top: 30px;
     }
     .mint_h12{
      top: 10px;
     }
     .mint_h13{
      top: -10px;
     }
    
     .mint_h14{
      top: -90px;
      left:  0%!important;
      font-size:180%!important; 
     }
     .mint_input{
      position: relative; 
      top: -110px;
      left: -10.2%;
      text-align: center;
      height:50px;
      width:40px;
      font-size:180%!important;
     }

     

     .mint_h15{
      top: -101px;
      left: -8%;
      font-size:280%;
      cursor:pointer;
      -webkit-user-select:none;user-select:none;
     }

     .mint_h16{
      cursor:pointer;
      top: -102px;
      left: -15%;
      font-size:280%;
      -webkit-user-select:none;user-select:none;
     }

    }


    
/* 手机端 */
@media screen and (max-width:968px) {
    .mint_head{
      background-image:url("/images/mint/phone/bg.png");
         background-repeat: no-repeat; 
         background-size:100% 100%;
         width:100%;
         text-align:center;
         position:relative ;  
     }

    .mint_imgs{
       width:400px;
       margin-top:-80px;
       position:relative ;  
    }

    .mintDiv {  
      position: relative;
      width:100%;
      text-align: center;
      float:left;
      margin-top:20px;
      
    }


    .wolf_mint{
      width:200px; 
      margin-top:-288px;
      position:relative ;  
    }
    .mint_input{
      width:20px;
    }

    .wool_mint_wool{
      display:none;
    }
  
    .g-container {
      position:relative;
      width: 100%; 
      height: 50px; 
      border:thin ridge black;
      border-radius: 25px; 
      left:2%; 
    }

    .g-progress { 
      position:relative;
      height: inherit;

      border-radius: 25px 0 0 25px;

      background: #b90a0a;

    }

    .g-text {
      position:relative;
      margin-top:-50px;
      text-align: center; 
      height:50px!important;
    }

    
    .g-left{ 
        float:left;
        margin-left:5px; 
        height:50px!important;
        border-right-color: black; 
        border-right-style: solid;
        border-right-width: thin;
    }
    .g-text span{ 
      float:left;
        margin-top:6px;
    }
    .g-center{ 
      float:left;
      border-left:#000;
      margin-left:5px;  
      height:50px!important;
      border-right-color: black;
      border-right-style: solid;
      border-right-width: thin;
    }
    .g-right{ 
      float:left;
      margin-left:5px; 
    }

    .c-text {
       width:100%;
       float:left;
       margin-top:10px;
       margin-bottom:10px;
       padding-left:20px;
    }
    .c-text img{
      float:left;
      width:20%;
      margin:2%!important; 
   }

    

    .d-text{
      position: relative;
      width:92%;
      background-image:url("/images/mint/buy.png") ;
      background-repeat: no-repeat; 
      background-size:100% 75px;
      margin-left:auto;
      margin-right:auto;
      float:left;
      left: 5%;
      height:75px!important;

     } 

   
     .mint_buy2_img{
      display:none;
     }

     .d-text-1{
      float:left;
      position: relative;   
      text-align: center; 
      width:35%;
      margin-left:50px;
      margin-top:15px;
     }

     .d-text-2{
      float:left;
      position: relative;   
      text-align: center; 
      width:25%;
      margin-left:25px;
      margin-top:10px;
      left:-40px;
      top:16px;
     }

     .d-text-2 span{
      width:100%;
    }
      
     
    .mint_h1 {
      width:80px;
 }

 


 .mint_buy2{
  width:80px;
  float:right;
  position: relative;   
  text-align: center; 
  cursor:pointer;
  -webkit-user-select:none;user-select:none;
  background-image:url("/images/mint/buy2.png") ;
  background-repeat: no-repeat; 
  background-size:100% 40px;
  padding :10px; 
  padding-left :0px;   
  right:10px;
  bottom:12px;
 }
 .mint_buy2{
     color:#fff;
 }

 .mint_bg{
  display:none;
 }

 .g-span3{
  color:#fff; 
 }

 .mint_data{
    margin-top:-10px;
 }

 .mint_h11{
  width:100%!important;
 }
 .mint_h13{
  width:100%!important;
 }
    
   
}

`

export interface Message {
  address: string
  msg: string
  sig: string
}

export const isWtWoolApprovedTo = async (address: string, to = Constants.Contract.WTAnimal) => {
  const contractss = await getContractHandler('WTWool')

  if (!contractss) return false
  const res = await contractss.allowance(address, to)
  if (res._hex === '0x00') return false

  return true
}

export const approveWtWoolTo = async (to = Constants.Contract.WTanimalPlus) => {
  const contract = await getContractHandler('WTWool')
  if (!contract) return
  const res = await contract.approve(to, ethers.constants.MaxUint256)
  return res
}

export const isWtMilkApprovedTo = async (address: string, to = Constants.Contract.WTanimalPlus) => {
  const contract = await getContractHandler('WTMilk')
  if (!contract) return false
  const res = await contract.allowance(address, to)
  if (res._hex === '0x00') return false

  return true
}

export const approveWtMilkTo = async (to = Constants.Contract.WTAnimal) => {
  const contract = await getContractHandler('WTMilk')
  if (!contract) return
  const res = await contract.approve(to, ethers.constants.MaxUint256)
  return res
}

const Minting = () => {
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const { account } = useWeb3React()

  const { balance: wtWOOL } = useTokenBalance(tokens.wtWOOL.address)
  const { balance: wtMilk } = useTokenBalance(tokens.wtMilk.address)

  const [totalSupply, settotalSupply] = useState(String)
  const [mintPersent, setMintPersent] = useState('0')

  const [buyMessage, setBuyMessage] = useState('BUY')

  const [buyNumber, setBuyNumber] = useState(1)

  const mint = async () => {
    const contract = await getContractHandler('WTAnimal')
    if (!contract) return
    const res = await contract.mintMany(BigNumber.from(buyNumber))
    toastSuccess(`${t('Minting')}!`, <ToastDescriptionWithTx>{t('Minting Success!')}</ToastDescriptionWithTx>)
    return res
  }

  // 获取NFT总量
  const getTotalSupply = async () => {
    const contract = await getContractHandler('WTAnimal')
    console.log('contract', contract)
    const total = await contract.totalSupply()

    const totalResult = formatUnits(total, 0)
    console.log('totalResult', new Bigg(total.toString()).div(500).toString())
    // 输出

    settotalSupply(totalResult)
    setMintPersent(`${new Bigg(total.toString()).div(500).toString()}%`)
  }

  getTotalSupply()

  /*   const { onMint } = useMint() */

  const [pendingTx, setPendingTx] = useState(false)

  const handleMint = async () => {
    // const msg: Message = { address: account, msg:   "22222" , sig:"4444" }
    console.log('wtWOOLwtWOOL', wtWOOL)
    if (wtWOOL.lt(20000 * 10 ** 18)) {
      toastError(`${t('Minting')}!`, <ToastDescriptionWithTx>{t('WTWOOL is not enough!')}</ToastDescriptionWithTx>)
      return false
    }

    if (wtMilk.lt(200000000)) {
      toastError(`${t('Minting')}!`, <ToastDescriptionWithTx>{t('WTWOOL is not enough!')}</ToastDescriptionWithTx>)
      return false
    }

    setPendingTx(true)
    /*  try { */

    const isWtMilkApprovedToAnimal = await isWtMilkApprovedTo(account, Constants.Contract.WTAnimal)

    if (!isWtMilkApprovedToAnimal) await approveWtMilkTo(Constants.Contract.WTAnimal)
    toastSuccess(`${t('Minting')}!`, <ToastDescriptionWithTx>{t('Approved WtMilk To Mint')}</ToastDescriptionWithTx>)

    const isWtWoolApprovedToAnimal = await isWtWoolApprovedTo(account, Constants.Contract.WTanimalPlus)
    if (!isWtWoolApprovedToAnimal) await approveWtWoolTo(Constants.Contract.WTanimalPlus)
    toastSuccess(`${t('Minting')}!`, <ToastDescriptionWithTx>{t('Approved WtWool To Mint')}</ToastDescriptionWithTx>)
    await mint()

    /*  toastSuccess(`${t('Minted')}!`, t('You minted successfully'))
     setPendingTx(false) */
    /*    } catch (e) {
         toastError(t('Canceled'), t('Please try again and confirm the transaction.'))
         setPendingTx(false)
       } */
  }

  return (
    <Page
      style={{
        height: '800px',
      }}
    >
      <MintStyle />
      <div className="mint_head">
        <img className="mint_bg" src="/images/mint/bg.png" alt="home-mint" />
        <img className="mint_imgs" src="/images/mint/bulingbuling.png" alt="bulingbuling" />

        <img className="wolf_mint" src="/images/mint/wolf_mint.png" alt="wolf_mint" />

        <img className="wool_mint_wool" src="/images/mint/wool.png" alt="wool_mint_wool" />

        <div className="mint_data">
          <h1
            style={{
              color: '#8e4216',
            }}
          >
            {' '}
            {t('Mint Animal')}
          </h1>
          <br />
          <span className="g-span3">{totalSupply}</span>
        </div>
      </div>
      <div className="mintDiv">
        <div className="g-container">
          <div
            className="g-progress"
            style={{
              width: mintPersent,
            }}
          />

          <div className="g-text">
            <div className="g-left g-span">
              <span className="g-span1">20000 $WTWOOL</span>
              <br />
              <span className="g-span2">20000 $WTMILK</span>
            </div>
            <div className="g-center g-span">
              <span className="g-span1">40000 $WTWOOL</span>
              <br />
              <span className="g-span2">40000 $WTMILK</span>
            </div>

            <div className="g-right g-span">
              <span className="g-span1">Stop Mint</span> <br />
              <span className="g-span2">Stop Mint</span>
            </div>
          </div>
        </div>
        <div className="c-text">
          <img
            style={{
              margin: '30px',
            }}
            src="/images/mint/wolf.png"
            alt="wool_mint"
          />

          <img
            style={{
              margin: '30px',
            }}
            src="/images/mint/10.png"
            alt="wool_mint"
          />

          <img
            style={{
              margin: '30px',
            }}
            src="/images/mint/sheep.png"
            alt="wool_mint"
          />

          <img
            style={{
              margin: '30px',
            }}
            src="/images/mint/90.png"
            alt="wool_mint"
          />
        </div>

        <div className="d-text">
          <div className="d-text-1">
            <h1 className="mint_h1 mint_h11">
              {40000 * buyNumber} {t(' WOOL')}
            </h1>
            <h1 className="mint_h1 mint_h12"> {t('+')}</h1>
            <h1 className="mint_h1 mint_h13">
              {40000 * buyNumber} {t('  MILK')}
            </h1>
          </div>
          <div className="d-text-2">
            <span
              className="mint_h1 mint_h15"
              onClick={() => {
                if (buyNumber > 1) {
                  setBuyNumber(buyNumber - 1)
                }
              }}
            >
              -{' '}
            </span>

            <input className="mint_input" readOnly value={buyNumber} />

            <span
              className="mint_h1 mint_h16"
              onClick={() => {
                if (buyNumber < 10) {
                  setBuyNumber(buyNumber + 1)
                }
              }}
            >
              {'  '}+
            </span>
          </div>
          <div className="mint_buy2">
            <span className="mint_buy2_span" onClick={handleMint}>
              <img className="mint_buy2_img" src="/images/mint/buy2.png" alt="mint_buy2_img" />

              <h1 className="mint_h1 mint_h14"> {buyMessage}</h1>
            </span>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Minting
