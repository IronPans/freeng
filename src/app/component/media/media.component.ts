import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, NgModule, OnDestroy,
  OnInit, Output, QueryList, Renderer2, ViewChild, ViewChildren
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomRenderer} from '../common/dom';

@Component({
  selector: 'free-media-range',
  template: `
    <div #range class="free-media-range" (mousedown)="onTouchstart($event)"
         [style.width]="width" [ngStyle]="style">
      <div class="range-bar" [ngStyle]="{height: rangeHeight}"></div>
      <div class="range-bar range-buffer" [style.width]="buffer"></div>
      <div class="range-bar range-bar-active" #track [ngStyle]="{height: rangeHeight}"></div>
      <div class="range-knob-handle" #thumb>
        <div class="range-knob"></div>
      </div>
      <span class="range-slider-tooltip" #tooltip [style.opacity]="tip?'1':'0'"></span>
    </div>
  `
})
export class MediaRangeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() min: number;
  @Input() max: number;

  @Input()
  set value(value: any) {
    if (isNaN(value)) {
      this._value = this.min;
    } else {
      this._value = value;
    }
  }

  get value() {
    return this._value;
  }

  @Input() buffer: any;
  @Input() width: any;
  @Input() theme: string;
  @Input() rangeHeight: any;
  @Input() handleSize: any;
  @Input() style: any;
  @Input() tip: boolean;
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('range') _range: ElementRef;
  @ViewChild('tooltip') _tooltip: ElementRef;
  @ViewChild('thumb') thumbViewChild: ElementRef;
  @ViewChild('track') _track: ElementRef;
  tooltip: HTMLDivElement;
  range: HTMLDivElement;
  thumb: HTMLDivElement;
  track: HTMLDivElement;
  touch: any;
  timeoutID: any;
  _value: any;
  input: any;
  maxPercent: number;
  percent: any;
  isPressed: boolean;
  documentTouchmoveListener: any;
  documentTouchendListener: any;
  thumbTop: number;
  mediaType: string[];

  constructor(public renderer2: Renderer2,
              public domRenderer: DomRenderer) {
    this.maxPercent = 100;
    this.min = 0;
    this.max = 100;
    this.value = 0;
    this.width = 150;
    this.tip = true;
    this.mediaType = ['media/mp4', 'media/webm', 'media/ogg', 'media/ogv'];
    this.handleSize = 1;
  }

  ngOnInit() {
    this.touch = this.domRenderer.getTouchEvent();
  }

  ngAfterViewInit() {
    this.tooltip = this._tooltip.nativeElement;
    this.range = this._range.nativeElement;
    this.thumb = this.thumbViewChild.nativeElement;
    this.track = this._track.nativeElement;
    if (this.theme) {
      this.renderer2.addClass(this.range, `free-${this.theme}`);
    }
    if (this.width && typeof this.width === 'number') {
      this.width = <any>(this.width + 'px');
    }
    if (this.handleSize) {
      this.domRenderer.setTransform(this.thumb, 'translate(-50%, -50%) scale(' + this.handleSize + ')');
    }
    this.pageInit();
  }

  pageInit() {
    const t = this.max - this.min;
    const p = (this.value - this.min) / t;
    const current = Math.floor(p * this.range.offsetWidth);
    if (!isNaN(current)) {
      this.setValue(current);
    }
  }

  getPoint(element, event) {
    event = event || window.event;
    const touchEvent = this.touch.mobile ? event.changedTouches[0] : event;
    const rect = this.domRenderer.getRect(element);
    let x = (touchEvent.pageX ||
    touchEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft);
    x -= rect.left;
    let y = (touchEvent.pageY ||
    touchEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop);
    y -= rect.top;
    return {
      x: x,
      y: y
    };
  }

  changeValue(value) {
    const width = value * this.range.offsetWidth;
    this.value = value;
    this.setValue(width);
  }

  setValue(value) {
    let percent = value / this.range.offsetWidth * this.maxPercent;
    if (percent >= this.maxPercent) {
      percent = this.maxPercent;
    } else if (percent <= 0) {
      percent = 0;
    }
    percent = parseFloat(percent.toFixed(4));
    const t = this.max - this.min;
    const cp = Math.ceil(t * percent / 100) + this.min;
    this.thumb['style'].left = percent + '%';
    this.track['style'].right = (this.maxPercent - percent) + '%';
    this.value = cp;
    this.percent = percent;
    this.range.style.height = this.thumb.offsetHeight * this.handleSize + 'px';
    if (this.tip) {
      const currentPercent = percent / this.maxPercent;
      const left = Math.floor(this.range.offsetWidth * currentPercent - this.tooltip.offsetWidth / 2);
      this.tooltip.textContent = this.value;
      if (!this.thumbTop) {
        this.tooltip.style.opacity = '0';
        this.thumbTop = 1;
      }
      this.domRenderer.setTransform(this.tooltip, 'translate3d(' + left + 'px, -100%, 0)');
    }
  }

  getValue(e) {
    const v = this.getPoint(this.range, e);
    this.setValue(v.x);
    this.onChange.emit({'value': this.value});
  }

  onTouchstart(e) {
    if (e.button) {
      return;
    }
    if (this.tip) {
      this.tooltip.style.opacity = '.8';
    }
    clearTimeout(this.timeoutID);
    this.getValue(e);
    this.isPressed = true;
    this.documentTouchmoveListener = this.renderer2.listen('body', this.touch.touchmove, ($event) => {
      this.onTouchmove($event);
    });
    this.documentTouchendListener = this.renderer2.listen('body', this.touch.touchend, () => {
      this.onTouchend();
    });
  }

  onTouchmove(event: any) {
    if (this.isPressed) {
      if (this.tip) {
        this.tooltip.style.opacity = '.8';
      }
      this.getValue(event);
    }
  }

  onTouchend() {
    this.isPressed = false;
    this.hide(this.tooltip);
    this.unbindDocumentClickListener();
  }

  hide(elem) {
    this.timeoutID = setTimeout(function () {
      elem.style.opacity = '0';
    }, 200);
  }

  unbindDocumentClickListener() {
    if (this.documentTouchmoveListener) {
      this.documentTouchmoveListener();
      this.documentTouchmoveListener = null;
    }
    if (this.documentTouchendListener) {
      this.documentTouchendListener();
      this.documentTouchendListener = null;
    }
  }

  ngOnDestroy() {
    this.unbindDocumentClickListener();
  }
}

