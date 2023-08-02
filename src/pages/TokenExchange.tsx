/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { createGlobalStyle } from 'styled-components'
import numeral from 'numeral'
import React, { useState } from 'react'

import { Block } from 'state/info/types'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { Constants } from 'hooks/WolfConfig'
import { getContractHandler } from 'hooks/ethereum'
import { ethers } from 'ethers'
import useTokenBalance from 'hooks/useTokenBalance'

import { BigNumber } from '@ethersproject/bignumber'
import { count } from 'console'

import {
  Modal,
  Box,
  Button,
  Flex,
  InjectedModalProps,
  LinkExternal,
  Message,
  Skeleton,
  Text,
  useModal,
  ButtonMenu,
  ButtonMenuItem,
  Tag,
  CardBody,
  CardFooter,
  Card,
  Input,
  Dropdown,
  Image,
} from '@pancakeswap/uikit'

const IdoStyle = createGlobalStyle`
@media screen and (min-width:968px) {
.mas{
  background:url('/images/godz/ido.png');
  background-size:100% 100%;
  min-width:60%; 
  max-width:60%; 
  min-height:100%;
  margin-left:15%;
  
}

.mas_h{
  padding-top:7%;
}
.mas_h h1{
  color:#FFF;
  font-size:30px;
}

.mas_head2{
  width:100%;
  margin-left:22%;
  margin-top:8%;
}
 
.mas_head2 img{
  width:10%;
  float:left;
}
.mas_head2 div{ 
  float:left;
}

.mas_head2 div h1{ 
  color:#706c63;
  margin-top:8px;
  margin-left:20px;
}

.mas_head2_h1{
  font-size:20px;
}

.mas_head2_h2{
      font-size:30px;
}

.mas_head3{
   width:80%;
   margin-left:10%; 
   margin-top:28%;
  /*  overflow-y:scroll;
   max-height:156px;  */
}


 

 
.mas_head3_h1{ 
  padding:15px;
  width:100%;
  text-align:left;
}
 
.mas_head3_h2{ 
  padding:15px;
  width:100%;
  text-align:center;
}

 
.mas_head3_h3{ 
  padding:15px;
  width:100%;
  text-align:right;
}

.mas_head5{
   width:100%;
   margin-top:20px;
   text-align:center;
}



.buy_btn{
  cursor:pointer;
 
  min-height:50px;
  min-width:120px;
  max-width:120px;
  padding:16px;
  margin-left:40%;
  float:left;
  
}
 
.lin_btn{
  cursor:pointer; 
  min-height:50px;
  min-width:120px;
  max-width:120px;
  padding:16px;
  float:left;
  margin-left:60%;
  margin-top:-50px;
}

.mas_head4{
  width:100%;
  margin-top:120px; 
  margin-left:20%;
  background: ${({ theme }) => theme.colors.textSubtle};
  background-size:100% 100%;
  
  color:#fff;
}


.mas_head4_1{
  width:80%;  
  margin-top:10px;
  margin-left:-10%;
}

.mas_head4_1_left{
  text-align:left;
  float:left;
  width:49%;
  margin-top:10px;
}

 

.mas_head4_1_right{
  float:right;
  width:49%;
  text-align:right;
  margin-top:10px;
}


.mas_head6{
  width:100%;
  margin-top:10px;
  margin-bottom:10px;
  text-align:right;
  min-width:100%;
  float:left;
}


.mas_head6_left{
  width:20%;
  margin-top:10px;
  text-align:center;
  min-width:20%;
  float:left;
  margin-left:20%;
}



.mas_head6_right{
  width:25%; 
 
  text-align:center;
  min-width:25%;
  float:left;
  margin-left:15%;
}


.IDO_input{
  width:30%;
  float:left;
}

.IDO_h1_mint_h15 {  
  cursor:pointer;  
  margin-right: 5px;   
  margin-top: 3px; 
  flex-shrink: 0;    
  width: 32px;    
  height: 15px;
  border-radius: 8px;    
  background: #f85151;
  float:left;
}

.IDO_h1_mint_h16 {  
  cursor:pointer;
  margin-left: 5px;      
  margin-top: 3px; 
  flex-shrink: 0;    
  width: 32px;    
  height: 15px;
  border-radius: 8px;    
  background: #28b131;
  float:left;
  
}

.IDO_h1_mint_h17 {  
  cursor:pointer;
  margin-left: 5px;      
  margin-top: 3px; 
  flex-shrink: 0;    
  width: 100%;    
  height: 30px;
  border-radius: 8px;    
  background: #c58d46;
  float:left;
  padding-top:8px;
  
}
}


@media screen and (max-width:968px) {
  .mas{
    background:url('/images/godz/ido.png');
    background-size:100% 100%;
    min-width:100%; 
    max-width:100%; 
    min-height:100%;
    margin-left:1%;
    
  }
  
  .mas_h{
    padding-top:7%;
  }
  .mas_h h1{
    color:#FFF;
    font-size:30px;
  }
  
  .mas_head2{
    width:100%;
    margin-left:10%;
    margin-top:70px;
  }
   
  .mas_head2 img{
    width:15%;
    float:left;
  }
  .mas_head2 div{ 
    float:left;
  }
  
  .mas_head2 div h1{ 
    color:#706c63;
    margin-top:8px;
    margin-left:20px;
  }
  
  .mas_head2_h1{
    font-size:15px;
  }
  
  .mas_head2_h2{
        font-size:20px;
  }
  
  .mas_head3{
     width:95%;
     margin:2%; 
     margin-top:140px;  
  
  }
  
  
 
  
   
  .mas_head3_h1{ 
    padding:15px;
    width:100%;
    text-align:left;
  }
   
  .mas_head3_h2{ 
    padding:15px;
    width:100%;
    text-align:center;
  }
  
   
  .mas_head3_h3{ 
    padding:15px;
    width:100%;
    text-align:right;
  }
  
  .mas_head5{
     width:100%;
     margin-top:20px;
     text-align:center;
  }
  
  
  
  .buy_btn{
    cursor:pointer;
  
    min-height:50px;
    min-width:120px;
    max-width:120px;
    padding:16px;
    margin-left:35%;
    float:left;
    
  }
   
  .lin_btn{
    cursor:pointer; 
    min-height:50px;
    min-width:120px;
    max-width:120px;
    padding:16px;
    float:right;
    margin-right:8%;
  
  }
  
  .mas_head4{
    width:95%;
    margin-top:120px; 
    margin-left:2.5%;
    background: #c4bde2;
    background-size:100% 100%;
    padding:10px;
    max-height:320px;
    min-height:320px;
    border-radius: 10px 10px 10px 10px;
    color:#fff;
  }
  
  
  .mas_head4_1{
    width:100%;  
    margin-top:10px;
    max-height:35px;
    min-height:35px;
  }
  
  .mas_head4_1_left{
    text-align:left;
    float:left;
    width:55%;
    margin-top:10px;
  }
  
   
  
  .mas_head4_1_right{
    float:right;
    width:45%;
    text-align:right;
    margin-top:10px; color:#fff;
  }
  
  
  .mas_head6{
    width:100%;
    margin-top:10px;
    margin-bottom:10px;
    text-align:right;
    min-width:100%;
    float:left; color:#fff;
  }
  
  
  .mas_head6_left{
    width:40%;
    margin-top:10px;
    text-align:center;
    min-width:20%;
    float:left;
    margin-left:8%;
  }
  
  
  
  .mas_head6_right{
    width:40%;  
    text-align:center;
    min-width:25%;
    float:right;
    margin-right:8%;
    font-size:10px;
  }
  
  
  .IDO_input{
    width:30%;
    float:left;
  }
  
  .IDO_h1_mint_h15 {  
    cursor:pointer;  
    margin-right: 5px;   
    margin-top: 3px; 
    flex-shrink: 0;    
    width: 32px;    
    height: 15px;
    border-radius: 8px;    
    background: #f85151;
    float:left;
  }
  
  .IDO_h1_mint_h16 {  
    cursor:pointer;
    margin-left: 5px;      
    margin-top: 3px; 
    flex-shrink: 0;    
    width: 32px;    
    height: 15px;
    border-radius: 8px;    
    background: #28b131;
    float:left;
    
  }
  
  .IDO_h1_mint_h17 {  
    cursor:pointer;
    margin-left: 5px;      
    margin-top: 3px; 
    flex-shrink: 0;    
    width: 100%;    
    height: 30px;
    border-radius: 8px;    
    background: #c58d46;
    float:left;
    padding-top:8px;
    
  }
  }

}
 

`

