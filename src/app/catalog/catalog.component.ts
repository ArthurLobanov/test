import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { CatalogService } from '../catalog.service';
import { Asset } from '../shared/models/asset.model';
import { Subscription } from 'rxjs';
import { Filter } from '../shared/models/filter.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})

export class CatalogComponent implements OnInit, OnDestroy {
  @Output() assetUse: EventEmitter<number> = new EventEmitter<number>();
  public assets: Asset[] = [];

  private sortBy = 'usedTotalCount';
  private filters: Filter[] = [];

  private filtersSubscription: Subscription;
  private routeSubscription: Subscription;
  private assetUsageSubscription: Subscription;

  constructor(private catalogService: CatalogService,
              private route: ActivatedRoute) {

    this.filtersSubscription = this.catalogService.filters.subscribe(filters => {
      this.filters = filters;
      this.loadAssets(true);
    });

    this.routeSubscription = this.route.queryParams.subscribe(params => {
      if (params['sort-by'] === 'created-at') {
        this.sortBy = 'createdAt';
        this.loadAssets(true);
      } else if (params['sort-by'] === 'used-total-count') {
        this.sortBy = 'usedTotalCount';
        this.loadAssets(true);
      }

    });

    this.assetUsageSubscription = this.catalogService.usage.subscribe(assetId => {
      this.assetUse.emit(assetId);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.filtersSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
    this.assetUsageSubscription.unsubscribe();
  }

  loadAssets(reload?: boolean) {
    this.catalogService.getAssets(this.filters, this.sortBy, {
        indexFrom: reload ? 0 : this.assets.length,
        count: 16
      }
    ).subscribe(assets => {
      if (reload) {
        this.assets = assets;
      } else {
        this.assets = this.assets.concat(assets);
      }
    });
  }
}
