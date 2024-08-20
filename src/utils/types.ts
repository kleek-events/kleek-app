import { Address } from 'viem'

export interface Token {
  readonly name: string
  readonly symbol: string
  readonly address: Address
  readonly decimals: number
  readonly logo: string
}

interface ContractDetails {
  address: {
    base: Address
  }
}

export interface Contracts {
  readonly KLEEK_PROXY: ContractDetails
  readonly KLEEK_SHARE_DEPOSIT: ContractDetails
  readonly KLEEK_TRANSFER_DEPOSIT: ContractDetails
}
