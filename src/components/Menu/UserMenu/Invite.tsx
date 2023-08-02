import {
  Flex,
  InjectedModalProps,
  Modal,
  TelegramIcon,
  LinkExternal,
  Text,
  Input,
  ButtonMenu,
  ButtonMenuItem,
  Button,
  Table,
  Td,
  Th,
} from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import CopyAddress from './CopyAddress'
import { useEffect, useState } from 'react'
import useToast from 'hooks/useToast'
import { getContractHandler } from 'hooks/ethereum'
import { ToastDescriptionWithTx } from 'components/Toast'
import Row from 'components/Layout/Row'
import { Constants } from 'hooks/WolfConfig'
import { ethers } from 'ethers'
const ScrollableContainer = styled(Flex)`
  flex-direction: column;
  max-height: 400px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-height: none;
  }
`
const Tabs = styled.div`
  background-color: ${({ theme }) => theme.colors.dropdown};
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  padding: 16px 24px;
`

export class rewardInfo {
  rewardAddress: string
  rewardNumber: number
  status: number
  id: number
}

const approveBUSDTo = async (to = Constants.Contract.MintInvite) => {
  const contract = await getContractHandler('BUSD')
  if (!contract) return
  const res = await contract.approve(to, ethers.constants.MaxUint256)
  // eslint-disable-next-line consistent-return
  return res
}

const isBUSDApprovedTo = async (address: string, to = Constants.Contract.MintInvite) => {
  const contractss = await getContractHandler('BUSD')

  if (!contractss) return false
  const res = await contractss.allowance(address, to)
  console.log('resresres', res)
  if (res._hex === '0x00') return false
  return true
}

