import {Quill} from "react-quill";

class LogoItest extends Quill.import('blots/inline') {
    static create(value) {
        const styles = {
            color: '#fff',
            fontSize: '16px',
            fontWeight: '700',
            padding: '2px 10px',
            borderRadius: '6.635px',
            background: '#e3471b',
            whiteSpace: 'nowrap',
        };
        const node = super.create(value);
        Object.assign(node.style, styles);
        node.innerText = 'i-Test';
        node.contentEditable = false;
        return node;
    }

    static value(node) {
        return node.dataset;
    }
}
LogoItest.blotName = 'logo-itest';
LogoItest.tagName = 'span';

//Line height
export const AvailableLineHeights = [...Array(110).keys()].map((x) => `${(80 + x * 5) / 100}`);
const parchment = Quill.import('parchment')
const lineHeightConfig = {
    scope: parchment.Scope.INLINE,
    whitelist: AvailableLineHeights
}
const lineHeightStyle = new parchment.Attributor.Style('line-height', 'line-height', lineHeightConfig);

//Font size
const fontSizeArr = ['0.8em','0.9em','1em','1.2em','1.4em','1.6em','2.0em','2.4em','3em','4.4em','5.4em','6.8em','8.4em','9.8em'];
const Size = Quill.import('attributors/style/size');
Size.whitelist = fontSizeArr;

Quill.register(lineHeightStyle, true);
Quill.register(LogoItest);
Quill.register(Size, true);

export {LogoItest, lineHeightStyle, fontSizeArr};