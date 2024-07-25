import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import {CsvMap} from './CsvMap'
import {PngMap} from './PngMap'
import { DataSetting } from './state'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Suspense } from 'react'
import { MapSize } from './MapArea'

export const MapComponent = ({dataSetting,size}:{dataSetting:DataSetting, size:MapSize}) => {
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