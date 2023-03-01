export default function boxXiangPi ({ canvas, stash }) {
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');

    function init () {
        canvas.addEventListener('mousedown', canvasMousedown);
        canvas.addEventListener('mousemove', canvasMousemove);
        canvas.addEventListener('mouseup', canvasMouseup);
    }

    function clean () {
        canvas.removeEventListener('mousedown', canvasMousedown);
        canvas.removeEventListener('mousemove', canvasMousemove);
        canvas.removeEventListener('mouseup', canvasMouseup);
    }

    function canvasMousedown () {}

    function canvasMousemove () {}

    function canvasMouseup () {}

    function render () {

    }

    return {
        init,
        render,
        clean,
        areas: []
    };
}