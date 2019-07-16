import {LitElement, html, css} from "lit-element/lit-element";
import {EventConstant} from "../../../Constants/event.constant";

export default class FormAdd extends LitElement {
    constructor() {
        super();
        this.newTweet = "";
        this.active = false;
        this.parent = null;
        this.edit = false;
    }

    static get properties() {
        return {
            newTweet: String,
            active: Boolean,
            parent: Object,
            edit: Boolean
        };
    }

    firstUpdated(_changedProperties) {
        if (this.edit) {
            document.addEventListener(EventConstant.RESPONSE, ({detail}) => {
                document.dispatchEvent(
                    new CustomEvent(EventConstant.DISPLAY_INFOS_TWEET, {detail: detail.tweet})
                );
                this.active = true;
                this.parent = detail.tweet;
            });
        }
    }

    static get styles() {
        return css`
        * {
            box-sizing: border-box;
        }
        
        .form-add {
            background-color: #fff;
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            right: -100%;
            text-align: left;
            position: absolute;
            margin: 0;
            padding: 0;
            transition: 0.2s ease;
        }
        
        .inactive {
            display: none;
        }
        footer {
            position: fixed;
            bottom: 0;
            width: 100%;
        }
        
        form input {
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
        if (this.edit) {
            document.dispatchEvent(
                new CustomEvent(EventConstant.RESPONSE_TWEET, {
                    detail: {
                        newTweet: this.newTweet,
                        parent: this.parent
                    }
                })
            );
        } else {
            document.dispatchEvent(
                new CustomEvent(EventConstant.NEW_TWEET, {detail: this.newTweet})
            );
        }
        document.dispatchEvent(
            new CustomEvent(EventConstant.DISPLAY_SIDEBAR, {detail: false})
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
                ${this.edit ? html`Respond` : html`Tweet`}
            </button>
            <div class="form-add">
        
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
                placeholder="${this.edit ? "Tweet your response" : "What's new ?"}"
                >
                </textarea>
            </form>
        </div>
    `;
    }
}

customElements.define("form-add", FormAdd);
