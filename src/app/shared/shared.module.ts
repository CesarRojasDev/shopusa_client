import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from './components/search-box/search-box.component';

@NgModule({
  declarations: [Error404PageComponent, SearchBoxComponent ],
  imports: [CommonModule],
  exports: [Error404PageComponent, SearchBoxComponent],
})
export class SharedModule {}
