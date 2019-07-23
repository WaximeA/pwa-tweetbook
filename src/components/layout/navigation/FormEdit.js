import { LitElement, html, css } from "lit-element/lit-element";
import { EventConstant } from "../../../Constants/event.constant";

export default class FormEdit extends LitElement {
  constructor() {
    super();
    this.resume = "";
    this.avatar = {};
    this.banner = {};
    this.active = false;
  }

  static get properties() {
    return {
      resume: String,
      avatar: File,
      banner: File,
      active: Boolean
    };
  }

  static get styles() {
    return css`
      * {
        box-sizing: border-box;
      }
      .inactive {
        display: none;
      }

      input {
        width: 100%;
      }

      form{
        text-align:center;
      }

      button {
        margin-top: 2vh;
        margin: 2vh 0.3em 0.3em 0;
        background-color: #4eb5f1;
        color: #ffffff;
        padding: 8px 20px;
        border-radius: 100px;
        font-size: 15px;
        padding: 0.3em 1.2em;
        box-sizing: border-box;
        text-decoration: none;
        font-weight: 300;
        text-align: center;
        transition: all 0.2s;
        border: none;
        align-self: center;
        cursor: pointer;
      }

      button:hover {
        filter: brightness(120%);
        cursor: pointer;
      }

      textarea {
        resize: none;
        border-radius: 5px;
        width: 100%;
        margin-top: 2vh;
        height: 15vh;
        color: var(--app-text-color);
        background-color: transparent;
        border: 1px solid var(--app-contrast-text-color);
      }

      .btn-file {
        position: relative;
        overflow: hidden;
      }

      .btn-file input[type="file"] {
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        background-color: transparent;
        color: var(--app-text-color);
        cursor: inherit;
        display: block;
        border: 1px solid rgb(85, 172, 238);
      }

      .input-file-html5 {
        cursor: pointer;
        width: 100%;
        border-radius: 8px;
        margin-top: 2vh;
        position: relative;
        outline: none;
        color: rgb(100, 150, 150);
        background-color: transparent;
        color: var(--app-text-color);
        padding: 1% 1% 1% 5%;
        border: 1px solid rgb(85, 172, 238);
      }

      .input-file-html5-avatar::before {
        content: "New Avatar";
        position: absolute;
        top: 0;
        left: 0;
        padding: 3% 10%;
        background-color: transparent;
        color: var(--app-text-color);
        background: rgb(85, 172, 238);
        box-shadow: 0 0.2em 0 rgb(100, 180, 180);
        transform: translateY(-0.2em);
      }

      .input-file-html5-banner::before {
        content: "New Banner";
        position: absolute;
        top: 0;
        left: 0;
        padding: 3% 9.3%;
        background-color: transparent;
        color: var(--app-text-color);
        background: rgb(85, 172, 238);
        box-shadow: 0 0.2em 0 rgb(100, 180, 180);
        transform: translateY(-0.2em);
      }

      .input-file-html5:hover::before {
        background: rgb(110, 210, 210);
        box-shadow: 0 0.35em 0 rgb(100, 180, 180);
        transform: translateY(-0.35em);
      }

      .input-file-html5:active::before {
        background: rgb(100, 180, 180);
        box-shadow: 0 0em 0 rgb(100, 180, 180);
        transform: translateY(0em);
      }
    `;
  }

  handleForm(e) {
    e.preventDefault();
    console.log(this.avatar);
    console.log(this.banner);
    document.dispatchEvent(
      new CustomEvent(EventConstant.EDIT_INFOS, {
        detail: {
          resume: this.resume,
          avatar: this.avatar,
          banner: this.banner
        }
      })
    );
    this.active = false;
  }

  handleClick(e) {
    this.active = !this.active;
  }

  handleAvatarUploadChange(e) {
    this.avatar = e.target.files[0];
  }

  handleBannerUploadChange(e) {
    this.banner = e.target.files[0];
  }

  render() {
    return html`
      <button
        @click="${this.handleClick}"
        class="${this.active ? "inactive" : ""}"
        aria-label="edit profile"
      >
        Edit Profile
      </button>
      <form
        @submit="${this.handleForm}"
        class="${!this.active ? "inactive" : ""}"
      >
        <button type="submit" aria-label="save">Save</button>
        <textarea
          placeholder="Describe yourself here..."
          name=""
          id="resume"
          @input="${e => (this.resume = e.target.value)}"
          .value="${this.resume}"
        ></textarea>

        <input
          class="input-file-html5 input-file-html5-avatar"
          type="file"
          id="avatar"
          accept="image/*"
          @change="${this.handleAvatarUploadChange}"
        />

        <input
          class="input-file-html5 input-file-html5-banner"
          type="file"
          id="banner"
          accept="image/*"
          @change="${this.handleBannerUploadChange}"
        />
      </form>
    `;
  }
}

customElements.define("form-edit", FormEdit);
