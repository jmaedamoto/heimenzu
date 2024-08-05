import colorSchemeCsv from './assets/color_scheme.csv?raw'
import { parse } from 'csv-parse/sync'

const schemeSet = Object.fromEntries(parse(colorSchemeCsv,{from_line: 2}).map((row:string[]) => [row[0], row]))

export const color = (title:string, val:number) => {
  const scheme = schemeSet[title]
  let color = ``
  if(val >= Number(scheme[16])){
    color = colorPattern[Number(scheme[17])]
  }else if(val >= Number(scheme[14])){
    color = colorPattern[Number(scheme[15])]
  }else if(val >= Number(scheme[12])){
    color = colorPattern[Number(scheme[13])]
  }else if(val >= Number(scheme[10])){
    color = colorPattern[Number(scheme[11])]
  }else if(val >= Number(scheme[8])){
    color = colorPattern[Number(scheme[9])]
  }else if(val >= Number(scheme[6])){
    color = colorPattern[Number(scheme[7])]
  }else if(val >= Number(scheme[4])){
    color = colorPattern[Number(scheme[5])]
  }else if(val >= Number(scheme[2])){
    color = colorPattern[Number(scheme[3])]
  }else{
    color = colorPattern[Number(scheme[1])]
  }
  return color
}

interface ColorPattern{
  [key:number]: string
}

const opacity = 0.2

const colorPattern: ColorPattern = {
  5 : `rgba(0, 0, 255, ${opacity})`,
  2 : ``,
  50 : `rgba(51, 153, 102, ${opacity})`,
  34 : `rgba(204, 255, 255, ${opacity})`,
  41 : `rgba(51, 102, 255, ${opacity})`,
  8: `rgba(0, 255, 255, ${opacity})`,
  4: `rgba(0, 255, 0, ${opacity})`,
  6: `rgba(255, 255, 0, ${opacity})`,
  46: `rgba(255, 102, 0, ${opacity})`,
  44: `rgba(255, 204, 0, ${opacity})`,
  36: `rgba(255, 255, 153, ${opacity})`,
  3: `rgba(255, 0, 0, ${opacity})`,
  7: `rgba(255, 0, 255, ${opacity})`,
  13: `rgba(128, 0, 128, ${opacity})`,
  101: `rgba(221, 242, 225, ${opacity})`,
  102: `rgba(0, 176, 240, ${opacity})`,
  103: `rgba(0, 176, 80, ${opacity})`,
  104: `rgba(255, 192, 0, ${opacity})`,
  105: `rgba(255, 153, 255, ${opacity})`  
}