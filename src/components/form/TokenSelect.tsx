import Image from 'next/image'
import { HeartHandshake, Key } from 'lucide-react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl } from '@/components/ui/form'

import ethereumLogo from '@/assets/tokens/ethereum.svg'
import usdcLogo from '@/assets/tokens/usdc.svg'
import usdtLogo from '@/assets/tokens/usdt.svg'

const tokenList = [
  {
    address: '0x',
    name: 'usdt',
    symbol: 'USDT',
    logo: usdtLogo,
  },
  {
    address: '0x',
    name: 'usdc',
    symbol: 'USDC',
    logo: usdcLogo,
  },
  {
    address: '0x',
    name: 'ethereum',
    symbol: 'ETH',
    logo: ethereumLogo,
  },
]

export default function TokenSelect({
  form,
  field,
}: {
  form: { setValue: (key: string, value: any) => void }
  field: { value: string | null }
}) {
  const handleChange = (value: string) => {
    if (value === 'addGroup') {
      console.log('Add group')
      return null
    } else {
      form.setValue('group', value)
      field.onChange(value)
    }
  }

  return (
    <Select onValueChange={handleChange} defaultValue={tokenList[0].name}>
      <FormControl>
        <SelectTrigger className="w-full hover:bg-fuchsia-100">
          <SelectValue placeholder="Select Token" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {tokenList.map((token, index) => (
          <SelectItem value={token.name} key={index}>
            <div className="text-muted-foreground flex items-center gap-2">
              <Image
                className="size-4"
                src={token.logo}
                alt={token.name}
                width={20}
                height={20}
                unoptimized
              />
              <span className="text-foreground font-medium">{token.symbol}</span>
              <span className="capitalize">{token.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
