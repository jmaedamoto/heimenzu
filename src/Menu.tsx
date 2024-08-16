/** @jsxImportSource @emotion/react */
import  { css } from '@emotion/react'
import { useAtom } from "jotai"
import { useEffect } from "react"
import { CsvDataSetting, MapSize, PngDataSetting, RootState, SelectedMenu, rootStateAtom, showBikouAtom, showExplornationAtom} from "./state"
import axios from "axios"
import { parse } from "csv-parse/sync"

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
  "比較（警報以上、注意報、差分）":[warning,alert,diffAlert],
  "比較（警報以上、注意報未満(R3≧5mm)、差分）":[warning,noalert,diffNoalert],
}

const getPrefix = (prefecture:string,region:string,plane:string,element:string,method: string) => {
  //let root = "http://www2.os.met.kishou.go.jp/yoken/R6/tool/sw_sinsui_ave_env/point_A"
  let root = "./"
  if(prefecture.includes("（B地点）")){
    prefecture = prefecture.replace("（B地点）", "")
    root = "http://www2.os.met.kishou.go.jp/yoken/R6/tool/sw_sinsui_ave_env/point_B"
  }
  const title = `${prefecture}_${region}_${plane}_${element}_${method}`
  root = `${root}/${prefecture}`
  return[root,title]
}

const fetchCsv = async (url:string) => {
  const tmpurl = url
  
  const data = (await axios.get(tmpurl)).data
  if(!data || data.includes("html")){return []}
  const records = parse(data,{from_line: 2}).map((row: string[]) => {
    row.shift()
    return row
  }) as string[][];
  return records.slice(0,69)
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
        .filter((record) => record[0] && Number(record[0]) <= 0.01 && Number(record[0]) > 0)
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
  const [rootState, setRootState] = useAtom(rootStateAtom)

  const setPrefecture = (prefecture:string) => {
    const region = regions[prefecture][0]
    const newSelectedMenu = {
      ...rootState.selectedMenu,
      prefecture,
      region,
    }
    view(newSelectedMenu)
  }

  const setRegion = (region:string) => {
    const newSelectedMenu = {
      ...rootState.selectedMenu,
      region,
    }
    view(newSelectedMenu)
  }

  const setPlane = (plane:string, elementIndex = 0) => {
    const element = elements[plane][elementIndex]
    const newSelectedMenu = {
      ...rootState.selectedMenu,
      plane,
      element,
    }
    view(newSelectedMenu)
  }

  const setElement = (element: string) => {
    const newSelectedMenu = {
      ...rootState.selectedMenu,
      element,
    }
    view(newSelectedMenu)
  }

  const setMethod = (method: string) => {
    const newSelectedMenu = {
      ...rootState.selectedMenu,
      method,
    }
    view(newSelectedMenu)
  } 

  const setMapSize = (methodsLength: number): MapSize => {
    switch(methodsLength){
      case 3: {
        return MapSize.XSmall
      }
      case 4: {
        return MapSize.Small
      }
      default: {
        return MapSize.Large
      }
    }
  }

  const view = async (selectedMenu:SelectedMenu) => {  
    const {prefecture,region,plane,element,method} = selectedMenu
    const size = setMapSize(methods[method].length)
    const setting = await Promise.all(methods[method].map(d => processDatum(d,prefecture,region,plane,element,size)))
    setRootState({
      selectedMenu,
      setting
    })
  }

  const changeMenu = (i:number, rootState:RootState) => {
    const {plane,element} = rootState.selectedMenu
    const planes = Object.entries(elements).map(([key,_]) => key)
    let elementIndex = elements[plane].findIndex(e => e == element)
    let planeIndex = planes.findIndex(p  => p == plane)
    if(elementIndex + i >= elements[plane].length){
      planeIndex = (planeIndex + 1 + planes.length) % planes.length
      setPlane(planes[planeIndex])
    }else if(elementIndex + i < 0){
      planeIndex = (planeIndex  - 1 + planes.length) % planes.length
      const newPlane = planes[planeIndex]
      setPlane(newPlane,elements[newPlane].length - 1)
    }else{
      elementIndex = (elementIndex + elements[plane].length + i) % elements[plane].length
      setElement(elements[plane][elementIndex])
    }

  }

  const keyDownHandler = (e: KeyboardEvent, rootState:RootState) => {
    e.preventDefault()
    const key = e.code;
    if (key === 'ArrowUp') {
      changeMenu(-1,rootState)
    }
    if (key === 'ArrowDown') {
      changeMenu(1,rootState)
    }
  }

  useEffect(() => {
    const boot = async () => await view(rootState.selectedMenu)
    boot()
  }, [])



  useEffect(() => {
    document.addEventListener('keydown', 
      (e: KeyboardEvent) => keyDownHandler(e,rootState),  {once: true})
  }, [rootState])

  const [_showBikou, setShowBikou] = useAtom(showBikouAtom)
  const [_showExplornation, setShowExplornation] = useAtom(showExplornationAtom)

  return(
    <>
      <div
        css={css`
          color:red;
          font-weight: bold;
        `}
      >（注）「警報以上」「注意報」「注意報未満」の画像には不具合があり、マスが本来より1つ上にずれています。
        <br/>　　これらは全体の雰囲気をつかむための参考資料としてご利用ください（後日、正しいものに差し替えます）
      </div>
      <div
        tabIndex={-1} 
        css={css`
          display: flex;
          flex-wrap: nowrap;
        `}
      >
        府県
        <select
          value={rootState.selectedMenu.prefecture}
          onChange={e => {
            setPrefecture(e.target.value)
          }}
        >
          {Object.entries(regions).map(([key,_]) => <option key={key}>{key}</option>)}
        </select>

        領域
        <select
          value={rootState.selectedMenu.region}
          onChange={e => setRegion(e.target.value)}
        >
          {regions[rootState.selectedMenu.prefecture].map(val => <option key={val}>{val}</option>)}
        </select>

        気圧面
        <select
          value={rootState.selectedMenu.plane}
          onChange={e => {
            setPlane(e.target.value)
          }}
        >
          {Object.entries(elements).map(([key,_]) => <option key={key}>{key}</option>)}
        </select>

        要素
        <select
          value={rootState.selectedMenu.element}
          onChange={e => setElement(e.target.value)}
        >
          {elements[rootState.selectedMenu.plane].map(val => <option key={val}>{val}</option>)}
        </select>

        基準
        <select
          value={rootState.selectedMenu.method}
          onChange={e => setMethod(e.target.value)}
        >
          {Object.entries(methods).map(([key,_]) => <option key={key}>{key}</option>)}
        </select>

        <div 
          css={css`
            margin-left:5px;
            text-decoration:underline;
            color: blue;
          `}
          onMouseOver={() => setShowExplornation(true)}
          onMouseOut={() => setShowExplornation(false)}
        >
          要素一覧
        </div>
        <div 
          css={css`
            margin-left:5px;
            text-decoration:underline;
            color: blue;
          `}
          onMouseOver={() => setShowBikou(true)}
          onMouseOut={() => setShowBikou(false)}
        >
          備考
        </div>
      </div>
    </>
  )
}