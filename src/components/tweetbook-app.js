import { LitElement, html } from 'lit-element';

class TweetbookApp extends LitElement {

  constructor() {
    super();
  }

  render() {
    return html` 
      <slot></slot>
    `
  }
}

customElements.define('tweetbook-app', TweetbookApp);