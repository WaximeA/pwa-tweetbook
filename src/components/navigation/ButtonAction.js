import {LitElement, html, css} from 'lit-element';
import {EventConstant} from "../../Constants/event.constant";

export default class ButtonAction extends LitElement {

    constructor() {
        super();
    }

    static get properties() {
        return {}
    }

    static get styles() {
        return css`
            * {  box-sizing: border-box }
        `
    }

    handleClick(action) {
        this.dispatchEvent(new CustomEvent(EventConstant.TWEET_ACTION, {detail: action}));
    }


    render() {
        return html` 
            <div class="button-action">
                <button @click="${() => this.handleClick(EventConstant.RESPONSE)}">Repondre</button>
                <button @click="${() => this.handleClick(EventConstant.RT)}">RT</button>
                <button @click="${() => this.handleClick(EventConstant.LIKE)}">Like</button>
            </div>
        `
    }
}

customElements.define('button-action', ButtonAction);