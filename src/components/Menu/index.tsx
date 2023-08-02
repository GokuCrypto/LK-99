import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { Menu as UikitMenu, useMatchBreakpoints, Flex } from '@pancakeswap/uikit'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import PhishingWarningBanner from 'components/PhishingWarningBanner'
import useTheme from 'hooks/useTheme'

import { usePhishingBannerManager } from 'state/user/hooks'
import UserMenu from './UserMenu'
import { useMenuItems } from './hooks/useMenuItems'
import GlobalSettings from './GlobalSettings'
import { getActiveMenuItem, getActiveSubMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'
import { sideMenuLinks } from './config/config'
import Panel from './components/Panel'
import Header from './components/Header'

const Aside = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 80;
  display: flex;
  width: 100%;
  height: 60px;
`

const Menu = (props) => {
  const { isDark, setTheme } = useTheme()
  // const cakePriceUsd = usePriceCakeBusd()
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()
  const [showPhishingWarningBanner] = usePhishingBannerManager()
  const { isMobile } = useMatchBreakpoints()
  const menuItems = useMenuItems()

  const activeMenuItem = getActiveMenuItem({ menuConfig: menuItems, pathname })
  const activeSubMenuItem = getActiveSubMenuItem({ menuItem: activeMenuItem, pathname })

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const [showMenu, setShowMenu] = useState(true)
  const [isPushed, setIsPushed] = useState(!isMobile)

  return (
    <>
      <Aside>
        <Header
          isPushed={isPushed}
          isMobile={isMobile}
          showMenu={showMenu}
          isDark={isDark}
          toggleTheme={toggleTheme}
          langs={languageList}
          setLang={setLanguage}
          currentLang={currentLanguage.language}
          cakePriceUsd=""
          links={sideMenuLinks(t)}
          pushNav={setIsPushed}
        />
      </Aside>
      <UikitMenu
        linkComponent={(linkProps) => {
          return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
        }}
        userMenu={<UserMenu />}
        globalMenu={<GlobalSettings />}
        // banner={showPhishingWarningBanner && typeof window !== 'undefined' && <PhishingWarningBanner />}
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        // cakePriceUsd={cakePriceUsd.toNumber()}
        links={menuItems}
        subLinks={activeMenuItem?.hideSubNav || activeSubMenuItem?.hideSubNav ? [] : activeMenuItem?.items}
        // footerLinks={footerLinks(t)}
        activeItem={activeMenuItem?.href}
        activeSubItem={activeSubMenuItem?.href}
        background={' '}
        // buyCakeLabel={t('Buy CAKE')}
        {...props}
      />
    </>
  )
}

export default Menu
