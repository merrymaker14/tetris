'use strict';

class PlayGround {
  constructor(w, h) {
    const matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    this.matrix = matrix;
  }

  /** Очистка игрового поля. */
  clear() {
    this.matrix.forEach(row => row.fill(0));
  }

  /** Проверка рамок. */
  collideWithPlayGround(figureController) {
    const m = figureController.matrix;
    const o = figureController.pos;
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 &&
         (this.matrix[y + o.y] &&
          this.matrix[y + o.y][x + o.x]) !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  /** Обновление положения фигуры на игровом поле. */
  mergeWithPlayGround(figureController) {
    figureController.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.matrix[y + figureController.pos.y][x + figureController.pos.x] = value;
        }
      });
    });
  }

  /** Убирание нижней линии и прибавление очков. */
  sweepBottomLine() {
    let rowCount = 1;
    outer: for (let y = this.matrix.length -1; y > 0; --y) {
      for (let x = 0; x < this.matrix[y].length; ++x) {
        if (this.matrix[y][x] === 0) {
          continue outer;
        }
      }

      const row = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(row);
      ++y;

      figureController.score += rowCount * 10;
      rowCount *= 2;
    }
  }
}
