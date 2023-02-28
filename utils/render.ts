
export function cleanCanvas ({ ctx, canvas, x = 0, y = 0 }) {
    ctx.clearRect(x, y, canvas.width, canvas.height);
}