'use strict';

/** Движение в зависимости от нажатой клавиши: вправо, вниз (ускоренное падение), влево и вращение фигуры по клавишам 'w', 'q'. */
document.addEventListener('keydown', event => {
  if (event.keyCode === 39 || event.keyCode === 68) {
    figureController.move(1);
  } else if (event.keyCode === 40 || event.keyCode === 83) {
    figureController.fall();
  } else if (event.keyCode === 37 || event.keyCode === 65) {
    figureController.move(-1);
  } else if (event.keyCode === 87) {
    figureController.rotate(1);
  } else if (event.keyCode === 81) {
    figureController.rotate(-1);
  }
});

const playGround = new PlayGround(12, 20);

const figureController = new FigureController;

const tetris = new Tetris(document.getElementById('tetris'));

tetris.updateScore();

document.getElementById('new-game').onclick = () => {
    figureController.reset()
}
