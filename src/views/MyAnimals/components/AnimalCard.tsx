import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, useMatchBreakpoints, Text, Image, Checkbox, CardBody } from '@pancakeswap/uikit'
import { Animal } from 'state/types'
import useDelayedUnmount from 'hooks/useDelayedUnmount'

interface AnimalCardProps {
  animal: Animal
  userDataLoaded: boolean
}

const StyledCardBody = styled(CardBody)<{ selected?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 250px;
  width: 100%;
  background-image: url('/images/animal-frame.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 300px;
    width: 188px;
  }
`

const AttrContainer = styled.div`
  position: absolute;
  top: 20px;
`

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, userDataLoaded }) => {
  // const { isXs, isSm, isMd, isLg, isXl } = useMatchBreakpoints()
  return (
    <StyledCardBody p="8px">
      <Image src={animal.imageSmall} alt={animal.name} width={80} height={80} />
      <AttrContainer>
        <Text color="#000">{animal.name}</Text>
      </AttrContainer>
    </StyledCardBody>
  )
}

export default AnimalCard
