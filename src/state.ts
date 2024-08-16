import { atom } from 'jotai'

export enum MapSize{
  Large,
  Small,
  XSmall
}

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

export const modalSettingAtom = atom<ModalSetting>({
  isOpen:false,
})

export const showBikouAtom = atom<boolean>(false)
export const showExplornationAtom = atom<boolean>(false) 

export type SelectedMenu = {
  prefecture: string,
  region: string,
  plane: string,
  element: string,
  method: string,
}

const initialSelectedMenu: SelectedMenu = {
  prefecture: "大阪",
  region:"A_大阪北部",
  plane:"500",
  element:"EPT",
  method:"警報以上",
}

export type RootState = {
  selectedMenu: SelectedMenu,
  setting: Setting[],
}

export const rootStateAtom = atom<RootState>({
  selectedMenu:initialSelectedMenu,
  setting: [],
})