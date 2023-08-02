import { Button, useWalletModal, ButtonProps } from '@pancakeswap/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'contexts/Localization'
import Trans from './Trans'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'

const ConnectWallet = styled(Button)`
  background: linear-gradient(270deg, rgb(51, 212, 250) 0%, rgb(23, 243, 221) 100%);
  color: rgb(14, 19, 33);
`

const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout, t)
  const { account } = useWeb3React()

  return (
    <ConnectWallet variants={'danger'} onClick={onPresentConnectModal} {...props}>
      {children || <Trans>Connect Wallet</Trans>}
    </ConnectWallet>
  )
}

export default ConnectWalletButton
