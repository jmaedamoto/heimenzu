/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import {color} from './ColorScheme'
import { MapSize } from './MapArea'

export const Cell = ({val, size,colortype,updatePosition}:{val:number, size:MapSize ,colortype:string,updatePosition: () => void}) => {
  
  if(true){
    return (
      <div
        className="cell"
        onMouseOver={() => updatePosition()}
        css={css`
          background:${val ? color(colortype,val): ""};
          border-right: 1px solid #999;
          border-top: 1px solid #999;
          width:${size == MapSize.Small ? "10px" : "20px"};
          height: ${size == MapSize.Small ? "7px" : "14px"};
          margin: -1px;
          padding: 0px;
          text-align: center;
          ${size == MapSize.Learge ? "font-size: 10px;" : ""}
          overflow: hidden;
          display: table-cell;
          &:hover {
            border-right: 1px solid red;
            border-top: 1px solid red;
          }
        `}
      >
        {size == MapSize.Learge && Number(val).toFixed(2)}
      </div> 
    )
  }
}