import { LitElement, html, css } from 'lit-element';

export default class Tweet extends LitElement {

    constructor() {
        super();
        this.tweet = {}
    }

    static get properties() {
        return  {
            tweet: Object
        }
    }

    firstUpdated(_changedProperties) {
        console.log(this.tweet);
    }

    render() {
        return html`
            <div>
                <p><strong>${this.tweet.user} said</strong> ${this.tweet.content} : ${this.tweet.date}</p>
            </div>
        `
    }
}

customElements.define('tweet-elem', Tweet);