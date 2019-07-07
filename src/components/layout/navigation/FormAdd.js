import {LitElement, html, css} from 'lit-element/lit-element';

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
                padding: 8px 20px;
                border-radius: 5px;
                transition: .2s;
                &:hover
                  background-color: darken(#55acee, 10%);
                  cursor: pointer;
            }

            textarea{
                width: 330px;
                height: 300px;
                bottom: 2%;
                left: 3%;
                position: absolute;
                resize: none;
            }
        `
    }

    handleForm(e) {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('new-tweet', {detail: this.newTweet}));
        this.newTweet = "";
        this.active = false;
    }

    handleClick(e) {
        this.active = !this.active;
        this.shadowRoot.querySelector('#new-tweet').focus();
    }

    render() {
        return html` 
                <button @click="${this.handleClick}" class="${this.active ? "inactive" : ""}">Tweet</button>
                <form @submit="${this.handleForm}" class="${!this.active ? "inactive" : ""}">
                    <button type="submit">Send</button>
                    <textarea name="" id="new-tweet" @input="${e => this.newTweet = e.target.value}" .value="${this.newTweet}">
                </form>

        `
    }
}

customElements.define('form-add', FormAdd);