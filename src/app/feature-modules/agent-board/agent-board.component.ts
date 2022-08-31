import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-agent-board',
  templateUrl: './agent-board.component.html',
  styleUrls: ['./agent-board.component.scss']
})
export class AgentBoardComponent implements OnInit {

  words: string[] = [];

  constructor() { 
  }

  ngOnInit(): void {
    
    this.words = this.getWords(25);
  }

  getWords (length: number): string[] {
    // replace with word generator
    return new Array<string>(length).fill('noun');
  }

}
