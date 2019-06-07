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
    }

    render() {
        return html` 
            <footer>
                <form @submit="${this.handleForm}" class="${!this.active ? "inactive" : ""}">
                    <input type="text" name="" id="new-tweet" @input="${e => this.newTweet = e.target.value}" .value="${this.newTweet}">
                    <button type="submit">Send</button>
                </form>
                <button @click="${this.handleClick}" class="${this.active ? "inactive" : ""}">New Tweet</button>
            </footer>
        `
    }
}

customElements.define('form-add', FormAdd);