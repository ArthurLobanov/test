import { Component, OnInit } from '@angular/core';
import { ASSET_FILTERS, ASSET_ICONS } from '../../shared/consts';
import { CatalogService } from '../../catalog.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss']
})
export class FilterBarComponent implements OnInit {
  assetIcons = ASSET_ICONS;
  assetFilters = ASSET_FILTERS.map(el => el);

  constructor(private catalogService: CatalogService) {
  }

  ngOnInit(): void {

  }

  updateFilters() {
    this.catalogService.filters.next(this.assetFilters.filter(filter => filter.checked));
  }
}
