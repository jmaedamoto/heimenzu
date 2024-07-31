import { useAtom } from "jotai"
import { MapSize } from "./MapArea" 
import { modalSettingAtom, PngDataSetting } from "./state"

export const PngMap = ({setting}: {setting:PngDataSetting}) =>  {
  const [_,setModalSetting] = useAtom(modalSettingAtom)
  const openModal = () => setModalSetting({isOpen:true, setting:setting})
  const {title,url,size} = setting
  return (
    <>
      <div className="status">{title}</div>
      <img 
        src={url} 
        height={size == MapSize.Small ? "520px" : "1040px"}
        width={size == MapSize.Small ? "650px" : "1300px"}
        onClick={openModal}
      />
    </>
  )
}