/** @jsxImportSource @emotion/react */

import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { CsvDataSetting, PngDataSetting, settingAtom} from "./state"
import axios from "axios"
import { parse } from "csv-parse/sync"
import { MapSize } from "./MapArea" 

interface Region{
  [key:string]: string[]
}

const regions : Region= {
  "大阪":["A_大阪北部","B1_大阪中部北東","B2_大阪中部北","C1_大阪中部南","D_大阪南部","大阪府"],
  "兵庫":[
    "【豊岡】S-WNW型","【豊岡】S-W型", "【佐用】SSE-WNW型", "【佐用】SE-W型","【姫路】SE-W型",
    "【西脇】S-W型", "【洲本】S-W型","【神戸】SSE-WNW型","兵庫県"
  ],
  "京都":[
    "丹後","舞鶴・綾部⑤","福知山⑤","京丹波町","南丹市①","京都・亀岡①②", "京都②③④", "山城中部③④", 
    "木津川・精華・和束④","笠置・南山城④","京都府"
  ],
  "滋賀":["近江南部","東近江", "甲賀","近江西部", "湖北", "湖東","滋賀県"],
  "奈良":[
    "北部県境","奈良盆地", "五條・吉野川流域","大和高原", "高見・川上","台高山地", 
    "野迫川・吉野山地","十津川", "奈良県"
  ],
  "和歌山":[  
    "紀北沿岸・有田","紀北中部","紀北内陸", "紀中北沿岸","紀中南沿岸", "紀中内陸", "田辺内陸", "西牟婁沿岸",
    "東牟婁西岸", "古座川・串本","東牟婁東岸","東牟婁内陸", "新宮沿岸","北山", "和歌山県"
  ],
  "和歌山（B地点）":[
    "紀北沿岸・有田","紀北中部","紀北内陸", "紀中北沿岸","紀中南沿岸", "紀中内陸", "田辺内陸", "西牟婁沿岸",
    "東牟婁西岸", "古座川・串本","東牟婁東岸","東牟婁内陸", "新宮沿岸","北山", "和歌山県"
  ]
}

interface Elements{
  [key:string]: string[]
}

const elements: Elements = {
  "500": ["WIND_F","WIND_D","OMG","VOR","EPT","RH","TTD","TADV"],
  "600": ["WIND_F","WIND_D","OMG","VOR","EPT","RH","TTD","TADV"],
  "700": ["WIND_F","WIND_D","OMG","VOR","EPT","FLWV","RH","TTD","TADV"],
  "800": ["WIND_F","WIND_D","OMG","VOR","EPT","FLWV","RH","TTD","TADV"],
  "850": ["WIND_F","WIND_D","OMG","CONV","VOR","SP","EPT","FLWV","RH","TTD","TADV"],
  "900": ["WIND_F","WIND_D","OMG","CONV","VOR","SP","EPT","FLWV","RH","TTD","TADV"],
  "925": ["WIND_F","WIND_D","OMG","CONV","VOR","SP","EPT","FLWV","RH","TTD","TADV"],
  "950": ["WIND_F","WIND_D","OMG","CONV","VOR","SP","EPT","FLWV","RH","TTD","TADV"],
  "1000": ["WIND_F","WIND_D","OMG","CONV","VOR","SP","EPT","FLWV","RH","TTD","TADV"],
  "SURF": ["WIND_F","WIND_D","CONV","VOR","SP","FLWV","RH","TTD","PSEA","TADV"],
  "500M":["WIND_F","WIND_D","CONV","VOR","EPT","FLWV","DLFC","EL","SREH","BAND","RH"],
  "指数":["KI","KI+","TPW","SWEAT","VWS_F","VWS_D","TT","SSI8550","SEPT-EPT","対流不安定度"],
}

type PngData = {
  type:"png"
  prefix:string
}

type DiffCsvData = {
  type:"diffCsv"
  prefix:string
  refference:string
}

type PvalCsvData = {
  type:"pvalCsv"
  prefix:string
}

type Data = PngData | DiffCsvData | PvalCsvData

interface Methods{
  [key:string]: Data[]
}

const warning:PngData = { type:"png", prefix:"警報以上"}
const alert :PngData= { type:"png", prefix:"注意報" }
const noalert:PngData = { type:"png", prefix:"注意報未満\(R3≧5mm\)"}
const diffAlert:DiffCsvData  = { type:"diffCsv", prefix:"差分（警報以上-注意報）", refference:"差分（警報以上-注意報）_t検定p値"}
const diffNoalert:DiffCsvData = { type:"diffCsv", prefix:"差分（警報以上-注意報未満\(R3≧5mm\)）", refference:"差分（警報以上-注意報未満(R3≧5mm)）_t検定p値"}
const pvalAlert:PvalCsvData = {type:"pvalCsv",prefix:"差分（警報以上-注意報）_t検定p値"}
const pvalNoalert:PvalCsvData = {type:"pvalCsv",prefix:"差分（警報以上-注意報未満(R3≧5mm)）_t検定p値"}

