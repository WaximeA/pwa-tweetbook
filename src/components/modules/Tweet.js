import { LitElement, html, css } from "lit-element";
import "./Tweet/ButtonAction";
import firebase from "firebase/app";
import "firebase/storage";
import { EventConstant } from "../../Constants/event.constant";

export default class Tweet extends LitElement {
  constructor() {
    super();
    this.tweet = {};
    this.loadedAvatar = "";
    this.noAction = false;
  }

  static get properties() {
    return {
      tweet: Object,
      loadedAvatar: String,
      noAction: Boolean
    };
  }

  firstUpdated(_changedProperties) {
    try {
      firebase
        .storage()
        .ref("avatar")
        .child(this.tweet.data.user.avatar)
        .getDownloadURL()
        .then(url => {
          this.loadedAvatar = url;
        })
        .catch(e => {
          this.loadedAvatar = "/src/assets/images/user.svg";
        });
    } catch (e) {
      this.loadedAvatar = "/src/assets/images/user.svg";
    }
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
        width: 71px;
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
      
      .date {
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
      }

      .tweet-image-box{
        height: 250px;
        width: 250px;
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 8px;
        margin-top: 2vh;
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
        <div class="user-pic-box">
          <div
            class="user-pic"
            style="background-image: url('${this.loadedAvatar}');"
          ></div>
        </div>
        <div class="content">
          <div class="content-text">
            ${this.tweet.data.rtuser ? html `
              <div class="rt-info-box"> 
                <p>🔃&nbsp;</p>
                <a href="#">
                  <span class="user-at">@${this.tweet.data.rtuser.nickname}</span>
                </a>
                <p>&nbsp;à retweetax</p>
              </div>`:``
            }
            <div class="user-info-box">
              <div class="user-info">
                <span class="user-tn">
                  ${this.tweet.data.user.name +" " + this.tweet.data.user.surname }
                </span>
                <a href="#">
                  <span class="user-at">${" @" + this.tweet.data.user.nickname}</span>
                </a>
                <span class="date"> - ${date.toLocaleDateString()} ${date.toLocaleTimeString()}</span>
              </div>
              ${this.noAction ? null : html`
              <div class="delete" @click="${e => this.deleteTweet(e)}">
                <i>❌</i>
              </div>
              `}
              
            </div>
            <div class="tweet-content">${this.tweet.data.content}</div>
            ${this.tweet.data.image ? html `
              <div class="tweet-image-box"
              style="background-image: url('${this.tweet.data.image}');"> 
              </div>`:``
            }
          </div>
          ${this.noAction ? null : html`<button-action
            .tweet=${this.tweet.data}
            @action="${e => this.action(e)}"
          ></button-action>`}
          
        </div>
      </div>
    `;
    }
  }

  deleteTweet(e) {
    document.dispatchEvent(
      new CustomEvent(EventConstant.DELETE_TWEET, { detail: this.tweet.id })
    );
  }

  showInfos(e) {
    e.preventDefault();
    if (e.target.classList.contains('content') ||e.target.classList.contains('tweet-content') ){
      document.dispatchEvent(new CustomEvent(EventConstant.DISPLAY_INFOS_TWEET, {detail: this.tweet}));
    }
  }
}

customElements.define("tweet-elem", Tweet);
