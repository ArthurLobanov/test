import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FilterBarComponent } from './catalog/filter-bar/filter-bar.component';
import { CatalogComponent } from './catalog/catalog.component';
import { AssetComponent } from './catalog/asset/asset.component';
import { HttpClientModule } from '@angular/common/http';
import { ImagePreloadDirective } from './shared/directives/image-preload.directive';
import { RouterModule } from '@angular/router';
import { AssetsSortPipe } from './shared/pipes/assets-sort.pipe';
import { TagsComponent } from './catalog/asset/tags/tags.component';
import { ClickOutsideDirective } from './shared/directives/click-outside.directive';
import { FormsModule } from '@angular/forms';
import { AssetsFilterPipe } from './shared/pipes/assets-filter.pipe';
import { InfiniteScrollComponent } from './shared/components/infinite-scroll/infinite-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterBarComponent,
    CatalogComponent,
    AssetComponent,
    ImagePreloadDirective,
    AssetsSortPipe,
    TagsComponent,
    ClickOutsideDirective,
    AssetsFilterPipe,
    InfiniteScrollComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
