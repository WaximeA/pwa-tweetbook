import {LitElement, html, css} from 'lit-element/lit-element';
import {EventConstant} from "../../../Constants/event.constant";

export default class FormAdd extends LitElement {

    constructor() {
        super();
        this.newTweet = "";
        this.active = false;
    }

    static get properties() {
        return {
            newTweet: String,
            active: Boolean
        }
    }

    static get styles() {
        return css`
            * {  box-sizing: border-box }

            .inactive{
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

            button{
                text-decoration: none;
                background-color: #55acee;
                color: #fff;
                padding: 10px 30px;
                font-weight: bold;
                border-radius: 5px;
                transition: .2s;
                &:hover
                  background-color: darken(#55acee, 10%);
                  cursor: pointer;
            }
        `
    }

    handleForm(e) {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent(EventConstant.NEW_TWEET, {detail: this.newTweet}));
        document.dispatchEvent(new CustomEvent(EventConstant.DISPLAY_SIDEBAR, {detail: false}));
        this.newTweet = "";
        this.active = false;
    }

    handleClick(e) {
        this.active = !this.active;
        this.shadowRoot.querySelector('#new-tweet').focus();
    }

    render() {
        return html` 

                <form @submit="${this.handleForm}" class="${!this.active ? "inactive" : ""}">
                    <input type="text" name="" id="new-tweet" @input="${e => this.newTweet = e.target.value}" .value="${this.newTweet}">
                    <button type="submit">Send</button>
                </form>
                <button @click="${this.handleClick}" class="${this.active ? "inactive" : ""}">Tweet</button>

        `
    }
}

customElements.define('form-add', FormAdd);