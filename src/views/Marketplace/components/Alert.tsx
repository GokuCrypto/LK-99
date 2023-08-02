import { CogIcon, Dropdown, Flex, ModalContainer, Button, Image, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { AutoRow } from 'components/Layout/Row'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import { useAppDispatch } from 'state'

import styled, { keyframes, css } from 'styled-components'
import { useState, useEffect } from 'react'
import { Constants } from 'hooks/WolfConfig'
import { getContractHandler } from 'hooks/ethereum'
import { formatEther } from '@ethersproject/units'
export interface Props {
  onDismiss: (confirm: boolean, record?: any) => void
}

const StyledModalContainer = styled(ModalContainer)`
  border-radius: 0px;
  background-image: url('/images/alert.png'); // 1464 x 929
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  width: 417px;
  height: 263px;
  padding: 0;
  border: none;
  min-width: 100px;
  max-width: calc(100% - 10px);
  max-height: 100%;
  position: absolute;
  top: 230px;
  margin-left: 240px;
`

const StyledModalContext = styled.div`
  border-radius: 0px;
  width: 417px;
  height: 190px;
  padding: 15px;
  padding-top: 100px;
  padding-left: 50px;
  border: none;
  min-width: 100px;
  max-width: calc(100% - 10px);
  max-height: 100%;
  text-align: center;
  display: table;
`

const ChallengeButton = styled(Button)`
  background-image: url('/images/game/buttons/empty.png'); // 291 x 89
  border-radius: 0;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  padding: 0px;
  font-size: 18px;
  width: 130px;
  height: 40px;
  bottom: 0px;
  &:disabled {
    background-color: transparent;
  }
`

const Alert: React.FC<Props> = ({ onDismiss }) => {
  const { t } = useTranslation()

  return (
    <StyledModalContainer minWidth="417px">
      <StyledModalContext>
        <Flex>
          <Text> {t('This card is short of life. Are you sure to purchase?')}</Text>
        </Flex>
      </StyledModalContext>
      <Flex style={{ marginLeft: '35px' }}>
        <ChallengeButton
          onClick={() => {
            onDismiss(false)
          }}
        >
          {t('Cancel')}
        </ChallengeButton>
        <ChallengeButton
          onClick={() => {
            onDismiss(true)
          }}
          style={{ marginLeft: '85px' }}
        >
          {t('Confirm')}
        </ChallengeButton>
      </Flex>
    </StyledModalContainer>
  )
}

export default Alert
