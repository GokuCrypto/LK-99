import {
  Box,
  Flex,
  Text,
  Td,
  IconButton,
  Link,
  OpenNewIcon,
  useMatchBreakpoints,
  useModal,
  Skeleton,
} from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { Activity, NftToken } from 'state/nftMarket/types'
import { Price } from '@pancakeswap/sdk'
import { getBscScanLink } from 'utils'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { StyledTd } from '../styles'
// import ProfileCell from 'views/Nft/market/components/ProfileCell'
// import MobileModal from './MobileModal'
// import ActivityPrice from './ActivityPrice'
// import ActivityEventText from './ActivityEventText'
// import { nftsBaseUrl, pancakeBunniesAddress } from '../../constants'
// import NFTMedia from '../NFTMedia'

interface TradeRowProps {
  trade: any
}

const TradeRow: React.FC<TradeRowProps> = ({
  trade
}) => {
  const { chainId } = useActiveWeb3React()
  const { isXs, isSm } = useMatchBreakpoints()
  // const priceAsFloat = parseFloat(activity.price)
  const timestampAsMs = parseFloat(trade?.timestamp) * 1000
  const localeTimestamp = new Date(timestampAsMs).toLocaleString(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <tr>
      <StyledTd> { trade.itemType && trade.itemType == 'warrior' ? 'Warrior' : 'Hero' }#{ trade.tokenId } </StyledTd>
      <StyledTd textAlign="right">
        { trade?.price } $RAID
      </StyledTd>
      {
        isXs || isSm ? null : (
          <>
            <StyledTd textAlign="center"> { trade.race  } </StyledTd>
            <StyledTd textAlign="center"> { trade.attribute } </StyledTd>
          </>
        )
      }
      <StyledTd>
        <Flex justifyContent="center">
          <Text color="white" textAlign="center" fontSize={isXs || isSm ? '12px' : '16px'}>
            {localeTimestamp}
          </Text>
        </Flex>
      </StyledTd>
      {isXs || isSm ? null : (
        <StyledTd>
          <IconButton as={Link} external href={getBscScanLink(trade.txHash, 'transaction', chainId)}>
            <OpenNewIcon color="textSubtle" width="18px" />
          </IconButton>
        </StyledTd>
      )}
    </tr>
  )
}

export default TradeRow
