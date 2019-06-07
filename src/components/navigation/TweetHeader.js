import {LitElement, html, css} from 'lit-element/lit-element';

export default class TweetHeader extends LitElement {
  static get styles() {
    return css`
      header {
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: solid #eeeeee 1px;
        box-shadow: #aaaaaa 0px 3px 4px 0px
      }
      header img {
        height: 42px;
        width: 42px;
        display: block;
      }
    `
  }

  render() {
    return html`
      <header><img src="./src/assets/images/tweetbook.png" alt="Tweetbook logo">Tweetbook</header>
    `
  }
}

customElements.define('tweet-header', TweetHeader);