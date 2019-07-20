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
    `;
  }

  handleClick(action) {
    this.dispatchEvent(
      new CustomEvent(EventConstant.TWEET_ACTION, { detail: action })
    );
  }

  render() {
    return html`
      <div class="button-action">
        <button
          class="btn"
          @click="${() => this.handleClick(EventConstant.RESPONSE)}"
        >
          💬 ${this.tweet.responses.length}
        </button>
        <button
          class="btn"
          @click="${() => this.handleClick(EventConstant.LIKE)}"
        >
          👍 ${this.tweet.like}
        </button>
        <button
          class="btn"
          @click="${() => this.handleClick(EventConstant.RT)}"
        >
          🔃
        </button>
      </div>
    `;
  }
}

customElements.define("button-action", ButtonAction);
