import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentBoardComponent } from './agent-board.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    AgentBoardComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AgentBoardComponent
  ]
})
export class AgentBoardModule { }
