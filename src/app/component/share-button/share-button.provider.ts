export class ShareArgs {
  public url: string;
  public title: string;
  public description: string;
  public image: string;
  public tags: string;
  public via: string;
  public source: string;
  public site: string;
  public appkey: string;
  public mobile: boolean;
  constructor(args: any = {url: ''}) {
    if (args.url) {
      this.url = args.url;
    }
    if (args.title) {
      this.title = args.title;
    }
    if (args.description) {
      this.description = args.description;
    }
    if (args.image) {
      this.image = args.image;
    }
    if (args.tags) {
      this.tags = args.tags;
    }
    if (args.via) {
      this.via = args.via;
    }
    if (args.source) {
      this.source = args.source;
    }
    if (args.site) {
      this.site = args.site;
    }
    if (args.appkey) {
      this.appkey = args.appkey;
    }
    if (args.mobile) {
      this.mobile = args.mobile;
    }
  }
}
