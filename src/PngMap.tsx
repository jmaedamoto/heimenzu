/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { MapSize } from './MapArea' 

const imgUrl = new URL('./assets/大阪_A_大阪北部_500_EPT_注意報.png', import.meta.url).href

export const PngMap = ({url,title, size}: {url:string,title:string, size:MapSize}) =>  {
  return (
    <>
      <div className="status">{title}</div>
      <div
        className="map"
        css={css`
          background:url(${url || imgUrl}) no-repeat top center / ${size == MapSize.Small ? "650px 520px" : "1300px 1040px"};
          height: ${size == MapSize.Small ? "520px" : "1040px"};
          width: ${size == MapSize.Small ? "650px" : "1300px"};
          padding:0;
          position: relative;
        `}
      >
      </div>
    </>
  )
}