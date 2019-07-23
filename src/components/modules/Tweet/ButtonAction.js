import { LitElement, html, css } from "lit-element";
import { EventConstant } from "../../../Constants/event.constant";

export default class ButtonAction extends LitElement {
  constructor() {
    super();
    this.tweet = {};
  }

  static get properties() {
    return {
      tweet: Object
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }

      .btn {
        background-color: transparent;
        border: none;
        color: var(--app-secondary-text-color);
      }
      
      .btn img {
        width: 2em;
      }
    `;
  }

  handleClick(action) {
    this.dispatchEvent(
      new CustomEvent(EventConstant.TWEET_ACTION, { detail: action })
    );
  }

  render() {
    const json_user = localStorage.getItem("user");
    const user = JSON.parse(json_user);
    const exist = user.likes.filter(item => {
      return item === this.tweet.id;
    });
    return html`
      <div class="button-action">
        <button
          class="btn"
          @click="${() => this.handleClick(EventConstant.RESPONSE)}"
          aria-label="respond"
        >
          <img src="/src/assets/images/icons/baseline_chat_white_18dp.png" alt="réponses"> ${this.tweet.data.responses.length}
        </button>
        <button
          aria-label="like"
          class="btn"
          @click="${() => this.handleClick(EventConstant.LIKE)}"
        >
          <img src="/src/assets/images/icons/baseline_favorite${exist.length === 0 ? "_border" : ""}_white_18dp.png" alt="like"> ${this.tweet.data.like}
        </button>
        <button
          aria-label="retweet"
          class="btn"
          @click="${() => this.handleClick(EventConstant.RT)}"
        >
          <img src="/src/assets/images/icons/baseline_repeat_white_18dp.png " alt="retweet">
        </button>
      </div>
    `;
  }
}

customElements.define("button-action", ButtonAction);
