import { Component, OnInit } from '@angular/core';


interface Word {
  word: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-agent-board',
  templateUrl: './agent-board.component.html',
  styleUrls: ['./agent-board.component.scss']
})
export class AgentBoardComponent implements OnInit {

  words: Word[] = [];

  constructor() { 
  }

  ngOnInit(): void {
    
    this.words = this.getWords(25);
  }

  getWords(length: number): string[] {
    // replace with word generator
    return new Array<string>(length).fill('noun');
  }

  onCardClick(word: string): void {
    const isInSelectedWords = this.selectedWords.includes(word);
    if (isInSelectedWords) {
      this.selectedWords = this.selectedWords.filter((x) => x !== word);
    } else {
      this.selectedWords = this.selectedWords = [...this.words, word];
    }
  }
}
