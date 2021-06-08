export class Asset {
  constructor(
    public id: number,
    public type: number,
    public title: string,
    public usedTotalCount: number,
    public createdAt: number,
    public description?: string,
    public tags?: string[],
    public previewImage?: string,
    public externalLink?: {
      href: string,
      title?: string
    },
    public originalFileSrc?: string,
  ) {
  }
}
