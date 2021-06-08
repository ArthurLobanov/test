import { Pipe, PipeTransform } from '@angular/core';
import { Asset } from '../models/asset.model';

@Pipe({
  name: 'assetsFilter'
})

export class AssetsFilterPipe implements PipeTransform {
  constructor() {
  }

  transform(assets: Asset[], filters: any[]): Asset[] {
    if (filters.length) {
      return assets.filter(asset => {
          return filters.find(filter => filter.type === asset.type);
        }
      );
    } else {
      return assets;
    }
  }
}
