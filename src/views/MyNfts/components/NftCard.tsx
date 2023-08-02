import React, { useState } from 'react'
import styled from 'styled-components'
import { Flex, useMatchBreakpoints, Text, Image, Checkbox, CardBody, AutoRenewIcon } from '@pancakeswap/uikit'
import { Hero, Warrior } from 'state/types'
import { RAID_HERO_IMAGE_BASE_URL } from 'config'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
interface NftCardProps {
  item: Hero | Warrior
  itemType: 'Hero' | 'Warrior'
  userDataLoaded: boolean
}

const StyledCardBody = styled(CardBody)<{ selected?: boolean }>`
  cursor: pointer;
`

const NftCard: React.FC<NftCardProps> = ({ item, itemType, userDataLoaded }) => {
  const { toastSuccess, toastError } = useToast()
  const { t } = useTranslation()

  var date = new Date()
  var sign2 = ':'
  var year = date.getFullYear() // 年
  var month = date.getMonth() + 1 // 月
  var day = date.getDate() // 日
  var hour = date.getHours() // 时
  var minutes = Math.round(date.getMinutes() / 4) // 分
  var times = year + ':' + month + ':' + day + ':' + hour + ':' + minutes + ''

  const reloadInmage = async () => {
    let url = ''
    if (itemType === 'Hero') {
      url = `${RAID_HERO_IMAGE_BASE_URL}/hero/${item.id}`
    }
    if (itemType === 'Warrior') {
      url = `${RAID_HERO_IMAGE_BASE_URL}/warrior/${item.id}`
    }

    const response: any = await fetch(url, {
      method: 'post',
      headers: {
        'X-Access-Token': '',

        'Content-Type': 'application/json',
      },
    })

    toastSuccess('Success', t('Refresh metadata succeeded. Please refresh the page to view!'))

    times = times + 1
  }

  const getImage = () => {
    if (itemType === 'Hero') {
      return `${RAID_HERO_IMAGE_BASE_URL}/hero/images/${item.id}.png?${times}`
    }
    if (itemType === 'Warrior') {
      return `${RAID_HERO_IMAGE_BASE_URL}/warrior/images/${item.id}.png?${times}`
    }
    return null
  }
  return (
    <StyledCardBody p="8px">
      <Image src={getImage()} alt={`${itemType} #${item.id}`} width={320} height={483} />
      <AutoRenewIcon
        onClick={() => {
          reloadInmage()
        }}
        style={{ marginLeft: '125px' }}
      />
    </StyledCardBody>
  )
}

export default NftCard
