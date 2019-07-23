import { LitElement, html, css } from "lit-element";
import { EventConstant } from "../../../Constants/event.constant";
import lozad from "lozad";

export class TweetResponse extends LitElement {
  constructor() {
    super();
    this.tweet = {};
    this.key = 0;
    this.last = 0;
  }

  static get properties() {
    return {
      tweet: Object,
      key: Number,
      last: Number
    };
  }

  firstUpdated(_changedProperties) {
    const observer = lozad(this.shadowRoot.querySelectorAll(".lozad"), {
      load: function(el) {
        console.info("loading element");
      }
    });
    observer.observe();
  }

  static get styles() {
    return css`
      .tweet {
        min-height: 100px;
        width: 60%;
        margin: auto;
        display: flex;
        flex-direction: row;
        padding: 0 15px;
        position: relative;
      }
      
       @media screen and (max-width: 900px) {
        .tweet {
          width: 95%;
          margin:0px;
        }
      }

      .divider {
        height: 100%;
        width: 2px;
        background: var(--app-divider);
        z-index: 1000;
        display: block;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10;
       }
       
       .divider-first {
            top: 50%;
            height: 50%;
       }
       
       .divider-last {
           height: 50%;
       }
       
       .none {
        display: none;
       }
      .user-pic-box {
        width: 100px;
        display: block;
        margin-right: 10px;
        position: relative;
        z-index: 1001;
      }

      .user-pic {
        background-size: 70px 70px;
        border-radius: 50%;
        border: 3px solid var(--app-bg-component-color);
        height: 70px;
        width: 70px;
        background-color: var(--app-bg-color);
        z-index: 11;
      }

      .center-absolute {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 85%;
        margin: 20px 0;
      }

      .user-info-box {
        display: flex;
        justify-content: space-between;
        color: var(--app-secondary-text-color);
      }

      .delete {
        width: 10%;
        height: 100%;
        text-align: right;
        padding: 0 10px 0 0;
        cursor: pointer;
      }

      .user-tn {
        font-weight: bold;
      }

      .date {
        text-align: right;
        font-size: 14px;
        color: #5a5a5a;
        display: inline-block;
      }

      .user-at {
        color: var(--app-color-link);
        font-size: 14px;
        text-decoration: none;
      }

      .tweet-content {
        width: 85%;
      }

      button-action {
        width: 210px;
      }
    `;
  }

  render() {
    const date = new Date(this.tweet.date);
    return html`
      <div class="tweet">
        <div class="user-pic-box">
        <div class="divider ${this.last === this.key && this.key == 0 ? "none" : ""} ${this.last === this.key ? "divider-last" : ""} ${this.key == 0 ? "divider-first" : ""}"></div>
          <div
            class="user-pic lozad center-absolute"
            style="background-image: url(${this.tweet.user.loadedAvatar});"
            data-background-image="image.png"
          ></div>
        </div>
        <div class="content">
          <div class="content-text">
            <div class="user-info-box">
              <div class="user-info">
                <span class="user-tn"
                  >${this.tweet.user.name + " " + this.tweet.user.surname}
                </span>
                <a href="#" style="text-decoration:none;"
                  ><span class="user-at"
                    >${" @" + this.tweet.user.nickname}</span
                  ></a
                >
                <span class="date">
                  - ${date.toLocaleDateString()}
                  ${date.toLocaleTimeString()}</span
                >
              </div>
              <div class="delete" @click="${e => this.deleteTweet(e)}">
                <i>X</i>
              </div>
            </div>
            <div class="tweet-content">${this.tweet.content}</div>
          </div>
        </div>
      </div>
    `;
  }

  deleteTweet(e) {
    document.dispatchEvent(
      new CustomEvent(EventConstant.DELETE_TWEET_RESPONSE, {
        detail: this.tweet
      })
    );
  }
}

customElements.define("tweet-response", TweetResponse);
