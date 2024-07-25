/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import {CsvMap} from './CsvMap'
import {PngMap} from './PngMap'
import { Menu } from './Menu'
import { useAtom } from 'jotai'
import { DataSetting, dataSettingAtom } from './state'
import axios from 'axios'
import { useQuery,QueryClient, QueryClientProvider } from 'react-query'
import { Suspense } from 'react'


export enum MapSize{
  Small,
  Learge,
}

const queryClient = new QueryClient();

const MapArea = () => {
  const [dataSettings, _] = useAtom(dataSettingAtom)
  console.log(dataSettings)
  if(dataSettings.length == 1){
    return(
      <div css={css`
        grid-row: 1;
        grid-column: 1;
        padding:5px;
      `}>
        <MapComponent dataSetting={dataSettings[0]} size={MapSize.Learge}/>
      </div>
    )
  }else{
    return(
      <>
        <div css={css`
          grid-row: 1;
          grid-column: 1;
          padding:5px;
        `}>
          <MapComponent dataSetting={dataSettings[0]} size={MapSize.Small}/>
        </div>
        <div css={css`
          grid-row: 1;
          grid-column: 2;
          padding:5px;
        `}>
          <MapComponent dataSetting={dataSettings[1]} size={MapSize.Small}/>
        </div>
        <div css={css`
          grid-row: 2;
          grid-column: 1;
          padding:5px;
        `}>
          <MapComponent dataSetting={dataSettings[2]} size={MapSize.Small}/>
        </div>
        <div css={css`
          grid-row: 2;
          grid-column: 2;
          padding:5px;
        `}>
          <MapComponent dataSetting={dataSettings[3]} size={MapSize.Small}/>
        </div>
      </>
    )
  }
}

const MapComponent = ({dataSetting,size}:{dataSetting:DataSetting, size:MapSize}) => {
  console.log(dataSetting)
  if(dataSetting.method.includes("差分")){
    return (
      <Suspense fallback={<div>...Loading</div>}>
        <CsvMapRapper dataSetting={dataSetting} size={size} />
      </Suspense>
    )
  }else{
    const prefix = `${dataSetting.prefecture}_${dataSetting.region}_${dataSetting.plane}_${dataSetting.element}_${dataSetting.method}`
    const url = new URL(`./assets/${prefix}.png`, import.meta.url).href
    return <PngMap url={url} title={prefix} size={size} />
  }
}


const CsvMapRapper = ({dataSetting,size}:{dataSetting:DataSetting, size:MapSize}) => {
  const prefix = `${dataSetting.prefecture}_${dataSetting.region}_${dataSetting.plane}_${dataSetting.element}_${dataSetting.method}`
  const url = new URL(`./assets/${prefix}.csv`, import.meta.url).href
  const colortype=dataSetting.method.includes("p値") ? "p値" : `${dataSetting.element}差分`
  const {data} = useQuery({
    queryKey: [prefix],
    queryFn: () => axios.get(url).then(res => res.data)
  })

  return <CsvMap csv={data} title={prefix} colortype={colortype} size={size} />
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Menu />
      <div css={css`
        display: grid;
      `}>
        <MapArea/>
      </div>
    </QueryClientProvider>
  )
}

export default App
