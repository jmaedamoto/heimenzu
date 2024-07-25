import { atom } from 'jotai'

export interface DataSetting{
  prefecture:string,
  region:string,
  plane:string,
  element:string,
  method:string
}

export const dataSettingAtom=atom<DataSetting[]>([{
  prefecture:"大阪",
  region:"A_大阪北部",
  plane:"500",
  element:"EPT",
  method:"差分（警報以上-注意報）_t検定p値"
}])