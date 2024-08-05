/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import {color} from './ColorScheme'
import { MapSize } from './MapArea'

const cellValue = (val:number, size:MapSize) => {
  if(size == MapSize.Learge){
    return Math.abs(val) >= 1 || Math.abs(val) == 0 ? Math.round(Number(val)) : Number(val).toFixed(2)
  }
}

export const Cell = ({val, size,colortype,remark,updatePosition}:{val:string, size:MapSize ,colortype:string,remark:boolean,updatePosition: () => void}) => {
  return (
    <div
      className="cell"
      onMouseOver={() => updatePosition()}
      css={css`
        background-color:${val ? color(colortype,Number(val)): ""};
        border-right: 1px solid #999;
        border-top: 1px solid #999;
        ${remark ? "border: 1px solid blue" : ""};
        width:${size == MapSize.Small ? "10px" : "20px"};
        height: ${size == MapSize.Small ? "7px" : "14px"};
        margin: -1px;
        padding: 0px;
        text-align: center;
        ${size == MapSize.Learge ? "font-size: 8px;" : ""}
        overflow: hidden;
        box-sizing: border-box;
        display: table-cell;
        &:hover {
          border: 1px solid red;
        }
      `}
    >
      {val ? cellValue(Number(val),size) : ""}
    </div> 
  )
}
