import { LitElement, html, css } from "lit-element/lit-element";
import { EventConstant } from "../../../Constants/event.constant";

export default class FormAdd extends LitElement {
  constructor() {
    super();
    this.newTweet = "";
    this.active = false;
    this.parent = null;
  }

  static get properties() {
    return {
      newTweet: String,
      active: Boolean,
      parent: Object
    };
  }

  firstUpdated(_changedProperties) {
    document.addEventListener(EventConstant.RESPONSE, ({ detail }) => {
      document.dispatchEvent(
        new CustomEvent(EventConstant.DISPLAY_SIDEBAR, { detail: true })
      );
      this.active = true;
      this.parent = detail.tweet;
    });
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }

      .inactive {
        display: none;
      }
      footer {
        position: fixed;
        bottom: 0;
        width: 100%;
      }
      footer form {
        display: flex;
        justify-content: space-between;
        background-color: #ffffff;
        padding: 0.5rem 1rem;
        width: 100%;
      }

      footer form input {
        width: 100%;
      }

      button {
        text-decoration: none;
        background-color: #55acee;
        color: #fff;
        padding: 8px 20px;
        border-radius: 5px;
        transition: 0.2s;
      }

      textarea {
        width: 330px;
        height: 300px;
        bottom: 2%;
        left: 3%;
        position: absolute;
        resize: none;
      }
    `;
  }

  handleForm(e) {
    e.preventDefault();
    if (this.parent) {
      document.dispatchEvent(
        new CustomEvent(EventConstant.RESPONSE_TWEET, {
          detail: {
            newTweet: this.newTweet,
            parent: this.parent
          }
        })
      );
      this.parent = null;
    } else {
      document.dispatchEvent(
        new CustomEvent(EventConstant.NEW_TWEET, { detail: this.newTweet })
      );
    }
    document.dispatchEvent(
      new CustomEvent(EventConstant.DISPLAY_SIDEBAR, { detail: false })
    );
    this.newTweet = "";
    this.active = false;
  }

  handleClick(e) {
    this.active = !this.active;
    this.shadowRoot.querySelector("#new-tweet").focus();
  }

  render() {
    return html`
      <button
        @click="${this.handleClick}"
        class="${this.active ? "inactive" : ""}"
      >
        Tweet
      </button>
      <form
        @submit="${this.handleForm}"
        class="${!this.active ? "inactive" : ""}"
      >
        <button type="submit">Send</button>
        <textarea
          name=""
          id="new-tweet"
          @input="${e => (this.newTweet = e.target.value)}"
          .value="${this.newTweet}"
        >
        </textarea>
      </form>
    `;
  }
}

customElements.define("form-add", FormAdd);
