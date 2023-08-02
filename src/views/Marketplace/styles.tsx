import styled from 'styled-components'
import { Button, Th, Td } from '@pancakeswap/uikit'

export const StyledButtonBuy = styled(Button)`
  background-image: url('/images/wt/btn-claim.png'); // 372x147
  background-size: cover;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0;
  color: #fff;
  width: 126px;
  height: 50px;
  padding: 0px;
  box-shadow: none;
  &:disabled {
    background-color: transparent;
  }
`

export const StyledButtonCancel = styled(Button)`
  background-image: url('/images/wt/btn-claim.png');
  background-size: cover;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0;
  color: #fff;
  box-shadow: none;
  width: 126px;
  height: 50px;
  &:disabled {
    background-color: transparent;
  }
`

export const StyledTd = styled(Td)`
  color: #fff;
`
