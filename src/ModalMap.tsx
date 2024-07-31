import { useAtom } from "jotai"
import { modalSettingAtom, Setting } from "./state"
import Modal  from "react-modal"
import { PngMap } from "./PngMap"
import { CsvMap } from "./CsvMap"
import { MapSize } from "./MapArea"

const Map = ({setting}:{setting:Setting}) => {
    const modalSetting = {...setting, size:MapSize.Learge}

    switch(modalSetting.type){
      case "png":{
        return <PngMap setting={modalSetting} />
      }
      case "csv":{
        return <CsvMap setting={modalSetting} />
      }
    }
  }

export const ModalMap = () => {
    const [modalSetting,setModalSetting] = useAtom(modalSettingAtom)
    const closeModal = () => setModalSetting({isOpen:false})
    Modal.setAppElement('#root')
    return(
        <>
            <Modal isOpen={modalSetting.isOpen}>
                <button onClick={closeModal}>close</button>
                {modalSetting.setting && <Map setting={modalSetting.setting}/>}
            </Modal>
        </>
    )
}