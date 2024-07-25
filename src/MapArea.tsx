/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import { useAtom } from 'jotai'
import { dataSettingAtom } from './state'
import { MapComponent } from './MapComponent'

export enum MapSize{
  Small,
  Learge,
}

export const MapArea = () => {
  const [dataSettings, _] = useAtom(dataSettingAtom)
  if(dataSettings.length == 1){
    return(
      <div css={css`
        display: grid;
      `}>
        <div css={css`
          grid-row: 1;
          grid-column: 1;
          padding:5px;
        `}>
          <MapComponent dataSetting={dataSettings[0]} size={MapSize.Learge}/>
        </div>
      </div>
    )
  }else{
    return(
      <div css={css`
        display: grid;
      `}>
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
      </div>
    )
  }
}