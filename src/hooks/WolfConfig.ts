/* eslint-disable global-require */

import { _getAddress, _getProvider } from './ethereum';
import { useEffect } from 'react';
import { ERRORS } from "./errors";
import { WolfMarket } from './modules/WolfMarket';
import { Build } from './modules/Build';
import { Withdraw } from './modules/Withdraw';



/* 正在登录 */




/* export const HASH_GAME_API = "https://api.renmine.com/jeecg-boot"; */

export const HASH_GAME_API = "http://localhost:8080/jeecg-boot/";




/* 配置数据 */
export const API_CONFIG = {
  getSign: `${HASH_GAME_API}/game/getSign`,

}


/* 回购 */
export const getSign = async (withdraw: Withdraw) => {

  // 组装数据对象

  const response = await fetch(API_CONFIG.getSign, {
    method: 'post', headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(withdraw),
  })


  if (response.status === 200) {
    const result = await response.json();
    return result;
  }




}







let DEBUG_ADDRESS = '';

export const WolfConfig = () => {
  useEffect(() => {
    console.log("document", document);
    global.document = window.document;



    // eslint-disable-next-line no-restricted-globals
    const url = new URLSearchParams(location.search || '');
    const observation = url.get('observation');
    if (observation) DEBUG_ADDRESS = observation;
  })
}





