'use strict';

class FigureController {
  constructor() {
    this.fallCounter = 0;
    this.fallInterval = 1000;

    this.pos = {x: 0, y: 0};
    this.matrix = null;
    this.score = 0;

    this.reset();
  }

  /** Создание фигуры посредством матрицы в соответствие с их общепринятым обозначением. */
  _createShape(figure) {
    if (figure === 'I') {
      return [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
      ];
    } else if (figure === 'L') {
      return [
        [0, 2, 0],
        [0, 2, 0],
        [0, 2, 2],
      ];
    } else if (figure === 'J') {
      return [
        [0, 3, 0],
        [0, 3, 0],
        [3, 3, 0],
      ];
    } else if (figure === 'O') {
      return [
        [4, 4],
        [4, 4],
      ];
    } else if (figure === 'Z') {
      return [
        [5, 5, 0],
        [0, 5, 5],
        [0, 0, 0],
      ];
    } else if (figure === 'S') {
      return [
        [0, 6, 6],
        [6, 6, 0],
        [0, 0, 0],
      ];
    } else if (figure === 'T') {
      return [
        [0, 7, 0],
        [7, 7, 7],
        [0, 0, 0],
      ];
    }
  }

  /** Новая случайная фигура, и новая игра, если игрок "проиграл". */
  reset() {
    const figures = 'TJLOSZI';
    this.matrix = this._createShape(figures[figures.length * Math.random() | 0]);
    this.pos.y = 0;
    this.pos.x = (playGround.matrix[0].length / 2 | 0) -
                 (this.matrix[0].length / 2 | 0); // | 0 == преобразование различных типов к целым числам
    if (playGround.collideWithPlayGround(this)) {
      playGround.clear();
      this.score = 0;
      tetris.updateScore();
    }
  }

  /** Движение направо или налево в зависимости от 'offset'. */
  move(offset) {
    this.pos.x += offset;
    if (playGround.collideWithPlayGround(this)) {
        this.pos.x -= offset;
    }
  }

  /** Падение с течением времени (1 сек). */
  updateGame(deltaTime) {
    this.fallCounter += deltaTime;
    if (this.fallCounter > this.fallInterval) {
      this.fall();
    }
  }

  /** Ускоренное падение. */
  fall() {
    this.pos.y++;
    if (playGround.collideWithPlayGround(this)) {
      this.pos.y--;
      playGround.mergeWithPlayGround(this);
      this.reset();
      playGround.sweepBottomLine();
      tetris.updateScore();
    }
    this.fallCounter = 0;
  }

  /** Вращение фигуры с магией через reverse(). */
  _rotateFigure(matrix, dir) {
    for (let y = 0; y < matrix.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [
          matrix[x][y],
          matrix[y][x],
        ] = [
          matrix[y][x],
          matrix[x][y],
        ];
      }
    }

    if (dir > 0) {
      matrix.forEach(row => row.reverse());
    } else {
      matrix.reverse();
    }
  }

  /** Вращение фигуры по часовой стрелке либо против в зависимости от нажатой клавиши. */
  rotate(dir) {
    const pos = this.pos.x;
    let offset = 1;
    this._rotateFigure(this.matrix, dir);
    while (playGround.collideWithPlayGround(this)) {
      this.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.matrix[0].length) {
        this._rotateFigure(this.matrix, -dir);
        this.pos.x = pos;
        return;
      }
    }
  }
}
