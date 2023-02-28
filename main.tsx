import Draw from './src'
import { createRoot } from "react-dom/client";
import './style/index.less';
import "antd/dist/antd.css";

const rootDom = document.getElementById('root');
const reactRoot = createRoot(rootDom);

reactRoot.render(
    <Draw/>
);