const IsTest = process.env.NEXT_PUBLIC_CHAIN_ID == "97";
const IsDevelopment = process.env.NODE_ENV === 'development';
export const Constants = {
  ArenaHistoryBlock: (24 * 60 * 60 * 30) / 3,
  DEBUG_ADDRESS,
  IsDevelopment,
  DEFAULT_SEED: '0x0000000000000000000000000000000000000000000000000000000000000000',
  /**
   * 每个邀请最多可持续的时间 (hours)
   */
  INVITATION_DURATION: 72,

  BUYURL: "https://app.uniswap.org/#/swap?outputCurrency=0x486573c7da695efb482d5e724f113965488e5b92",

  IsTest,
  BASE_URL: 'https://app.wolftown.world/animals',
  BASE_IMAGE_URL: 'https://app.wolftown.world/images/animals',
  API_SERVE: 'https://app.wolftown.world',
  OPENSEA_URL: 'https://opensea.io',
  Chain: {
    ID: '42161',
    PRC: 'https://arb1.arbitrum.io/rpc',
    Name: 'Core Chain Mainnet',
    nativeCurrency: {
      name: 'Core',
      symbol: 'Core',
      decimals: 18,
    },
    ScanView: 'https://arbiscan.io/',
    AddressView: 'https://arbiscan.io/address',
    TxView: 'https://arbiscan.io/tx',
  },

  emergencyWolfLeave: false,

  Building: {
    OwnershipTotal: 10000000,
  },
  Contract: {
    BankAddress: '0x1f0c693F5cD661126e43b25a96FA703a0C8F2543',
    WTWool: '0xAA15535fd352F60B937B4e59D8a2D52110A419dD',
    /* 0xEa38779a32C2f044719FfE5aF8f4D9DE9D6757f6 */
    WTMilk: '0x60Ca032Ba8057FedB98F6A5D9ba0242AD2182177',
    Random: '0x536D40ab94F323b3CBF50DFf24d6fa636Bc170c3',
    /* 0xc7ba9e206cBE7016F2771C9FFc95702DcbbB257b */
    WTAnimal: '0x14f112d437271e01664bb3680BcbAe2f6A3Fb5fB',
    OldWTAnimal: '0xE686133662190070c4A4Bea477fCF48dF35F5b2c',
    Barn: '0x143E742f319d1FE0d1a825d451fc937B5A706702',
    /* 0x10A6DC9fb8F8794d1Dc7D16B035c40923B148AA4 */
    OldBarn: '0x58eaBB38cc9D68bEA8E645B0f5Ec741C82f2871B',
    OldBarnBUG: '0x386500b851CA1aF027247fa8Ab3A9dDd40753813',
    V1AnimalTransfer: '0xCe487D0Ab195D28FE18D5279B042498f84eb051F',
    WoolfTownAPI: '0x301216c75E8af09a3785c9fE7077c543eBB77B6F',
    SkillManager: '0xAef63919ac27d048d9e0c31da474AD0FEedB141a',
    BuildingGameManager: '0xbA58c345cA328F8bfA6A5607a15C2128CC6fBE61',
    WTOwnershipDeed: '0xb61afda2288C4E8AC896B6d4E78BC0ca0C5D98DC',
    WTOwnershipDeedURI: '0x71C0d09D512Fd51BCC96d3ee380a51448635d7DA',
    ForestExploration: '0x6fbaAAF642D9d4A9fC0d2270035D91e100B4B3bC',
    Fight: '0x9851E7eFc67F48E52E98454149793B4eA219F1c5',
    Arena: '0x5f189c322d829aD8F3901A17c54DcC893345d8eB',
    BuildingStakeManager: '0x7c176E44B6e925E8b5F0Fafc7b2Ec2876A6fE8aD',
    WT_LP_USDT: '0xcAad85D48f31177040E25048FF4dd875eAE9Dea7',
    WT_LP_BNB: '0xe9C7bc98901d1B71d63902602Bff6E37dCdE79fC',
    USDT: '0x55d398326f99059fF775485246999027B3197955',
    DONATE: '0x63aA9b1f4233ED5F980c3725A19677d60F18f265',
    DONATEPERSALE: '0x8C01174b906Dd9Cf1c198C2b8322b7A5051e8E1B',
    DONATEPLEDEG: '0x8B8eC82e8F1a97695DDe82cb9CF5C4bB0D531fe0',
    BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    /* BUSD: '0x205815495B879D2D67bE4646e791Eca3d434b303', */
    GODZ: '0xF0A8EcBCE8caADB7A07d1FcD0f87Ae1Bd688dF43',
    NEWGODZ: '0xeb90A6273F616A8ED1cf58A05d3ae1C1129b4DE6',
    WTanimalPlus: '0x85849483E38FB4EF8bb4400c868916c75071b6f4',
    MintInvite: "0x6bAEf88ea37eEDE9f6407A4dE2BF81f3D4035A3A",
    Hero: "0x38Fd96AFe66CD14a81787077fb90e93944Dd75f8",
    DONATEPLEDEGV2: '0x162497dFee63F33f7b3e64A2f3Ceec9D0f9E2942',
    DONATEPLEDEGV3: '0xe24ea9a698afd4ba581c1e5de47dd71ac3c15166',
    heroMint: '0x931a3ecc63160e834dab61599fd9b6797c876857',
    /* LPStakeAdmin: */
    LPStake: '0x01E35675Daa229Cbd59AAF747061EFD3C1fa2D9B',
    BRX_LP_USDT: '0x92dFb5e101d34f4718EddEf238bA5f0C5835d6aD',
    BRX: '0x486573C7da695Efb482d5E724F113965488e5b92',
    BRX_REDMINE: '0x4d9C31F0113c30458C403cFb7727E423D5B82478',
    WETH: '0x40375C92d9FAf44d2f9db9Bd9ba41a3317a2404f',
    CUST: '0x9Ebab27608bD64AFf36f027049aECC69102a0D1e',
    RENMINE: '0x02ff44cf1eBfF7CB83EDf3C0820081B1f3945C76',
    VAULT: '0x22fb9Cf463AB57D660E51fDcF632323B9874eb11',
  },
};
export const AbiConfig: Record<keyof typeof Constants.Contract, any> = {
  BankAddress: require('config/abi/wtWool'),
  WTWool: require('config/abi/wtWool'),
  WTMilk: require('config/abi/wtWool'),
  Random: require('config/abi/wtWool'),
  WTAnimal: require('config/abi/wtAnimal.json'),
  OldWTAnimal: require('config/abi/wtAnimal.json'),
  Barn: require('config/abi/wtBarn.json'),
  OldBarn: require('config/abi/wtBarn.json'),
  OldBarnBUG: require('config/abi/wtBarn.json'),
  V1AnimalTransfer: require('config/abi/V1AnimalTransfer.json'),
  WoolfTownAPI: require('config/abi/WoolfTownAPI.json'),
  SkillManager: require('config/abi/SkillManager.json'),
  BuildingGameManager: require('config/abi/BuildingGameManager.json'),
  WTOwnershipDeed: require('config/abi/WTOwnershipDeed.json'),
  WTOwnershipDeedURI: require('config/abi/WTOwnershipDeed.json'),
  ForestExploration: require('config/abi/ForestExploration.json'),
  Arena: require('config/abi/Arena.json'),
  Fight: require('config/abi/Fight.json'),
  BuildingStakeManager: require('config/abi/BuildingStakeManager.json'),
  WT_LP_USDT: require('config/abi/lp.json'),
  WT_LP_BNB: require('config/abi/lp.json'),
  USDT: require('config/abi/wtWool'),
  DONATE: require('config/abi/donate.json'),
  DONATEPERSALE: require('config/abi/donatepersale.json'),
  DONATEPLEDEG: require('config/abi/donateForPledge.json'),

  BUSD: require('config/abi/wtWool'),
  GODZ: require('config/abi/wtWool'),
  NEWGODZ: require('config/abi/wtWool'),
  WTanimalPlus: require('config/abi/wtWool'),
  MintInvite: require('config/abi/MintInvite.json'),
  Hero: require('config/abi/wtAnimal.json'),
  DONATEPLEDEGV2: require('config/abi/donateForPledge.json'),
  DONATEPLEDEGV3: require('config/abi/donateForPledge.json'),
  heroMint: require('config/abi/raidHeroMint.json'),
  LPStake: require('config/abi/LPStake.json'),
  BRX_LP_USDT: require('config/abi/lp.json'),
  BRX: require('config/abi/pi.json'),
  BRX_REDMINE: require('config/abi/redmine.json'),
  WETH: require('config/abi/wtWool'),
  CUST: require('config/abi/wtWool'),
  RENMINE: require('config/abi/wtWool'),
  VAULT: require('config/abi/Vaut.json')

};
if (!IsDevelopment) {
  console.log = () => null;
  console.error = () => null;
  console.info = () => null;
}
if (IsTest) {
  Object.assign(Constants, {
    BASE_URL: 'https://app.test.wolftown.world/animals',
    BASE_IMAGE_URL: 'https://app.test.wolftown.world/images/animals',
    API_SERVE: 'https://app.test.wolftown.world',
    Chain: {
      ID: '97',
      PRC: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      Name: 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'tBNB',
        symbol: 'tBNB',
        decimals: 18,
      },
      ScanView: 'https://testnet.bscscan.com',
      AddressView: 'https://testnet.bscscan.com/address',
      TxView: 'https://testnet.bscscan.com/tx',
    },
    Contract: {
      // api
      WoolfTownAPI: '0xbFE5a21f0c153144BE0c65BE961b01Bf52EE1B0f',

      // contract
      WTWool: '0x808156c8510f3b07209762d1357da452Bc740067',
      WTMilk: '0x98949d35a2cb9400643B8FB5393266eD9CDb0f18',
      Random: '0x5b52eD1Eed64A5b98b244D090682e011F6f502be',
      /*  WTAnimal: '0x0E606A0c4042C4183eD183f9245cEb616ec4D458', */
      WTAnimal: '0x51D4767a6177A0f20c1c04f5A14724E1CBb90603',
      OldWTAnimal: '0xBE66EA1D143700857A5686eCA9D91d5BC6A3BA36',
      Bannable: '0x901E981335272C3817663692AdE7A2b9f7Af1430',
      /* Barn: '0x3d227278b0c500918ad5D1B70a04fDb2cE63F645', */
      Barn: '0x0d9d038f279abe87051095BEEa88474ef084917d',
      OldBarn: '0xa87FA735B0e2ec0ECae06b7552D237BBe044ef7B',
      OldBarnBUG: '0xB2b4bc0ce285CFe10Bf93e09E0fDEB93f41d1fdB',
      V1AnimalTransfer: '0x74aBd8Ea56510D49c373CBc99ECB3d1e204B479F',
      WoolPool: '0x0e31631B9C0d59c946e6F08d1c9A8Bc4e567C413',
      SkillManager: '0x784Ffbb7E630F958Ca0586B0487Edb2cBfe249CD',
      BuildingGameManager: '0x5CA7800F3C8c3E98C769DC5d5b4d119aA2ac1728',
      BuildingStakeManager: '0x9B2F1d8Ddcf9d19505bAaF0a71E670b0eac7D424',
      WTOwnershipDeed: '0xbaE4e86071f5FDBac225546aaC76B9Ae587051Dc',
      WTOwnershipDeedURI: '',
      ForestExploration: '0x8844FE9f80c5C37E7C5BE678A97c36064986334e',
      Arena: '0x176f53ADc7d475356488BB0EA658Baa5507D1E1b',
      Fight: '0x6f4c48B1E47Db04564a067F2D0ac34Bc76Da7C2d',
      WT_LP_USDT: '0x03BAE7A09f02C0D63dfA1C7196E0A8D60aeBcf81',
      WT_LP_BNB: '0x7C7747716545F19cdF0257A23C5dE2fa184BDb1D',
      USDT: '0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814',
      DONATE: '0x63aA9b1f4233ED5F980c3725A19677d60F18f265',
      DONATEPERSALE: '0x8CE89399c89585A2b25485732e470E20b6fA433D',
      DONATEPLEDEG: '0x8B8eC82e8F1a97695DDe82cb9CF5C4bB0D531fe0',

      BUSD: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
      GODZ: '0xF0A8EcBCE8caADB7A07d1FcD0f87Ae1Bd688dF43',
      NEWGODZ: '0xeb90A6273F616A8ED1cf58A05d3ae1C1129b4DE6',
      WTanimalPlus: '0x85849483E38FB4EF8bb4400c868916c75071b6f4',
      MintInvite: "0x6bAEf88ea37eEDE9f6407A4dE2BF81f3D4035A3A",
      Hero: "0x38Fd96AFe66CD14a81787077fb90e93944Dd75f8",
      DONATEPLEDEGV2: '0x162497dFee63F33f7b3e64A2f3Ceec9D0f9E2942',
      DONATEPLEDEGV3: '0xe24ea9a698afd4ba581c1e5de47dd71ac3c15166',
      heroMint: '0x931a3ecc63160e834dab61599fd9b6797c876857',
      LPStake: '0xEEBabF6C3958504B1089D565d358871bB6E666Cf',
      BRX_LP_USDT: '0x0B7753127fE0cD8fA8A0A06ABEC823e0aD193A2E',
      BRX: '0x486573C7da695Efb482d5E724F113965488e5b92',
      BRX_REDMINE: '0x4d9C31F0113c30458C403cFb7727E423D5B82478',
    },
  });
}


