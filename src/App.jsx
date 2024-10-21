import { createPublicClient, http } from 'viem';
import './App.css'
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import { mainnet } from 'viem/chains';
import { wagmiAbi } from './abi'

async function getBalance() {
  const client = createPublicClient({ 
    chain: mainnet, 
    transport: http(), 
  });
  const data = await client.readContract({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: wagmiAbi,
    functionName: 'totalSupply',
  })
  console.log("Data",data);
  
  const balance = await client.getBalance({address: "0x075c299cf3b9FCF7C9fD5272cd2ed21A4688bEeD"}) 
  return balance.toString();
}

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  // Queries
  const query = useQuery({ queryKey: ['balance'], queryFn: getBalance  })

  return (
    <div>
      Balance: 
      {query.data}
    </div>
  )
}


export default App
