import {LitElement, html, css} from 'lit-element/lit-element';

import './TweetSidebar';

export default class TweetHeader extends LitElement {
  static get styles() {
    return css`
      header {
        height: 48px;
        display: block;
        border-bottom: solid #eeeeee 1px;
        box-shadow: #aaaaaa 0px 3px 4px 0px
      }
      
      .brand {
        display: inline-block;
        margin: auto;
        width: 70%;
        text-align: center;
      }
      
      .brand img {
        display: inline-block;
        vertical-align: text-bottom;
        height: 42px;
        width: 42px;
      }
      
      .brand span {
        display: inline-block;
        vertical-align: middle;
        height: 42px;
      }
      
      tweet-sidebar {
        display: inline-block;
        width: 10%;
      }
    `
  }

  render() {
    return html`
      <header>
        <tweet-sidebar></tweet-sidebar>
        <div class="brand">
          <img src="./src/assets/images/tweetbook.png" alt="Tweetbook logo">
          <span>Tweetbook</span>
        </div>
      </header>
    `
  }
}

customElements.define('tweet-header', TweetHeader);