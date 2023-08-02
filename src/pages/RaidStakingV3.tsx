/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { createGlobalStyle } from 'styled-components'
import numeral from 'numeral'
import React, { useState, useEffect, useCallback } from 'react'

import { Block } from 'state/info/types'
import { useWeb3React } from '@web3-react/core'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { Constants } from 'hooks/WolfConfig'
import { getContractHandler } from 'hooks/ethereum'
import { ethers } from 'ethers'
import useTokenBalance from 'hooks/useTokenBalance'
import { simpleRpcProvider } from 'utils/providers'
import { BigNumber } from '@ethersproject/bignumber'
import { count } from 'console'
import ModalBuyInput from './others/ModalBuyInput'
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
  AutoRenewIcon,
} from '@pancakeswap/uikit'

const IdoStyle = createGlobalStyle`
@media screen and (min-width:968px) {
.mas{
  background:url('/images/raid/swap/bg.png');
  background-size:100% 100%;
  min-width:60%; 
  max-width:60%; 
  min-height:100%;
  margin-left:15%; 
}

.mas_h{
  padding-top:15%;
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

}


.mas_head3_p{ 
  padding:15px;
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


  margin-left:20%;
  float:left;
  
}
 
.lin_btn{
  cursor:pointer;
  background:url('/images/ido/qianbao.png');
  background-size:100% 100%;
  min-height:50px;
  min-width:120px;
  max-width:120px;
  padding:16px;
  float:left;
  margin-left:60%;
  margin-top:-50px;
}
.mas_head4{
  width:95%;
  margin-top:140px; 
  margin-left:2.5%; 
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
  padding-left:10%;
  margin-top:10px;
}

 

.mas_head4_1_right{
  float:right;
  width:45%;
  text-align:right;
  margin-top:10px; color:#fff;
  padding-right:10%;
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
  margin-top:15px;
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

  .OmxRY{
    padding-left: 0px;
    padding-right: 0px;
  }

  .mas{
    background:url('/images/raid/swap/bg.png');
    background-size:100% 100%;
    min-width:100%; 
    max-width:100%; 
    min-height:100%;
    margin-left:1%;
    
  }
  
  .mas_h{
    padding-top:30%;
  }
  .mas_h h1{
    color:#FFF;
    font-size:20px;
  }
  
  .mas_head2{
    width:100%;
    margin-left:20%;
    margin-top:40px;
  }

  .dVTzrY{
    width:120px;
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
  
  
  .mas_head3_p{ 
    padding:15px;
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
    margin-left:11%;
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
    margin-top:140px; 
    margin-left:2.5%; 
    padding:10px;
    max-height:320px;
    min-height:320px;
    border-radius: 10px 10px 10px 10px;
    color:#fff;
  }
  
  
  .mas_head4_1{
    width:100%;  
    margin-top:10px;
    max-height:45px;
    min-height:45px;
  }
  
  .mas_head4_1_left{
    text-align:left;
    float:left;
    width:55%;
    margin-top:10px;
    padding-left:10%;
  }
  
   
  
  .mas_head4_1_right{
    float:right;
    width:45%;
    text-align:right;
    margin-top:10px; color:#fff;
    padding-right:10%;
  }
  
  
  
  .mas_head6{
    width:100%;
    margin-top:20px;
    margin-bottom:10px;
    text-align:right;
    min-width:100%;
    float:left;
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
    margin-right:12%;
    font-size:10px;
    margin-top:20px;
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

const RaidStakingV3 = () => {
  const { t } = useTranslation()
  const [rewardTime, setRewardTime] = useState(15)

  const [pool, setPool] = useState(0)

  const { toastSuccess, toastError } = useToast()
  const [buyNumber, setBuyNumber] = useState('100')
  const { balance: RAID } = useTokenBalance(Constants.Contract.NEWGODZ)
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWeb3React()
  const [approveOrBuy, setApproveOrBuy] = useState('Approve')
  const [buyLimit, setBuyLimit] = useState(270000)
  const [myBuy, setMyBuy] = useState(0)
  const [lastBlock, setLastBlock] = useState(0)

  const [lastTime, setLastTime] = useState('')
  const [buyed, setBuyed] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const approveRAIDTo = async (to = Constants.Contract.DONATEPLEDEGV3) => {
    const contract = await getContractHandler('NEWGODZ')
    if (!contract) return
    const res = await contract.approve(to, ethers.constants.MaxUint256)
    // eslint-disable-next-line consistent-return
    return res
  }

  const balanceOfHero = async (account) => {
    const contract = await getContractHandler('Hero')
    if (!contract) return
    const res = await contract.balanceOf(account)
    // eslint-disable-next-line consistent-return
    return res
  }

  const isRAIDApprovedTo = async (address: string, to = Constants.Contract.DONATEPLEDEGV3) => {
    const contractss = await getContractHandler('NEWGODZ')

    if (!contractss) return false
    const res = await contractss.allowance(address, to)
    if (res._hex === '0x00') return false
    setApproveOrBuy('Deposit')
    return true
  }

  // eslint-disable-next-line consistent-return
  const idobuy = async () => {
    // const msg: Message = { address: account, msg:   "22222" , sig:"4444" }

    setPendingTx(true)

    const heroNumber = await balanceOfHero(account)

    /*  if (heroNumber.eq(Number(0))) {
      toastError(`${t('Token Staking')}!`, <ToastDescriptionWithTx>{t('You need a Hero NFT!')}</ToastDescriptionWithTx>)
      return false
    } */

    const isRaidApprovedToDonate = await isRAIDApprovedTo(account, Constants.Contract.DONATEPLEDEGV3)
    console.log('isRaidApprovedToDonate', isRaidApprovedToDonate)
    if (!isRaidApprovedToDonate) await approveRAIDTo(Constants.Contract.DONATEPLEDEGV3)
    toastSuccess(
      `${t('Token Staking')}!`,
      <ToastDescriptionWithTx>{t('Approved RAID To Contract')}</ToastDescriptionWithTx>,
    )

    console.log('Token Staking', RAID)
    if (RAID.lt(Number(buyNumber) * 10 ** 18)) {
      toastError(`${t('Token Staking')}!`, <ToastDescriptionWithTx>{t('RAID is not enough!')}</ToastDescriptionWithTx>)
      return false
    }

    await donate()
  }

  const donate = async () => {
    const contract = await getContractHandler('DONATEPLEDEGV3')
    if (!contract) return
    const res = await contract.pledge(pool, BigNumber.from(buyNumber))
    toastSuccess(`${t('Token Staking')}!`, <ToastDescriptionWithTx>{t('Deposit Success!')}</ToastDescriptionWithTx>)
    await limit()
    await myBuyed()
    // eslint-disable-next-line consistent-return
    return res
  }

  /* 查询剩余额度 */
  /* 查询剩余额度 */
  const limit = async () => {
    const contractss = await getContractHandler('DONATEPLEDEGV3')

    if (!contractss) return false
    const perLimit = await contractss.maxDropNumber(pool)

    if (perLimit != null) {
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
    const contractss = await getContractHandler('DONATEPLEDEGV3')

    if (!contractss) return false
    if (!account) return false
    const mygo = await contractss.getnumberForPool(account, pool)

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
      toastError(`${t('Token Staking')}!`, <ToastDescriptionWithTx>{t('Please buy first!')}</ToastDescriptionWithTx>)
    }

    const contract = await getContractHandler('DONATEPLEDEGV3')
    if (!contract) return
    const res = await contract.reward(pool)
    toastSuccess(`${t('Token Staking')}!`, <ToastDescriptionWithTx>{t('Redeem  Success!')}</ToastDescriptionWithTx>)
    // eslint-disable-next-line consistent-return
    return res
  }

  const getLastBlock = async () => {
    const contract = await getContractHandler('DONATEPLEDEGV3')

    if (!account) return

    if (!contract) return

    const res = await contract.getUserNextBlock(account, pool)

    setLastBlock(BigNumber.from(res).toNumber())

    const block = await simpleRpcProvider.getBlockNumber()

    if (BigNumber.from(res).toNumber() > BigNumber.from(block).toNumber()) {
      const tim = BigNumber.from(res).toNumber() - BigNumber.from(block).toNumber()
      const day = Math.floor((tim * 3) / 3600 / 24)
      const hour = Math.floor((tim * 3 - day * 3600 * 24) / 3600)
      const minutes = Math.floor((tim * 3 - day * 3600 * 24 - hour * 3600) / 60)
      setLastTime(day + ' Day ' + hour + ' Hour ' + minutes + ' min ')
    } else {
      setLastTime('30 days later')
    }
    // eslint-disable-next-line consistent-return
    return res
  }

  const getNumber = async () => {
    const contract = await getContractHandler('DONATEPLEDEGV3')

    if (!account) return

    if (!contract) return

    const res = await contract.getnumberForPool(account, pool)

    setBuyed(
      BigNumber.from(res)
        .div(10 ** 9)
        .div(10 ** 9)
        .toNumber(),
    )
    // eslint-disable-next-line consistent-return
    return res
  }

  /*   useEffect(() => {
    setIsLoading(false)
    const load = async () => { */
  getLastBlock()
  limit()
  myBuyed()
  getNumber()
  /*   }

    load()
  }, []) */

  if (account != null) {
    isRAIDApprovedTo(account, Constants.Contract.DONATEPLEDEGV3)
  }

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setBuyNumber(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setBuyNumber],
  )

  const handleBulr = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        if (e.currentTarget.value.replace(/,/g, '.') !== '') {
          setBuyNumber(parseInt(parseInt(e.currentTarget.value.replace(/,/g, '.')) / 100 + '') * 100 + '')
          if (parseInt(parseInt(e.currentTarget.value.replace(/,/g, '.')) / 100 + '') * 100 == 0) {
            setBuyNumber('100')
          }
        }
      }
    },
    [setBuyNumber],
  )

  //获取input输入的城市
  const changeVal = (event) => {}
  console.log('运行了')
  return (
    <Page
      style={{
        height: '1000px',
        textAlign: 'center',
      }}
    >
      <IdoStyle />

      <div className="mas">
        <div className="mas_h">
          <h1>{t('Token Staking V3')}</h1>
        </div>

        <div className="mas_head2">
          <img src="/images/godz/r.png" />
          <div>
            <h1 className="mas_head2_h1">{t('Redemption period')}</h1>
            <h1 className="mas_head2_h2">30 DAY</h1>
          </div>
        </div>
        {/*   <div className="mas_head3">
          <Button
            onClick={() => {
              pool == 0 ? setPool(1) : setPool(0)
            }}
          >
            {' '}
            {t('Change Staking Pool')}
            <AutoRenewIcon color="#fff" />
          </Button>
        </div> */}

        <div className="mas_head6">
          <div className="mas_head6_left">
            <ModalBuyInput
              onChange={handleChange}
              onBlur={handleBulr}
              value={buyNumber}
              symbol="RAID"
              inputTitle={t('Number')}
              decimals={10}
            />
            {/* 
            <div
              className="IDO_h1_mint_h16"
              onClick={() => {
                setBuyNumber(Number(buyNumber) + 100 + '')
              }}
            >
              +
            </div> */}
          </div>
          <div className="mas_head6_right">
            <div className="IDO_h1_mint_h17" onClick={() => {}}>
              <a href={'https://bscscan.com/block/countdown/' + lastBlock} target="_blank">
                {'Block:'}
                {lastBlock}
              </a>
            </div>
          </div>
        </div>
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
          <Button
            className="buy_btn"
            variant="secondary"
            onClick={async () => {
              await dona()
            }}
          >
            {t('Redeem')}
          </Button>
        </div>
        <div className="mas_head4">
          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Remaining limit')} </div>
            <div className="mas_head4_1_right">{buyLimit} RAID</div>
          </div>

          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('My Deposit')} </div>
            <div className="mas_head4_1_right">{myBuy} RAID</div>
          </div>
          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Total Staking')} </div>
            <div className="mas_head4_1_right">{20000000} </div>
          </div>

          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Rate')} </div>
            <div className="mas_head4_1_right">{'5%'}</div>
          </div>

          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Min Stake')} </div>
            <div className="mas_head4_1_right">{t(' 100 RAID >= ')} </div>
          </div>

          <div className="mas_head4_1">
            <div className="mas_head4_1_left"> {t('Redeem')} </div>
            <div className="mas_head4_1_right">{lastTime} </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default RaidStakingV3
