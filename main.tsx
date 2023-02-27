import './style/index.less';
import { createRoot, h } from "./src";
/** @jsx h */

const App =  (
        <div className="m-root-app" style={{width: '10', height: '10', background: 'red'}}>
            1
        </div>
    );

const canvas = document.getElementById('m-root-canvas');
const root = createRoot(canvas);
root.render(App);

