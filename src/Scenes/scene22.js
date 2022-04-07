import "../stylesheets/styles.css";
import { useContext, useEffect, useRef } from "react";
import { returnAudioPath } from "../components/CommonFunctions"
import { UserContext } from "../components/BaseShot";

export default function Scene3({ nextFunc, _geo }) {

    const refText = useRef();
    const audioList = useContext(UserContext)


    useEffect(() => {
        audioList.bodyAudio1.src = returnAudioPath('33')

        setTimeout(() => {
            audioList.bodyAudio1.play();
            setTimeout(() => {
                nextFunc();
            }, audioList.bodyAudio1.duration * 1000 + 2000);
        }, 3000);




        return () => {
        }
    }, [])

    return (
        <div className="aniObject">
            <div 
                style={{
                    position: "fixed", width: _geo.width * 0.33 + "px"
                    , left: _geo.left + _geo.width * 0.33 + "px",
                    bottom: _geo.top + _geo.height * 0.3 + "px",
                }}>
                <img draggable={false} width={"100%"}
                    src={"./images/Icons/SB39_Interactive-Icon_SB39_ Icon_24.svg"}
                />
            </div>

            <div ref={refText}
                className='subText'
                style={{
                    position: "fixed", width: _geo.width * 0.45 + "px"
                    , left: _geo.left + _geo.width * 0.275 + "px",
                    bottom: "8%",
                }}>
                <img draggable={false} width={"100%"}
                    src={"./images/Text interactive/SB39_Text-Interactive_SB39_Text_Burning_Stubble_In_Farmlands.svg"}
                />
            </div>
        </div>
    );
}
