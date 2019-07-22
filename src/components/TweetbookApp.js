import {LitElement, html, css} from "lit-element";
import "./data/TweetStore";
import "./modules/Tweet";
import "./modules/InfosTweet";
import "./layout/navigation/TweetHeader";
import {EventConstant} from "../Constants/event.constant";
import {collectionConstant} from "../Constants/collection.constant";
import "./layout/navigation/FormAdd";
import './modules/ProfileSidebar';

class TweetbookApp extends LitElement {
    constructor() {
        super();
        this.tweets = [];
        this.displayButton = true;
        this.fetched = false;
        this.user = null
    }

    static get properties() {
        return {
            tweets: Array,
            displayButton: Boolean,
            fetched: Boolean,
            user: Object
        };
    }

    firstUpdated(_changedProperties) {
        this.shadowRoot.querySelector("#header").style.visibility = "hidden";

        document.querySelector("#shadow").style.display = "none";
        this.shadowRoot.querySelector("#header").style.visibility = "visible";
        document.addEventListener(EventConstant.RT, console.log);
        document.addEventListener(EventConstant.NEW_TWEET, () => {
            this.displayButton = true;
        });

        document.addEventListener(EventConstant.USER_LOGGED, () => {this.user = JSON.parse(localStorage.getItem('user'))});
        document.addEventListener(EventConstant.USER_LOGOUT, () => {this.user = null});
    }

    childChanged(e) {
        this.tweets = e.detail;
        this.fetched = true;
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
            <profile-sidebar></profile-sidebar>
            <infos-tweet active></infos-tweet>
            ${
            this.fetched !== false
                ? this.tweets.length === 0 ? html`<div class="tweet-container"><p class="no-tweet">There is no tweet yet :(</p></div>` : html`
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
                      <div class="skeleton" active>
                          <div class="hero"></div>
                          <div class="hero"></div>
                          <div class="hero"></div>
                        </div>
                    </div>
                  `
            }
            </div>
            ${this.user && html`<button title="écrire un nouveau tweet" id="new-tweet" class="${
            !this.displayButton ? `none` : ``
            }" @click="${this.handleNewTweet}"><img src="/src/assets/images/icons/baseline_create_white_18dp.png" alt=""></button>`}
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
      
      .no-tweet {
        color: var(--app-secondary-text-color);
        font-size: 12px;
      }
      .skeleton {
        position: relative;
        margin: 1rem;
      }

      .skeleton .hero {
        margin: auto;
        min-height: 80px;
        background: var(--app-grey-color);
        margin-bottom: 1rem;
        border-radius: 5px;
        width: 60%;
      }

      .skeleton::after {
        display: block;
        content: "";
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(49, 49, 49, 0.2),
          transparent
        );
        animation: loading 1.5s infinite;
      }

      @keyframes loading {
        100% {
          transform: translateX(100%);
        }
      }
      @media screen and (max-width: 900px) {
        .skeleton .hero {
          width: 100%;
        }
      }
    
    `;
    }
}

customElements.define("tweetbook-app", TweetbookApp);
