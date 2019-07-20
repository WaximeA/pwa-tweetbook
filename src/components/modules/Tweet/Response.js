import {LitElement, html, css} from "lit-element";
import {EventConstant} from "../../../Constants/event.constant";
import lozad from 'lozad';

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

    firstUpdated(_changedProperties) {
      const observer = lozad(this.shadowRoot.querySelectorAll('.lozad'), {
        load: function(el) {
            console.info('loading element');
        }
      });
      observer.observe();
    }

    static get styles() {
        return css`
      .tweet {
        min-height: 100px;
        display: flex;
        flex-direction: row;
        padding: 0 15px;
        position: relative;
      }

       .divider {
        height: 100%;
        width: 2px;
        background: #cecece;
        z-index: 1000;
        display: block;
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
        border: 3px solid white;
        height: 70px;
        width: 70px;
      }
      
      .center-absolute{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
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
        <div class="divider center-absolute"></div>
          <div
            class="user-pic lozad center-absolute"
            data-background-image="image.png"
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
            new CustomEvent(EventConstant.DELETE_TWEET_RESPONSE, {detail: this.tweet})
        );
    }
}

customElements.define("tweet-response", TweetResponse);
