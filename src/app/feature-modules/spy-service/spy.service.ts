import { Injectable } from '@angular/core';

type CardState = 'team1' | 'team2' | 'neutral' | 'kill';

interface SpyCard {
  state: CardState;
  actualState: CardState | null | 'wrong';
}

@Injectable({
  providedIn: 'root',
})
export class SpyService {
  spyBoard: SpyCard[] = [];
  length: number = 0;

  constructor() {}

  getSpyBoard(): SpyCard[] {
    return this.spyBoard;
  }

  checkCardState(index: number) {
    return this.spyBoard[index].actualState;
  }

  initializeGame(length: number): void {
    const defaultTeamLength = (length - (length % 3)) / 3;
    const team1 = Array(defaultTeamLength + 1).fill('team1');
    const team2 = Array(defaultTeamLength).fill('team2');
    const dead = Array(defaultTeamLength - 1).fill('neutral');

    const states: CardState[] = [...team1, ...team2, ...dead, 'kill'];

    this.shuffle(states);

    this.spyBoard = states.map((state) => {
      return {
        state: state,
        actualState: null,
      };
    });
    console.log('game initialized:', this.spyBoard);
  }

  updateActualState(indexes: number[], team: 'team1' | 'team2') {
    indexes.forEach((index) => {
      const card = this.spyBoard[index];
      if (card.state === team) {
        card.actualState = team;
      } else if (card.state === 'neutral') {
        card.actualState = 'neutral';
      } else if (card.state === 'kill') {
        card.actualState = 'kill';
      } else {
        card.actualState = 'wrong';
      }
    });
    console.log('updated:', this.spyBoard);
  }

  private shuffle(array: CardState[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
