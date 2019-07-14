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
        display: block
      }
      
      form input {
        width: 80%;
        margin: 8px 0;
        border: 1px solid #ccc;
        box-shadow: inset 0 1px 3px #ddd;
        border-radius: 4px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 12px 20px 12px 20px;
      }
    
      .button{
        padding: 8px 20px;
        text-decoration: none;
        background-color: #f15a22;
        color: #fff;
        padding: 8px 20px;
        border-radius: 5px;
        transition: .2s;
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
        console.info("User logout", user);
        this.dispatchEvent(
          new CustomEvent(EventConstant.USER_LOGOUT, { detail: { user } })
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
