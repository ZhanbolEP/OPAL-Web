'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react'

type Props = {
    chidren: React.ReactNode
}

const client = new QueryClient()

const ReactQueryProvider = ({ chidren }: Props) => {
  return <QueryClientProvider client={client}> { chidren } </QueryClientProvider>
}

export default ReactQueryProvider