import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'youtube-video-tracking';

  // ? 1. Some required variables which will be used by YT API
  public YT: any;
  public video: any;
  public player: any;
  public reframed = false;

  isRestricted = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // ? Injecting the document element for accessing document.getElement and similar things
  // ? in Angular way(best practice implemented)
  constructor(@Inject(DOCUMENT) private document) { }

  ngOnInit() {
    this.video = 'wFAj0pW6xX0';
    this.initVideo();
  }

  // ? 2. Initialize method for YT IFrame API
  public initVideo(): void {
    // ? Return if Player is already created
    if (window['YT']) {
      this.startVideo();
      return;
    }

    // ? Creating a script element using elementRef for running the required scripts supported by youtube js api
    const tag = this.document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = this.document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  // ? Video player creation, styles and other params
  public startVideo(): void {
    this.reframed = false;
    this.player = new window['YT'].Player('youtube-player', {
      videoId: this.video,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      height: '700px',
      width: '100%',
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  // ? 4. It will be called when the Video Player is ready
  public onPlayerReady(event): void {
    if (this.isRestricted) {
      event.target.mute();
      event.target.playVideo();
    } else {
      event.target.playVideo();
    }
  }

  // ? 5. API will call this function when Player State changes like PLAYING, PAUSED, ENDED
  public onPlayerStateChange(event): void {
    console.log(event);
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() === 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        }
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended ');
        break;
    }
  }

  public cleanTime(): number {
    return Math.round(this.player.getCurrentTime());
  }

  public onPlayerError(event): void {
    switch (event.data) {
      case 2:
        console.log('' + this.video);
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

}
