/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { Buffer } from 'buffer'
window.Buffer = window.Buffer || Buffer
import mapImage from './assets/map.jpg'
import { parse } from 'csv-parse/sync'
import { Cell } from './Cell'
import { useState } from 'react'
import { MapSize } from './App'

export const CsvMap = ({csv,title, colortype, size}: {csv:string,title:string,colortype:string,size:MapSize}) =>  {
  if(!csv || csv.includes("<html")){
    return <div>error</div>
  }
  const [position, setPosition] = useState<[number,number]>([-1,-1])
  const records = parse(csv,{from_line: 2}).map((row: number[]) => {
    row.shift()
    return row
  }) as number[][];
  return (
    <>
      <div className="status">{position[0] < 0 ? title : `${title} x:${position[0]} y:${position[1]} ${records[position[1]][position[0]]}`}</div>
      <div
        className="map"
        css={css`
          background:url(${mapImage}) no-repeat top center / ${size == MapSize.Small ? "650px 357px" : "1300px 714px"};
          height: ${size == MapSize.Small ? "490px" : "980px"};
          width: ${size == MapSize.Small ? "650px" : "1300px"};
          padding:0;
          position: relative;
        `}
      >
        {records.map((vals,i) => 
          <div 
            className="row"
            key={i}
            css={css`
            height:${size == MapSize.Small ? "7px" : "14px"};
            `}
          >
            {vals.map((val,j) =><Cell val={val} size={size} key={j} colortype={colortype} updatePosition={() => setPosition([j,i])}/> )}
          </div>
        )}
      </div>
    </>
  )
}