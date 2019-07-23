import { LitElement, html, css } from 'lit-element';

import firebase from 'firebase/app';
import 'firebase/auth';
import {EventConstant} from "../../Constants/event.constant";

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
    this.collection='';
    this.avatar='';
    this.banner='';
  }

  static get properties() {
    return {
      email: String,
      password: String,
      verifyPassword: String,
      name: String,
      surname: String,
      nickname: String,
      errorMessage: String,
      collection: String,
      avatar: String,
      banner: String
    }
  }

  static get styles()
  {
    return css`
    
      :host {
        display: block
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
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
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
      console.info(data);
      this.errorMessage = '';
      firebase.firestore().collection(this.collection).doc(data.user.uid).set({
          name: this.name,
          surname: this.surname,
          nickname: this.nickname,
          follows:[],
          followers:[],
          likes: [],
          avatar: 'defaultAvatar.jpeg',
          banner: 'defaultBanner.jpg'
      }).then(()=>{
        document.dispatchEvent(new CustomEvent(EventConstant.USER_REGISTERED, { detail:data.user.email}));
      });
    })
    .catch(error => {
      this.errorMessage = error;
      console.error(error);
    });
  }

  render() {
    return html`
    <h4>Sign up</h4>
    <form @submit="${this.handleForm}">
       <label for="auth_email">Email</label>
       <input id="auth_email" type="text" placeholder="Email" .value="${this.email}" @input="${e => this.email = e.target.value}">
       <label for="auth_password">Password</label>
       <input id="auth_password" type="password" placeholder="Password" .value="${this.password}" @input="${e => this.password = e.target.value}">
       <label for="auth_repeat_password">Repeat your password</label>
       <input id="auth_repeat_password" type="password" placeholder="Repeat your password" .value="${this.verifyPassword}" @input="${e => this.verifyPassword = e.target.value}">
       <label for="auth_name">Name</label>
       <input id="auth_name" type="text" placeholder="Name" .value="${this.name}" @input="${e => this.name = e.target.value}">
       <label for="auth_surname">Surname</label>
       <input id="auth_surname" type="text" placeholder="Surname" .value="${this.surname}" @input="${e => this.surname = e.target.value}">
       <label for="auth_nickname">Twittax Nickname</label>
       <input id="auth_nickname" type="text" placeholder="Twittax Nickname" .value="${this.nickname}" @input="${e => this.nickname = e.target.value}">
       <span class="errors ${this.errorMessage ? "active" : ""}" id="login-error">${this.errorMessage}</span>
       <button type="submit" class="button" aria-label="register">Register</button>
     </form>
    `
  }
}

customElements.define('tweet-auth', TweetAuth);