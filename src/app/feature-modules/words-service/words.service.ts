import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Word } from '../agent-board/agent-board.component';
import {takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordsService implements OnDestroy {

  subscriptions = new Subject<any>();

  constructor(private http: HttpClient) {
    this.http.get('app/assets/words.txt')
      .pipe(
        takeUntil(this.subscriptions)
      ).subscribe((words: any) => {
        console.log(words);
      });
  }

  ngOnDestroy(): void {
      this.subscriptions.next();
      this.subscriptions.complete();
  }

  getWords(length: number): Word[] {
    // replace with word generator
    return new Array<Word>(length).fill({
      text: this.getRandomWord(),
      isSelected: false,
    });
  }

  getRandomWord(): string {
    return 'hey'
  }
}
