import {LitElement, html, css} from 'lit-element';
import './data/TweetStore';
import './modules/Tweet';
import './layout/navigation/TweetHeader';
import {EventConstant} from "../Constants/event.constant";
import {collectionConstant} from "../Constants/collection.constant";

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
        document.addEventListener(EventConstant.RT, console.log);
    }

    childChanged(e) {
        this.tweets = e.detail;
    }

    render() {
        return html` 
            <tweet-store 
                collection="${collectionConstant.TWEET_COLLECTION}" 
                @child-changed="${this.childChanged}"
            ></tweet-store>
            <tweet-header></tweet-header>
            <div class="tweet-container">
            ${
                this.tweets.map(item => html`<tweet-elem .tweet="${item}"/>`)
            }
            </div>
       
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
            
            * { 
                font-family: Helvetica Neue,Helvetica,Arial,sans-serif; 
            }

            ::slotted(*) { font-family: Helvetica Neue,Helvetica,Arial,sans-serif;  }

        `;
    }
}

customElements.define('tweetbook-app', TweetbookApp);