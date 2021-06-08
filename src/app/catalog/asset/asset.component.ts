import { Component, Input, OnInit} from '@angular/core';
import { Asset } from '../../shared/models/asset.model';
import { ASSET_ICONS, ASSET_TYPES } from '../../shared/consts';
import { CatalogService } from '../../catalog.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
})

export class AssetComponent implements OnInit {
  @Input() asset: Asset;
  assetTypes = ASSET_TYPES;
  icon: string = '';
  inBookmarkFlag: boolean;

  constructor(private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.icon = ASSET_ICONS.get(this.asset.type) as string;
    this.inBookmarkFlag = this.catalogService.checkAssetIsInBookmarks(this.asset.id);
  }

  toggleBookmark() {
    if (this.inBookmarkFlag) {
      this.catalogService.removeAssetFromBookmarks(this.asset.id);
      this.inBookmarkFlag = false;
    } else {
      this.catalogService.addAssetInBookmarks(this.asset.id);
      this.inBookmarkFlag = true;
    }
  }

  use() {
    this.catalogService.usage.next(this.asset.id);
  }
}

