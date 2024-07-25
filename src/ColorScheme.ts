import colorSchemeCsv from './assets/color_scheme.csv?raw'
import { parse } from 'csv-parse/sync'

const schemeSet = Object.fromEntries(parse(colorSchemeCsv,{from_line: 2}).map((row:string[]) => [row[0], row]))

export const color = (title:string, val:number) => {
  const scheme = schemeSet[title]
  if(val > Number(scheme[16])){
    return colorPattern[Number(scheme[17])]
  }else if(val > Number(scheme[14])){
    return colorPattern[Number(scheme[15])]
  }else if(val > Number(scheme[12])){
    return colorPattern[Number(scheme[13])]
  }else if(val > Number(scheme[10])){
    return colorPattern[Number(scheme[11])]
  }else if(val > Number(scheme[8])){
    return colorPattern[Number(scheme[9])]
  }else if(val > Number(scheme[6])){
    return colorPattern[Number(scheme[7])]
  }else if(val > Number(scheme[4])){
    return colorPattern[Number(scheme[5])]
  }else if(val > Number(scheme[2])){
    return colorPattern[Number(scheme[3])]
  }else{
    return colorPattern[Number(scheme[1])]
  }
}

interface ColorPattern{
  [key:number]: string
}

const colorPattern: ColorPattern = {
  5 : "rgba(0, 0, 255, 0.8)",
  2 : "",
  50 : "rgba(51, 153, 102, 0.8)",
  34 : "rgba(204, 255, 255, 0.8)",
  41 : "rbga(51, 102, 255, 0.8)",
  8: "rbga(0, 255, 255, 0.8)",
  4: "rbga(0, 255, 0, 0.8)",
  6: "rbga(255, 255, 0, 0.8)",
  46: "rbga(255, 102, 0, 0.8)",
  44: "rbga(255, 204, 0, 0.8)",
  36: "rbga(255, 255, 153, 0.8)",
  3: "rbga(255, 0, 0, 0.8)",
  7: "rbga(255, 0, 255, 0.8)",
  13: "rbga(128, 0, 128, 0.8)",
  101: "rgba(221, 242, 225, 0.8)",
  102: "rgba(0, 176, 240, 0.8)",
  103: "rgba(0, 176, 80, 0.8)",
  104: "rgba(255, 192, 0, 0.8)",
  105: "rgba(255, 153, 255, 0.8)"  
}