const SettingsModal: React.FC<InjectedModalProps> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  /*   const account = '0x217e48f9ebeab33ddf2831759c83a8d522cd38bf' */

  const [view, setView] = useState(0)

  const [inviteNum, setInviteNum] = useState(0)

  const [received, setReceived] = useState(0)

  const [rewarded, setRewarded] = useState(0)

  const [inviteList, setInviteList] = useState<any>([])

  const [rewardInfoList, setRewardInfoList] = useState<rewardInfo[]>([])

  const [auditAddr, setAuditAddr] = useState<string[]>([
    '0x99434fE3FD0405607e3f10f0Aa9d880D850EEEeA',
    '0xbcDF8496b79D6b3C001dDC63E2880d7afF1AB359',
  ])

  let invateLink = 'https://swap.ancientraid.com/Mint?invite='
  const { toastSuccess, toastError } = useToast()
  if (account) {
    // 对字符串进行base64编码
    let buffer = Buffer.from(account)
    console.log(buffer.toString('base64')) // MTIz
    invateLink += buffer.toString('base64')
    // 对base64编码字符串进行解码
    // 读取base64字符串
    buffer = Buffer.from(buffer.toString('base64'), 'base64')
    // 进行解码
    console.log(buffer.toString()) // 123
  }

  const handleClick = (newIndex: number) => {
    setView(newIndex)
    getInfo(newIndex)
  }
  //查询邀请奖励

  const audit = async (ind: number) => {
    const contract = await getContractHandler('MintInvite')
    if (!contract) return

    const isbUSDApprovedToInvite = await isBUSDApprovedTo(account, Constants.Contract.MintInvite)

    if (!isbUSDApprovedToInvite) await approveBUSDTo(Constants.Contract.MintInvite)
    toastSuccess(`${t('Audit')}!`, <ToastDescriptionWithTx>{t('Approved Busd To Invite')}</ToastDescriptionWithTx>)

    try {
      const res = await contract.updateRewardInfoAuto(ind)
      toastSuccess(`${t('Audit')}!`, <ToastDescriptionWithTx>{t('Successful!')}</ToastDescriptionWithTx>)
    } catch (e) {
      console.log('eeeeeeeeee', e)
      toastError(`${t('Audit')}!`, <ToastDescriptionWithTx>{t('error')}</ToastDescriptionWithTx>)
    }
    // eslint-disable-next-line consistent-return
  }

  const reward = async () => {
    const contract = await getContractHandler('MintInvite')
    if (!contract) return
    try {
      const res = await contract.getinviteUsdt()

      toastSuccess(
        `${t('Rewards')}!`,
        <ToastDescriptionWithTx>{t('Successful submission of reward application!')}</ToastDescriptionWithTx>,
      )
    } catch (e) {
      console.log('eeeeeeeeee', e)
      toastError(
        `${t('Rewards')}!`,
        <ToastDescriptionWithTx>{t('Must have NFT, or the data to be received is not 0')}</ToastDescriptionWithTx>,
      )
    }

    // eslint-disable-next-line consistent-return
  }

  const getInfo = async (index: number) => {
    const contract = await getContractHandler('MintInvite')
    if (!contract) return []

    if (index == 0) {
      //待领取奖励
      const res1 = await contract.toBeIssued(account)
      //已邀请数据
      const res2 = await contract.invitePeoPleList(account)

      if (res2 > 0) {
        let resultList = []
        for (var i = 0; i < res2; i++) {
          const res4 = await contract.inviteAddressList(account, i)
          resultList.push(res4)
        }
        setInviteList(resultList)
      }
      //已领取数据
      const res3 = await contract.inviteRewardList(account)
      setInviteNum(res2)
      setReceived(res1 / 10 ** 18)
      setRewarded(res3 / 10 ** 18)
    } else {
      //审核数据

      const res0 = await contract.getRewardInfoListLength()
      let res1 = []
      for (var i = 1; i < 1 + res0 / 50; i++) {
        const res11 = await contract.getRewardInfoListForID(i)
        res1.push(...res11)
      }

      setRewardInfoList(res1)
    }

    //
    // eslint-disable-next-line consistent-return
  }

  useEffect(() => {
    getInfo(0)
  }, [])

  console.log('auditAddr.indexOf(account)', auditAddr.indexOf(account))

  return (
    <Modal
      title={t('Invite Support')}
      headerBackground="gradients.cardHeader"
      onDismiss={onDismiss}
      style={{
        width: view !== 2 ? '420px' : '960px',
        maxWidth: view !== 2 ? '420px' : '960px',
        textAlign: 'center',
      }}
    >
      <Tabs>
        <ButtonMenu scale="sm" variant="subtle" onItemClick={handleClick} activeIndex={view} fullWidth>
          <ButtonMenuItem>{t('Link')}</ButtonMenuItem>
          <ButtonMenuItem>{t('List')}</ButtonMenuItem>
          {auditAddr.indexOf(account) >= 0 ? <ButtonMenuItem>{t('Audit')}</ButtonMenuItem> : <></>}
        </ButtonMenu>
      </Tabs>

      {view === 0 && (
        <>
          <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
            {t('Your Link')}
          </Text>
          <CopyAddress account={invateLink} mb="24px" />
          <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
            {t('Number of people invited')}
          </Text>
          <Input readOnly value={inviteNum} />
          <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
            {t('Reward to be received')}
          </Text>
          <Input readOnly value={received} />
          <Text color="secondary" fontSize="12px" textTransform="uppercase" fontWeight="bold" mb="8px">
            {t('Received reward')}
          </Text>
          <Input readOnly value={rewarded} />
          <Button m="8px" onClick={reward}>
            {t('Receive rewards')}
          </Button>
        </>
      )}

      {view === 1 && (
        <>
          <Table>
            <thead>
              <tr>
                <Th>index</Th>
                <Th>Invitation address</Th>
              </tr>
            </thead>
            <tbody>
              {inviteList.map((val, idex) => (
                <tr>
                  <Td>{idex + 1}</Td>
                  <Td>{val}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {view === 2 && (
        <>
          <Table>
            <thead>
              <tr>
                <Th>{t('address')}</Th>
                <Th>{t('number')}</Th>
                <Th>{t('status')}</Th>
                <Th>{t('option')}</Th>
              </tr>
            </thead>
            <tbody>
              {rewardInfoList.map((item, ind) =>
                item.rewardAddress != '0x0000000000000000000000000000000000000000' ? (
                  <tr>
                    <Td>{item.rewardAddress} </Td>
                    <Td>{item.rewardNumber / 10 ** 18} </Td>
                    <Td>{item.status == 0 ? 'To be reviewed' : 'Reviewed'} </Td>
                    <Td>
                      <Button
                        variant={item.status == 0 ? 'primary' : 'subtle'}
                        onClick={() => {
                          audit(item.id)
                        }}
                      >
                        {t('Audit rewards')}
                      </Button>
                    </Td>
                  </tr>
                ) : (
                  <></>
                ),
              )}
            </tbody>
          </Table>
        </>
      )}
    </Modal>
  )
}

export default SettingsModal
