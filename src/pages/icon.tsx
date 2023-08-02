/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'
import { createGlobalStyle } from 'styled-components'

import {
  AccountFilledIcon,
  AccountIcon,
  AddIcon,
  ArrowBackIcon,
  ArrowDownIcon,
  ArrowDropDownIcon,
  ArrowDropUpIcon,
  ArrowFirstIcon,
  ArrowForwardIcon,
  ArrowLastIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  AutoRenewIcon,
  BackForwardIcon,
  BinanceChainIcon,
  BinanceIcon,
  BlockIcon,
  BnbUsdtPairTokenIcon,
  BscScanIcon,
  BunnyCardsIcon,
  BunnyPlaceholderIcon,
  CalculateIcon,
  CameraIcon,
  Cards,
  CardViewIcon,
  ChartDisableIcon,
  ChartIcon,
  CheckmarkCircleFillIcon,
  CheckmarkCircleIcon,
  CheckmarkIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleOutlineIcon,
  CloseIcon,
  CogIcon,
  Coin98Icon,
  CoinbaseWalletIcon,
  CommunityFilledIcon,
  CommunityIcon,
  CopyIcon,
  CrownIcon,
  CurrencyIcon,
  DiscordIcon,
  EarnFilledIcon,
  EarnFillIcon,
  EarnIcon,
  EllipsisIcon,
  ErrorIcon,
  ExpandIcon,
  FarmIcon,
  GithubIcon,
  GroupsIcon,
  HamburgerCloseIcon,
  HamburgerIcon,
  HelpIcon,
  HistoryIcon,
  HomeIcon,
  HotIcon,
  IfoIcon,
  InfoIcon,
  InstagramIcon,
  LanguageCurrencyIcon,
  LanguageIcon,
  LaurelLeftIcon,
  LaurelRightIcon,
  LineGraphIcon,
  ListViewIcon,
  LockIcon,
  LoginIcon,
  LogoIcon,
  LogoRoundIcon,
  LogoutIcon,
  LogoWithTextIcon,
  MathWalletIcon,
  MedalBronzeIcon,
  MedalGoldIcon,
  MedalPurpleIcon,
  MedalSilverIcon,
  MedalTealIcon,
  MediumIcon,
  MetamaskIcon,
  MinusIcon,
  MoonIcon,
  MoreHorizontalIcon,
  MoreIcon,
  MoreVerticalIcon,
  NftFilledIcon,
  NftFillIcon,
  NftIcon,
  NoProfileAvatarIcon,
  OpenNewIcon,
  OperaIcon,
  PancakeRoundIcon,
  PencilIcon,
  PlayCircleOutlineIcon,
  PocketWatchIcon,
  PoolIcon,
  PredictionsIcon,
  PresentCheckIcon,
  PresentNoneIcon,
  PresentWonIcon,
  PrizeIcon,
  ProgressBunny,
  ProposalIcon,
  RedditIcon,
  RefreshIcon,
  RemoveIcon,
  ResourcesFilledIcon,
  ResourcesIcon,
  SafePalIcon,
  SearchIcon,
  SellIcon,
  ShareIcon,
  ShrinkIcon,
  SmallDotIcon,
  SmartContractIcon,
  SplitIcon,
  StarFillIcon,
  StarLineIcon,
  SunIcon,
  SwapFillIcon,
  SwapIcon,
  SwapVertIcon,
  SyncAltIcon,
  TeamBattleIcon,
  TeamPlayerIcon,
  TelegramIcon,
  TestnetIcon,
  TicketFillIcon,
  TicketRound,
  TimerIcon,
  TokenPocketIcon,
  TradeFilledIcon,
  TradeIcon,
  TradingViewIcon,
  TrophyFillIcon,
  TrophyGoldIcon,
  TrophyIcon,
  TrustWalletIcon,
  TuneIcon,
  TwitterIcon,
  UnlockIcon,
  VerifiedIcon,
  VisibilityOff,
  VisibilityOn,
  VolumeOffIcon,
  VolumeUpIcon,
  VoteIcon,
  WaitIcon,
  WalletConnectIcon,
  WalletFilledIcon,
  WalletIcon,
  WarningIcon,
  Svg,
} from '@pancakeswap/uikit'

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
      <AccountFilledIcon />
      <h1>AccountFilledIcon</h1>
      <AccountIcon />
      <h1>AccountIcon</h1>
      <AddIcon />
      <h1>AddIcon</h1>
      <ArrowBackIcon />
      <h1>ArrowBackIcon</h1>
      <ArrowDownIcon />
      <h1>ArrowDownIcon</h1>
      <ArrowDropDownIcon />
      <h1>ArrowDropDownIcon</h1>
      <ArrowDropUpIcon />
      <h1>ArrowDropUpIcon</h1>
      <ArrowFirstIcon />
      <h1>ArrowFirstIcon</h1>
      <ArrowForwardIcon />
      <h1>ArrowForwardIcon</h1>
      <ArrowLastIcon />
      <h1>ArrowLastIcon</h1>
      <ArrowUpDownIcon />
      <h1>ArrowUpDownIcon</h1>
      <ArrowUpIcon />
      <h1>ArrowUpIcon</h1>
      <AutoRenewIcon />
      <h1>AutoRenewIcon</h1>
      <BackForwardIcon />
      <h1>BackForwardIcon</h1>
      <BinanceChainIcon />
      <h1>BinanceChainIcon</h1>
      <BinanceIcon />
      <h1>BinanceIcon</h1>
      <BlockIcon />
      <h1>BlockIcon</h1>
      <BnbUsdtPairTokenIcon />
      <h1>BnbUsdtPairTokenIcon</h1>
      <BscScanIcon />
      <h1>BscScanIcon</h1>
      <BunnyCardsIcon />
      <h1>BunnyCardsIcon</h1>
      <BunnyPlaceholderIcon />
      <h1>BunnyPlaceholderIcon</h1>
      <CalculateIcon />
      <h1>CalculateIcon</h1>
      <CameraIcon />
      <h1>CameraIcon</h1>
      <Cards />
      <h1>Cards</h1>
      <CardViewIcon />
      <h1>CardViewIcon</h1>
      <ChartDisableIcon />
      <h1>ChartDisableIcon</h1>
      <ChartIcon />
      <h1>ChartIcon</h1>
      <CheckmarkCircleFillIcon />
      <h1>CheckmarkCircleFillIcon</h1>
      <CheckmarkCircleIcon />
      <h1>CheckmarkCircleIcon</h1>
      <CheckmarkIcon />
      <h1>CheckmarkIcon</h1>
      <ChevronDownIcon />
      <h1>ChevronDownIcon</h1>
      <ChevronLeftIcon />
      <h1>ChevronLeftIcon</h1>
      <ChevronRightIcon />
      <h1>ChevronRightIcon</h1>
      <ChevronUpIcon />
      <h1>ChevronUpIcon</h1>
      <CircleOutlineIcon />
      <h1>CircleOutlineIcon</h1>
      <CloseIcon />
      <h1>CloseIcon</h1>
      <CogIcon />
      <h1>CogIcon</h1>
      <Coin98Icon />
      <h1>Coin98Icon</h1>
      <CoinbaseWalletIcon />
      <h1>CoinbaseWalletIcon</h1>
      <CommunityFilledIcon />
      <h1>CommunityFilledIcon</h1>
      <CommunityIcon />
      <h1>CommunityIcon</h1>
      <CopyIcon />
      <h1>CopyIcon</h1>
      <CrownIcon />
      <h1>CrownIcon</h1>
      <CurrencyIcon />
      <h1>CurrencyIcon</h1>
      <DiscordIcon />
      <h1>DiscordIcon</h1>
      <EarnFilledIcon />
      <h1>EarnFilledIcon</h1>
      <EarnFillIcon />
      <h1>EarnFillIcon</h1>
      <EarnIcon />
      <h1>EarnIcon</h1>
      <EllipsisIcon />
      <h1>EllipsisIcon</h1>
      <ErrorIcon />
      <h1>ErrorIcon</h1>
      <ExpandIcon />
      <h1>ExpandIcon</h1>
      <FarmIcon />
      <h1>FarmIcon</h1>
      <GithubIcon />
      <h1>GithubIcon</h1>
      <GroupsIcon />
      <h1>GroupsIcon</h1>
      <HamburgerCloseIcon />
      <h1>HamburgerCloseIcon</h1>
      <HamburgerIcon />
      <h1>HamburgerIcon</h1>
      <HelpIcon />
      <h1>HelpIcon</h1>
      <HistoryIcon />
      <h1>HistoryIcon</h1>
      <HomeIcon />
      <h1>HomeIcon</h1>
      <HotIcon />
      <h1>HotIcon</h1>
      <IfoIcon />
      <h1>IfoIcon</h1>
      <InfoIcon />
      <h1>InfoIcon</h1>
      <InstagramIcon />
      <h1>InstagramIcon</h1>
      <LanguageCurrencyIcon />
      <h1>LanguageCurrencyIcon</h1>
      <LanguageIcon />
      <h1>LanguageIcon</h1>
      <LaurelLeftIcon />
      <h1>LaurelLeftIcon</h1>
      <LaurelRightIcon />
      <h1>LaurelRightIcon</h1>
      <LineGraphIcon />
      <h1>LineGraphIcon</h1>
      <ListViewIcon />
      <h1>ListViewIcon</h1>
      <LockIcon />
      <h1>LockIcon</h1>
      <LoginIcon />
      <h1>LoginIcon</h1>
      <LogoIcon />
      <h1>LogoIcon</h1>
      <LogoRoundIcon />
      <h1>LogoRoundIcon</h1>
      <LogoutIcon />
      <h1>LogoutIcon</h1>

      <MathWalletIcon />
      <h1>MathWalletIcon</h1>
      <MedalBronzeIcon />
      <h1>MedalBronzeIcon</h1>
      <MedalGoldIcon />
      <h1>MedalGoldIcon</h1>
      <MedalPurpleIcon />
      <h1>MedalPurpleIcon</h1>
      <MedalSilverIcon />
      <h1>MedalSilverIcon</h1>
      <MedalTealIcon />
      <h1>MedalTealIcon</h1>
      <MediumIcon />
      <h1>MediumIcon</h1>
      <MetamaskIcon />
      <h1>MetamaskIcon</h1>
      <MinusIcon />
      <h1>MinusIcon</h1>
      <MoonIcon />
      <h1>MoonIcon</h1>
      <MoreHorizontalIcon />
      <h1>MoreHorizontalIcon</h1>
      <MoreIcon />
      <h1>MoreIcon</h1>
      <MoreVerticalIcon />
      <h1>MoreVerticalIcon</h1>
      <NftFilledIcon />
      <h1>NftFilledIcon</h1>
      <NftFillIcon />
      <h1>NftFillIcon</h1>
      <NftIcon />
      <h1>NftIcon</h1>
      <NoProfileAvatarIcon />
      <h1>NoProfileAvatarIcon</h1>
      <OpenNewIcon />
      <h1>OpenNewIcon</h1>
      <OperaIcon />
      <h1>OperaIcon</h1>
      <PancakeRoundIcon />
      <h1>PancakeRoundIcon</h1>
      <PencilIcon />
      <h1>PencilIcon</h1>
      <PlayCircleOutlineIcon />
      <h1>PlayCircleOutlineIcon</h1>
      <PocketWatchIcon />
      <h1>PocketWatchIcon</h1>
      <PoolIcon />
      <h1>PoolIcon</h1>
      <PredictionsIcon />
      <h1>PredictionsIcon</h1>
      <PresentCheckIcon />
      <h1>PresentCheckIcon</h1>
      <PresentNoneIcon />
      <h1>PresentNoneIcon</h1>
      <PresentWonIcon />
      <h1>PresentWonIcon</h1>
      <PrizeIcon />
      <h1>PrizeIcon</h1>
      <ProgressBunny />
      <h1>ProgressBunny</h1>
      <ProposalIcon />
      <h1>ProposalIcon</h1>
      <RedditIcon />
      <h1>RedditIcon</h1>
      <RefreshIcon />
      <h1>RefreshIcon</h1>
      <RemoveIcon />
      <h1>RemoveIcon</h1>
      <ResourcesFilledIcon />
      <h1>ResourcesFilledIcon</h1>
      <ResourcesIcon />
      <h1>ResourcesIcon</h1>
      <SafePalIcon />
      <h1>SafePalIcon</h1>
      <SearchIcon />
      <h1>SearchIcon</h1>
      <SellIcon />
      <h1>SellIcon</h1>
      <ShareIcon />
      <h1>ShareIcon</h1>
      <ShrinkIcon />
      <h1>ShrinkIcon</h1>
      <SmallDotIcon />
      <h1>SmallDotIcon</h1>
      <SmartContractIcon />
      <h1>SmartContractIcon</h1>
      <SplitIcon />
      <h1>SplitIcon</h1>
      <StarFillIcon />
      <h1>StarFillIcon</h1>
      <StarLineIcon />
      <h1>StarLineIcon</h1>
      <SunIcon />
      <h1>SunIcon</h1>
      <SwapFillIcon />
      <h1>SwapFillIcon</h1>
      <SwapIcon />
      <h1>SwapIcon</h1>
      <SwapVertIcon />
      <h1>SwapVertIcon</h1>
      <SyncAltIcon />
      <h1>SyncAltIcon</h1>
      <TeamBattleIcon />
      <h1>TeamBattleIcon</h1>
      <TeamPlayerIcon />
      <h1>TeamPlayerIcon</h1>
      <TelegramIcon />
      <h1>TelegramIcon</h1>
      <TestnetIcon />
      <h1>TestnetIcon</h1>
      <TicketFillIcon />
      <h1>TicketFillIcon</h1>
      <TicketRound />
      <h1>TicketRound</h1>
      <TimerIcon />
      <h1>TimerIcon</h1>
      <TokenPocketIcon />
      <h1>TokenPocketIcon</h1>
      <TradeFilledIcon />
      <h1>TradeFilledIcon</h1>
      <TradeIcon />
      <h1>TradeIcon</h1>
      <TradingViewIcon />
      <h1>TradingViewIcon</h1>
      <TrophyFillIcon />
      <h1>TrophyFillIcon</h1>
      <TrophyGoldIcon />
      <h1>TrophyGoldIcon</h1>
      <TrophyIcon />
      <h1>TrophyIcon</h1>
      <TrustWalletIcon />
      <h1>TrustWalletIcon</h1>
      <TuneIcon />
      <h1>TuneIcon</h1>
      <TwitterIcon />
      <h1>TwitterIcon</h1>
      <UnlockIcon />
      <h1>UnlockIcon</h1>
      <VerifiedIcon />
      <h1>VerifiedIcon</h1>
      <VisibilityOff />
      <h1>VisibilityOff</h1>
      <VisibilityOn />
      <h1>VisibilityOn</h1>
      <VolumeOffIcon />
      <h1>VolumeOffIcon</h1>
      <VolumeUpIcon />
      <h1>VolumeUpIcon</h1>
      <VoteIcon />
      <h1>VoteIcon</h1>
      <WaitIcon />
      <h1>WaitIcon</h1>
      <WalletConnectIcon />
      <h1>WalletConnectIcon</h1>
      <WalletFilledIcon />
      <h1>WalletFilledIcon</h1>
      <WalletIcon />
      <h1>WalletIcon</h1>
      <WarningIcon />
      <h1>WarningIcon</h1>
      <Svg />
      <h1>Svg</h1>
    </Page>
  )
}

export default Exchange
