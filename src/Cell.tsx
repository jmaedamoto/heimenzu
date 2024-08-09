/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import {ColorScheme} from './ColorScheme'
import { MapSize } from './MapArea'

const cellValue = (val:number, size:MapSize) => {
  if(size == MapSize.Large){
    return Math.abs(val) >= 1 || Math.abs(val) == 0 ? Math.round(Number(val)) : Number(val).toFixed(2)
  }
}

export const Cell = ({val, size,colorScheme,remark,updatePosition}:{val:string, size:MapSize ,colorScheme: ColorScheme,remark:boolean,updatePosition: () => void}) => {
  return (
    <div
      className="cell"
      onMouseOver={() => updatePosition()}
      css={css`
        background-color:${val ? colorScheme.colorLiteral(Number(val)): ""};
        border-right: 1px solid #999;
        border-top: 1px solid #999;
        ${remark ? 
          "border: solid blue;border-width: 2px;" 
          : ""
        }
        width:${size == MapSize.Small ? "10px" : "20px"};
        height: ${size == MapSize.Small ? "7px" : "14px"};
        margin: -1px;
        padding: 0px;
        text-align: center;
        ${size == MapSize.Large ? "font-size: 8px;" : ""}
        overflow: hidden;
        box-sizing: border-box;
        display: table-cell;
        position: relative;
        &:hover {
          border: 1px solid red;
        }
      `}
    >
      {val ? cellValue(Number(val),size) : ""}
    </div> 
  )
}
