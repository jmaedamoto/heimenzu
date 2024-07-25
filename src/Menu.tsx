/** @jsxImportSource @emotion/react */

import { useAtom } from "jotai"
import { useState } from "react"
import { dataSettingAtom } from "./state"

interface Region{
  [key:string]: string[]
}

const regions : Region= {
  "大阪":["A_大阪北部"],
  "京都":["A_京都北部"]
}

const planes = ["500"]

const elements = ["EPT"]

interface Method{
  [key:string]: string[]
}

const methods: Method = {
  "警報以上": ["警報以上"],
  "注意報": ["注意報"],
  "注意報未満(R3≧5mm)":["注意報未満(R3≧5mm)"],
  "差分（警報以上-注意報）":["差分（警報以上-注意報）_t検定"],
  "差分（警報以上-注意報未満(R3≧5mm)）":["差分（警報以上-注意報未満(R3≧5mm)）_t検定"],
  "p値（警報以上-注意報）":["差分（警報以上-注意報）_t検定p値"],
  "p値（警報以上-注意報未満(R3≧5mm)）":["差分（警報以上-注意報未満(R3≧5mm)）_t検定p値"],
  "比較（警報以上、注意報、差分、p値（警報以上-注意報））":["警報以上","注意報","差分（警報以上-注意報）_t検定","差分（警報以上-注意報）_t検定p値"],
  "比較（警報以上、注意報未満(R3≧5mm)、差分、p値（警報以上-注意報未満(R3≧5mm)））":["警報以上","注意報未満(R3≧5mm)","差分（警報以上-注意報未満(R3≧5mm)）_t検定","差分（警報以上-注意報未満(R3≧5mm)）_t検定p値"],
}

export const Menu = () => {
  const [_,setDataSettings] = useAtom(dataSettingAtom)
  const [prefecture, setPrefecture] = useState("大阪")
  const [region, setRegion] = useState("A_大阪北部")
  const [plane, setPlane] = useState("500")
  const [element, setElement] = useState("EPT")
  const [method, setMethod] = useState("警報以上")

  const view = () => {    
    const settings = methods[method].map(m => {
      return {
        prefecture,
        region,
        plane,
        element,
        method:m
      }
    })
    setDataSettings(settings)
  }

  return(
    <>
      府県
      <select
        value={prefecture}
        onChange={e => {
          setPrefecture(e.target.value)
          setRegion(regions[e.target.value][0])
        }}
      >
        {Object.entries(regions).map(([key,_]) => <option key={key}>{key}</option>)}
      </select>

      領域
      <select
        value={region}
        onChange={e => setRegion(e.target.value)}
      >
        {regions[prefecture].map(val => <option key={val}>{val}</option>)}
      </select>

      気圧面
      <select
        value={plane}
        onChange={e => setPlane(e.target.value)}
      >
        {planes.map(val => <option key={val}>{val}</option>)}
      </select>

      要素
      <select
        value={element}
        onChange={e => setElement(e.target.value)}
      >
        {elements.map(val => <option key={val}>{val}</option>)}
      </select>

      基準
      <select
        value={method}
        onChange={e => setMethod(e.target.value)}
      >
        {Object.entries(methods).map(([key,_]) => <option key={key}>{key}</option>)}
      </select>

      <button
        onClick={view}
      >
        表示
      </button>
    </>
  )
}