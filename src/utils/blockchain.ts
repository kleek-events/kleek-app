import { Address } from 'viem'

import ethereumLogo from '@/assets/tokens/ethereum.svg'
import usdcLogo from '@/assets/tokens/usdc.svg'
import usdtLogo from '@/assets/tokens/usdt.svg'

export const USDC_ADDRESS_BASE_SEPOLIA = '0x036cbd53842c5426634e7929541ec2318f3dcf7e'

/*** TOKENS ***/
interface Token {
  readonly name: string
  readonly symbol: string
  readonly address: {
    readonly mainnet: Address
    readonly testnet: Address
  }
  readonly decimals: number
  readonly logo: string
}

export const DEPOSIT_TOKEN_ALLOWED: Token[] = [
  {
    name: 'usdc',
    symbol: 'USDC',
    address: {
      mainnet: '0x',
      testnet: USDC_ADDRESS_BASE_SEPOLIA,
    },
    decimals: 6,
    logo: usdcLogo,
  },
  {
    name: 'usdt',
    symbol: 'USDT',
    address: {
      mainnet: '0x',
      testnet: '0x',
    },
    decimals: 6,
    logo: usdtLogo,
  },
  {
    name: 'ethereum',
    symbol: 'ETH',
    address: {
      mainnet: '0x',
      testnet: '0x',
    },
    decimals: 18,
    logo: ethereumLogo,
  },
]

/*** CONTRACTS ***/
export const KLEEK_PROXY_ADDRESS = process.env.NEXT_PUBLIC_KLEEK_PROXY_ADDRESS as Address

export const KLEEK_SHARE_DEPOSIT_ADDRESS = process.env
  .NEXT_PUBLIC_KLEEK_SHARE_DEPOSIT_ADDRESS as Address

export const KLEEK_TRANSFER_DEPOSIT_ADDRESS = process.env
  .NEXT_PUBLIC_KLEEK_TRANSFER_DEPOSIT_ADDRESS as Address
