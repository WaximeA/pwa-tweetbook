import {LitElement, html, css} from 'lit-element';

export default class Tweet extends LitElement {

    constructor() {
        super();
        this.tweet = {}
    }

    static get properties() {
        return {
            tweet: Object
        }
    }

    firstUpdated(_changedProperties) {
    }

    static get styles() {
        return css`
            .tweet{
                min-height: 80px;
                display: flex;
                border-bottom: 1px solid #cacaca;               
                flex-direction: row;
                padding: 20px 15px;
            }
            
            .user-pic-box {
                width: 10%;
                display: block;
                margin-right: 10px;
            }
            
            .user-pic {
                width: 100%;
                height: 100%;
                background: no-repeat url("/src/assets/images/user.svg");
            }
            
            .content {
                width: 90%;
            }
            
            .user-info-box {
                display: flex;
                justify-content: space-between;
            }
            
            .delete {
                width: 10%;
                height: 100%;
                text-align: right;
                padding: 0 10px 0 0;
            }
            
            .tweet-content {
                width: 90%;
            }
        `
    }

    render() {
        return html`
            <div class="tweet">
                <div class="user-pic-box">
                    <div class="user-pic"></div>
                </div>
                <div class="content">
                    <div class="user-info-box">
                        <div class="user-info">${this.tweet.data.user.name}</div>
                        <div class="delete" @click="${e => this.deleteTweet(e)}"><i>X</i></div>
                    </div>
                    <div class="tweet-content">${this.tweet.data.content}</div>
                </div>
            </div>
        `;
    }

    deleteTweet(e) {
        document.dispatchEvent(new CustomEvent('delete-tweet', {detail: this.tweet.id}));
    }
}

customElements.define('tweet-elem', Tweet);