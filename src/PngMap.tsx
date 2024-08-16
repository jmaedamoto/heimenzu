import { useAtom } from "jotai"
import { MapSize, modalSettingAtom, PngDataSetting } from "./state"

const Layout= {
  [MapSize.Large] : {
    height: "1040px",
    width: "1300px"
  },
  [MapSize.Small] : {
    height: "520px",
    width: "650px"
  },
  [MapSize.XSmall]: {
    height: "416px",
    width: "520px"
  },
} 

export const PngMap = ({setting}: {setting:PngDataSetting}) =>  {
  const [_,setModalSetting] = useAtom(modalSettingAtom)
  const openModal = () => setModalSetting({isOpen:true, setting:setting})
  const {title,url,size} = setting
  const layout = Layout[size]
  return (
    <>
      <div className="status">{title}</div>
      <img 
        src={url} 
        height={layout.height}
        width={layout.width}
        onClick={openModal}
      />
    </>
  )
}