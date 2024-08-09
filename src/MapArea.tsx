/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import {CsvMap} from './CsvMap'
import {PngMap} from './PngMap'
import { rootStateAtom, Setting } from './state'
import { useAtom } from 'jotai'

export enum MapSize{
  Large,
  Small
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
        return (
          <div
            key={i} 
            css={css`
              grid-row: ${Math.floor(i / 2) + 1};
              grid-column: ${i % 2 + 1};
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