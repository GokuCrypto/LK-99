import { Flex, UserMenuItem, WarningIcon, useModal } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { FetchStatus } from 'config/constants/types'
import { LOW_BNB_BALANCE } from './WalletModal'
import Invite from './Invite'
interface WalletUserMenuItemProps {
  isWrongNetwork: boolean
  onPresentWalletModal: () => void
}

const WalletUserMenuItem: React.FC<WalletUserMenuItemProps> = ({ isWrongNetwork, onPresentWalletModal }) => {
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetBnbBalance()
  const hasLowBnbBalance = fetchStatus === FetchStatus.Fetched && balance.lte(LOW_BNB_BALANCE)
  const [onInvite] = useModal(<Invite />)
  return (
    <>
      <UserMenuItem as="button" onClick={onPresentWalletModal}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Wallet')}
          {hasLowBnbBalance && !isWrongNetwork && <WarningIcon color="warning" width="24px" />}
          {isWrongNetwork && <WarningIcon color="failure" width="24px" />}
        </Flex>
      </UserMenuItem>
      {/*  <UserMenuItem as="button" onClick={onInvite}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Invite')}
          {hasLowBnbBalance && !isWrongNetwork && <WarningIcon color="warning" width="24px" />}
          {isWrongNetwork && <WarningIcon color="failure" width="24px" />}
        </Flex>
      </UserMenuItem> */}
    </>
  )
}

export default WalletUserMenuItem
