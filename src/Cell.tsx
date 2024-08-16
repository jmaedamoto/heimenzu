/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import {ColorScheme} from './ColorScheme'
import { MapSize } from './state'

const cellValue = (val:number, size:MapSize) => {
  if(size == MapSize.Large){
    return Math.abs(val) >= 1 || Math.abs(val) == 0 ? Math.round(Number(val)) : Number(val).toFixed(2)
  }
}

const Layout= {
  [MapSize.Large] : {
    height: "14px",
    width: "20px",
    borderWidth: "2px",
  },
  [MapSize.Small] : {
    height: "7px",
    width: "10px",
    borderWidth: "1px",
  },
  [MapSize.XSmall]: {
    height: "6px",
    width: "8px",
    borderWidth: "1px",
  },
} 

export const Cell = ({val, size,colorScheme,remark,updatePosition}:{val:string, size:MapSize ,colorScheme: ColorScheme,remark:boolean,updatePosition: () => void}) => {
  const layout = Layout[size]
  return (
    <div
      className="cell"
      onMouseOver={() => updatePosition()}
      css={css`
        background-color:${val ? colorScheme.colorLiteral(Number(val)): ""};
        border-right: 1px solid #999;
        border-top: 1px solid #999;
        ${remark ? 
          "border: solid blue;border-width: " + layout.borderWidth + ";" 
          : ""
        }
        width:${layout.width};
        height: ${layout.height};
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
