'use strict';

class Tetris {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.context.scale(20, 20);

    this.colors = [
      null,
      '#FF0D72',
      '#0DC2FF',
      '#0DFF72',
      '#F538FF',
      '#FF8E0D',
      '#FFE138',
      '#3877FF',
    ];

    /** Анимация. */
    let lastTime = 0;
    const update = (time = 0) => {
      const deltaTime = time - lastTime;
      lastTime = time;

      figureController.updateGame(deltaTime);

      this._showTetris();
      requestAnimationFrame(update);
    }

    update();
  }

  /** Вырисовывание игрового поля с положением фигуры на нем. */
  _showTetris() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this._drawFigure(playGround.matrix, {x: 0, y: 0});
    this._drawFigure(figureController.matrix, figureController.pos);
  }

  /** Вырисовывание фигуры через матрицы на игровое поле. */
  _drawFigure(matrix, offset) {
    matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
            this.context.fillStyle = this.colors[value];
            this.context.fillRect(x + offset.x,
                                  y + offset.y,
                                  1, 1);
        }
      });
    });
  }

  /** Обновление счета. */
  updateScore() {
    document.getElementById('score').innerText = 'Счет: ' + figureController.score;
  }
}
