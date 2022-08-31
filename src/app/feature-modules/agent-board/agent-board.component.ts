import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpyServiceService } from '../spy-service/spy-service.service';
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

  get isSubmitDisabled(): boolean {
    return this.words.findIndex((x) => x.isSelected) === -1;
  }

  constructor(
    private wordsService: WordsService,
    private spyService: SpyServiceService
  ) {}

  ngOnInit(): void {
    this.words$ = this.wordsService.getWords(25);
    this.words$.pipe(takeUntil(this.subscriptions)).subscribe((words) => {
      this.words = words;
    });

    this.spyService.initializeGame();
  }

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  onCardClick(word: Word): void {
    const index = this.words.findIndex((x) => x.text === word.text);
    this.words[index].isSelected = !this.words[index].isSelected;
  }

  onSubmitTeam1(): void {
    console.log(
      'submit team 1',
      this.words.findIndex((word) => word.isSelected)
    );
  }

  onSubmitTeam2(): void {
    console.log(
      'submit team 2',
      this.words.filter((word) => word.isSelected)
    );
  }
}
