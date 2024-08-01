import { atom } from 'jotai'
import { MapSize } from './MapArea'

export type CsvDataSetting = {
  type:"csv",
  records: string[][],
  title:string,
  colortype: string,
  size: MapSize
  remarkPoints:number[][]
}

export type PngDataSetting = {
  type:"png",
  url: string,
  title:string,
  size: MapSize
}

export type Setting = CsvDataSetting | PngDataSetting

export type ModalSetting = {
  isOpen : boolean,
  setting?: Setting
}

export const settingAtom = atom<Setting[]>([])

export const modalSettingAtom = atom<ModalSetting>({
  isOpen:false,
})