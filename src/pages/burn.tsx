/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { BigNumber } from '@ethersproject/bignumber'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import React, { useCallback, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { formatUnits, parseUnits } from '@ethersproject/units'

import { AutoRenewIcon, Button } from '@pancakeswap/uikit'
import useTokenBalance from 'hooks/useTokenBalance'
import { Constants } from 'hooks/WolfConfig'
import ModalBurnInput from './others/ModalBurnInput'
import { getContractHandler } from 'hooks/ethereum'
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
  margin-top:8%;
}
 
 
 

.mas_head2 div h1{ 
  color:#fff;
  margin-top:8px; 
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
    margin-top:70px;
  }
   
 
  .mas_head2 div{  
  }
  
  .mas_head2 div h1{ 
    color:#fff;  
  }
  
 
  
  .mas_head2_h2{
     font-size:20px;
  }
  
  .mas_head3{
     width:95%;
     margin:2%;  
  
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
  
  
   

}
 

`

export interface Message {
  address: string
  msg: string
  sig: string
}

const Burn = () => {
  const { t } = useTranslation()
  const [burnNumber, setBurnNumber] = useState('')
  const { balance: RAID } = useTokenBalance(Constants.Contract.NEWGODZ)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setBurnNumber(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setBurnNumber],
  )
  let numberRaid = 0

  const getBalance = async () => {
    // const msg: Message = { address: account, msg:   "22222" , sig:"4444" }
    numberRaid = Number(RAID.div(10 ** 9).div(10 ** 9))
  }
  getBalance()

  const tokenBurn = async () => {
    const contract = await getContractHandler('NEWGODZ')
    if (!contract) return
    const res = await contract.burn(parseUnits(burnNumber))
  }

  return (
    <Page
      style={{
        height: '500px',
        textAlign: 'center',
      }}
    >
      <IdoStyle />

      <div className="mas">
        <div className="mas_h">
          <h1>{t('Burn Token')}</h1>
        </div>

        <div className="mas_head2">
          <div>
            <h1 className="mas_head2_h2">{t('Balance')}:</h1>
          </div>
          <div>
            <h1 className="mas_head2_h2">{numberRaid} RAID</h1>
          </div>
        </div>
        <div className="mas_head3">
          <ModalBurnInput
            onChange={handleChange}
            value={burnNumber}
            symbol="RAID"
            inputTitle={t('Number')}
            decimals={10}
          />
          <Button
            width={150}
            onClick={() => {
              tokenBurn()
            }}
          >
            {t('Burn')}
          </Button>
        </div>
      </div>
    </Page>
  )
}

export default Burn