export interface Message {
  address: string
  msg: string
  sig: string
}

const Ido = () => {
  const { t } = useTranslation()
  const [onSale, setOnSale] = useState(60000000)
  const { toastSuccess, toastError } = useToast()
  const [buyNumber, setBuyNumber] = useState(100)
  const { balance: BUSD } = useTokenBalance(Constants.Contract.BUSD)
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const [approveOrBuy, setApproveOrBuy] = useState('Approve')
  const [buyLimit, setBuyLimit] = useState(60000000)
  const [myBuy, setMyBuy] = useState(0)
  const [lastBlock, setLastBlock] = useState(0)
  const [buyed, setBuyed] = useState(0)

  const approveGODZTo = async (to = Constants.Contract.DONATE) => {
    const contract = await getContractHandler('GODZ')
    if (!contract) return
    const res = await contract.approve(to, ethers.constants.MaxUint256)
    // eslint-disable-next-line consistent-return
    return res
  }

  const isGODZApprovedTo = async (address: string, to = Constants.Contract.DONATE) => {
    const contractss = await getContractHandler('GODZ')

    if (!contractss) return false
    const res = await contractss.allowance(address, to)
    console.log('resresres', res)
    if (res._hex === '0x00') return false
    setApproveOrBuy('Exchange')
    return true
  }

  // eslint-disable-next-line consistent-return
  const idobuy = async () => {
    // const msg: Message = { address: account, msg:   "22222" , sig:"4444" }
    console.log('Ido', BUSD)
    /* if (BUSD.lt(buyNumber * 10 ** 18)) {
      toastError(`${t('TokenExchange')}!`, <ToastDescriptionWithTx>{t('BUSD is not enough!')}</ToastDescriptionWithTx>)
      return false
    } */

    setPendingTx(true)

    const isGODZApprovedToDonate = await isGODZApprovedTo(account, Constants.Contract.DONATE)
    console.log('isGODZApprovedToDonate', account, '--', isGODZApprovedToDonate)
    if (!isGODZApprovedToDonate) await approveGODZTo(Constants.Contract.DONATE)
    toastSuccess(
      `${t('TokenExchange')}!`,
      <ToastDescriptionWithTx>{t('Approved Godz To Exchange')}</ToastDescriptionWithTx>,
    )

    await donate()
  }

  const donate = async () => {
    const contract = await getContractHandler('DONATE')
    if (!contract) return
    const res = await contract.donate()
    toastSuccess(`${t('TokenExchange')}!`, <ToastDescriptionWithTx>{t('Exchange Success!')}</ToastDescriptionWithTx>)
    limit()
    myBuyed()
    // eslint-disable-next-line consistent-return
    return res
  }

  /* 查询剩余额度 */
  const limit = async () => {
    const contractss = await getContractHandler('DONATE')

    if (!contractss) return false
    const perLimit = await contractss.maxDropNumber()

    if (perLimit != null && !perLimit.eq(0)) {
      setBuyLimit(
        perLimit
          .div(10 ** 9)
          .div(10 ** 9)
          .toNumber(),
      )
    }

    // eslint-disable-next-line consistent-return
  }

  /* 我的购买 */
  const myBuyed = async () => {
    const contractss = await getContractHandler('DONATE')

    if (!contractss) return false
    if (!account) return false
    const mygo = await contractss.getUserDropNumber(account)

    if (mygo != null && !mygo.eq(0)) {
      setMyBuy(
        mygo
          .div(10 ** 9)
          .div(10 ** 9)
          .toNumber(),
      )
    }

    // eslint-disable-next-line consistent-return
  }

  const dona = async () => {
    if (buyed <= 0) {
      toastError(`${t('IDO')}!`, <ToastDescriptionWithTx>{t('Please buy first!')}</ToastDescriptionWithTx>)
    }

    const contract = await getContractHandler('DONATE')
    if (!contract) return
    const res = await contract.obtain()
    toastSuccess(`${t('IDO')}!`, <ToastDescriptionWithTx>{t('Receive  Success!')}</ToastDescriptionWithTx>)
    // eslint-disable-next-line consistent-return
    return res
  }

  const getNumber = async () => {
    const contract = await getContractHandler('DONATE')

    if (!account) return

    if (!contract) return

    const res = await contract.getnumber(account)

    setBuyed(
      BigNumber.from(res)
        .div(10 ** 9)
        .div(10 ** 9)
        .toNumber(),
    )
    // eslint-disable-next-line consistent-return
    return res
  }

  limit()
  myBuyed()
  getNumber()
  if (account != null) {
    isGODZApprovedTo(account, Constants.Contract.DONATE)
  }
  return (
    <Page
      style={{
        height: '900px',
        textAlign: 'center',
      }}
    >
      <IdoStyle />

      <div className="mas">
        <div className="mas_h">
          <h1>{t('Token Exchange')}</h1>
        </div>

        <div className="mas_head2">
          <img src="/images/godz/r.png" />
          <div>
            <h1 className="mas_head2_h1">{t('On Exchange')}</h1>
            <h1 className="mas_head2_h2">{numeral(onSale).format('0,0')} RAID</h1>
          </div>
        </div>
        <div className="mas_head3">
          <Card background="#4a4a4a;" style={{ background: '#4a4a4a;' }}></Card>
        </div>

        {/*  <div className="mas_head6">
          <div className="mas_head6_left">
            <div
              className="IDO_h1_mint_h15"
              onClick={() => {
                if (buyNumber > 100) {
                  setBuyNumber(buyNumber - 100)
                }
              }}
            >
              {' '}
              -
            </div>

            <input className="IDO_input" readOnly value={buyNumber} />

            <div
              className="IDO_h1_mint_h16"
              onClick={() => {
                if (buyNumber < 1000) {
                  setBuyNumber(buyNumber + 100)
                }
              }}
            >
              +
            </div>
          </div>
          <div className="mas_head6_right">
            <div className="IDO_h1_mint_h17" onClick={() => {}}>
              {'Next Block: '}
              {lastBlock}
            </div>
          </div>
        </div> */}
        <div className="mas_head5">
          <Button
            className="buy_btn"
            variant="secondary"
            onClick={async () => {
              await idobuy()
            }}
          >
            {approveOrBuy}
          </Button>
          {/*   <Button
            className="lin_btn"
            variant="secondary"
            onClick={async () => {
              await dona()
            }}
          >
            {t('Receive')}
          </Button> */}
        </div>
        <div className="mas_head4">
          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Remaining limit')} </div>
            <div className="mas_head4_1_right">{buyLimit} Old GODZ</div>
          </div>

          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('My Exchange')} </div>
            <div className="mas_head4_1_right">{myBuy} GODZ</div>
          </div>
          {/*   <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Total IDO')} </div>
            <div className="mas_head4_1_right">{t('60000000 GODZ')} </div>
          </div> */}

          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Exchange Price')} </div>
            <div className="mas_head4_1_right">{t('1:1')} </div>
          </div>
          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Total Amount')} </div>
            <div className="mas_head4_1_right"> {t('60000000 RAID')}</div>
          </div>
          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Limit')} </div>
            <div className="mas_head4_1_right">{t('#')} </div>
          </div>

          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Release Mechanism')} </div>
            <div className="mas_head4_1_right">{t('1:1 Exchange Token')} </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Ido
