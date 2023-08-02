import React from 'react'
import styled from 'styled-components'
import Wolf from '../../../../public/images/icons/wolf.png'
import Barn from '../../../../public/images/icons/barn.png'
import Sheep from '../../../../public/images/icons/sheep.png'
import Marketplace from '../../../../public/images/icons/marketplace.png'
import ido from '../../../../public/images/icons/ido.png'

import Referral from '../../../../public/images/icons/referral.png'
import Leaderboard from '../../../../public/images/icons/leaderboard.png'
import Gift from '../../../../public/images/icons/gift.png'
import Twitter from '../../../../public/images/icons/twitter.png'
import Discord from '../../../../public/images/icons/discord.png'
import Telegram from '../../../../public/images/icons/telegram.png'
import Facebook from '../../../../public/images/icons/facebook.png'

import GameFi from '../../../../public/images/icons/gamefi.png'

import WolfWhite from '../../../../public/images/icons/wolf_white.png'
import BarnWhite from '../../../../public/images/icons/barn_white.png'
import SheepWhite from '../../../../public/images/icons/sheep_white.png'
import MarketplaceWhite from '../../../../public/images/icons/marketplace_white.png'
import GiftWhite from '../../../../public/images/icons/gift_white.png'

const images = {
  Wolf,
  Barn,
  Sheep,
  Marketplace,
  Referral,
  Leaderboard,
  Gift,
  Twitter,
  Discord,
  Telegram,
  GameFi,
  WolfWhite,
  BarnWhite,
  SheepWhite,
  MarketplaceWhite,
  GiftWhite,
  ido,
  Facebook,
}

const ImageWrapper = styled.div`
  width: 30px;
  margin-right: 5px;
`

interface IconProps {
  name: string
}
const Icon: React.FC<IconProps> = ({ name }) => {
  return images[name] ? (
    <ImageWrapper>
      <img src={images[name].src} alt="" />
    </ImageWrapper>
  ) : (
    <span title="failed to load" />
  )
}

export const WolfIcon: React.FC<any> = ({ props }) => <Icon name="Wolf" />
export const BarnIcon: React.FC<any> = ({ props }) => <Icon name="Barn" />
export const SheepIcon: React.FC<any> = ({ props }) => <Icon name="Sheep" />
export const MarketplaceIcon: React.FC = () => {
  return <Icon name="Marketplace" />
}
export const IdoIcon: React.FC = () => {
  return <Icon name="ido" />
}
export const ReferralIcon: React.FC = () => {
  return <Icon name="Referral" />
}
export const LeaderboardIcon: React.FC = () => {
  return <Icon name="Leaderboard" />
}
export const GiftIcon: React.FC = () => {
  return <Icon name="Gift" />
}
export const TwitterIcon: React.FC = () => {
  return <Icon name="Twitter" />
}
export const DiscordIcon: React.FC = () => {
  return <Icon name="Discord" />
}
export const TelegramIcon: React.FC = () => {
  return <Icon name="Telegram" />
}
export const GameFiIcon: React.FC = () => {
  return <Icon name="GameFi" />
}
export const WolfWhiteIcon: React.FC = () => {
  return <Icon name="WolfWhite" />
}
export const BarnWhiteIcon: React.FC = () => {
  return <Icon name="BarnWhite" />
}
export const SheepWhiteIcon: React.FC = () => {
  return <Icon name="SheepWhite" />
}
export const MarketplaceWhiteIcon: React.FC = () => {
  return <Icon name="MarketplaceWhite" />
}
export const GiftWhiteIcon: React.FC = () => {
  return <Icon name="GiftWhite" />
}

export default Icon
