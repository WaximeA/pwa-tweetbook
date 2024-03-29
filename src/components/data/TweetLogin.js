import { LitElement, html, css } from "lit-element";

import firebase from "firebase/app";
import "firebase/auth";
import { EventConstant } from "../../Constants/event.constant";

class TweetLogin extends LitElement {
  constructor() {
    super();
    this.auth = {};
    this.email = "";
    this.password = "";
    this.errorMessage = "";
    this.collection = "";
  }

  static get properties() {
    return {
      email: String,
      password: String,
      errorMessage: String,
      collection: String
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      
      form {
        margin: 5%;
        text-align: left;
        display:flex;
        flex-direction: column;
      }
      
      form label {
        font-size: 14px;
      }

      form input {
        margin: 8px 0;
        border: 1px solid var(--app-contrast-text-color);
        border-radius: 4px;
        padding: 12px 20px 12px 20px;
        background-color: transparent;
        color: var(--app-text-color);
      }

      form .button {
        font-size: 15px;
        padding: 0.3em 1.2em;
        margin: 0 0.3em 0.3em 0;
        border-radius: 100px;
        box-sizing: border-box;
        text-decoration: none;
        font-weight: 300;
        color: #ffffff;
        background-color: #4eb5f1;
        text-align: center;
        transition: all 0.2s;
        border: none;
        align-self: center;
        cursor: pointer;
      }

      .errors {
        margin: 10px;
        color: red;
        font-size: 12px;
        display: none;
      }

      .active {
        display: block;
      }
    `;
  }

  firstUpdated() {
    this.auth = firebase.auth();

    this.auth.onAuthStateChanged(user => {
      if (!user) {
        // handle logout
        localStorage.setItem("logged", false);
        localStorage.removeItem("user");
      } else {
        const dbDocument = firebase
          .firestore()
          .collection(this.collection)
          .doc(firebase.auth().currentUser.uid);
        dbDocument.get().then(user => {
          this.setLogin(user);
        });
        localStorage.setItem("logged", true);
      }
    });
    document.addEventListener(EventConstant.FILL_EMAIL, data => {
      this.email = data.detail;
    });
  }

  handleForm(e) {
    e.preventDefault();
    if (!this.email || !this.password) {
      this.errorMessage = "Email or Password missing";
      console.error(this.errorMessage);
    }

    this.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(e => {
        const document = firebase
          .firestore()
          .collection(this.collection)
          .doc(firebase.auth().currentUser.uid);
        document.get().then(user => {
          this.setLogin(user);
        });
      })
      .catch(error => {
        this.errorMessage = error;
      });
  }

  render() {
    return html`
      <h4>Sign in</h4>
      <form @submit="${this.handleForm}">
        <label for="email_login">Email</label>
        <input
          id="email_login"
          type="text"
          title="email_login"
          placeholder="email"
          .value="${this.email}"
          @input="${e => (this.email = e.target.value)}"
        />
        <label for="password_login">Password</label>
        <input
          id="password_login"
          type="password"
          title="password_login"
          placeholder="password"
          .value="${this.password}"
          @input="${e => (this.password = e.target.value)}"
        />
        <span
          class="errors ${this.errorMessage ? "active" : ""}"
          id="login-error"
          >${this.errorMessage}</span
        >
        <button type="submit" class="button" aria-label="login">Login</button>
      </form>
    `;
  }

  setLogin(user) {
    document.dispatchEvent(
      new CustomEvent(EventConstant.USER_LOGGED, { detail: user.data() })
    );
    const userInfos = { ...user.data(), id: user.id };
    localStorage.setItem("user", JSON.stringify(userInfos));
  }
}

customElements.define("tweet-login", TweetLogin);