@Component({
  selector: 'free-media',
  template: `
    <div class="free-media" [ngStyle]="style" (mouseenter)="onMediaMouseenter($event)"
         (mouseleave)="onMediaMouseleave()" tabindex="0"
         [style.width.px]="width" [style.height.px]="height" #container>
      <div class="free-media-content">
        <video #video>
          <source *ngFor="let video of videoMedia" src="{{video.src}}" type="{{video.type}}">
          <ng-template ngFor [ngForOf]="tracks" let-track>
            <track src="{{track.src}}" kind="{{track.kind || 'subtitles'}}"
                   srclang="{{track.lang || 'en'}}" label="{{track.label}}">
          </ng-template>
          <p class="vjs-no-js">
            <ng-content></ng-content>
          </p>
        </video>
        <audio #audio>
          <ng-template ngFor [ngForOf]="audioMedia" let-audio>
            <source src="{{audio.src}}" type="{{audio.type}}">
          </ng-template>
        </audio>
        <div class="free-media-poster" *ngIf="isVideo && poster">
          <img src="{{poster}}" alt="Video">
        </div>
        <div class="free-media-overlay" *ngIf="isVideo" (click)="toggle()">
          <div class="free-loading" *ngIf="loading">
            <div class="loader circle-round small">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="big-play" *ngIf="!isPlaying">
            <i class="fa fa-play-circle-o"></i>
          </div>
        </div>
        <div class="free-media-controls" [style.display]="controls?'block':'none'" #control
             [class.free-controls-static]="staticPosition" (mouseenter)="onControlsMouseenter($event)">
          <div class="free-media-controls-panel">
            <button class="free-media-play" (click)="toggle()">
              <i class="fa" [ngClass]="{'fa-play': !isPlaying, 'fa-pause': isPlaying}"></i>
            </button>
            <div class="free-media-current-time">{{timeFormat(currentTime + '')}}</div>
            <div class="free-media-remainng-time">{{remainingTime}}</div>
            <div class="free-media-timeline">
              <free-media-range [handleSize]="0.5" [width]="'100%'" [buffer]="buffer" [value]="percent"
                                (onChange)="onProgressChange($event)" [tip]="false"
                                [style]="{minWidth: '25px'}">
              </free-media-range>
              <div class="free-media-canplay" *ngIf="!canplay"></div>
            </div>
            <button class="free-media-mute" (click)="setMuted(!muted)">
              <i class="fa" [ngClass]="{'fa-volume-up': !muted, 'fa-volume-off': muted}"></i>
            </button>
            <div class="free-media-volume">
              <free-media-range [handleSize]="0.5" [width]="'100%'"
                                (onChange)="changeVolume($event)" [value]="currentVolume * 100"
                                [tip]="false" [style]="{maxWidth: '70px', minWidth: '25px'}">
              </free-media-range>
            </div>
            <button class="free-media-fullscreen" (click)="toggleFullscreen()">
              <i class="fa fa-arrows-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  providers: [DomRenderer]
})
export class MediaComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() width: any;
  @Input() height: any;
  @Input() style: any;
  @Input() videoMedia: any[];
  @Input() audioMedia: any[];
  @Input() tracks: any[];
  @Input() muted: boolean;
  @Input() loop: boolean;
  @Input() controls: boolean;
  @Input() staticPosition: boolean;
  @Input() alwaysShowControls: boolean;
  @Input() enableKeyboard: boolean;
  @Input() theme: string;
  @Input() autoplay: boolean;
  @Input() poster: string;
  @ViewChildren(MediaRangeComponent) rangeComponent: QueryList<MediaRangeComponent>;
  @ViewChild('container') containerViewChild: ElementRef;
  @ViewChild('control') controlViewChild: ElementRef;
  @ViewChild('video') videoViewChild: ElementRef;
  @ViewChild('audio') audioViewChild: ElementRef;
  control: HTMLDivElement;
  container: HTMLDivElement;
  currentTime: any;
  remainingTime: any;
  isPlaying: boolean;
  buffer: any;
  percent: any;
  currentVolume: number;
  lastVolume: number;
  canplay: boolean;
  progressViewChild: any;
  volumeViewChild: any;
  loading: boolean;
  controlsShow: boolean;
  controlsTimer: any;
  hasFocus: boolean;
  isVideo: boolean;
  keyActions: any[];
  media: any;
  documentClickListener: any;
  documentKeydownListener: any;

  constructor(public domRenderer: DomRenderer, public renderer2: Renderer2) {
    this.width = 400;
    this.lastVolume = this.currentVolume = 0.5;
    this.currentTime = '0';
    this.isPlaying = false;
    this.controls = true;
    this.poster = '';
    this.controlsShow = true;
    this.hasFocus = false;
    this.audioMedia = [];
    this.videoMedia = [];
    this.keyActions = [{
      keys: [32],
      action: (player) => {
        if (player.paused || player.ended) {
          this.play();
        } else {
          this.pause();
        }
      }
    }, {
      keys: [38],
      action: (player) => {
        this.showControls();
        const newVolume = Math.min(player.volume + 0.1, 1);
        this.setVolume(newVolume);
        if (newVolume > 0) {
          this.setMuted(false);
        }
      }
    }, {
      keys: [40],
      action: (player) => {
        this.showControls();
        const newVolume = Math.max(player.volume - 0.1, 0);
        this.setVolume(newVolume);
        if (newVolume <= 0.1) {
          this.setMuted(true);
        }
      }
    }, {
      keys: [37, 227],
      action: (player) => {
        this.showControls();
        if (!isNaN(player.duration) && player.duration > 0) {
          const newTime = Math.max(player.currentTime - this.defaultSeekBackwardInterval(), 0);
          this.setCurrentTime(newTime);
        }
      }
    }, {
      keys: [39, 228],
      action: (player) => {
        this.showControls();
        if (!isNaN(player.duration) && player.duration > 0) {
          const newTime = Math.min(player.currentTime + this.defaultSeekForwardInterval(),
            player.duration);
          this.setCurrentTime(newTime);
        }
      }
    }]
  }

  ngOnInit() {
    if (this.videoMedia.length > 0) {
      this.isVideo = true;
    }
  }

  ngAfterViewInit() {
    this.container = this.containerViewChild.nativeElement;
    this.control = this.controlViewChild.nativeElement;
    const range = this.rangeComponent.toArray();
    this.progressViewChild = range[0];
    this.volumeViewChild = range[1];
    const audio = this.audioViewChild.nativeElement;
    const video = this.videoViewChild.nativeElement;
    if (this.videoMedia.length > 0) {
      this.media = video;
      this.container.firstElementChild.removeChild(audio);
    } else {
      this.media = audio;
      this.container.firstElementChild.removeChild(video);
    }
    this.media.style.opacity = '1';
    this.initEvent();
    if (this.theme && this.media) {
      this.domRenderer.addClass(this.control, `free-media-${this.theme}`);
    }
    this.setVolume(this.currentVolume);
    if (this.autoplay) {
      this.play();
    }
  }

  play() {
    this.media.play();
    this.isPlaying = true;
  }

  pause() {
    this.media.pause();
    this.isPlaying = false;
  }

  setVolume(value: any) {
    if (this.media) {
      this.media.volume = value;
      this.currentVolume = value;
      this.volumeViewChild.changeValue(value);
    }
  }

  getVolume() {
    return this.media.volume;
  }

  changeVolume(event: any) {
    this.muted = !event.value;
    this.setVolume(event.value / 100);
    this.lastVolume = this.currentVolume = event.value / 100;
  }

  setMuted(isMuted: boolean) {
    if (isMuted) {
      this.setVolume(0);
    } else {
      this.setVolume(this.lastVolume);
    }
    this.muted = isMuted;
  }

  setCurrentTime(time) {
    this.currentTime = time;
    this.media.currentTime = time;
  }

  getCurrentTime() {
    return this.media.currentTime;
  }

  getDuration() {
    return this.media.duration;
  }

  showControls() {
    if (!this.isVideo || !this.staticPosition) { return; }
    if (this.controls && !this.alwaysShowControls && !this.controlsShow) {
      this.killControlsTimer();
      this.control.style.opacity = '1';
      this.controlsShow = true;
    }
  }

  hideControls() {
    if (!this.isVideo || !this.staticPosition) { return; }
    if (this.controls && !this.alwaysShowControls &&
      this.controlsShow && this.getCurrentTime() > 0 && this.isPlaying) {
      this.killControlsTimer();
      this.controlsTimer = setTimeout(() => {
        this.control.style.opacity = '0';
      }, 300);
      this.controlsShow = false;
    }
  }

  toggle() {
    if (!this.canplay) {
      return;
    }
    if (!this.isPlaying) {
      this.play();
    } else {
      this.pause();
    }
  }

  toggleFullscreen() {
    this.domRenderer.toggleFullScreen(this.container);
  }

  onProgressChange(event: any) {
    const currentTime = this.getDuration() * (event.value / 100);
    this.media.currentTime = currentTime;
    this.currentTime = currentTime;
  }

  timeFormat(value: any) {
    if (typeof value !== 'number') {
      value = parseInt(value, 10);
    }
    let hour: any = parseInt(value / 3600 + '', 10);
    let minute: any = parseInt((value - hour * 3600) / 60 + '', 10);
    let second: any = value - hour * 3600 - minute * 60;
    if (hour > 0 && hour < 10) {
      hour = '0' + hour;
    }
    if (minute > 0 && minute < 10) {
      minute = '0' + minute;
    }
    if (second >= 0 && second < 10) {
      second = '0' + second;
    }
    if (hour > 0) {
      return hour + ':' + minute + ':' + second;
    } else {
      return minute + ':' + second;
    }
  }

  checkVideo() {
    if (!!document.createElement('video').canPlayType) {
      const vidTest = document.createElement('video');
      const oggTest = vidTest.canPlayType('media/ogg; codecs="theora, vorbis"');
      if (!oggTest) {
        const h264Test = vidTest.canPlayType('media/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        if (!h264Test) {
          document.getElementById('checkVideoResult').innerHTML = '抱歉你的浏览器不支持HTML5 video标签！.'
        } else {
          if (h264Test === 'probably') {
            document.getElementById('checkVideoResult').innerHTML = '非常棒！你的浏览器支持HTML5 video标签！';
          } else {
            document.getElementById('checkVideoResult').innerHTML = 'Meh. Some support.';
          }
        }
      } else {
        if (oggTest === 'probably') {
          document.getElementById('checkVideoResult').innerHTML = '非常棒！你的浏览器支持HTML5 video标签！';
        } else {
          document.getElementById('checkVideoResult').innerHTML = 'Meh. Some support.';
        }
      }
    } else {
      document.getElementById('checkVideoResult').innerHTML = 'Sorry. No media support.'
    }
  }

  onMediaMouseenter(e: any) {
    this.showControls();
  }

  onMediaMouseleave() {
    this.hideControls();
  }

  killControlsTimer() {
    if (this.controlsTimer) {
      clearTimeout(this.controlsTimer);
      this.controlsTimer = null;
    }
  }

  onControlsMouseenter(e: any) {
    if (this.isVideo) {
      e.stopPropagation();
      this.killControlsTimer();
      this.control.style.opacity = '1';
    }
  }

  defaultSeekBackwardInterval() {
    return this.getDuration() * 0.05;
  }

  defaultSeekForwardInterval() {
    return this.getDuration() * 0.05;
  }

  setProgressRail(e) {
    if (this.buffer !== '100%') {
      const target = e !== undefined ? (e.detail && e.detail.target) || e.target : this.media;
      let percent = 0;
      const duration = this.getDuration();
      if (target && target.buffered && target.buffered.length > 0 && target.buffered.end && duration) {
        percent = target.buffered.end(target.buffered.length - 1) / duration;
      } else if (target && target.bytesTotal !== undefined
        && target.bytesTotal > 0 && target.bufferedBytes !== undefined) {
        percent = target.bufferedBytes / target.bytesTotal;
      } else if (e && e.lengthComputable && e.total !== 0) {
        percent = e.loaded / e.total;
      }
      if (percent !== null) {
        percent = Math.min(1, Math.max(0, percent));
        this.buffer = percent * 100 + '%';
      }
    }
  }

  onSeeking(e) {
    this.loading = true;
  }

  onSeeked(e) {
    this.loading = false;
  }

  onWaiting(e) {
    this.loading = true;
  }

  onLoadeddata(e) {
    this.loading = true;
  }

  onCanplay(e) {
    this.loading = false;
    this.canplay = true;
  }

  onLoadedmetadata(e) {
    this.loading = false;
    this.remainingTime = this.timeFormat(this.getDuration() + '');
  }

  onTimeupdate(e) {
    this.currentTime = this.getCurrentTime();
    this.percent = this.currentTime / this.getDuration();
    this.progressViewChild.changeValue(this.percent);
    this.setProgressRail(e);
  }

  onEnded(e) {
    this.loading = false;
    if (this.loop) {
      this.setCurrentTime(0);
      this.play();
    } else {
      this.isPlaying = false;
      if (!this.alwaysShowControls && this.controls) {
        this.showControls();
      }
    }
  }

  onVolumechange(e) {
    this.muted = !this.getVolume();
    this.setProgressRail(e);
  }

  onProgress(e) {
    this.setProgressRail(e);
  }

  onError(e) {
    this.loading = false;
  }

  onPlaybackchange(e) {
    this.loading = false;
    this.isPlaying = true;
  }

  onPause(e) {
    this.loading = false;
    this.isPlaying = false;
  }

  onPlay(e) {
    this.isPlaying = true;
    this.hasFocus = true;
  }

  onPlaying(e) {
    this.isPlaying = true;
  }

  onkeydown(e) {
    if (this.hasFocus && this.enableKeyboard) {
      const keyCode = e.keyCode;
      for (const keyAction of this.keyActions) {
        if (keyAction.keys.indexOf(keyCode) !== -1) {
          keyAction.action(this.media);
          e.stopPropagation();
          e.preventDefault();
        }
      }
    }
  }

  initEvent() {
    this.domRenderer.addEventListener(this.media, 'seeking', (e) => this.onSeeking(e));
    this.domRenderer.addEventListener(this.media, 'seeked', (e) => this.onSeeked(e));
    this.domRenderer.addEventListener(this.media, 'waiting', (e) => this.onWaiting(e));
    this.domRenderer.addEventListener(this.media, 'loadeddata', (e) => this.onLoadeddata(e));
    this.domRenderer.addEventListener(this.media, 'canplay', (e) => this.onCanplay(e));
    this.domRenderer.addEventListener(this.media, 'play', (e) => this.onPlay(e));
    this.domRenderer.addEventListener(this.media, 'playing', (e) => this.onPlaying(e));
    this.domRenderer.addEventListener(this.media, 'loadedmetadata', (e) => this.onLoadedmetadata(e));
    this.domRenderer.addEventListener(this.media, 'timeupdate', (e) => this.onTimeupdate(e));
    this.domRenderer.addEventListener(this.media, 'playbackchange', (e) => this.onPlaybackchange(e));
    this.domRenderer.addEventListener(this.media, 'volumechange', (e) => this.onVolumechange(e));
    this.domRenderer.addEventListener(this.media, 'progress', (e) => this.onProgress(e));
    this.domRenderer.addEventListener(this.media, 'pause', (e) => this.onPause(e));
    this.domRenderer.addEventListener(this.media, 'ended', (e) => this.onEnded(e));
    this.domRenderer.addEventListener(this.media, 'error', (e) => this.onError(e));
    this.domRenderer.addEventListener(this.media, 'keydown', (e) => this.onkeydown(e));
    this.documentClickListener = this.renderer2.listen('body', 'click', (e) => {
      this.hasFocus = !!this.domRenderer.closest(e.target, this.container);
    });
    this.documentKeydownListener = this.renderer2.listen('body', 'keydown', (e) => {
      const container = this.domRenderer.closest(document.activeElement, 'free-media'),
        target = this.domRenderer.closest(this.media, 'free-media');
      this.hasFocus = !!(container && target && container === target);
      return this.onkeydown(e);
    });
  }

  unbindDocumentListener() {
    if (this.documentKeydownListener) {
      this.documentKeydownListener();
      this.documentKeydownListener = null;
    }
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  ngOnDestroy() {
    this.unbindDocumentListener();
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [MediaRangeComponent, MediaComponent],
  exports: [MediaComponent]
})
export class MediaModule {
}
