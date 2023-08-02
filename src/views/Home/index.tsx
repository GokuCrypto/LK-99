/* eslint-disable jsx-a11y/anchor-is-valid */
import { useWeb3React } from '@web3-react/core'
import Page, { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import React, { useState, useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import Berth from './Berth'
import { Button, Text, useMatchBreakpoints, TwitterIcon, TelegramIcon } from '@pancakeswap/uikit'
import { AbiConfig, Constants, getSign } from 'hooks/WolfConfig'
import CopyAddress from '../../components/Menu/UserMenu/CopyAddress'
import { getContractHandler } from 'hooks/ethereum'
import { useCurrentBlock } from 'state/block/hooks'
import VideoPi from './VideoPi'
import useToast from 'hooks/useToast'
import Script from 'react-load-script'
import { parseUnits, formatEther, parseEther } from '@ethersproject/units'
import { Withdraw } from 'hooks/modules/Withdraw'
import { estimateGas } from 'utils/calls/estimateGas'
import { ethers } from 'ethers'

const StyledPage = styled(Page)<{ isMob: boolean }>`
  background: ${({ isMob }) => (isMob ? "url('/images/raidx/home/mob2.png');" : " url('/images/raidx/home/bg.png');")}
 

  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  width: 100%;
`
const StyledText = styled(Text)`
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 200px;
  display: table;
  margin: 0 auto;
  margin-top: 40px;
  background: linear-gradient(270deg, rgb(51, 212, 250) 0%, rgb(23, 243, 221) 100%);
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
`

const StyledDic = styled.div`
  width: 300px;
  display: table;
  margin: 0 auto;
  margin-top: 40px;
`

const StyledDiv = styled.div`
  display: table;
  margin: 0 auto;
  width: 80%;
  border: 1px solid rgb(30, 39, 64);
  border-radius: 16px;
  margin-top: 50px;
`

const StyledDiv1 = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  font-weight: bold;
  font-family: ExtraBold;
  padding-left: 24px;
  line-height: 56px;
  min-height: 56px;
`

const StyledDiv2 = styled.div`
  background-color: rgb(30, 39, 64);
  height: 1px;
  margin: 0px auto 32px;
  width: 100%;
`
const StyledDiv3 = styled.div`
  padding: 0px 0px 24px 0px;
  min-height: 72px;
`
const StyledDiv4 = styled.div`
  padding: 0px 0px 24px 0px;
  min-height: 130px;
`

const StyledDivii = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`
const StyledDiviii = styled.div`
  min-width: 170px;
`

const StyledDiviiii = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 10px;
`
const BertDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin-top: 30px;
  height: 30px;
`

const Home: React.FC = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpoints()

  const [isLoadding, setIsLoadding] = useState(false)
  const [ip, setIp] = useState('')

  const { toastSuccess, toastError } = useToast()

  const [tw, setTw] = useState(false)
  const [tg, setTg] = useState(false)
  const [totalAir, setTotalAir] = useState('0')

  const currentBlock = useCurrentBlock()
  const reward = async () => {
    try {
      setIsLoadding(true)
      const VAULT = await getContractHandler('VAULT')

      if (!VAULT) return

      const witdraw = new Withdraw()

      const result = await getIP()
      let ip = '0.0.0.0'
      if (result) {
        ip = result
        console.log('IPIPIP', ip)
      }

      let buffer = Buffer.from(ip + '2')

      const invateLink = buffer.toString('base64')
      const gasLimit = await VAULT.estimateGas.airDrop(invateLink)
      const gas = gasLimit.add(6531110)

      const resu = await VAULT.airDrop(invateLink, { value: parseEther('0.0006'), from: account })
      /*       console.log('e?.messagee?.messagee?.message', gas) */
      toastSuccess('Success')

      setIsLoadding(false)
    } catch (e: any) {
      setIsLoadding(false)

      if (e?.data?.message) {
        toastError(e?.data?.message)
      } else if (e?.message) {
        toastError(e?.message)
      }
    }
  }

  useEffect(() => {
    if (account) {
      queryLPStakeInfo()
    }
  }, [account, Math.floor(currentBlock / 3)])

  const queryLPStakeInfo = async () => {
    const VAULT = await getContractHandler('VAULT')
    if (!VAULT) return
    const resu = await VAULT._airdropTotalAmount()

    setTotalAir(formatEther(resu))
  }

  const getIP = async () => {
    const res = await fetch('https://api.ipify.org/?format=json')
    const data = await res.json()
    return data.ip
  }

  return (
    <>
      <StyledPage isMob={isMobile}>
        <StyledText mt={isMobile ? 100 : 50} fontSize={'4em'} textAlign={'center'}>
          {t('We are LK-99')}
        </StyledText>
        <StyledText fontSize={'20px'} mt={50} textAlign={'center'}>
          {t(
              'LK-99 Introduce',
          )}
        </StyledText>
        <BertDiv>
          {/* <Berth /> */}

          {/*     <VideoPi /> */}
        </BertDiv>

        <StyledDiv>
          <StyledDiv1>{t('Token allocation')}</StyledDiv1>
          <StyledDiv2></StyledDiv2>
          <StyledDiv3>
            <StyledDivii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Token Total')}</Text>
                <Text textAlign={'center'}>100 billion</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Add LP')}</Text>
                <Text textAlign={'center'}>50%</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Airdrop')}</Text>
                <Text textAlign={'center'}>20%</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('surprise')}</Text>
                <Text textAlign={'center'}>30%</Text>
              </StyledDiviii>
            </StyledDivii>
          </StyledDiv3>
        </StyledDiv>

        {/*   <StyledDiv>
          <StyledDiv1>{t('Transaction tax')}</StyledDiv1>
          <StyledDiv2></StyledDiv2>
          <StyledDiv3>
            <StyledDivii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Marketing')}</Text>
                <Text textAlign={'center'}>1 %</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Destruction')}</Text>
                <Text textAlign={'center'}>0.1%</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('reflux')}</Text>
                <Text textAlign={'center'}>0.1%</Text>
              </StyledDiviii>

              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('LP dividend')}</Text>
                <Text textAlign={'center'}>4%</Text>
              </StyledDiviii>

              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Third level invitation')}</Text>
                <Text textAlign={'center'}>0.9%</Text>
              </StyledDiviii>
            </StyledDivii>
          </StyledDiv3>
        </StyledDiv>

        <StyledDiv>
          <StyledDiv1>{t('Invitation')}</StyledDiv1>
          <StyledDiv1>
            {t(
              'Any number of airdrops is a binding relationship, and rewards will be claimed on the core official website',
            )}
          </StyledDiv1>
          <StyledDiv2></StyledDiv2>
          <StyledDiv3>
            <StyledDivii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('First level invitation')}</Text>
                <Text textAlign={'center'}>0.5%</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Second level invitation')}</Text>
                <Text textAlign={'center'}>0.2%</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Third level invitation')}</Text>
                <Text textAlign={'center'}>0.2%</Text>
              </StyledDiviii>
            </StyledDivii>
          </StyledDiv3>
        </StyledDiv> */}

        <StyledDiv>
          <StyledDiv1>{t('AirDrop')}</StyledDiv1>
          <StyledDiv2></StyledDiv2>
          <StyledDiv3>
            <StyledDivii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Remaining amount')}</Text>
                <Text textAlign={'center'}>{totalAir.toLocaleString()}</Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Follow Twitter')}</Text>
                <Text textAlign={'center'}>
                  <TwitterIcon
                    mt={3}
                    cursor={'pointer'}
                    width={30}
                    onClick={() => {
                      setTw(true)
                      window.open('https://twitter.com', '_blank')
                    }}
                  />
                </Text>
              </StyledDiviii>
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Join Telegram')}</Text>
                <Text textAlign={'center'}>
                  <TelegramIcon
                    mt={3}
                    cursor={'pointer'}
                    width={30}
                    onClick={() => {
                      setTg(true)
                      window.open('https://t.me/lk99a', '_blank')
                    }}
                  />
                </Text>
              </StyledDiviii>
              {/* <StyledDiviii style={{ marginTop: '24px' }}>
                <Text textAlign={'center'}>{t('Third level reward')}</Text>
                <Text textAlign={'center'}>{invite3}</Text>
              </StyledDiviii>*/}
              <StyledDiviii style={{ marginTop: '24px' }}>
                <Button disabled={isLoadding || !tg || !tw} variant={'secondary'} ml={20} onClick={reward}>
                  {t('Donate')}
                </Button>
              </StyledDiviii>
            </StyledDivii>
          </StyledDiv3>
        </StyledDiv>

        <StyledButton
          mt={'200px'}
          onClick={() => {
            window.open(Constants.BUYURL, '_blank')
          }}
        >
          Buy Now
        </StyledButton>
        <StyledDic>
          <CopyAddress account={Constants.Contract.BRX} mb="24px" />
        </StyledDic>
      </StyledPage>
    </>
  )
}

export default Home
