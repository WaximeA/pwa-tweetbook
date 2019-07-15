import {LitElement, html, css} from "lit-element";
import './Tweet/Response';
import {EventConstant} from "../../Constants/event.constant";

export class InfosTweet extends LitElement {
    constructor() {
        super();
        this.tweet = {};
        this.active = false;
        this.responses = [];
    }

    static get properties() {
        return {
            tweet: Object,
            active: Boolean,
            responses: []
        };
    }

    firstUpdated(_changedProperties) {
        document.addEventListener(EventConstant.DISPLAY_INFOS_TWEET, ({detail}) => this.displayInfosTweet(detail))
    }

    render() {
        return html`
            <div class="infos-tweet">
                <div id="sidebar" class="${this.active ? 'display' : ''}">
                    <button class="collapse-button" id="cross-icon" @click=${this.displaySidebar}><img src="./src/assets/images/cross-icon.png" alt="Side bar logo"></button>
                <div>
                <tweet-elem .tweet="${this.tweet}"></tweet-elem>
                ${(this.responses.length > 0) ? this.responses.map(item => {
                    return html`<tweet-response .tweet="${item}"></tweet-response>`  
                }) : html``}
            </div>
`;
    }

    displaySidebar() {
        this.active = !this.active;
        this.tweet = {};
    }

    displayInfosTweet(tweet) {
        this.active = true;
        this.tweet = tweet;
        this.responses = tweet.data.responses;
    }
}

customElements.define("infos-tweet", InfosTweet);
