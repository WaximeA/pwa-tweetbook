import { LitElement, html, css } from "lit-element";
import {EventConstant} from "../../../Constants/event.constant";

export class TweetResponse extends LitElement {
    constructor() {
        super();
        this.tweet = {};
    }

    static get properties() {
        return {
            tweet: Object,
        };
    }

    static get styles() {
        return css`
      .tweet {
        min-height: 80px;
        display: flex;
        border-bottom: 1px solid #cacaca;
        flex-direction: row;
        padding: 20px 15px;
      }

      .user-pic-box {
        width: 15%;
        display: block;
        margin-right: 10px;
      }

      .user-pic {
        background-size: 71px 71px;
        border-radius: 50%;
        border: 3px solid white;
        height: 71px;
        width: 71px;
      }

      .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 85%;
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
        color: black;
        font-weight: bold;
      }

      .user-at {
        color: #5a5a5a;
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
        return html`
      <div class="tweet" >
        <div class="user-pic-box">
          <div
            class="user-pic"
            style="background-image: url();"
          ></div>
        </div>
        <div class="content">
          <div class="content-text">
            <div class="user-info-box">
              <div class="user-info">
                <span class="user-tn"
                  >${this.tweet.user.name +
        " " +
        this.tweet.user.surname}
                </span>

                <a href="#">
                  <span class="user-at"
                    >${" @" + this.tweet.user.nickname}</span
                  ></a
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
            new CustomEvent(EventConstant.DELETE_TWEET, { detail: this.tweet.id })
        );
    }
}

customElements.define("tweet-response", TweetResponse);
