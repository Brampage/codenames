import { Component, OnDestroy, OnInit } from '@angular/core';
import { WordsService } from '../words-service/words.service';


export interface Word {
  text: string;
  isSelected: boolean;
}

@Component({
  selector: 'app-agent-board',
  templateUrl: './agent-board.component.html',
  styleUrls: ['./agent-board.component.scss'],
})
export class AgentBoardComponent implements OnInit {

  words: Word[] = [];
  selectedWords: Word[] = [];
  dictionary: string[] = [];

  constructor(private wordsService: WordsService) {}

  ngOnInit(): void {
    this.words = this.wordsService.getWords(25);

  }

  onCardClick(word: Word): void {
    const isInSelectedWords = this.selectedWords.includes(word);
    if (isInSelectedWords) {
      this.selectedWords = this.selectedWords.filter((x) => x !== word);
    } else {
      this.selectedWords = this.selectedWords = [...this.words, word];
    }

    console.log('selectedWords',this.selectedWords);
  }
}
