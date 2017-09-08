import {ShareArgs} from './share-button.provider';

export module ShareLinks {
  export function qzoneShare(args: ShareArgs) {
    let shareUrl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey';
    shareUrl += `?url='${args.url}`;
    if (args.title) {
      shareUrl += `&title=${args.title}`;
    }
    if (args.description) {
      shareUrl += `&desc=${args.description}`;
    }
    if (args.description) {
      shareUrl += `$summary=${args.description}`;
    }
    if (args.site) {
      shareUrl += `$site=${args.site}`;
    }
    return shareUrl;
  }

  export function qqShare(args: ShareArgs) {
    let shareUrl = 'http://connect.qq.com/widget/shareqq/index.html';
    shareUrl += `?url=${args.url}`;
    if (args.title) {
      shareUrl += `&title=${args.title}`;
    }
    if (args.description) {
      shareUrl += `&desc=${args.description}`;
    }
    if (args.source) {
      shareUrl += `$source=${args.source}`;
    }
    if (args.image) {
      shareUrl += `$pics=${args.image}`;
    }
    return shareUrl;
  }

  export function tencentShare(args: ShareArgs) {
    let shareUrl = 'http://share.v.t.qq.com/index.php';
    shareUrl += `?c=share&a=index&url=${args.url}`;
    if (args.title) {
      shareUrl += `&title=${args.title}`;
    }
    if (args.image) {
      shareUrl += `$pic=${args.image}`;
    }
    return shareUrl;
  }

  export function weiboShare(args: ShareArgs) {
    let shareUrl = 'http://service.weibo.com/share/share.php';
    shareUrl += `?url=${args.url}`;
    if (args.title) {
      shareUrl += `&title=${args.title}`;
    }
    if (args.source) {
      shareUrl += `$source=${args.source}`;
    }
    if (args.appkey) {
      shareUrl += `$appkey=${args.appkey}`;
    }
    return shareUrl;
  }

  export function doubanShare(args: ShareArgs) {
    let shareUrl = 'http://shuo.douban.com/!service/share';
    shareUrl += `?href=${args.url}`;
    if (args.title) {
      shareUrl += `&name=${args.title}`;
    }
    if (args.description) {
      shareUrl += `$text=${args.description}`;
    }
    if (args.image) {
      shareUrl += `$image=${args.image}`;
    }
    shareUrl += '&starid=0&aid=0&style=11';
    return shareUrl;
  }

  export function diandianShare(args: ShareArgs) {
    let shareUrl = 'http://www.diandian.com/share';
    shareUrl += `?lo=${args.url}`;
    if (args.title) {
      shareUrl += `&ti=${args.title}`;
    }
    shareUrl += '&type=link';
    return shareUrl;
  }

  export function fbShare(args: ShareArgs) {
    let shareUrl = 'https://www.facebook.com/sharer/sharer.php';
    shareUrl += `?u=${args.url}`;
    if (args.title) {
      shareUrl += `&title=${args.title}`;
    }
    if (args.description) {
      shareUrl += `&description=${args.description}`;
    }
    if (args.image) {
      shareUrl += `$picture=${args.image}`;
    }
    return shareUrl;
  }

  export function twitterShare(args: ShareArgs) {

    let shareUrl = 'https://twitter.com/intent/tweet';
    shareUrl += `?url=${args.url}`;

    if (args.title) {
      shareUrl += `&text=${args.title}`;
    }
    if (args.via) {
      shareUrl += `&via=${args.via}`;
    }
    if (args.tags) {
      shareUrl += `&hashtags=${args.tags}`;
    }

    return shareUrl;
  }

  export function linkedInShare(args: ShareArgs) {

    let shareUrl = 'http://www.linkedin.com/shareArticle';
    shareUrl += `?url=${args.url}`;

    if (args.title) {
      shareUrl += `&title=${args.title}`;
    }
    if (args.description) {
      shareUrl += `&summary=${args.description}`;
    }
    return shareUrl;
  }

  export function googleShare(args: ShareArgs) {
    let shareUrl = 'https://plus.google.com/share';
    shareUrl += `?url=${args.url}`;
    return shareUrl;
  }
}
