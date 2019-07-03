import { LitElement, html, css } from 'lit-element';

import firebase from 'firebase/app';
import 'firebase/auth';

class TweetLogin extends LitElement {

  constructor() {
    super();
    this.auth = {};
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    this.collection ='';
  }

  static get properties() {
    return {
      email: String,
      password: String,
      errorMessage: String,
      collection: String
    }
  }

  static get styles()
  {
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
      
      form .button {
        font-size: 15px;
        padding:0.3em 1.2em;
        margin: 0 0.3em 0.3em 0;
        border-radius: 5px;
        box-sizing: border-box;  
        text-decoration:none;
        font-weight:300;
        color:#FFFFFF;
        background-color:#4eb5f1;
        text-align:center;
        transition: all 0.2s;
      }
      
     .errors {
        margin: 10px;
        color: red;
        font-size: 12px;
        display: none;
      }
      
      .active{
        display: block;
      }
    `
  }

  firstUpdated() {
    this.auth = firebase.auth();

    this.auth.onAuthStateChanged(user => {
      if (!user) {
        // handle logout
        localStorage.setItem('logged', false);
      } else {
        const dbDocument = firebase.firestore().collection(this.collection).doc(firebase.auth().currentUser.uid);
        dbDocument.get().then((user) => {
          console.log("je suis loggé");
          document.dispatchEvent(new CustomEvent('user-logged', { detail: user.data()}));
        });
        localStorage.setItem('logged', true);
      }
    });
    document.addEventListener('fill-email', (data) => {
      this.email=data.detail;
    });
  
  }

  handleForm(e) {
    e.preventDefault();

    if ((!this.email || !this.password)) {
      this.errorMessage = 'Email or Password missing';
      console.error(this.errorMessage);
    }

    this.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(() => {
      const document = firebase.firestore().collection(this.collection).doc(firebase.auth().currentUser.uid);
      document.get().then((user) => {
        this.dispatchEvent(new CustomEvent('user-logged', { detail: user.data()}));
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
       <input type="text" placeholder="email" .value="${this.email}" @input="${e => this.email = e.target.value}">
       <input type="password" placeholder="password" .value="${this.password}" @input="${e => this.password = e.target.value}">
       <span class="errors ${this.errorMessage ? "active" : ""}" id="login-error">${this.errorMessage}</span>
       <button type="submit" class="button">Login</button>
     </form>
    `
  }
}

customElements.define('tweet-login', TweetLogin);