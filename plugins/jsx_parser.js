const {default: jsxSyntax} = require("@babel/plugin-syntax-jsx");
const type = require("@babel/types");

const TEXT = 1;
const ONE_NODE = 2;
const BLOCK_NODE = 3;
const JSX_TEXT = 4;

function jsxFunction (path, state, functionName) {
    const node = path.node;
    if (!node) return;
    const nodeList = [];

    for (let index = 0; index < node.children.length; index ++) {
        const lineNode = node.children[index];
        if (!type.isJSXText(lineNode)) {
            if (lineNode.children && lineNode.children.length === 1 && type.isJSXText(lineNode.children[0])) {
                nodeList.push(createRenderJsx(lineNode, ONE_NODE, null, functionName)[0]);
            }
            else {
                nodeList.push(lineNode);
            }
        }
        else {
            // 过滤换行 空text节点
            if (lineNode.value.trim() !== '') {
                nodeList.push(createRenderJsx(lineNode, TEXT, null, functionName));
            }
        }
    }
    return nodeList

}


function createRenderJsx (node, state, childJsx = null, functionName) {

    switch (state) {
        case TEXT: {
            const { text, value } = node;
            return type.stringLiteral(text || value);
            break
        }
        case ONE_NODE: {
            const { openingElement, children } = node;
            const { tagName, name, attributes } = openingElement;
            return type.callExpression(
                type.identifier(functionName),
                [
                    type.stringLiteral('div'),
                    attributes.length ? type.objectExpression([
                        attributes.properties
                    ]): type.nullLiteral(),
                    type.stringLiteral(children[0].value)
                ]
            );
            break;
        }
        case BLOCK_NODE: {
            const { openingElement, children } = node;
            const { tagName, name, attributes } = openingElement;
            return type.callExpression(
                type.identifier(functionName),
                [
                    type.stringLiteral(tagName?.escapedText || name.name),
                    attributes.length ? type.objectExpression([
                        attributes.properties
                    ]): type.nullLiteral(),
                    childJsx || type.nullLiteral()
                ]);
            break;
        }
    }
}


const JSXPlugins = (babel) => {
    return {
        inherits: jsxSyntax,
        visitor: {
            JSXElement: {
                exit (path, state) {
                    const functionName = (state.opts && state.opts.pragma) || 'createElement';
                    const nodeList = jsxFunction(path, state, functionName);
                    const openingElement = path.node.openingElement;
                    const tagName = openingElement.name.name;

                    const attributes = openingElement.attributes.map((attr) => {
                        const name = attr.name.name;
                        let value = attr.value;
                        if (type.isObjectExpression(value?.expression)) {
                            value = value?.expression
                        }
                        return type.objectProperty(type.identifier(name), value);
                    });

                    path.replaceWith(
                        type.callExpression(type.identifier(functionName),
                            [
                                type.stringLiteral(tagName),
                                attributes.length? type.objectExpression([
                                    ...attributes
                                ]): type.nullLiteral(),
                                ...nodeList
                            ])
                    )
                }
            },
            // 解析 {  }
            JSXExpressionContainer: {
                exit (path) {
                    const { expression } = path.node;
                    if (!type.isObjectExpression(expression)) {
                        path.replaceWith(
                            type.stringLiteral(`${expression.value}`)
                        )
                    }
                }
            }
        }
    }
}


module.exports = JSXPlugins;