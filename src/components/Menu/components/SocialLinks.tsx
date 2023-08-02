import React from 'react'
import styled from 'styled-components'
import { Flex, Dropdown, Link } from '@pancakeswap/uikit'
import { socials } from '../config/config'
import Icon from '../icons'

const SocialLinks: React.FC = () => (
  <Flex alignItems="center">
    {socials.map((social, index) => {
      if (social.items) {
        return (
          <Dropdown key={social.label} position="top" target={<Icon name={social.icon} />}>
            {social.items.map((item) => (
              <Link external key={item.label} href={item.href} aria-label={item.label} color="textSubtle">
                {item.label}
              </Link>
            ))}
          </Dropdown>
        )
      }
      return (
        <Link external key={social.label} href={social.href} aria-label={social.label}>
          <Icon name={social.icon} />
        </Link>
      )
    })}
  </Flex>
)

export default React.memo(SocialLinks, () => true)
