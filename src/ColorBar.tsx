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
        width: calc(100% / ${scheme.thresholds.length + scheme.colors.length});
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
        width: calc(100% / ${scheme.thresholds.length + scheme.colors.length});
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
      <div css={css`
        display: flex;
        flex-wrap: wrap;
        width: 600px;
      `}>
        {panels}
      </div>
    </>
  )
}