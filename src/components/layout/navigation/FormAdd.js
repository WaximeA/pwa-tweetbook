import {LitElement, html, css} from "lit-element/lit-element";
import {EventConstant} from "../../../Constants/event.constant";

export default class FormAdd extends LitElement {
    constructor() {
        super();
        this.newTweet = "";
        this.active = false;
        this.parent = null;
        this.edit = false;
        this.image = {};
    }

    static get properties() {
        return {
            newTweet: String,
            active: Boolean,
            parent: Object,
            edit: Boolean,
            image: Object
        };
    }

    firstUpdated(_changedProperties) {
        document.addEventListener(EventConstant.ASK_NEW_TWEET, () => {
            console.log("test");
            this.active = true;
        });
        document.addEventListener(EventConstant.RESPONSE, ({detail}) => {
            if (!detail.dontNeedDisplay) {
                document.dispatchEvent(
                    new CustomEvent(EventConstant.DISPLAY_INFOS_TWEET, {
                        detail: detail.tweet
                    })
                );
            }
            this.active = true;
            this.parent = detail.tweet;
        });
    }

    static get styles() {
        return css`
      * {
        box-sizing: border-box;
      }

      .form-add {
        background-color: var(--app-bg-color);
        width: 100%;
        height: 100%;
        top: 100%;
        bottom: 0;
        right: 0;
        text-align: left;
        position: fixed;
        margin: 0;
        padding: 0;
        transition: 0.2s ease;
        z-index: 100;
      }

      .active {
        top: 0;
      }

        .response-to {
            padding: 10px;
        }

      form input {
        width: 100%;
        padding: 10px;
      }

      textarea {
        margin-top: 10px;
        margin-bottom: 10px;
        width: 90%;
        height: 90%;
        resize: none;
        padding: 10px;
        font-size: 1.2em;
        background: var(--app-bg-color);
        color: var(--app-text-color);
        border: 1px solid var(--app-contrast-text-color);
        margin-left:10px;
      }

      .form-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 48px;
      }

      .form-header > .actions {
        width: 80%;
        display: flex;
        flex-direction: row-reverse;
      }

      .collapse-button {
        margin-left: 20px;
        border: none;
        height: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        width: 20px;
        background-size: 100%;
        background: none;
      }

      .send-button {
        border: none;
        background: #55acee;
        padding: 5px 10px;
        border-radius: 100px;
        width: 110px;
        font-size: 14px;
        color: white;
        line-height: 20px;
        margin-right: 20px;
      }

      .input-file-html5 {
        cursor: pointer;
        border-radius: 8px;
        margin-top: 2vh;
        position: relative;
        outline: none;
        color: rgb(100, 150, 150);
        background: transparent;
        width: 350px;
        padding: 7px 0px 0px 18px;
        border: 1px solid rgb(85, 172, 238);
        margin-left:10px;
      }

      .input-file-html5::before {
        content: "Add Image";
        position: absolute;
        top: 0;
        left: 0;
        padding: 3% 10%;
        color: white;
        background: rgb(85, 172, 238);
        box-shadow: 0 0.2em 0 rgb(100, 180, 180);
        transform: translateY(-0.2em);
      }
    `;
    }

    handleForm(e) {
        e.preventDefault();
        if (this.newTweet === "") return;
        if (this.parent) {
            document.dispatchEvent(
                new CustomEvent(EventConstant.RESPONSE_TWEET, {
                    detail: {
                        newTweet: this.newTweet,
                        image: this.image,
                        parent: this.parent
                    }
                })
            );
        } else {
            document.dispatchEvent(
                new CustomEvent(EventConstant.NEW_TWEET, {
                    detail: {
                        newTweet: this.newTweet,
                        image: this.image
                    }
                })
            );
        }
        document.dispatchEvent(
            new CustomEvent(EventConstant.DISPLAY_SIDEBAR, {detail: false})
        );
        this.newTweet = "";
        this.active = false;
        this.shadowRoot.querySelector('#image').value = "";
        this.image = {};
    }

    handleClick(e) {
        this.active = !this.active;
        this.shadowRoot.querySelector("#new-tweet").focus();
    }

    handleImageUploadChange(e) {
        this.image = e.target.files[0];
    }

    render() {
        return html`
      <div class="form-add ${this.active ? "active" : ""}">
        <form @submit="${this.handleForm}">
          <div class="form-header">
            <button class="collapse-button" @click=${this.closeForm} aria-label="close">
                <img src="/src/assets/images/icons/baseline_highlight_off_white_18dp.png" alt="">
            </button>
            <div class="actions">
              <button class="send-button" type="submit" aria-label="send">
                ${this.parent ? `Respond` : `Send`}
              </button>
            </div>
          </div>
          ${this.parent ? html`<label for="new-tweet" class="response-to">En réponse à @${this.parent.data.rtuser ? this.parent.data.rtuser.nickname : this.parent.data.user.nickname}</label>` : html`<label for="new-tweet">New tweet</label>`}
          <textarea
            name=""
            id="new-tweet"
            @input="${e => (this.newTweet = e.target.value)}"
            .value="${this.newTweet}"
            placeholder="${this.parent ? "Tweet your response" : "What's new ?"}"
          >
          </textarea>
          ${this.parent === null ? html`
            <label for="image">Insert an image</label>
            <input
            class="input-file-html5"
            type="file"
            id="image"
            accept="image/*"
            @change="${this.handleImageUploadChange}"
            />` : ""
            }
        </form>
      </div>
    `;
    }

    closeForm() {
        this.active = false;
    }
}

customElements.define("form-add", FormAdd);
