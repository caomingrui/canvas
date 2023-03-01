import { Button, Popover } from 'antd';
import {HuaBi, ShuaZi, XiGuan, ZiTi, XiangPi, DiyKuanXuan, BackSvg, SaveSvg, NextSvg} from './static/canvasSvgs'
import useCanvasDraw from "../hooks/useCanvasDraw";
import {LegacyRef} from "react";

const Draw = () => {
    const { updateState, canvasState, canvasRef, backDraw } = useCanvasDraw({
        type: null,
    });

    const { type } = canvasState;

    const FileList = (
            <div className="m-draw-header-item_file">
                <p className="m-draw-file_box">
                    <input type="file" onChange={uploadImg}/> 上传
                </p>
                <p>Content</p>
            </div>
        );

    return (
        <div className="m-draw">
            <div className="m-draw-header">
                <div className="m-draw-header-item">
                    <Popover content={FileList} trigger="click">
                        <Button type="text">文件</Button>
                    </Popover>
                    <Button type="text">
                        <SaveSvg fontSize={'27px'} onClick={backDraw}/>
                    </Button>
                    <Button type="text">
                        <BackSvg fontSize={'27px'}/>
                    </Button>
                    <Button type="text">
                        <NextSvg fontSize={'27px'}/>
                    </Button>
                </div>
            </div>
            <header>
                <div className="m-draw-utils">
                    <div>
                        <HuaBi fontSize={'27px'} onClick={updateState.bind(null, 0)} className={typeClass(type, 0)}/>
                        <ShuaZi fontSize={'25px'}/>
                        <XiGuan fontSize={'22px'}/>
                        <ZiTi fontSize={'27px'}/>
                        <XiangPi fontSize={'25px'} onClick={updateState.bind(null, 4)} className={typeClass(type, 4)}/>
                        <div style={{width: '40px'}}></div>
                    </div>
                    <p>工具</p>
                </div>
                <div className="m-draw-utils">
                    <div>
                        <DiyKuanXuan fontSize={'25px'} onClick={updateState.bind(null, 5)} className={typeClass(type, 5)}/>
                        <ShuaZi fontSize={'25px'}/>
                        <XiGuan fontSize={'22px'}/>
                        <ZiTi fontSize={'27px'}/>
                        <XiangPi fontSize={'25px'}/>
                        <div style={{width: '40px'}}></div>
                    </div>
                    <p>图像</p>
                </div>
            </header>

            <main>
                <canvas id="m-draw-canvas" ref={canvasRef as LegacyRef<HTMLCanvasElement>}/>
            </main>

            <footer>

            </footer>
        </div>
    );


    function uploadImg (event: any) {
        const img = new Image();
        const url = URL.createObjectURL(event.target.files[0]);
        img.src = url;
        img.onload = function () {
            // const ctx = canvas.getContext('2d');
            // ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
    }
}

export default Draw;



function typeClass (type: number, resType: number) {
    return type === resType? 'm-svg-icon-check m-svg-icon': 'm-svg-icon';
}