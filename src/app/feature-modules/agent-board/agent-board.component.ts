import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class AgentBoardComponent implements OnInit, OnDestroy {
  words$: Observable<Word[]> = new Observable<Word[]>();
  words: Word[] = [];
  selectedWords: Word[] = [];
  dictionary: string[] = [];
  subscriptions = new Subject();

  constructor(private wordsService: WordsService) {}

  ngOnInit(): void {
    this.words$ = this.wordsService.getWords(25);
    this.words$.pipe(takeUntil(this.subscriptions)).subscribe((words) => {
      this.words = words;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  onCardClick(word: Word): void {
    const index = this.words.findIndex((x) => x.text === word.text);
    this.words[index].isSelected = !this.words[index].isSelected;
  }

  onSubmit(): void {
    console.log('submit', this.words.filter(word => word.isSelected));
  }
}
