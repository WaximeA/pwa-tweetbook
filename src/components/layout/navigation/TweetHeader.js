import { LitElement, html, css } from "lit-element/lit-element";

import "./TweetSidebar";

export default class TweetHeader extends LitElement {
  static get styles() {
    return css`
      header {
        height: 50px;
        padding: 3px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        background-color: var(--app-bg-component-color);
        border-bottom: solid var(--app-header-shadow) 1px;
        box-shadow: var(--app-header-shadow) 0px 3px 4px 0px;
      }

      .brand {
        margin: auto;
        display: flex;
        margin-left: 72px;
        flex-direction: row;
      }

      .brand div {
        font-weight: bold;
        vertical-align: middle;
        line-height: 40px;
        margin-left: 10px;
      }

      tweet-sidebar {
        display: inline-block;
        width: 10%;
      }
    `;
  }

  render() {
    return html`
      <header>
        <tweet-sidebar></tweet-sidebar>
        <div class="brand">
          <img src="./src/assets/images/tweetbook.png" alt="Tweetbook logo" width="33px" height="38px" />
          <div>TWEETBOOK</div>
        </div>
      </header>
    `;
  }
}

customElements.define("tweet-header", TweetHeader);
