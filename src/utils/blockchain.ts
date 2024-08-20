import { Address } from 'viem'

import ethereumLogo from '@/assets/tokens/ethereum.svg'
import usdcLogo from '@/assets/tokens/usdc.svg'
import usdtLogo from '@/assets/tokens/usdt.svg'
import { Contracts, Token } from './types'

/*** CONTRACTS ***/
export const contracts: Contracts = {
  KLEEK_PROXY: {
    address: {
      base:
        process.env.CHAIN_ENV === 'testnet' ? '0x' : '0x41D60e2D8AAFEeff97b0704Def4A35aba6582aF3',
    },
  },
  KLEEK_SHARE_DEPOSIT: {
    address: {
      base:
        process.env.CHAIN_ENV === 'testnet' ? '0x' : '0x8084071AE8A350cbecC1cdB29a45468E0e48B8dA',
    },
  },
  KLEEK_TRANSFER_DEPOSIT: {
    address: {
      base: process.env.CHAIN_ENV === 'testnet' ? '0x' : '0x',
    },
  },
}
/*** TOKENS ***/
export const DEPOSIT_TOKEN_ALLOWED: Token[] = [
  {
    name: 'usdc',
    symbol: 'USDC',
    address:
      process.env.CHAIN_ENV === 'testnet'
        ? '0x036cbd53842c5426634e7929541ec2318f3dcf7e'
        : '0x036cbd53842c5426634e7929541ec2318f3dcf7e',
    decimals: 6,
    logo: usdcLogo,
  },
  {
    name: 'usdt',
    symbol: 'USDT',
    address:
      process.env.CHAIN_ENV === 'testnet'
        ? '0x2340C88808dcE139B36864970074315BCb0c9Fe0'
        : '0x2340C88808dcE139B36864970074315BCb0c9Fe0',

    decimals: 6,
    logo: usdtLogo,
  },
]

/*** HELPERS ***/
export const getTokenByAddress = (address: Address) =>
  DEPOSIT_TOKEN_ALLOWED.find((token) => token.address === address)

export const getTokenByName = (name: string) =>
  DEPOSIT_TOKEN_ALLOWED.find((token) => token.name === name)
