import { LitElement, html, css } from 'lit-element';

export default class FormAdd extends LitElement {

    constructor() {
        super();
        this.newTweet = "";
    }

    static get properties() {
        return  {
            newTweet: String
        }
    }

    handleForm(e) {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('new-tweet', {detail: this.newTweet}));
        this.newTweet = "";
    }

    render() {
        return html` 
            <form @submit="${this.handleForm}">
                <input type="text" name="" id="new-tweet" @input="${e => this.newTweet = e.target.value}" .value="${this.newTweet}">
                <button type="submit">Send</button>
            </form>
        `
    }
}

customElements.define('form-add', FormAdd);