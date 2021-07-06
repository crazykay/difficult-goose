class RadioPlayer extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    this.station_name = 'cnr1';
    const videoElement = document.createElement('video');
    videoElement.setAttribute('id', 'hsl');
    videoElement.setAttribute('controls', 'controls');
    const scriptElement = document.createElement('script');
    scriptElement.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest';
    scriptElement.onload = () => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(`/fm/${this.station_name}/index.m3u8?${Date.now()}`);
        hls.attachMedia(videoElement);
      }
      // hls.js is not supported on platforms that do not have Media Source
      // Extensions (MSE) enabled.
      //
      // When the browser has built-in HLS support (check using canPlayType),
      // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
      // element through the src property. This is using the built-in support
      // of the plain video element, without using hls.js.
      //
      // Note: it would be more normal to wait on the 'canplay' event below however
      // on Safari (where you are most likely to find built-in HLS support) the
      // video.src URL must be on the user-driven white-list before a 'canplay'
      // event will be emitted; the last video event that can be reliably
      // listened-for when the URL is not on the white-list is 'loadedmetadata'.
      else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = `/fm/${this.station_name}/index.m3u8?${Date.now()}`;
      }
    }
    shadow.appendChild(scriptElement);
    shadow.appendChild(videoElement);
  }
}
window.customElements.define('radio-player', RadioPlayer);