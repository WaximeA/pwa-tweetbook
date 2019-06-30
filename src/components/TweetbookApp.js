import {LitElement, html, css} from 'lit-element';
import './data/TweetStore';
import './modules/Tweet';
import './layout/navigation/FormAdd';
import './layout/navigation/TweetHeader';

class TweetbookApp extends LitElement {

    constructor() {
        super();
        this.tweets = [];
    }

    static get properties() {
        return {
            tweets: Array
        }
    }

    firstUpdated(_changedProperties) {
    }

    childChanged(e) {
        this.tweets = e.detail;
    }

    render() {
        return html` 
            <tweet-store 
                collection="tweets" 
                @child-changed="${this.childChanged}"
            ></tweet-store>
            <tweet-header></tweet-header>
            <div class="tweet-container">
            ${
                this.tweets.map(item => html`<tweet-elem .tweet="${item}"/>`)
            }
            </div>
           <form-add></form-add>
    `
    }

    static get styles() {
        return css`
            * {  box-sizing: border-box }
            
            tweet-elem {
                width: 60%;
                display: block;
            }

            .tweet-container {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            }
        `;
    }
}

customElements.define('tweetbook-app', TweetbookApp);