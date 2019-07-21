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
            <button title="écrire un nouveau tweet" id="new-tweet" class="${
              !this.displayButton ? `none` : ``
            }" @click="${this.handleNewTweet}"><img src="/src/assets/images/icons/baseline_create_white_18dp.png" alt=""></button>
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
        transition: 0.2s;
        position: fixed;
        bottom: 20px;
        right: 20px;
        font-size: 14px;
        color: white;
        line-height: 20px;
        margin-right: 20px;
        border-width: initial;
        border-style: none;
        border-color: initial;
        border-image: initial;
        background: rgb(85, 172, 238);
        width: 60px;
        height: 60px;
        border-radius: 100%;
        padding: 0;
}

      #new-tweet:hover{
        background-color: #55dddd;
      }

      .none {
        display: none;
      }
      
    
    `;
  }
}

customElements.define("tweetbook-app", TweetbookApp);
