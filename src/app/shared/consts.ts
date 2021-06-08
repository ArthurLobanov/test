export enum ASSET_TYPES {
  TEMPLATE,
  IMAGE,
  VIDEO,
  PDF,
  GIF,
  ARTICLE
}

export const ASSET_FILTERS = [
  {
    type: ASSET_TYPES.TEMPLATE,
    name: ASSET_TYPES[ASSET_TYPES.TEMPLATE],
    checked: false
  },
  {
    type: ASSET_TYPES.IMAGE,
    name: ASSET_TYPES[ASSET_TYPES.IMAGE],
    checked: false
  },
  {
    type: ASSET_TYPES.VIDEO,
    name: ASSET_TYPES[ASSET_TYPES.VIDEO],
    checked: false
  },
  {
    type: ASSET_TYPES.PDF,
    name: ASSET_TYPES[ASSET_TYPES.PDF],
    checked: false
  },
  {
    type: ASSET_TYPES.GIF,
    name: ASSET_TYPES[ASSET_TYPES.GIF],
    checked: false
  },
  {
    type: ASSET_TYPES.ARTICLE,
    name: ASSET_TYPES[ASSET_TYPES.ARTICLE],
    checked: false
  }
];

export const ASSET_ICONS = new Map([
  [ASSET_TYPES.TEMPLATE, 'template.svg'],
  [ASSET_TYPES.IMAGE, 'image.svg'],
  [ASSET_TYPES.VIDEO, 'video.svg'],
  [ASSET_TYPES.PDF, 'pdf.svg'],
  [ASSET_TYPES.GIF, 'gif.svg'],
  [ASSET_TYPES.ARTICLE, 'article.svg']
]);
