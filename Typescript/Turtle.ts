// Browser-only example. Run in an HTML page with:
// <canvas id="turtle" width="500" height="300"></canvas>

const drawSquare = (ctx, x, y, size, color) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, size, size);
};

const drawScene = () => {
  const canvas = document.getElementById('turtle');
  if (!canvas) {
    console.error('Canvas #turtle not found.');
    return;
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    console.error('2D context is not available.');
    return;
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawSquare(ctx, 40, 40, 100, 'blue');
  drawSquare(ctx, 200, 40, 100, 'red');

  ctx.fillStyle = 'black';
  ctx.font = 'bold 24px Arial';
  ctx.fillText('Hello Turtle!', 120, 230);
};

if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', drawScene);
}
