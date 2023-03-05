import './style/index.less';
import { createRoot, h } from "./src";
import * as Mvvm from './plugins/mvvm/bundle.js'

const { reactive } = Mvvm;
const data = reactive({
    count: 1
});


window.data = data;

/** @jsx h */

const App =  (
        <div className="m-root-app" style={{width: '100', height: '100', background: 'red'}} onClick={() => {
            data.count += 1
        }}>
            [count]
        </div>
    );

const canvas = document.getElementById('m-root-canvas');
const root = createRoot(canvas, data);
root.render(App);

