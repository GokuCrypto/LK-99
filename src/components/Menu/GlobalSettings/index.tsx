import { Flex, IconButton, CogIcon, useModal } from '@pancakeswap/uikit'
import { createGlobalStyle } from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useTokenBalance, { useGetBnbBalance } from 'hooks/useTokenBalance'
import { getBalanceAmount } from 'utils/formatBalance'
import tokens from 'config/constants/tokens'
import { formatEther } from '@ethersproject/units'
import BigNumber from 'bignumber.js'
import { MoneyFormatText } from 'react-native-moneyformattext'
import numeral from 'numeral'
import SettingsModal from './SettingsModal'
import { parse } from 'querystring'
type Props = {
  color?: string
  mr?: string
}

const MintStyle = createGlobalStyle`
   

`

const GlobalSettings = ({ color, mr = '5px' }: Props) => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />)
  const { t } = useTranslation()
  /* 
  const { balance: bnbBalance } = useGetBnbBalance()

  const formattedBnbBalance = +new BigNumber(formatEther(bnbBalance).toString())
    .decimalPlaces(4, BigNumber.ROUND_DOWN)
    .toNumber()

  const remix = 120

  const getPageQuery = () => parse(window.location.href.split('?')[1])

  const locationQuery = getPageQuery()
  if (locationQuery && locationQuery.invite) {
    // 读取base64字符串
    let buffer = Buffer.from(locationQuery.invite.toString(), 'base64')

    console.log('invite_addressbuffer', buffer)
    // 进行解码
    localStorage.setItem('invite_address', buffer.toString())
  } */

  return (
    <Flex>
      <MintStyle />

      {/*  <IconButton
        className="IconButton"
        onClick={onPresentSettingsModal}
        variant="text"
        scale="sm"
        mr={mr}
        id="open-settings-dialog-button"
      >
        <CogIcon height={24} width={24} color={color || 'textSubtle'} />
      </IconButton> */}
    </Flex>
  )
}

export default GlobalSettings
