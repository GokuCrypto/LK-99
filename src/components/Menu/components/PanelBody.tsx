import React from 'react'
import styled from 'styled-components'
// import { useLocation } from "react-router-dom";
import { useRouter } from 'next/router'
import { SvgProps, Link } from '@pancakeswap/uikit'
import NextLink from 'next/link'
// import * as IconModule from "../icons";
import Accordion from './Accordion'
import { MenuEntry, LinkLabel, LinkStatus } from './MenuEntry'
import { PanelProps, PushedProps } from '../types'
import Icon from '../icons'

interface Props extends PanelProps, PushedProps {
  isMobile: boolean
}

// const Icons = IconModule as unknown as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  overflow-x: hidden;
  height: 60px;
  padding-top: 0px;
`

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const { pathname } = useRouter()

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined

  return (
    <Container>
      {links.map((entry) => {
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined

        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item) => item.href === pathname)
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0

          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={<Icon name={entry.icon} />}
              label={entry.label}
              status={entry.status}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={entry.items.some((item) => item.href === pathname)}
            >
              {isPushed &&
                entry.items.map((item) => (
                  <MenuEntry key={item.href} secondary isActive={item.href === pathname} onClick={handleClick}>
                    <NextLink href={item.href} passHref>
                      <a href={entry.href}>{item.label}</a>
                    </NextLink>
                  </MenuEntry>
                ))}
            </Accordion>
          )
        }
        return (
          <MenuEntry key={entry.label} isActive={entry.href === pathname} className={calloutClass}>
            <NextLink color="#eaeaea" href={entry.href}>
              <a href={entry.href}>
                <Icon name={entry.icon} />
                {entry.label}
              </a>
            </NextLink>
          </MenuEntry>
        )
      })}
    </Container>
  )
}

export default PanelBody
