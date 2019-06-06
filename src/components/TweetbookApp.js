import {LitElement, html, css} from 'lit-element';
import './data/TweetStore';
import './modules/Tweet';
import './modules/FormAdd';

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
            <slot></slot>
            ${
                this.tweets.map(item => html`<tweet-elem tweet="${item}"/>`)
            }
            
           <form-add></form-add>
    `
    }
}

customElements.define('tweetbook-app', TweetbookApp);