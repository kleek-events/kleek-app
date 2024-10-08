'use client'
import React, { ReactNode, createContext, useContext, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { cn } from '@/utils/string'
import { useOutsideClick } from '@/hooks/useOutsideClick'
import { Button, ButtonProps } from './button'

interface ModalContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false)

  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export function Modal({ children }: { children: ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}

export const ModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  const { setOpen } = useModal()
  return (
    <button
      className={cn(
        'relative overflow-hidden rounded-md px-4 py-2 text-center text-black dark:text-white',
        className,
      )}
      onClick={() => setOpen(true)}
    >
      {children}
    </button>
  )
}

export const ModalCloser = ({
  variant,
  children,
}: {
  variant: ButtonProps['variant']
  children: ReactNode
}) => {
  const { setOpen } = useModal()
  return (
    <Button onClick={() => setOpen(false)} variant={variant}>
      {children}
    </Button>
  )
}

export const ModalBody = ({ children, className }: { children: ReactNode; className?: string }) => {
  const { open } = useModal()

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  const modalRef = useRef(null)
  const { setOpen } = useModal()
  useOutsideClick(modalRef, () => setOpen(false))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            backdropFilter: 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            backdropFilter: 'blur(0px)',
          }}
          className="fixed inset-0 z-50 flex h-full w-full items-center justify-center [perspective:800px] [transform-style:preserve-3d]"
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              'relative z-50 flex max-h-[80%] min-h-[50%] flex-1 flex-col overflow-auto border border-transparent bg-white dark:border-neutral-800 dark:bg-neutral-950 md:max-w-[60%] md:rounded-2xl xl:max-w-[40%]',
              className,
            )}
            initial={{
              opacity: 0,
              scale: 0.5,
              rotateX: 40,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              rotateX: 10,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 15,
            }}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ModalContent = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={cn('flex-1 flex-col p-8 md:p-10', className)}>{children}</div>
}

export const ModalFooter = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return <div className={cn('flex justify-end p-4', className)}>{children}</div>
}

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        backdropFilter: 'blur(0px)',
      }}
      exit={{
        opacity: 0,
        backdropFilter: 'blur(0px)',
      }}
      className={`fixed inset-0 z-50 h-full w-full bg-fuchsia-100/80 ${className}`}
    ></motion.div>
  )
}

const CloseIcon = () => {
  const { setOpen } = useModal()
  return (
    <button onClick={() => setOpen(false)} className="group absolute right-4 top-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-black transition duration-200 group-hover:rotate-3 group-hover:scale-125 dark:text-white"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </svg>
    </button>
  )
}
