export class App {
  constructor() {
    this.app_dom = document.querySelector('#app');
  }
  init() {
    this.app_dom.innerHTML(`<h1>PANORAMA VIEW</h1>`);
  }
}