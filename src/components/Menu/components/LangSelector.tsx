import React from 'react'
import styled from 'styled-components'
// import Text from "../../../components/Text/Text";
// import Dropdown from "../../../components/Dropdown/Dropdown";
// import Button from "../../../components/Button/Button";
// import LanguageIcon from "../../../components/Svg/Icons/Language";
// import { Language } from "../types";
// import MenuButton from "./MenuButton";

import { Text, Dropdown, Button, LanguageIcon, Language } from '@pancakeswap/uikit'

const MenuButton = styled(Button)`
  color: ${({ theme }) => theme.colors.text};
  // padding: 0 8px;
  border-radius: 8px;
`
MenuButton.defaultProps = {
  variant: 'text',
  size: 'sm',
}

interface Props {
  currentLang: string
  langs: Language[]
  setLang: (lang: Language) => void
}

const LangSelector: React.FC<Props> = ({ currentLang, langs, setLang }) => (
  <Dropdown
    position="top-right"
    target={
      <Button variant="text" p={1} startIcon={<LanguageIcon color="backgroundAlt" width="20px" />}>
        <Text color="backgroundAlt">{currentLang?.toUpperCase()}</Text>
      </Button>
    }
  >
    {langs.map((lang) => (
      <MenuButton
        key={lang.locale}
        fullWidth
        onClick={() => setLang(lang)}
        // Safari fix
        style={{ minHeight: '32px', height: 'auto' }}
      >
        {lang.language}
      </MenuButton>
    ))}
  </Dropdown>
)

export default React.memo(LangSelector, (prev, next) => prev.currentLang === next.currentLang)
