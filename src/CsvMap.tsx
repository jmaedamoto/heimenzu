/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import mapImage from './assets/map.jpg'
import { Cell } from './Cell'
import { useState } from 'react'
import { useAtom } from 'jotai'
import { CsvDataSetting, MapSize, modalSettingAtom } from './state'
import { ColorBar } from './ColorBar'
import { ColorScheme } from './ColorScheme'

const isRemark = (remarkPoints:number[][],i:number,j:number) => {
  const item = remarkPoints.filter(r => r[0] == i && r[1] == j)
  return item.length > 0
}

const Layout= {
  [MapSize.Large] : {
    height: "980px",
    width: "1300px",
    imageHeight:"714px",
    rowHeight:"14px",
  },
  [MapSize.Small] : {
    height: "490px",
    width: "650px",
    imageHeight:"357px",
    rowHeight:"7px",
  },
  [MapSize.XSmall]: {
    height: "420px",
    width: "520px",
    imageHeight:"306px",
    rowHeight:"6px",
  },
} 

export const CsvMap = ({setting}: {setting:CsvDataSetting}) =>  {
  const [_,setModalSetting] = useAtom(modalSettingAtom)
  const openModal = () => setModalSetting({isOpen:true,setting:setting})
  const [position, setPosition] = useState<[number,number]>([-1,-1])
  const {title,records,size,colortype,remarkPoints} = setting
  if(records.length < 1){
    return <div>データがありません</div>
  }
  const scheme = new ColorScheme(colortype)
  const layout = Layout[size]
  return (
    <>
      <div className="status">{position[0] < 0 ? title : `${title} 緯度:${(35.85 - position[0] * 0.05).toFixed(2)} 経度:${position[1] * 0.0625 + 133.375}  値:${records[position[0]][position[1]]}`}</div>
      <div
        className="map"
        onMouseOut={() => {
          setPosition([-1,-1])
        }}
        css={css`
          background:url(${mapImage}) no-repeat top center / ${layout.width} ${layout.imageHeight};
          height: ${layout.height};
          width: ${layout.width};
          display: table;
          table-layout: fixed;
          overflow: hidden;
          padding:0;
          position: relative;
          &:after{
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            background:url(${mapImage}) no-repeat top center / ${layout.width} ${layout.imageHeight};
          }
        `}
        onClick={openModal}
      >
        {    
          records.map((row,i) => 
            <div 
              className="row"
              key={i}
              css={css`
                height:${layout.rowHeight};
                position: relative;
              `}
            >
              {row.map((val,j) =><Cell 
                val={val}
                size={size} 
                key={j} 
                colorScheme={scheme}
                updatePosition={() => setPosition([i,j])}
                remark = {isRemark(remarkPoints,i,j)}
              /> )}
            </div>
        )}
      </div>
      <ColorBar scheme={scheme}/>
    </>
  )
}