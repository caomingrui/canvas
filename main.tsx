import { PicCanvas } from "./src";
import { createRoot } from "react-dom/client";
import './style/index.less';

const rootDom = document.getElementById('root');
const reactRoot = createRoot(rootDom);

reactRoot.render(
    <PicCanvas/>
);
