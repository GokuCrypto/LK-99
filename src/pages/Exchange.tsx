/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'
import { createGlobalStyle } from 'styled-components'

import { Button } from '@pancakeswap/uikit'

const IdoStyle = createGlobalStyle` 
`

export interface Message {
  address: string
  msg: string
  sig: string
}

const Exchange = () => {
  const { t } = useTranslation()
  const [onSale, setOnSale] = useState(66666666)

  return (
    <Page
      style={{
        height: '900px',
        textAlign: 'center',
      }}
    >
      <IdoStyle />
      <Button width="100%">{t('Coming soon,   jump to Token Exchange')}</Button>
    </Page>
  )
}

export default Exchange
