import { LitElement, html, css } from "lit-element";
import "./data/TweetStore";
import "./modules/Tweet";
import "./modules/InfosTweet";
import "./layout/navigation/TweetHeader";
import { EventConstant } from "../Constants/event.constant";
import { collectionConstant } from "../Constants/collection.constant";
import "./layout/navigation/FormAdd";

class TweetbookApp extends LitElement {
  constructor() {
    super();
    this.tweets = [];
    this.displayButton = true;
  }

  static get properties() {
    return {
      tweets: Array,
      displayButton: Boolean
    };
  }

  firstUpdated(_changedProperties) {
    this.shadowRoot.querySelector("#header").style.visibility = "hidden";
    document.addEventListener(EventConstant.RT, console.log);
    document.addEventListener(EventConstant.NEW_TWEET, () => {
      this.displayButton = true;
    });
  }

  childChanged(e) {
    this.tweets = e.detail;
    document.querySelector("#shadow").style.display = "none";
    this.shadowRoot.querySelector("#header").style.visibility = "visible";
  }

  handleNewTweet() {
    document.dispatchEvent(new CustomEvent(EventConstant.ASK_NEW_TWEET));
    this.displayButton = false;
  }

  render() {
    return html` 
            <tweet-store 
                collection="${collectionConstant.TWEET_COLLECTION}" 
                @child-changed="${this.childChanged}"
            ></tweet-store>
            <tweet-header id="header"></tweet-header>
            <infos-tweet active></infos-tweet>
            ${
              this.tweets.length !== 0
                ? html`
                    <div class="tweet-container">
                      ${this.tweets.map(
                        item =>
                          html`
                            <tweet-elem .tweet="${item}"></tweet-elem>
                          `
                      )}
                    </div>
                  `
                : html`
                    <div style="margin:auto; width:100%; text-align:center;">
                      Loading ...
                    </div>
                  `
            }
            </div>
            <button id="new-tweet" class="${
              !this.displayButton ? `none` : ``
            }" @click="${this.handleNewTweet}">Tweet</button>
            <form-add></form-add>
    `;
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }

      tweet-elem {
        width: 100%;
        display: block;
      }

      .tweet-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      * {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }

      ::slotted(*) {
        font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
      }

      #new-tweet {
        text-decoration: none;
        background-color: #55acee;
        color: #fff;
        padding: 8px 20px;
        border-radius: 5px;
        transition: 0.2s;
        position: fixed;
        bottom: 20px;
        right: 20px;
        border: none;
        box-shadow: #636363 2px 2px 5px;
      }

      .none {
        display: none;
      }
    `;
  }
}

customElements.define("tweetbook-app", TweetbookApp);
