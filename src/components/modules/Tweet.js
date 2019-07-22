import { LitElement, html, css } from "lit-element";
import "./Tweet/ButtonAction";
import firebase from "firebase/app";
import "firebase/storage";
import { EventConstant } from "../../Constants/event.constant";
import lozad from 'lozad';

export default class Tweet extends LitElement {
  constructor() {
    super();
    this.tweet = {};
    this.noAction = false;
    this.observer = null;
    this.user = null;
  }

  static get properties() {
    return {
      tweet: Object,
      noAction: Boolean,
      user: Object
    };
  }

  firstUpdated(_changedProperties) {
    document.addEventListener(EventConstant.USER_LOGGED, () => this.user = JSON.parse(localStorage.getItem('user')));
    document.addEventListener(EventConstant.USER_LOGOUT, () => this.user = null);
  }

  updated(_changedProperties) {
    const lozadelem = this.shadowRoot.querySelectorAll('.lozad');
    if (this.observer !== null) {
      lozadelem.forEach(item => {
        this.observer.observer.unobserve(item);
        item.style = "";
        item.dataset.loaded = "false";
      });
    }
    this.observer = lozad(lozadelem);
    this.observer.observe();
  }

  static get styles() {
    return css`
      .tweet {
        width: 60%;
        margin: auto;
        min-height: 80px;
        display: flex;
        border-bottom: 1px solid var(--app-bg-component-color);
        flex-direction: row;
        padding: 20px 15px;
      }

      .user-pic-box {
        width: 71px;
        display: block;
        margin-right: 10px;
      }
      
      .retweet-user-pic-box {
        margin-top: 35px;
      }

      .user-pic {
        background-size: 71px 71px;
        border-radius: 50%;
        border: 3px solid var(--app-bg-component-color);
        height: 71px;
        width: 71px;
      }

      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 85%;
        margin-left: 10px;
      }

      .user-info-box {
        display: flex;
        justify-content: space-between;
      }

      .delete {
        width: 10%;
        height: 100%;
        text-align: right;
        padding: 0 10px 0 0;
        cursor: pointer;
      }

      .user-tn {
        color: var(--app-secondary-text-color);
        font-weight: bold;
      }

      .user-at {
        color: var(--app-contrast-text-color);
        font-size: 14px;
      }

      .date {
        display: inline-block;
        text-align: right;
        font-size: 14px;
        color: #5a5a5a;
      }

      .tweet-content {
        width: 85%;
      }

      button-action {
        width: 210px;
        display: flex;
        justify-content: space-between;
        padding-top: 2vh;
      }

      .rt-info-box {
        display: flex;
        align-items: center;
        margin: 10px 0;
      }

      .tweet-image-box {
        height: 250px;
        width: 250px;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 8px;
        margin-top: 2vh;
      }

      @media screen and (max-width: 900px) {
        .tweet {
          width: 95%;
          margin:0px;
        }
      }
    `;
  }

  action({ detail }) {
    document.dispatchEvent(
      new CustomEvent(detail, {
        detail: {
          tweet: this.tweet
        }
      })
    );
  }

  render() {
    if (this.tweet.data) {
      const date = new Date(this.tweet.data.date);
      return html`
        <div class="tweet" @click="${e => this.showInfos(e)}">
          <div class="user-pic-box${this.tweet.data.rtuser ? " retweet-user-pic-box" : ""}">
            <div class="user-pic lozad" data-background-image="${this.tweet.data.user.loadedAvatar}"></div>
          </div>
          <div class="content">
            <div class="content-text">
              ${this.tweet.data.rtuser
                ? html`
                    <div class="rt-info-box">
                      <img src="/src/assets/images/icons/baseline_repeat_white_18dp.png" alt="retweet" width="20">
                      <a href="#" style="text-decoration:none;">
                        <span class="user-at"
                          >@${this.tweet.data.rtuser.nickname}</span
                        >
                      </a>
                      &nbsp;à retweetax
                    </div>
                  `
                : ``}
              <div class="user-info-box">
                <div class="user-info">
                  <span class="user-tn">
                    ${this.tweet.data.user.name +
                      " " +
                      this.tweet.data.user.surname}
                  </span>
                  <a href="#" style="text-decoration:none;">
                    <span class="user-at"
                      >${" @" + this.tweet.data.user.nickname}</span
                    >
                  </a>
                  <span class="date">
                    - ${date.toLocaleDateString()}
                    ${date.toLocaleTimeString()}</span
                  >
                </div>
                ${this.noAction || !this.user
                  ? null
                  : ( this.isOwner() ? html`
                      <div class="delete" @click="${e => this.deleteTweet(e)}">
                        <img
                          src="/src/assets/images/icons/baseline_highlight_off_white_18dp.png"
                          alt="delete_tweet"
                        />
                      </div>
                    ` : null)}
              </div>
              <div class="tweet-content">${this.tweet.data.content}</div>
              ${this.tweet.data.image ? html `
                <div class="tweet-image-box lozad"
                data-background-image="${this.tweet.data.image}"> 
                </div>`:``
              }
            </div>
            ${this.noAction || !this.user
              ? null
              : html`
                  <button-action
                    .tweet=${this.tweet}
                    @action="${e => this.action(e)}"
                  ></button-action>
                `}
          </div>
        </div>
      `;
    }
  }

  isOwner() {
    return (!this.tweet.data.rtuser && this.user.id == this.tweet.data.user.id || this.tweet.data.rtuser && this.user.id == this.tweet.data.rtuser.id)
  }

  deleteTweet(e) {
    if (this.isOwner()) {
      document.dispatchEvent(
          new CustomEvent(EventConstant.DELETE_TWEET, { detail: this.tweet.id })
      );
    }
  }

  showInfos(e) {
    e.preventDefault();
    if (
      e.target.classList.contains("content-text") ||
      e.target.classList.contains("tweet-content")
    ) {
      document.dispatchEvent(
        new CustomEvent(EventConstant.DISPLAY_INFOS_TWEET, {
          detail: this.tweet
        })
      );
    }
  }
}

customElements.define("tweet-elem", Tweet);
