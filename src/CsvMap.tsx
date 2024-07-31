/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import mapImage from './assets/map.jpg'
import { Cell } from './Cell'
import { useState } from 'react'
import { MapSize } from './MapArea'  
import { useAtom } from 'jotai'
import { CsvDataSetting, modalSettingAtom } from './state'

const isRemark = (remarkPoints:number[][],i:number,j:number) => {
  const item = remarkPoints.filter(r => r[0] == i && r[1] == j)
  return item.length > 0
}

export const CsvMap = ({setting}: {setting:CsvDataSetting}) =>  {
  const [_,setModalSetting] = useAtom(modalSettingAtom)
  const openModal = () => setModalSetting({isOpen:true,setting:setting})
  const [position, setPosition] = useState<[number,number]>([-1,-1])
  const {title,records,size,colortype,remarkPoints} = setting
  return (
    <>
      <div className="status">{position[0] < 0 ? title : `${title} 緯度:${(35.85 - position[0] * 0.05).toFixed(2)} 経度:${position[1] * 0.0625 + 133.375}  ${records[position[0]][position[1]]}`}</div>
      <div
        className="map"
        css={css`
          background:url(${mapImage}) no-repeat top center / ${size == MapSize.Small ? "650px 357px" : "1300px 714px"};
          height: ${size == MapSize.Small ? "490px" : "980px"};
          width: ${size == MapSize.Small ? "650px" : "1300px"};
          display: table;
          table-layout: fixed;
          overflow: hidden;
          padding:0;
          position: relative;
        `}
        onClick={openModal}
      >
        {    
          records.map((row,i) => 
            <div 
              className="row"
              key={i}
              css={css`
              height:${size == MapSize.Small ? "7px" : "14px"};
              `}
            >
              {row.map((val,j) =><Cell 
                val={val}
                size={size} 
                key={j} 
                colortype={colortype} 
                updatePosition={() => setPosition([i,j])}
                remark = {isRemark(remarkPoints,i,j)}
              /> )}
            </div>
        )}
      </div>
    </>
  )
}