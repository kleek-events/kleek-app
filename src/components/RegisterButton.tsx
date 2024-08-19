'use client'
import React, { useState } from 'react'
import { LogIn } from 'lucide-react'
import { useAccount } from 'wagmi'
import { writeContract, waitForTransactionReceipt } from '@wagmi/core'
import { wagmiConfig } from '@/config/wagmi'
import { decodeErrorResult, erc20Abi } from 'viem'

import {
  Modal,
  ModalBody,
  ModalCloser,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from '@/components/ui/animated-modal'
import { Button } from '@/components/ui/button'
import {
  KLEEK_PROXY_ADDRESS,
  KLEEK_SHARE_DEPOSIT_ADDRESS,
  USDC_ADDRESS_BASE_SEPOLIA,
} from '@/utils/blockchain'
import { KleekProtocolABI } from '@/lib/abi'
import { toast } from '@/components/ui/use-toast'

export function RegisterButton() {
  const account = useAccount()
  const [loading, setLoading] = useState(false)

  const submitRegister = async () => {
    try {
      setLoading(true)
      const depositFee = BigInt(2 * 10 ** 6)
      const tx1Hash = await writeContract(wagmiConfig, {
        abi: erc20Abi,
        address: USDC_ADDRESS_BASE_SEPOLIA,
        functionName: 'approve',
        args: [KLEEK_SHARE_DEPOSIT_ADDRESS, depositFee],
      })

      //wait for the approval to go through
      const tx1Receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: tx1Hash,
      })

      if (tx1Receipt.status != 'success') {
        throw new Error('Failed to approve deposit')
      }

      const tx2Hash = await writeContract(wagmiConfig, {
        abi: KleekProtocolABI,
        address: KLEEK_PROXY_ADDRESS,
        functionName: 'enroll',
        args: [1, account.address],
      })

      const tx2Receipt = await waitForTransactionReceipt(wagmiConfig, {
        hash: tx2Hash,
      })

      if (tx2Receipt.status != 'success') {
        throw new Error('Failed to enroll')
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      })
    }
  }

  if (!account || !account.address)
    return (
      <Button variant="ghost" disabled>
        You need to sign in to register
      </Button>
    )

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="group/modal-btn flex w-full justify-center bg-fuchsia-500 font-semibold text-white hover:bg-fuchsia-400 dark:bg-white dark:text-black">
          <span className="text-center transition duration-500 group-hover/modal-btn:translate-x-[30%]">
            Reserve now
          </span>
          <div className="absolute inset-0 z-20 flex -translate-x-[100%] items-center justify-center text-white transition duration-500 group-hover/modal-btn:-translate-x-[20%]">
            <LogIn className="size-4" />
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">You are almost there!</h2>

            <p className="mb-4 text-gray-700">
              Great news! This event is <strong>free to attend</strong>. Here's what you need to
              know:
            </p>

            <ol className="mb-4 space-y-4">
              <li className="rounded bg-blue-50 p-3">
                <strong className="text-blue-700">Deposit: </strong>{' '}
                <span className="text-gray-700">
                  To ensure attendance, we ask for a small, refundable deposit.
                </span>{' '}
                <em className="text-sm text-blue-600">
                  Don't worry - you'll get it back when you attend the event!
                </em>
              </li>

              <li className="rounded bg-green-50 p-3">
                <strong className="text-green-700">Blockchain Magic:</strong>{' '}
                <span className="text-gray-700">
                  We use blockchain technology to make this process secure and automatic. It's like
                  a digital handshake between you and the event.
                </span>
              </li>

              <li className="rounded bg-purple-50 p-3">
                <strong className="text-purple-700">Two Quick Steps:</strong>{' '}
                <ol className="list-lower-alpha mt-2 space-y-1 pl-5">
                  <li className="text-gray-700">First, you'll approve the use of your deposit.</li>
                  <li className="text-gray-700">Then, you'll confirm your registration.</li>
                </ol>
                <p className="mt-2 text-sm text-purple-500">
                  Both steps will pop up in your wallet- just follow the prompts!
                </p>
              </li>
            </ol>

            <p className="font-semibold text-gray-700">
              That's it! Once done, you're all set for the event. We can't wait to see you there!
            </p>
          </ModalContent>
          <ModalFooter className="gap-4">
            <Button onClick={submitRegister} disabled={loading}>
              {loading ? 'Registering...' : 'Confirm'}
            </Button>
            <ModalCloser variant="secondary">Cancel</ModalCloser>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  )
}
