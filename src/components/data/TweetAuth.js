import { LitElement, html, css } from 'lit-element';

import firebase from 'firebase/app';
import 'firebase/auth';

class TweetAuth extends LitElement {

  constructor() {
    super();
    this.auth = {};
    this.email = '';
    this.password = '';
    this.verifyPassword = '';
    this.name='';
    this.surname='';
    this.nickname='';
    this.errorMessage = '';
  }

  static get properties() {
    return {
      email: String,
      password: String,
      verifyPassword: String,
      name: String,
      surname: String,
      nickname: String,
      errorMessage: String
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
     
      .active {
        display: block;
      }
    `
  }

  firstUpdated() {
    this.auth = firebase.auth();
  }

  handleForm(e) {
    e.preventDefault();

    if ((!this.email || !this.password) || !this.verifyPassword) {
      this.errorMessage = 'Email or Password missing';
      return console.error(this.errorMessage);
    }

    if ((!this.name || !this.surname) || !this.nickname) {
      this.errorMessage = 'Please fill Name, Surname, Nickname';
      return console.error(this.errorMessage);
    }

    if (this.password !== this.verifyPassword) {
      this.errorMessage = 'Password are not identicals.';
      return console.error(this.errorMessage);
    }

    this.auth.createUserWithEmailAndPassword(this.email, this.password)
    .then(data => {
      this.errorMessage = '';
      console.info('User created', data);
    })
    .catch(error => {
      this.errorMessage = 'An error occurred, verify you credentials and try again.';
      console.error(error);
    });
  }

  render() {
    return html`
    <h4>Sign up</h4>
    <form @submit="${this.handleForm}">
       <input type="text" placeholder="Email" .value="${this.email}" @input="${e => this.email = e.target.value}">
       <input type="password" placeholder="Password" .value="${this.password}" @input="${e => this.password = e.target.value}">
       <input type="password" placeholder="Repeat your password" .value="${this.verifyPassword}" @input="${e => this.verifyPassword = e.target.value}">
       <input type="text" placeholder="Name" .value="${this.name}" @input="${e => this.name = e.target.value}">
       <input type="text" placeholder="Surname" .value="${this.surname}" @input="${e => this.surname = e.target.value}">
       <input type="text" placeholder="Twittax Nickname" .value="${this.nickname}" @input="${e => this.nickname = e.target.value}">
       <span class="errors ${this.errorMessage ? "active" : ""}" id="login-error">${this.errorMessage}</span>
       <button type="submit" class="button">Register</button>
     </form>
    `
  }
}

customElements.define('tweet-auth', TweetAuth);