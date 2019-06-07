import {LitElement, html, css} from 'lit-element/lit-element';

export default class ButtonAction extends LitElement {

    constructor() {
        super();
    }

    static get properties() {
        return {
        }
    }

    static get styles() {
        return css`
            * {  box-sizing: border-box }
        `
    }

    render() {
        return html` 
            
        `
    }
}

customElements.define('button-action', ButtonAction);