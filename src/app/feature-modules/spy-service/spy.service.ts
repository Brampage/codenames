import { Injectable } from '@angular/core';

type CardState = 'team1' | 'team2' | 'neutral' | 'kill';

interface SpyCard {
  state: CardState;
  actualState: CardState | null;
}

@Injectable({
  providedIn: 'root',
})
export class SpyService {
  spyBoard: SpyCard[] = [];
  length: number = 0;
  team2Length = 0;
  team1Length = 0;

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

    this.team1Length = team1.length;
    this.team2Length = team2.length;

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

  updateActualState(indexes: number[]) {
    indexes.forEach((index) => {
      const card = this.spyBoard[index];
      card.actualState = card.state;
    });
    console.log('updated:', this.spyBoard);
  }

  public checkWinner(team: 'team1' | 'team2'): string {
    const selectedTeam1Length = this.spyBoard.filter(
      (card) => card.actualState === 'team1'
    ).length;
    const selectedTeam2Length = this.spyBoard.filter(
      (card) => card.actualState === 'team2'
    ).length;

    const isKilled = this.spyBoard.some((card) => card.actualState === 'kill');

    if (isKilled) {
      console.log('KILLED!!!');
      return 'kill';
    }

    if (team === 'team1' && selectedTeam1Length === this.team1Length) {
      console.log('team 1 won!!!');
      return 'team1';
    }

    if (team === 'team2' && selectedTeam2Length === this.team2Length) {
      console.log('team 2 won!!!');
      return 'team2';
    }

    return '';
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
