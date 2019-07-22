import {LitElement, html, css} from "lit-element";
import './Tweet/Response';
import './Tweet'
import {EventConstant} from "../../Constants/event.constant";
import "./ProfileInfo";


export class ProfileSidebar extends LitElement {
  constructor() {
    super();
    this.active = false;
    this.profileUser = {};
    this.updating = false;
  }

  static get properties() {
    return {
      active: Boolean,
      profileUser: Object,
      updating: Boolean
    };
  }

  static get styles() {
    // language=CSS
    return css`
        * {
            box-sizing: border-box;
        }

        .sidebar {
            background-color: var(--app-bg-color);
            width: 100%;
            height: 100%;
            top: 0;
            bottom: 0;
            right: -100%;
            text-align: left;
            position: fixed;
            margin: 0;
            padding: 0;
            transition: 0.2s ease;
            overflow: auto;
            z-index: 10;
        }

        .display {
            right: 0 !important;
            box-shadow: 2px 2px 30px 0px #656565;
        }

        .header-sidebar {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            justify-content: space-between;
            height: 48px;
            border-bottom: solid var(--app-header-shadow) 1px;
            box-shadow: var(--app-header-shadow) 0px 3px 4px 0px;
            margin-bottom: 10px;
            background-color: var(--app-bg-component-color);
        }

        .header-sidebar > h2 {
            width: 80%;
        }
        `
  }

  firstUpdated(_changedProperties) {
    console.log('PROFILE SIDEBAR firstUpdated');
    document.addEventListener(EventConstant.DISPLAY_PROFILE_SIDEBAR, ({detail}) =>
    {
      console.log('in DISPLAY_PROFILE_SIDEBAR event listener');
      this.displaySidebar();
      this.profileUser = detail.profileUser;
      this.active = true;
      this.updating = !this.updating;
    })
  }


  displaySidebar() {
    this.active = !this.active;
    this.tweet = {};
  }

  render() {

    console.log('in SIDEBAR = ' + this.profileUser.id);
    return html`
    
            <div class="sidebar ${this.active ? 'display' : ''}">
                <div class="header-sidebar">
                    <h2>@${this.profileUser.nickname}  </h2>
                    <button class="collapse-button" id="cross-icon" @click=${this.displaySidebar}>            
                        <img src="/src/assets/images/icons/baseline_keyboard_backspace_white_18dp.png" alt="Side bar logo">
                    </button>
                                                                             
                </div>
                <div class="header-body">
                 ${this.profileUser.id ?
                    html`
                      <profile-info .profileUser="${this.profileUser}"></profile-info>
                    ` :  ''}                       
                </div>  
            <div>
    
`;
  }

}

customElements.define("profile-sidebar", ProfileSidebar);
