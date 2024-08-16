/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { ColorScheme } from "./ColorScheme"

export const ColorBar = ({scheme}:{scheme:ColorScheme}) => {
  let colors = scheme.colors
  let thresholds = scheme.thresholds

  if(scheme.name == "p値"){
    colors = colors.slice().reverse()
    thresholds = thresholds.slice().reverse()
  }

  const colorPanel = colors.map((color, i) => 
    <div 
      key={"color_" + i}
      css={css`
        width: 20px;
        height:20px;
        background-color: ${`rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`};
        border: 1px solid #999;
        box-sizing: border-box;
        padding: 0px;
        margin:0px;
    `} />
  )

  const thresholdPanel = thresholds.map((threshold, i) => 
    <div
      key={"threshold_" + i}
      css={css`
        width: 35px;
        height:20px;
        border: 1px solid #999;
        padding: 0px;
        margin:0px;
        text-align: center;
        font-size: 11px;
        box-sizing: border-box;
      `}
    >
      {threshold < 0.01 && threshold >= 0 ? threshold.toExponential(1) : threshold }
    </div>
  )

  const panels = colorPanel.map((p, i) => {
      if(i < thresholdPanel.length){
        return <>{p}{thresholdPanel[i]}</>
      }else{
        return <>{p}</>
      }
  })

  return (
    <>
      <div key="colorbar"
        css={css`
          display: flex;
          flex-wrap: wrap;
          width: 650px;
      `}>
        {panels}
        {scheme.name != "p値" &&
          <>
            <div key={"p-container"}
              css={css`
              width:20px;
              height:20px;
              display: flex;
              align-items: center;
            `}>
              <div key={"p-box"} css={css`
                width: 50%;
                height:50%;
                margin: 0 auto;
                border: solid blue;border-width: 2px;
              `}/>
            </div>
            <div key={"p-anotation"} css={css`
              font-size: 12px;
            `}>
              p値が0.01以下の格子
            </div>
          </>
        }
      </div>
    </>
  )
}