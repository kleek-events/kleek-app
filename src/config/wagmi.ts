import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains'

// Your WalletConnect Cloud project ID
export const projectId = 'b695b35c75a4543769439bec65495986'

// Create a metadata object
const metadata = {
  name: 'Kleek',
  description: 'Blockchain-powered event platform that turns no-shows into go-shows',
  url: 'https://kleek.events', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
}

// Create wagmiConfig
const chains = [base, baseSepolia] as const

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  auth: {
    email: true, // default to true
    socials: ['google', 'x', 'apple', 'facebook'],
    showWallets: false, // default to true
    walletFeatures: true, // default to true
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
  //   ...wagmiOptions, // Optional - Override createConfig parameters
})
