import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Word } from '../agent-board/agent-board.component';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordsService implements OnDestroy {
  subscriptions = new Subject<any>();
  selected: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this.subscriptions.next();
    this.subscriptions.complete();
  }

  getWords(length: number): Observable<Word[]> {
    return this.http.get('/assets/words.txt', { responseType: 'text' }).pipe(
      takeUntil(this.subscriptions),
      map((rawWords) => {
        const dictionary: string[] = rawWords.split(/\n/);

        return Array.apply(null, Array(length)).map(() => {
          return {
            text: this.getRandomWord(dictionary),
            isSelected: false,
          };
        });
      })
    );
  }

  getRandomWord(dictionary: string[]): string {
    const index = Math.floor(Math.random() * dictionary.length);
    let selectedWord = dictionary[index];
    if (!this.selected.includes(selectedWord)) {
      this.selected.push(selectedWord);
      return selectedWord;
    }
    return this.getRandomWord(dictionary);
  }
}
