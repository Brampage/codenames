import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpyService } from '../spy-service/spy.service';
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
    public spyService: SpyService
  ) {}

  ngOnInit(): void {
    this.words$ = this.wordsService.getWords(25);
    this.words$.pipe(takeUntil(this.subscriptions)).subscribe((words) => {
      this.words = words;
    });

    this.spyService.initializeGame(25);
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
    const selectedWordIndexes = this.words
      .map((word, index) => (word.isSelected ? index : -1))
      .filter((x) => x !== -1);

    this.spyService.updateActualState(selectedWordIndexes, 'team1');
    this.resetSelected();
  }

  onSubmitTeam2(): void {
    const selectedWordIndexes = this.words
      .map((word, index) => (word.isSelected ? index : -1))
      .filter((x) => x !== -1);

    this.spyService.updateActualState(selectedWordIndexes, 'team2');
    this.resetSelected();
  }

  resetSelected(): void {
    this.words = this.words.map((x) => ({ ...x, isSelected: false }));
  }

  onShowSpyCard(): void {
    this.spyService.updateActualState(
      Array.from({ length: 25 }, (v, i) => i),
      'team1'
    );
    this.spyService.updateActualState(
      Array.from({ length: 25 }, (v, i) => i),
      'team2'
    );
  }
}
