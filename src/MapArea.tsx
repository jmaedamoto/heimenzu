/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import {CsvMap} from './CsvMap'
import {PngMap} from './PngMap'
import { MapSize, rootStateAtom, Setting } from './state'
import { useAtom } from 'jotai'

const columnSize= {
  [MapSize.Large] : 1,
  [MapSize.Small] : 2,
  [MapSize.XSmall]: 3
} 

const Map = ({setting}:{setting:Setting}) => {
  switch(setting.type){
    case "png":{
      return <PngMap setting={setting} />
    }
    case "csv":{
      return <CsvMap setting={setting} />
    }
  }
}

export const MapArea = () => {
  const [rootState,_] = useAtom(rootStateAtom)
  const {setting} = rootState
  return (
    <div css={css`
      display: grid;
    `}>
      {setting.map((set,i) => {
        const columnNum = columnSize[set.size]
        return (
          <div
            key={i} 
            css={css`
              grid-row: ${Math.floor(i / columnNum) + 1};
              grid-column: ${i % columnNum + 1};
              padding:5px;
            `}
          >
            <Map setting={set}/>
          </div>
          )
      })}
    </div>
  )
}