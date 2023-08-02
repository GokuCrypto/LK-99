/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import { ButtonMenu, ButtonMenuItem, useMatchBreakpoints } from '@pancakeswap/uikit'

import RaidStaking from './RaidStaking'
import RaidStakingV2 from './RaidStakingV2'
import RaidStakingV3 from './RaidStakingV3'

const IdoStyle = createGlobalStyle`

 
 

`

const Row = styled.div<{ isMobile?: boolean }>`
  margin-bottom: -15px;

  ${({ isMobile }) => (isMobile ? '' : 'margin-left: -6%;')}
`

export interface Message {
  address: string
  msg: string
  sig: string
}

const Pledge = () => {
  const { t } = useTranslation()
  const [rewardTime, setRewardTime] = useState(15)
  const { isMobile } = useMatchBreakpoints()

  const [index, setIndex] = useState(0)
  const handleClick = (newIndex) => setIndex(newIndex)

  console.log('运行了')
  return (
    <Page
      style={{
        textAlign: 'center',
      }}
    >
      <Row isMobile={isMobile}>
        <ButtonMenu variant="subtle" activeIndex={index} onItemClick={handleClick}>
          <ButtonMenuItem>Staking V3</ButtonMenuItem>
          <ButtonMenuItem>Staking V2</ButtonMenuItem>
          <ButtonMenuItem>Staking V1</ButtonMenuItem>
        </ButtonMenu>
      </Row>
      {index === 0 && <RaidStakingV3 />}
      {index === 1 && <RaidStakingV2 />}
      {index === 2 && <RaidStaking />}
    </Page>
  )
}

export default Pledge
