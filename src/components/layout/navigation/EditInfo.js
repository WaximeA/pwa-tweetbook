import { LitElement, html, css } from 'lit-element';

import firebase from 'firebase/app';
import 'firebase/auth';
import {EventConstant} from "../../../Constants/event.constant";

class EditInfo extends LitElement {

  constructor() {
    super();
  }

  static get properties() {
    return {
    }
  }

  static get styles()
  {
    return css`

      :host {
        display: block
      }

      .button{
        text-decoration: none;
        background-color: #55acee;
        color: #fff;
        padding: 10px 30px;
        font-weight: bold;
        border-radius: 5px;
        transition: .2s;
        &:hover
          background-color: darken(#55acee, 10%);
          cursor: pointer;
      }
    `
  }

  firstUpdated() {
  }

  handleForm(e) {
    e.preventDefault();

    this.auth.signOut()
    .then(user => {
      console.info('User logout', user);
      this.dispatchEvent(new CustomEvent(EventConstant.USER_LOGOUT, { detail: { user }}));
    })
    .catch(error => {
      this.errorMessage = 'An error occurred during the logout.';
      console.error(error);
    });
  }

  render() {
    return html`
    <form @submit="${this.handleForm}">
       <button type="submit" class="button">Edit</button>
     </form>
    `
  }
}

customElements.define('edit-info', EditInfo);