const methods: Methods = {
  "警報以上": [warning],
  "注意報": [alert],
  "注意報未満(R3≧5mm)":[noalert],
  "差分（警報以上-注意報）":[diffAlert],
  "差分（警報以上-注意報未満(R3≧5mm)）":[diffNoalert],
  "p値（警報以上-注意報）":[pvalAlert],
  "p値（警報以上-注意報未満(R3≧5mm)）":[pvalNoalert],
  "比較（警報以上、注意報、差分、p値（警報以上-注意報））":[warning,alert,diffAlert,pvalAlert],
  "比較（警報以上、注意報未満(R3≧5mm)、差分、p値（警報以上-注意報未満\(R3≧5mm\)））":[warning,noalert,diffNoalert,pvalNoalert],
}

const getPrefix = (prefecture:string,region:string,plane:string,element:string,method: string) => {
  let root = "http://www2.os.met.kishou.go.jp/yoken/R6/tool/sw_sinsui_ave_env/point_A"
  //let root = "./"
  if(prefecture.includes("（B地点）")){
    prefecture = prefecture.replace("（B地点）", "")
    root = "http://www2.os.met.kishou.go.jp/yoken/R6/tool/sw_sinsui_ave_env/point_B"
  }
  const title = `${prefecture}_${region}_${plane}_${element}_${method}`
  root = `${root}/${prefecture}`
  return[root,title]
}

const fetchCsv = async (url:string) => {
  //const tmpurl = new URL(url, import.meta.url).href
  const tmpurl = url
  
  const data = (await axios.get(tmpurl)).data
  if(!data || data.includes("html")){return []}
  const records = parse(data,{from_line: 2}).map((row: string[]) => {
    row.shift()
    return row
  }) as string[][];
  return records
}

const fetchDiffCsv = async (diffCsvData:DiffCsvData,prefecture:string,region:string,plane:string,element:string) => {
  const [root,title] = getPrefix(prefecture,region,plane,element,diffCsvData.prefix)
  const [refRoot,refTitle] = getPrefix(prefecture,region,plane,element,diffCsvData.refference)
  const url = `${root}/csv/差分/${title}.csv`
  const refUrl = `${refRoot}/csv/t検定p値/${refTitle}.csv`
  return await axios.all([fetchCsv(url), fetchCsv(refUrl)])
}

const fetchPvalCsv = async (pvalCsvData:PvalCsvData,prefecture:string,region:string,plane:string,element:string) => {
  const [root,title] = getPrefix(prefecture,region,plane,element,pvalCsvData.prefix)
  const url = `${root}/csv/t検定p値/${title}.csv`
  return await fetchCsv(url)
}

const processDatum  = async (data:Data, prefecture:string,region:string,plane:string,element:string,size: MapSize) => {
  switch( data.type){
    case "png": {
      const [root,title] = getPrefix(prefecture,region,plane,element,data.prefix)
      //const url = new URL(`${root}/${title}.png`, import.meta.url).href
      const url = `${root}/${title}.png`
      const setting:PngDataSetting =  {
        type:"png",
        url,
        title,
        size
      }
      return setting
    }
    case "diffCsv": {
      const [_,title] = getPrefix(prefecture,region,plane,element,data.prefix)
      const [records,refRecords] = await fetchDiffCsv(data,prefecture,region,plane,element)
      const remarkPoints = 
        refRecords.map((row, i) => row.map((val,j) => [val,i,j])).flat()
        .filter((record) => record[0] && Number(record[0]) < 0.01 && Number(record[0]) > 0)
        .map((record) => [Number(record[1]),Number(record[2])])
      const setting:CsvDataSetting = {
        type:"csv",
        records,
        size,
        title,
        colortype:`${element}差分`,
        remarkPoints
      }
      return setting
    }
    case "pvalCsv": {
      const [_,title] = getPrefix(prefecture,region,plane,element,data.prefix)
      const records = await fetchPvalCsv(data,prefecture,region,plane,element)
      const setting:CsvDataSetting = {
        type:"csv",
        records,
        size,
        title,
        colortype:"p値",
        remarkPoints:[]
      }
      return setting
    }
  }
}

export const Menu = () => {
  const [_, setSetting] = useAtom(settingAtom)

  let [prefecture, setPrefecture] = useState("大阪")
  const [region, setRegion] = useState("A_大阪北部")
  const [plane, setPlane] = useState("500")
  const [element, setElement] = useState("EPT")
  const [method, setMethod] = useState("警報以上")

  const view = async () => {    
    const size = methods[method].length > 1 ? MapSize.Small : MapSize.Learge
    const setting = await Promise.all(methods[method].map(d => processDatum(d,prefecture,region,plane,element,size)))
    console.log(setting)
    setSetting(setting)
  }

  useEffect(() => {
    const boot = async () => await view()
    boot()
  }, [])

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
        onChange={e => {
          setPlane(e.target.value)
          setElement(elements[e.target.value][0])
        }}
      >
        {Object.entries(elements).map(([key,_]) => <option key={key}>{key}</option>)}
      </select>

      要素
      <select
        value={element}
        onChange={e => setElement(e.target.value)}
      >
        {elements[plane].map(val => <option key={val}>{val}</option>)}
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