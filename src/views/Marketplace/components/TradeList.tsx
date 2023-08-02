import BigNumber from 'bignumber.js'
import { Flex, Grid, Text, useMatchBreakpoints, Table, Td, Th, ArrowBackIcon, ArrowForwardIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useGetItems } from 'state/marketplace/hooks'
import TableLoader from 'components/TableLoader'
import { NftOrder } from 'state/types'
import orderBy from 'lodash/orderBy'
import Select, { OptionProps } from 'components/Select/Select'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { PageButtons, Arrow } from 'views/Nft/market/components/PaginationButtons'
import OrderCard from './OrderCard'
import { RACES, ATTRIBUTES } from '../helpers'
import { useFetchTradeHistory } from '../hooks'
import TradeRow from './TradeRow'

const MAX_PER_PAGE = 10
const TradeList: React.FC = () => {
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const { isMobile, isXs, isSm } = useMatchBreakpoints()
  const { dataLoaded, trades } = useFetchTradeHistory()
  const [ queryPage, setQueryPage ] = useState(1)
  const [paginationData, setPaginationData] = useState<{
    trades: any[]
    currentPage: number
    maxPage: number
  }>({
    trades: [],
    currentPage: 1,
    maxPage: 1,
  })

  useEffect(() => {
    setPaginationData({
      trades: trades.slice((queryPage - 1) * MAX_PER_PAGE, queryPage * MAX_PER_PAGE),
      currentPage: queryPage,
      maxPage: Math.ceil(trades.length / MAX_PER_PAGE)
    })
  }, [dataLoaded, trades, queryPage])

  return (
    <>
      <Table>
        <thead>
          <tr>
            <Th textAlign={['center', null, 'left']}> {t('Item ID')}</Th>
            <Th textAlign="right"> {t('Price')}</Th>
            {
              isXs || isSm ? null : (
                <>
                  <Th textAlign="center"> {t('Race')}</Th>
                  <Th textAlign="center"> {t('Attribute')}</Th>
                </>
              )
            }
            <Th textAlign="center"> {t('Date')}</Th>
            {isXs || isSm ? null : <Th />}
          </tr>
        </thead>

        <tbody>
          {!dataLoaded ? (
            <TableLoader />
          ) : (
            paginationData.trades.map((trade) => {
              return (
                <TradeRow trade={trade} key={`${trade.txHash}`} />
              )
            })
          )}
        </tbody>
      </Table>
      <Flex
        borderTop={`1px #fff solid`}
        pt="12px"
        pb="24px"
        flexDirection="column"
        justifyContent="space-between"
      >
        <PageButtons>
          <Arrow
            onClick={() => {
              if (paginationData.currentPage !== 1) {
                setQueryPage((prevState) => prevState - 1)
              }
            }}
          >
            <ArrowBackIcon color={paginationData.currentPage === 1 ? 'textDisabled' : 'primary'} />
          </Arrow>
          <Text color="#fff">
            {t('Page %page% of %maxPage%', {
              page: paginationData.currentPage,
              maxPage: paginationData.maxPage,
            })}
          </Text>
          <Arrow
            onClick={() => {
                if(paginationData.currentPage < paginationData.maxPage) {
                  setQueryPage((prevState) => prevState + 1)
                }
              }
            }
          >
            <ArrowForwardIcon
              color={paginationData.currentPage === paginationData.maxPage ? 'textDisabled' : 'primary'}
            />
          </Arrow>
        </PageButtons>
      </Flex>
    </>
  )
}

export default TradeList
