import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { EyeIconComponent } from './components/icons/eye-icon/eye-icon.component';
import { EyeOffIconComponent } from './components/icons/eye-off-icon/eye-off-icon.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    Error404PageComponent,
    ErrorMessageComponent,
    EyeIconComponent,
    EyeOffIconComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
  ],
  imports: [CommonModule],
  exports: [
    Error404PageComponent,
    ErrorMessageComponent,
    EyeIconComponent,
    EyeOffIconComponent,
    LoadingSpinnerComponent,
    SearchBoxComponent,
  ],
})
export class SharedModule {}
