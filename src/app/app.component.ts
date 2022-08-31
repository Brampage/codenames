import { Component, OnInit } from '@angular/core';
import { SpyService } from './feature-modules/spy-service/spy.service';
import { WordsService } from './feature-modules/words-service/words.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'codenames';

  constructor(
    private spyService: SpyService,
    private wordsService: WordsService
  ) {}

  ngOnInit(): void {
    this.spyService.initializeGame(25);
    this.wordsService.initialize(25);
  }
}
