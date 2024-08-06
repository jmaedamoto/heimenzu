/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import { Menu } from './Menu'
import { QueryClient, QueryClientProvider } from 'react-query'
import { MapArea } from './MapArea'
import { ModalMap } from './ModalMap'
import { Bikou } from './Bikou'
import { Explornation } from './Explornation'
import { useAtom } from 'jotai'
import { showBikouAtom, showExplornationAtom } from './state'

const queryClient = new QueryClient();

function App() {
  const [showBikou, _setShowBikou] = useAtom(showBikouAtom)
  const [showExplornation, _setShowExplornation] = useAtom(showExplornationAtom)
  return (
    <QueryClientProvider client={queryClient}>
      <div css={css`
        display: flex;
        flex-wrap: wrap;
      `}>
        <div>
          <Menu />
          <MapArea/>
          <ModalMap />
        </div>
        <div css={css`
          width:500px;
        `}>
          {showBikou && <Bikou />}
          {showExplornation && <Explornation />}
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
