import { LitElement, html, css } from "lit-element/lit-element";

import "../../data/TweetAuth";
import "../../data/TweetLogin";
import "../../data/TweetLogout";
import "./UserInfo";
import "./FormEdit";

import "@polymer/paper-tabs/paper-tabs.js";
import "@polymer/paper-tabs/paper-tab.js";
import { EventConstant } from "../../../Constants/event.constant";

export default class TweetSidebar extends LitElement {
  constructor() {
    super();
    this.logged = false;
    this.active = false;
    this.signUp = false;
    this.selectedTab = 0;
  }

  static get properties() {
    return {
      logged: { type: Boolean },
      active: { type: Boolean },
      signUp: { type: Boolean },
      selectedTab: { type: Number }
    };
  }

  static get styles() {
    return css`
      /* sidebar */
      #menu-icon {
        display: inline-block;
        border: none;
        background-color: transparent;
        cursor: pointer;
      }

      #cross-icon {
        background-color: transparent;
        cursor: pointer;
        border: none;
      }

      .collapse-button {
        background: transparent;
      }

      .collapse-button img {
        position: relative;
        left: 0%;
        padding: 12px;
        width: 30px;
      }

      #sidebar {
        list-style-type: none;
        background-color: var(--app-bg-color);
        width: 350px;
        height: 100%;
        top: 0;
        bottom: 0;
        left: -100%;
        text-align: left;
        position: fixed;
        margin: 0;
        padding: 0;
        list-style: none;
        transition: 0.3s ease;
        overflow: auto;
        z-index: 10;
      }

      .display {
        left: 0 !important;
        -moz-box-shadow: 2px 2px 30px 0px var(--app-grey-color);
        -webkit-box-shadow: 2px 2px 30px 0px var(--app-grey-color);
        -o-box-shadow: 2px 2px 30px 0px var(--app-grey-color);
        box-shadow: 2px 2px 30px 0px var(--app-grey-color);
      }

      tweet-auth,
      tweet-login {
        text-align: center;
        padding: 10px 0 10px 0;
      }

      tweet-auth {
        display: none;
      }

      .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .user-info-footer {
        margin: 0 2vh 2vh 2vh;
        display:flex;
        justify-content:center
      }
    `;
  }

  firstUpdated() {
    this.logged = localStorage.getItem("logged") === "true" ? true : false;
    document.addEventListener(EventConstant.USER_REGISTERED, data => {
      const email = data.detail;
      this.displaySignIn();
      document.dispatchEvent(
        new CustomEvent(EventConstant.FILL_EMAIL, { detail: email })
      );
    });
    document.addEventListener(EventConstant.USER_LOGGED, data => {
      this.handleLogin(data.detail);
      document.dispatchEvent(
        new CustomEvent(EventConstant.FILL_USER_INFOS, { detail: data.detail })
      );
    });
    document.addEventListener(EventConstant.EDIT_INFOS, data => {
      document.dispatchEvent(
        new CustomEvent(EventConstant.FILL_USER_INFOS, { detail: data.detail })
      );
    });

    document.addEventListener(EventConstant.DISPLAY_SIDEBAR, ({ detail }) => {
      this.active = detail;
    });

    document.addEventListener(EventConstant.USER_LOGOUT, () => this.logged = false)
  }

  displaySidebar() {
    this.active = !this.active;
  }

  displaySignIn() {
    this.shadowRoot.querySelector("tweet-auth").style.display = "none";
    this.selectedTab = 0;
    this.shadowRoot.querySelector("tweet-login").style.display = "block";
  }

  displaySignUp() {
    this.shadowRoot.querySelector("tweet-login").style.display = "none";
    this.selectedTab = 1;
    this.shadowRoot.querySelector("tweet-auth").style.display = "block";
  }

  handleLogin(data) {
    if (data && this.active) {
      this.displaySidebar();
    }
    this.logged = true;
    localStorage.setItem("logged", true);
  }

  handleLogout() {
    this.displaySidebar();
    this.logged = false;
    localStorage.setItem("logged", false);
  }

  render() {
    return html`
      <button
        class="collapse-button"
        id="menu-icon"
        @click=${this.displaySidebar}
        aria-label="open menu"
      >
        <img
          src="/src/assets/images/icons/baseline_menu_white_18dp.png"
          alt="Side bar logo"
        />
      </button>
      <div id="sidebar" class="${this.active ? "display" : ""}">
        <div class="buttons">
          <button
            class="collapse-button"
            id="cross-icon"
            @click=${this.displaySidebar}
            aria-label="back"
          >
            <img
              src="/src/assets/images/icons/baseline_keyboard_backspace_white_18dp.png"
              alt="Side bar logo"
            />
          </button>
          ${this.logged ? html`<tweet-logout @user-logout="${this.handleLogout}"></tweet-logout>` : null}
        </div>
        ${!this.logged
          ? html`
              <paper-tabs selected="${this.selectedTab}">
                <paper-tab @click=${this.displaySignIn}>Sign In</paper-tab>
                <paper-tab @click=${this.displaySignUp}>Sing Up</paper-tab>
              </paper-tabs>
              <tweet-auth collection="usersInfo"></tweet-auth>
              <tweet-login collection="usersInfo"></tweet-login>
            `
          : html`
              <div>
                <user-info collection="usersInfo"></user-info>
              </div>
              <div class="user-info-footer">
                <form-edit collection="usersInfo"></form-edit>
              </div>
            `}
      </div>
    `;
  }
}

customElements.define("tweet-sidebar", TweetSidebar);
