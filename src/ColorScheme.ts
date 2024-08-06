import colorSchemeCsv from './assets/color_scheme.csv?raw'
import { parse } from 'csv-parse/sync'

const schemeSet = Object.fromEntries(parse(colorSchemeCsv,{from_line: 2}).map((row:string[]) => [row[0], row]))

export class ColorScheme{
  name: string
  unit?: string
  thresholds: number[]
  colors: number[][]

  constructor(name:string){
    this.name = name
    let scheme : string[] = schemeSet[name]
    this.unit =  scheme.at(-1)
    this.colors = scheme.slice(1, scheme.length - 1).filter((_,i) => i % 2 == 0).map(c => colorPattern[c])
    this.thresholds = scheme.slice(1, scheme.length - 1).filter((_,i) => i % 2 == 1).map(t => Number(t))
  }


  colorLiteral(val:number){
    const opacity = 0.5
    const pattern = this.rgb(val)
    return `rgba(${pattern[0]}, ${pattern[1]}, ${pattern[2]}, ${opacity})`
  }

  rgb(val:number){
    if(val >= this.thresholds[7]){
      return this.colors[8]
    }else if(val >= this.thresholds[6]){
      return this.colors[7]
    }else if(val >= this.thresholds[5]){
      return this.colors[6]
    }else if(val >= this.thresholds[4]){
      return this.colors[5]
    }else if(val >= this.thresholds[3]){
      return this.colors[4]
    }else if(val >= this.thresholds[2]){
      return this.colors[3]
    }else if(val >= this.thresholds[1]){
      return this.colors[2]
    }else if(val >= this.thresholds[0]){
      return this.colors[1]
    }else{
      return this.colors[0]
    }
  }
}

interface ColorPattern{
  [key:string]: number[]
}

const colorPattern: ColorPattern = {
  "5" : [0, 0, 255],
  "2" : [255, 255, 255],
  "50" : [51, 153, 102],
  "34" : [204, 255, 255],
  "41" : [51, 102, 255],
  "8": [0, 255, 255],
  "4": [0, 255, 0],
  "6": [255, 255, 0],
  "46": [255, 102, 0],
  "44": [255, 204, 0],
  "36": [255, 255, 153],
  "3": [255, 0, 0],
  "7": [255, 0, 255],
  "13": [128, 0, 128],
  "101": [221, 242, 225],
  "102": [0, 176, 240],
  "103": [0, 176, 80],
  "104": [255, 192, 0],
  "105": [255, 153, 255],  
}