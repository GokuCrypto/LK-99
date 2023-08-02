import BigNumber from 'bignumber.js'
import { Flex, Grid, Text, useMatchBreakpoints } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useRouter } from 'next/router'
import React, { useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { useGetItems, useGetWarriorItems } from 'state/marketplace/hooks'
import { NftOrder } from 'state/types'
import orderBy from 'lodash/orderBy'
import Select, { OptionProps } from 'components/Select/Select'
import { getFullDisplayBalance } from 'utils/formatBalance'
import { useFetchTradeStats } from '../hooks'
import OrderCard from './OrderCard'
import { RACES, ATTRIBUTES } from '../helpers'

interface OrderListProps {
  itemType: "Hero" | "Warrior"
  orders: NftOrder[]
  ordersCount: number
}

const SORT_FIELD = {
  createdAt: 'createdAt',
  showSheeps: 'showSheeps',
  showWolves: 'showWolves',
  lowestPrice: 'lowestPrice',
  highestPrice: 'highestPrice',
}

const Unit = styled.span`
  font-size: 14px;
`

const OrderList: React.FC<OrderListProps> = ({ itemType, orders, ordersCount }) => {
  const { t } = useTranslation()
  const { asPath } = useRouter()
  const { isMobile } = useMatchBreakpoints()
  const items = itemType === "Hero" ?  useGetItems() : useGetWarriorItems()
  const [sortField, setSortField] = useState(null)
  const [filterByRace, setFilterByRace] = useState(null)
  const [filterByAttr, setFilterByAttr] = useState(null)
  const { dataLoaded: statsLoaded, stats } = useFetchTradeStats()

  const handleSort = useCallback(
    (newField: string) => {
      setSortField(newField)
    },
    [sortField],
  )

  const handleFilterByRace = useCallback(
    (val: string) => {
      setFilterByRace(val)
    },
    [filterByRace],
  )
  const handleFilterByAttr = (val: string) => {
    setFilterByAttr(val)
  }

  const raceOptions = [
    {
      label: 'All',
      value: null,
    },
  ].concat(
    Object.keys(RACES).map((k) => {
      return {
        label: RACES[k],
        value: k,
      }
    }),
  )

  const attributeOptions = [
    {
      label: 'All',
      value: null,
    },
  ].concat(
    Object.keys(ATTRIBUTES).map((k) => {
      return {
        label: ATTRIBUTES[k],
        value: k,
      }
    }),
  )

  const showOrders = useMemo(() => {
    let filteredOrders = filterByRace
      ? orders.filter(
          (o) =>
            items && items[o.nftId]?.race.toString() === filterByRace
        )
      : orders
    filteredOrders = filterByAttr
      ? filteredOrders.filter(
          (o) =>
            items &&
            items[o.nftId] &&
            items[o.nftId]?.attribute.toString() === filterByAttr
        )
      : filteredOrders

    if (sortField === SORT_FIELD.highestPrice) {
      return orderBy(filteredOrders, (o) => parseFloat(o.price), 'desc')
    }
    if (sortField === SORT_FIELD.lowestPrice) {
      return orderBy(filteredOrders, (o) => parseFloat(o.price), 'asc')
    }
    if (sortField === SORT_FIELD.createdAt) {
      return orderBy(filteredOrders, (o) => o.createdAt, 'desc')
    }
    return orderBy(filteredOrders, (o) => o.createdAt, 'desc')
  }, [sortField, orders, items, filterByRace, filterByAttr])

  const showFloorPrice = asPath === '/Marketplace'
  const priceLowestOrder = orderBy(showOrders, (o) => parseFloat(o.price), 'asc')[0]
  const floorPrice = getFullDisplayBalance(new BigNumber(priceLowestOrder?.price || 0), 18)

  const [forceClose, setForceClose] = useState([false, false, false])

  const onRaceFilterOpen = () => {
    setForceClose([false, true, true])
  }
  const onAttrFilterOpen = () => {
    setForceClose([true, false, true])
  }
  const onSorterOpen = () => {
    setForceClose([true, true, false])
  }
  return (
    <Flex flexDirection="column">
      <Flex mb="20px" flexDirection={['column', null, null, 'row']} alignItems={isMobile ? 'flex-start' : 'center'}>
        <Flex mb="10px">
          <Flex flexDirection="column" alignItems="center" mx="8px">
            <Text color="text" fontSize="14px">
              {t('Total Listed')}
            </Text>
            <Text color="#fff" fontSize="20px">
              {showOrders.length}
            </Text>
          </Flex>
          {showFloorPrice ? (
            <>
              <Flex flexDirection="column" alignItems="center" mx="8px">
                <Text color="text" fontSize="14px">
                  {t('Total Volume')}
                </Text>
                <Text color="#fff" fontSize="20px">
                  {statsLoaded ? stats.totalVolume : '--'} <Unit>$RAID</Unit>
                </Text>
              </Flex>
              <Flex flexDirection="column" alignItems="center" mx="8px">
                <Text color="text" fontSize="14px">
                  {t('24H Volume')}
                </Text>
                <Text color="#fff" fontSize="20px">
                  {statsLoaded ? stats.volume : '--'} <Unit>$RAID</Unit>
                </Text>
              </Flex>
              <Flex flexDirection="column" alignItems="center" mx="8px">
                <Text color="text" fontSize="14px">
                  {t('24H Traded')}
                </Text>
                <Text color="#fff" fontSize="20px">
                  {statsLoaded ? stats.count : '--'}
                </Text>
              </Flex>
            </>
          ) : null}

          {showFloorPrice && (
            <Flex flexDirection="column" alignItems="center" mx="10px">
              <Text color="text" fontSize="14px">
                {t('Floor Price')}
              </Text>
              <Text color="#fff" fontSize="20px">
                {floorPrice} <Unit>$RAID</Unit>
              </Text>
            </Flex>
          )}
        </Flex>
        <Flex mb="10px" mr="10px" ml="20px" flexDirection="column">
          <Text color="text" width="90px" fontSize="14px">
            {t('Filter by Race')}
          </Text>
          <Select
            options={raceOptions}
            onOpen={onRaceFilterOpen}
            forceClose={forceClose[0]}
            placeHolderText={t('All')}
            onOptionChange={(option: OptionProps) => handleFilterByRace(option.value)}
          />
        </Flex>
        <Flex mb="10px" mr="10px" flexDirection="column" minWidth="120px">
          <Text color="text" width="120px" fontSize="14px">
            {t('Filter by Attribute')}
          </Text>
          <Select
            options={attributeOptions}
            onOpen={onAttrFilterOpen}
            forceClose={forceClose[1]}
            placeHolderText={t('All')}
            onOptionChange={(option: OptionProps) => handleFilterByAttr(option.value)}
          />
        </Flex>
        <Flex mb="10px" flexDirection="column" minWidth="200px">
          <Text color="text" width="120px" fontSize="14px">
            {t('Sort By')}
          </Text>
          <Select
            onOpen={onSorterOpen}
            forceClose={forceClose[2]}
            options={[
              {
                label: t('Recently listed'),
                value: SORT_FIELD.createdAt,
              },
              {
                label: t('Price low to high'),
                value: SORT_FIELD.lowestPrice,
              },
              {
                label: t('Price high to low'),
                value: SORT_FIELD.highestPrice,
              },
            ]}
            placeHolderText={t('Recently listed')}
            onOptionChange={(option: OptionProps) => handleSort(option.value)}
          />
        </Flex>
      </Flex>
      <Grid
        gridGap="20px"
        gridTemplateColumns={['1fr', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)']}
        mb="100px"
      >
        {showOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </Grid>
    </Flex>
  )
}

export default OrderList
