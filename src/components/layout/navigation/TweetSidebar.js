import {LitElement, html, css} from 'lit-element/lit-element';

import '../../data/TweetAuth';
import '../../data/TweetLogin';
import '../../data/TweetLogout';

export default class TweetSidebar extends LitElement {

  constructor() {
    super();
    this.logged = false;
    this.active = false;
  }

  static get properties() {
    return {
      logged: { type: Boolean },
      active: { type: Boolean }
    }
  }

  static get styles() {
    return css`
      /* sidebar */    
      #menu-icon {  
        display: inline-block;
      }
        
      .collapse-button img {
        width: 20px;
        position: relative;
        left: 0%;
        padding: 10px
      }
      
      #sidebar {
        list-style-type: none;
        background-color: #fff;
        width: 350px;
        height: 100%;
        top: 0;
        bottom: 0;
        left: -100%;
        text-align: left;
        position: absolute;
        margin: 0;
        padding: 0;
        list-style: none;
        transition: 0.3s ease;
      }
      
      .display {
        left: 0 !important;
        -moz-box-shadow: 2px 2px 30px 0px #656565;
        -webkit-box-shadow: 2px 2px 30px 0px #656565;
        -o-box-shadow: 2px 2px 30px 0px #656565;
        box-shadow: 2px 2px 30px 0px #656565;
      }
      
      tweet-auth, tweet-login {
        text-align: center;
        padding: 10px 0 10px 0;
      }
    `
  }

  firstUpdated() {
    this.logged = localStorage.getItem('logged') === 'true' ? true : false;
  }

  displaySidebar() {
    this.active = !this.active;
  }

  handleLogin({detail}){
    if (detail.user && this.active) {
      this.displaySidebar();
    }

    this.logged = true;
    localStorage.setItem('logged', true);
  }

  handleLogout() {
    this.displaySidebar();


    this.logged = false;
    localStorage.setItem('logged', false);
  }

  render() {
    return html`
      <button class="collapse-button" id="menu-icon" @click=${this.displaySidebar}><img src="./src/assets/images/menu-icon.png" alt="Side bar logo" ></button>
      <div id="sidebar" class="${this.active ? 'display' : ''}">
        <button class="collapse-button" id="cross-icon" @click=${this.displaySidebar}><img src="./src/assets/images/cross-icon.png" alt="Side bar logo"></button>
        ${!this.logged ? html`
            <tweet-auth></tweet-auth>
            <tweet-login @user-logged="${this.handleLogin}"></tweet-login>
          ` : html`
            <div>
              <!-- @todo = remplace image by the user informations component -->
              <img src="./src/assets/images/user-info-component.png" alt="Tweetbook logo" style="width: 100%">
            </div>
            <tweet-logout @user-logout="${this.handleLogout}"></tweet-logout>
          `
        }
      </div>
    `
  }
}

customElements.define('tweet-sidebar', TweetSidebar);