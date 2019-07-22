import { LitElement, html, css } from "lit-element";

import firebase from "firebase/app";
import "firebase/auth";
import { EventConstant } from "../../Constants/event.constant";

class TweetLogout extends LitElement {
  constructor() {
    super();
    this.auth = {};
    this.errorMessage = "";
  }

  static get properties() {
    return {
      email: String,
      password: String,
      verifyPassword: String,
      errorMessage: String
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .button {
        padding: 8px 20px;
        text-decoration: none;
        margin-right: 2vh;
        background-color: #f15a22;
        color: #fff;
        padding: 8px 20px;
        border-radius: 10px;
        transition: 0.2s;
        border: none;
        cursor: pointer;
      }

      .button:hover {
        background-color: #f16b50;
      }
    `;
  }

  firstUpdated() {
    this.auth = firebase.auth();
  }

  handleForm(e) {
    e.preventDefault();

    this.auth
      .signOut()
      .then(user => {
        document.dispatchEvent(
          new CustomEvent(EventConstant.USER_LOGOUT, { detail: "logged out"})
        );
        localStorage.removeItem("user");
      })
      .catch(error => {
        this.errorMessage = "An error occurred during the logout.";
        console.error(error);
      });
  }

  render() {
    return html`
      <form @submit="${this.handleForm}">
        <button type="submit" class="button">Logout</button>
      </form>
    `;
  }
}

customElements.define("tweet-logout", TweetLogout);
