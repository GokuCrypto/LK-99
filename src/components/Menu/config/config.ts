import {
  MenuItemsType, SyncAltIcon, HomeIcon, Cards, NftFillIcon, CopyIcon, EarnFilledIcon, AutoRenewIcon
} from '@pancakeswap/uikit'
import { DropdownMenuItems } from '@pancakeswap/uikit/src/components/DropdownMenu/types'
import { ContextApi } from 'contexts/Localization/types'
import {
  BarnIcon, GiftIcon,
  MarketplaceIcon, SheepIcon, WolfIcon
} from '../icons'
import { MenuEntry } from '../types'

export type ConfigMenuDropDownItemsType = DropdownMenuItems & { hideSubNav?: boolean }
export type ConfigMenuItemsType = Omit<MenuItemsType, 'items'> & { hideSubNav?: boolean } & {
  items?: ConfigMenuDropDownItemsType[]
}

export const MENU_HEIGHT = 64
export const MENU_ENTRY_HEIGHT = 48
export const SIDEBAR_WIDTH_FULL = 240
export const SIDEBAR_WIDTH_REDUCED = 56

export const sideMenuLinks: (t: ContextApi['t']) => MenuEntry[] = (t) => [
  {
    label: t('Home'),
    icon: 'SyncAlt',
    href: '/',
  },
  {
    label: t('Coming Soon'),
    icon: 'SyncAlt',
    href: '/ComingSoon',

  },
  // {
  //   label: t('Forum'),
  //   icon: 'SyncAlt',
  //   href: '/ComingSoon',
  //
  // },
  //
  // {
  //   label: t('Counselling'),
  //   icon: 'SyncAlt',
  //   href: '/ComingSoon'
  // },
  //
  // {
  //   label: t('LK-99 Insurance'),
  //   icon: 'SyncAlt',
  //   href: '/ComingSoon'
  // },


  /*  {
     label: t('Token Exchange'),
     icon: 'SyncAlt',
     href: '/TokenExchange',
   }, */


  /*   {
      label: t('Exchange'),
      icon: 'SyncAlt',
      href: '/Exchange',
    }, */

  /*  {
     label: t('ICON'),
     icon: 'ICON',
     href: '/icon',
   }, */


]

export const socials = [
  {
    label: 'Twitter',
    icon: 'Twitter',
    href: '',
  },
  {
    label: 'Telegram',
    icon: 'Telegram',
    items: [
      {
        label: 'English',
        href: 'https://t.me/AncientRaid',
      }
    ],
  },

  /* {
    label: 'Facebook',
    icon: 'Facebook',
    href: 'https://www.facebook.com/ancientraid',
  },
 
  {
    label: 'Discord',
    icon: 'Discord',
    href: 'https://discord.gg/7QyRq9t9KV',
  } */
]

const config: (t: ContextApi['t'], languageCode?: string) => ConfigMenuItemsType[] = (t, languageCode) => [
  {
    label: t('Home'),
    href: '/',
    icon: HomeIcon,
    fillIcon: HomeIcon,
    showItemsOnMobile: false,
    height: "15px",
    width: "15px",
    items: [],
  },




  {
    label: t('Forum'),
    href: '/ComingSoon',
    icon: AutoRenewIcon,
    fillIcon: AutoRenewIcon,
    showItemsOnMobile: false,
    items: [],
  },

  {
    label: t('Counselling'),
    href: '/ComingSoon',
    icon: Cards,
    fillIcon: Cards,
    height: "15px",
    width: "15px",
    showItemsOnMobile: false,
    items: [],
  },
  {
    label: t('LK-99 Insurance'),
    href: '/ComingSoon',
    icon: EarnFilledIcon,
    fillIcon: EarnFilledIcon,
    height: "15px",
    width: "15px",
    showItemsOnMobile: false,
    items: [],
  },

]

export default config
