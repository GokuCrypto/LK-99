/* eslint-disable jsx-a11y/anchor-is-valid */
import { useWeb3React } from '@web3-react/core'
import Page, { PageMeta } from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

import { Button, Text } from '@pancakeswap/uikit'

import Script from 'react-load-script'
const StyledPage = styled(Page)`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};

  width: 100%;
`
const StyledText = styled(Text)`
  width: 100%;
`
const StyledButton = styled(Button)`
  background-image: url('/images/raidx/home/enter.png');
  background-size: cover;
  width: 100%;
`
const BRX: React.FC = () => {
  const { account } = useWeb3React()
  const { t } = useTranslation()

  return (
    <>
      <StyledPage>
        <StyledText fontSize={'20px'} mt={200} textAlign={'center'}>
          {t('Coming Soon')}
        </StyledText>
      </StyledPage>
    </>
  )
}

export default BRX
