import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgentBoardModule} from './feature-modules/agent-board/agent-board.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgentBoardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
