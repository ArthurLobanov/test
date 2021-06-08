import { Injectable } from '@angular/core';
import { Asset } from './shared/models/asset.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from './shared/models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  public usage: Subject<number> = new Subject();

  public filters: Subject<any> = new Subject();

  private readonly bookmarks: number[];

  constructor(private http: HttpClient) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks') as string);
    if (!bookmarks) {
      localStorage.setItem('bookmarks', '[]');
      this.bookmarks = [];
    } else {
      this.bookmarks = bookmarks;
    }
  }

  public checkAssetIsInBookmarks(assetID: number) {
    return this.bookmarks.includes(assetID);
  }

  public addAssetInBookmarks(assetID: number) {
    if (!this.checkAssetIsInBookmarks(assetID)) {
      this.bookmarks.push(assetID);
      this.saveBookmarks();
    }
  }

  public removeAssetFromBookmarks(assetID: number) {
    this.bookmarks.splice(this.bookmarks.indexOf(assetID, 1));
    this.saveBookmarks();
  }

  private saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  public getAssets(filters: Filter[], sortBy: string, sizeParams: { indexFrom: number; count: number }): Observable<Asset[]> {
    return this.http.get<any[]>('/assets/data.json').pipe(
      map(assets => {
        assets = assets.map(item => {
          return new Asset(
            item.id,
            item.type,
            item.title,
            item['used-total-count'],
            item['created-at'],
            item.description,
            item.tags,
            item['preview-image'],
            item['external-link'],
            item['original-file-src']
          );
        });

        assets.sort((a, b) => {
          if (sortBy === 'createdAt') {
            return a.createdAt > b.createdAt ? -1 : 1;
          } else {
            return a.usedTotalCount > b.usedTotalCount ? -1 : 1;
          }
        });

        if (filters.length) {
          assets = assets.filter(asset => {
              return filters.find((filter: Filter) => filter.type === asset.type);
            }
          );
        }

        assets = assets.splice(sizeParams.indexFrom || 0, sizeParams.count || 12);

        return assets;
      })
    );
  }


}
