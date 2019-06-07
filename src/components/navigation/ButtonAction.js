import {LitElement, html, css} from 'lit-element';

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
        this.dispatchEvent(new CustomEvent('action', {detail: action}));
    }


    render() {
        return html` 
            <div class="button-action">
                <button @click="${e => this.handleClick("response")}">Repondre</button>
                <button @click="${e => this.handleClick("RT")}">RT</button>
                <button @click="${e => this.handleClick("like")}">Like</button>
            </div>
        `
    }
}

customElements.define('button-action', ButtonAction);