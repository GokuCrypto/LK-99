import { Button, CardBody, Image, Text, useModal } from '@pancakeswap/uikit'
import React from 'react'
import { Hero } from 'state/types'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import { RAID_HERO_IMAGE_BASE_URL } from 'config'
import ListModal from './ListModal'
import { StyledButtonBuy } from '../styles'


interface AnimalCardProps {
  animal: Hero
  itemType: "Hero" | "Warrior"
  userDataLoaded: boolean
}

const StyledCardBody = styled(CardBody)<{ selected?: boolean }>`
  // position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  // background-image: url('/images/animal-frame.png'); // 241 x 383
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  justify-content: center;
  // height: 400px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 188px;
    height: 350px;
  }
`

const AttrContainer = styled.div`
  // position: absolute;
  // top: 20px;
`
const StyledButtonList = styled(Button)`
  background-image: url('/images/btn-list.png');
  background-size: cover;
  background-color: transparent;
  background-repeat: no-repeat;
  border: none;
  border-radius: 0;
  color: #8d652d;
  box-shadow: none;
  width: 84px;
  height: 36px;
`

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, itemType, userDataLoaded }) => {
  const { t } = useTranslation()
  const [onPresentList] = useModal(<ListModal animal={animal} itemType={itemType} />)
  const getImage = () => {
    if(itemType === 'Hero') {
      return `${RAID_HERO_IMAGE_BASE_URL}/hero/images/${animal.id}.png`  
    }
    if(itemType === 'Warrior') {
      return `${RAID_HERO_IMAGE_BASE_URL}/warrior/images/${animal.id}.png`  
    }
    return null
  }
  return (
    <StyledCardBody p="8px">
      <Image src={getImage()} alt={`${itemType}#${animal.id}`} width={220} height={332} />
      <StyledButtonBuy onClick={onPresentList}> { t('List') } </StyledButtonBuy>
    </StyledCardBody>
  )
}

export default AnimalCard
