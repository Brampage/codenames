import { Injectable } from '@angular/core';

type CardState = 'team1' | 'team2' | 'dead' | 'kill';

interface SpyCard {
  state: CardState;
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

  initializeGame(): void {
    this.spyBoard = Array.apply(null, Array(length)).map(() => {
      return {
        state: this.getRandomState(),
      };
    });
  }

  private getRandomState(): CardState {
    return 'dead';
  }
}
