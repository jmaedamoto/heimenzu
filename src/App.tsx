import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import { Menu } from './Menu'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MapArea } from './MapArea'
import { ModalMap } from './ModalMap'

const queryClient = new QueryClient();



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Menu />
      <MapArea/>
      <ModalMap />
    </QueryClientProvider>
  )
}

export default App
