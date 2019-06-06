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

    firstUpdated(_changedProperties) {}

    static get styles(){
        return css`
            .tweet{
                width: 100%;
                max-width: 600px;
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
        `
    }

    render() {
        return html`
            <div class="tweet">
                <div class="user-pic-box">
                    <div class="user-pic"></div>
                </div>
                <div class="content">
                    <div class="user-info">${this.tweet.user.name}</div>
                    <div class="tweet-content">${this.tweet.content}</div>
                </div>
            </div>
        `;
    }
}

customElements.define('tweet-elem', Tweet);