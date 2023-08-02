import React from 'react'
import styled from 'styled-components'
import { CogIcon, IconButton, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { MENU_ENTRY_HEIGHT } from '../config/config'
import { PanelProps, PushedProps } from '../types'
// import CakePrice from "./CakePrice";
// import ThemeSwitcher from "./ThemeSwitcher";
import SocialLinks from './SocialLinks'
import LangSelector from './LangSelector'
import ConnectWalletButton from 'components/ConnectWalletButton'
import UserMenu from '../UserMenu'
interface Props extends PanelProps, PushedProps {}

const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex: none;
  padding: 5px ${({ isMobile }) => (isMobile ? '150px' : '100px')};
  // background-color: ${({ theme }) => theme.nav.background};
  // border-top: solid 2px rgba(133, 133, 133, 0.1);
`

const SettingsEntry = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  padding: 0 0px;
`

const SocialEntry = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: 0 20px;
  border-top: solid 1px #fff;
`

const PanelFooter: React.FC<Props> = ({
  isPushed,
  pushNav,
  toggleTheme,
  isDark,
  cakePriceUsd,
  currentLang,
  langs,
  setLang,
}) => {
  const { isMobile } = useMatchBreakpoints()
  /*   if (!isPushed) {
    return (
      <Container isMobile={isMobile}>
        <IconButton variant="text" onClick={() => pushNav(true)}>
          <CogIcon />
        </IconButton>
      </Container>
    )
  } */

  return (
    <Container isMobile={isMobile}>
      {/*   <SettingsEntry>
        {langs && langs.length > 0 && <LangSelector currentLang={currentLang} langs={langs} setLang={setLang} />}
        {cakePriceUsd && (
          <Text color="textSubtle" bold mr="20px">
            ${cakePriceUsd}
          </Text>
        )}
      </SettingsEntry>
      <SocialEntry>
        <SocialLinks />
      </SocialEntry> */}

      <UserMenu />
    </Container>
  )
}

export default PanelFooter
