/* eslint-disable global-require */

import { _getAddress, _getProvider, getContractHandler } from './ethereum';



export const getTokenPrice = async () => {

  //获取core-usdt数量  
  //获取core-pidao数量

  //查询LP信息  Constants.Contract.NEWGODZ
  const RENMINE = await getContractHandler('RENMINE')
  const WETH = await getContractHandler('WETH')
  const USDT = await getContractHandler('CUST')
  //wcore-usdt lp池子信息
  const wcoreLPBalance = WETH.balanceOf("0x8cf4b67f1921eb6106932a561280150b12a2f903")
  const usdtLPBalance = USDT.balanceOf("0x8cf4b67f1921eb6106932a561280150b12a2f903")

  //wcore-pidao lp池子信息
  const pidaoLpBalance = RENMINE.balanceOf("0x06801Ec986BD819de86FFE8903c90a8D19b79b8a")
  const pidaoWETHLpBalance = WETH.balanceOf("0x06801Ec986BD819de86FFE8903c90a8D19b79b8a")

  const corePrice = wcoreLPBalance / usdtLPBalance;

  const pidaoPrice = pidaoLpBalance / (corePrice * pidaoWETHLpBalance)

  return pidaoPrice;


}

