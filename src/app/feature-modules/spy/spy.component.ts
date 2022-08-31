import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../agent-board/agent-board.component';
import { SpyService } from '../spy-service/spy.service';
import { WordsService } from '../words-service/words.service';

@Component({
  selector: 'app-spy',
  templateUrl: './spy.component.html',
  styleUrls: ['./spy.component.scss'],
})
export class SpyComponent implements OnInit {
  words$: Observable<Word[]> = new Observable();

  constructor(
    public wordsService: WordsService,
    public spyService: SpyService
  ) {}

  ngOnInit(): void {
    console.log(this.spyService.getSpyBoard());
    this.words$ = this.wordsService.getWords();
  }
}
