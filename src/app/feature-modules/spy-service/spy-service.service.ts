import { Injectable } from '@angular/core';

type CardState = 'team1' | 'team2' | 'dead' | 'kill';

interface SpyCard {
  state: CardState;
  actualState: CardState | null;
}

@Injectable({
  providedIn: 'root',
})
export class SpyServiceService {
  spyBoard: SpyCard[] = [];
  length: number = 0;

  constructor() {}

  getSpyBoard(): SpyCard[] {
    return this.spyBoard;
  }

  checkCardState(index: number) {
    return this.spyBoard[index].state;
  }

  initializeGame(length: number): void {
    const defaultTeamLength = (length - (length % 3)) / 3;
    const team1 = Array(defaultTeamLength + 1).fill('team1');
    const team2 = Array(defaultTeamLength).fill('team2');
    const dead = Array(defaultTeamLength - 1).fill('dead');

    const states: CardState[] = [...team1, ...team2, ...dead, 'kill'];

    this.shuffle(states);

    this.spyBoard = states.map((state) => {
      return {
        state: state,
        actualState: null,
      };
    });
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
