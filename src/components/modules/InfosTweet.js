import { LitElement, html, css } from "lit-element";
import "./Tweet/Response";
import "./Tweet";
import { EventConstant } from "../../Constants/event.constant";

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
            responses: [],
        };
    }

    firstUpdated(_changedProperties) {
        document.addEventListener(EventConstant.DISPLAY_INFOS_TWEET, ({detail}) => this.displayInfosTweet(detail))
        document.addEventListener(EventConstant.RESPONSE_TWEET_DONE, ({detail}) => {
            if (this.tweet) {
                this.responses = detail.responses;
                this.tweet.data.responses = detail.responses;
            }
        })
    }

    render() {
        return html`
            <div class="infos-tweet">
                <div class="sidebar ${this.active ? 'display' : ''}">
                    <div class="header-sidebar">
                        <button class="primary-button" id="respond" @click="${this.handleClick}">Respond</button>

                        <h2>Tweet</h2>
                        <button class="collapse-button" id="cross-icon" @click=${this.displaySidebar}>            
                            <img src="/src/assets/images/icons/baseline_keyboard_backspace_white_18dp.png" alt="Side bar logo">
                        </button>

                    </div>
                    <div class="tweet-container">
                        <tweet-elem .tweet="${this.tweet}" noAction=true></tweet-elem>
                        ${(this.responses.length > 0) ?
            this.responses.map((item, key) => {
                return html`<tweet-response .tweet="${item}" key=${key} last=${this.responses.length-1}></tweet-response>`
            }) : html``}
                    </div>
                <div>
            </div>
`;
    }

    static get styles() {
        // language=CSS
        return css`
            * {
                box-sizing: border-box;
            }

            tweet-elem, tweet-response {
                width: 100%;
                display: block;
            }

            .tweet-container {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .sidebar {
                background-color: var(--app-bg-color);
                width: 100%;
                height: 100%;
                top: 0;
                bottom: 0;
                right: -100%;
                text-align: left;
                position: fixed;
                margin: 0;
                padding: 0;
                transition: 0.2s ease;
                overflow: auto;
                z-index: 10;
            }

            .display {
                right: 0 !important;
                box-shadow: 2px 2px 30px 0px #656565;
            }

            .header-sidebar {
                display: flex;
                flex-direction: row-reverse;
                align-items: center;
                justify-content: space-between;
                height: 48px;
                border-bottom: solid var(--app-header-shadow) 1px;
                box-shadow: var(--app-header-shadow) 0px 3px 4px 0px;
                margin-bottom: 10px;
                background-color: var(--app-bg-component-color);
            }

            .header-sidebar > h2 {
                width: 80%;
            }

            .collapse-button {
                border: none;
                height: 100%;
                display: flex;
                align-content: center;
                justify-content: center;
                width: 50px;
                background: none;
            }

            .primary-button {
                font-size: 14px;
                color: white;
                line-height: 20px;
                margin-right: 20px;
                border-width: initial;
                border-style: none;
                border-color: initial;
                border-image: initial;
                background: rgb(85, 172, 238);
                padding: 5px 30px;
                border-radius: 100px;
            }
        `
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

    handleClick() {
        document.dispatchEvent(new CustomEvent(EventConstant.RESPONSE, {
            detail: {
                tweet: this.tweet,
                dontNeedDisplay: true
            }
        }))
    }
}

customElements.define("infos-tweet", InfosTweet);
