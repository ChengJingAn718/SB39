import "../stylesheets/styles.css";
import { useContext, useEffect, useRef } from "react";
import BaseImage from "../components/BaseImage"
import { UserContext } from "../components/BaseShot";
import { returnAudioPath, playEnvirAni, pauseEnvirAni } from "../components/CommonFunctions";

let stepCount = 0;
let prefix = 'interactive/SB39_Interactive_Icon_'
let timerList = []
let aniNum = 0
let turnList = [
    0, 1, 3, 2, 6, 4, 5, 7
]
export default function Scene3({ nextFunc, _geo, _baseGeo }) {

    const audioList = useContext(UserContext)

    const bgRef = useRef()
    const showingImgList = [
        [useRef(), useRef(), useRef(), useRef()],
        [useRef(), useRef(), useRef(), useRef()]
    ]
    const soundList = [10, 11, 12, 13, 14, 15, 16, 17]

    useEffect(() => {

        audioList.bodyAudio1.src = returnAudioPath(soundList[0])

        setTimeout(() => {

            playCart()
            aniNum = playEnvirAni(showingImgList[1], 250)
        }, 1000);

        return () => {
            timerList.map(timer => {
                clearTimeout(timer)
            })
        }
    }, [])

    const playCart = () => {

        pauseEnvirAni(aniNum)

        let judgeNum = stepCount % 2;
        let timeDuration = 0;

        let showNum = judgeNum + 1;
        if (showNum == 2)
            showNum = 0

        stepCount++

        if (stepCount > 8)
            nextFunc()
        else {
            if (stepCount > 1) {
                showingImgList[judgeNum].map(item => item.current.setClass('hide'))
                if (stepCount == 5)
                    bgRef.current.setClass('hide')

                timerList[0] = setTimeout(() => {

                    aniNum = playEnvirAni(showingImgList[showNum], 250)
                    showingImgList[showNum][0].current.setClass('show')

                    if (stepCount == 1)
                        bgRef.current.setClass('show')
                }, 500);
            }


            timerList[1] = setTimeout(() => {
                if (judgeNum == 0) {
                    audioList.bodyAudio1.play()
                    timeDuration = audioList.bodyAudio1.duration * 1000
                }

                else {
                    audioList.bodyAudio2.play()
                    timeDuration = audioList.bodyAudio2.duration * 1000
                }

                timerList[2] = setTimeout(() => {
                    playCart();
                }, timeDuration + 2000);

            }, 1300);



            if (stepCount < 8) {

                if (stepCount > 1)
                    timerList[3] = setTimeout(() => {
                        showingImgList[judgeNum].map((item, index) => item.current.setUrl(
                            prefix + (turnList[stepCount] > 9 ? '' : '0') + (turnList[stepCount] + 1) + '_F' + (index + 1) + ".svg"))
                    }, 1000);

                if (judgeNum == 0)
                    audioList.bodyAudio2.src = returnAudioPath(soundList[stepCount])
                else
                    audioList.bodyAudio1.src = returnAudioPath(soundList[stepCount])

            }

        }



    }

    return (
        <div className="aniObject">


            <div style={{
                position: 'absolute', width: _baseGeo.width + 'px', height: _baseGeo.height + 'px',
                left: _baseGeo.left + 'px', top: _baseGeo.bottom + 'px'
            }}>
                <BaseImage
                    ref={bgRef}
                    url={'BG/SB39_Sky_BG_03.svg'}
                    className='hideObject'
                />
            </div>

            <div
                style={{
                    position: "fixed", width: _geo.width * 0.4 + "px"
                    , left: _geo.left + _geo.width * 0.3 + "px",
                    top: _geo.top + _geo.height * 0.15 + "px",
                }}>

                {
                    [0, 1, 2, 3].map(value =>
                        < BaseImage
                            ref={showingImgList[1][value]}
                            url={prefix + '01_F' + (value + 1) + ".svg"}
                            className={value > 0 ? 'hideObject' : ''}
                        />
                    )
                }
                {
                    [0, 1, 2, 3].map(value =>
                        <BaseImage
                            ref={showingImgList[0][value]}
                            url={prefix + '02_F' + (value + 1) + ".svg"}
                            className='hideObject'
                        />
                    )
                }
            </div>
        </div>
    );
}
