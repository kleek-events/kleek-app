'use client'

import React from 'react'
import { useAccount } from 'wagmi'
import { writeContract } from '@wagmi/core'

import { wagmiConfig } from '@/config/wagmi'
import { KleekProtocolABI } from '@/lib/abi'
import {
  KLEEK_PROXY_ADDRESS,
  KLEEK_SHARE_DEPOSIT_ADDRESS,
  USDC_ADDRESS_BASE_SEPOLIA,
} from '@/utils/blockchain'
import { Button } from '@/components/ui/button'
import { erc20Abi } from 'viem'

export default function ButtonRegister() {
  const [loading, setLoading] = React.useState(false)
  const account = useAccount()
  console.log(account.address)
  const submitRegister = async () => {
    try {
      setLoading(true)
      const depositFee = BigInt(2 * 10 ** 6)
      //   const result = await writeContract(wagmiConfig, {
      //     abi: erc20Abi,
      //     address: USDC_ADDRESS_BASE_SEPOLIA,
      //     functionName: 'approve',
      //     args: [KLEEK_SHARE_DEPOSIT_ADDRESS, depositFee],
      //   })

      //wait for the approval to go through

      const result2 = await writeContract(wagmiConfig, {
        abi: KleekProtocolABI,
        address: KLEEK_PROXY_ADDRESS,
        functionName: 'enroll',
        args: [1, account.address],
      })
      setLoading(false)
    } catch (error) {
      console.error('Failed to register', error)
    }
  }
  return (
    account.address && (
      <Button className="w-full" onClick={submitRegister}>
        {loading ? 'Registering' : 'Register now'}
      </Button>
    )
  )
}
