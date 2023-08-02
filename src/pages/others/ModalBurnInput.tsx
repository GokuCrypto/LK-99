import React from 'react'
import styled from 'styled-components'
import { Text, Button, Input, InputProps, Flex, Link } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { BigNumber } from 'bignumber.js'

interface ModalInputProps {
  symbol: string
  onSelectMax?: () => void
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  value: string
  inputTitle?: string
  decimals?: number
}

const getBoxShadow = ({ isWarning = false, theme }) => {
  if (isWarning) {
    return theme.shadows.warning
  }

  return theme.shadows.inset
}

const StyledTokenInput = styled.div<InputProps>`
  display: flex;
  flex-direction: column;

  // box-shadow: ${getBoxShadow};
  color: ${({ theme }) => theme.colors.text};
  padding: 8px 16px 8px 0;
  width: 100%;
`

const StyledInput = styled(Input)`
  border: none;
  box-shadow: none;
  width: 40px;
  // margin: 0 8px;
  // padding: 0 8px;

  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
  }

  &:focus:not(:disabled) {
    box-shadow: none;
  }
`

const StyledErrorMessage = styled(Text)`
  position: absolute;
  bottom: -22px;
  a {
    display: inline;
  }
`

const ModalBurnInput: React.FC<ModalInputProps> = ({ symbol, onChange, value, inputTitle, decimals = 18 }) => {
  const { t } = useTranslation()
  const isBalanceZero = value === '' || value === '0'
  return (
    <div className="IDO_input" style={{ position: 'relative' }}>
      <StyledTokenInput isWarning={isBalanceZero}>
        <Flex alignItems="center" justifyContent="space-around">
          <StyledInput
            pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
            inputMode="decimal"
            step="any"
            min="0"
            onChange={onChange}
            placeholder={inputTitle}
            value={value}
          />
          {/* <Text fontSize="16px">{symbol}</Text> */}
        </Flex>
      </StyledTokenInput>
    </div>
  )
}

export default ModalBurnInput
