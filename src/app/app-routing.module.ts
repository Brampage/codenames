import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpyComponent } from './feature-modules/spy/spy.component';
import { SpyModule } from './feature-modules/spy/spy.module';
import { AgentBoardComponent } from './feature-modules/agent-board/agent-board.component';
import { AgentBoardModule } from './feature-modules/agent-board/agent-board.module';

const routes: Routes = [
  {
    path: '',
    component: AgentBoardComponent,
  },
  {
    path: 'spy',
    component: SpyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SpyModule, AgentBoardModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
