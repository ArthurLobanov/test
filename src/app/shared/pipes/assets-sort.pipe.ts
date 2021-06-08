import { Pipe, PipeTransform } from '@angular/core';
import { Asset } from "../models/asset.model";
import { ActivatedRoute} from "@angular/router";

@Pipe({
  name: 'assetsSort'
})
export class AssetsSortPipe implements PipeTransform {

  constructor(private route: ActivatedRoute) {
  }

  transform(assets: Asset[]): Asset[] {
    this.route.queryParams.subscribe(params => {
      assets.sort((a, b) => {
        if (params['sort-by'] === 'created-at') {
          return a.createdAt > b.createdAt ? -1 : 1;
        } else {
          return a.usedTotalCount > b.usedTotalCount ? -1 : 1;
        }
      });
    })

    return assets;
  }

}
