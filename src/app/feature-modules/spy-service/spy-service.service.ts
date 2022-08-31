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
  constructor() {}

  getSpyBoard(): SpyCard[] {
    return this.spyBoard;
  }

  checkCardState(index: number) {
    return this.spyBoard[index].state;
  }

  initializeGame(): void {
    this.spyBoard = Array.apply(null, Array(length)).map(() => {
      return {
        state: this.getRandomState(),
        actualState: null,
      };
    });
  }

  private getRandomState(): CardState {
    return 'dead';
  }
}
