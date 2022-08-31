import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpyComponent } from './spy.component';

@NgModule({
  declarations: [SpyComponent],
  imports: [CommonModule],
  exports: [SpyComponent],
})
export class SpyModule {}
