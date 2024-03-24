export default class RecentlyPlayedItem {
  constructor(options) {
    const { title, imageUrl, previewUrl } = options;
    this.name = title;
    this.imageUrl = imageUrl;
    this.previewUrl = previewUrl;
  }
}
