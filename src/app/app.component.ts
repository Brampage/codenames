import { Component, OnInit } from '@angular/core';
import { SpyService } from './feature-modules/spy-service/spy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'codenames';

  constructor(private spyService: SpyService) {}

  ngOnInit(): void {
    this.spyService.initializeGame(25);
  }
}
