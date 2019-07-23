import {LitElement, html, css} from 'lit-element/lit-element';

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import {EventConstant} from '../../Constants/event.constant';
import {collectionConstant} from '../../Constants/collection.constant';

export default class ProfileInfo extends LitElement {

  constructor() {
    super();
    this.profileUser = {};
    this.connectedUser = {};
    this.follows = [];
    this.followers = [];
    this.avatar = '';
    this.banner = '';
  }

  static get properties() {
    return {
      profileUser: Object,
      connectedUser: Object,
      avatar: String,
      banner: String
    }
  }

  static get styles() {
    return css`
          body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        align-items: center;
        background: #f2f2f2;
        display: flex;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        justify-content: center;
        margin: 0;
      }
      img {
        margin-top: -21px;
        position: fixed;
        width: 414px;
      }
      .content {
        position: relative;
        width: 100%;
      }
      .image {
        background-size: 71px 71px;
        border-radius: 50%;
        border: 3px solid var(--app-bg-component-color);
        height: 71px;
        left: 9px;
        position: absolute;
        top: 89px;
        width: 71px;
        transform-origin: 50% 100%;
        background-repeat: no-repeat;
        background-position: center;
      }
      .sidebar-header {
        margin-bottom: 50px;
      }

      .sidebar-infos-user {
        padding: 2vh;
      }

      .name {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: -0.3px;
      }
      .tag {
        color: var(--app-color-link);
        letter-spacing: -0.85px;
      }
      .divider {
        background: #e6ecf0;
        height: 1px;
        margin-top: 2vh;
        width: 100%;
      }
      .bar {
        margin-top: -71px;
        max-width: 414px;
        position: fixed;
        top: 0;
        width: 100%;
      }
      .bar.sticky {
        height: 120px;
      }
      .background {
        background: #1e7790;
        opacity: 0;
        height: 100%;
        position: absolute;
        transition: opacity 300ms;
        width: 100%;
      }
      .text {
        font-size: 14px;
      }
      .banner {
        height: 135px;
        width: 100%;
        background-repeat: round;
      }

      nav {
        width: 100%;
        height: 58px;
        display: flex;
      }

      nav h4 {
        text-align: center;
        font-size: 25px;
        margin: 8px 0 2px 0;
        color: #666;
      }

      nav h6 {
        text-align: center;
        margin: 0;
        font-family: sans-serif;
        font-weight: 100;
        text-transform: uppercase;
        font-size: 12px;
      }

      .count {
        display: inline-block;
        float: left;
        width: 125px;
        height: 58px;
        border-right: 1px solid #ccc;
      }

      .following {
        display: inline-block;
        margin: 0 auto;
        width: 125px;
      }

      .followers {
        display: inline-block;
        float: right;
        width: 125px;
        height: 58px;
        border-left: 1px solid #ccc;
      }
    `
  }

  setProfileUserData() {
    firebase.firestore().collection('usersInfo').doc(this.profileUser.id).get().then((userInfo) => {
      this.profileUser.id = userInfo.data().id;
      this.profileUser.name = userInfo.data().name;
      this.profileUser.surname = userInfo.data().surname;
      this.profileUser.nickname = userInfo.data().nickname;
      this.profileUser.followers = userInfo.data().followers;
      this.profileUser.follows = userInfo.data().follows;
      // this.profileUser.resume = userInfo.data().resume;

      firebase.storage().ref("avatar").child(userInfo.data().avatar).getDownloadURL().then((url) => {
        this.avatar = url;
        // this.profileUser.avatar = url;
      });
      firebase.storage().ref("banniere").child(userInfo.data().banner).getDownloadURL().then((url) => {
        this.banner = url;
        // this.profileUser.banner = url;
      });
    });
  }

  manageFollow() {
    let index = this.connectedUser.follows.findIndex(json => json.id === this.profileUser.id);
    if (index === -1) {
      // Update current user follows
      this.connectedUser.follows.push({
        id: this.profileUser.id,
        name: this.profileUser.name,
        surname: this.profileUser.surname,
        nickname: this.profileUser.nickname,
        followersLenght: this.profileUser.followers.length,
        followsLenght: this.profileUser.follows.length
      });
      firebase
      .firestore()
      .collection(collectionConstant.USER_INFOS_COLLECTION)
      .doc(this.connectedUser.id)
      .update({follows: this.connectedUser.follows});

      // Update profile user followers
      this.profileUser.followers.push({
        id: this.connectedUser.id,
        name: this.connectedUser.name,
        surname: this.connectedUser.surname,
        nickname: this.connectedUser.nickname,
        followersLenght: this.connectedUser.followers.length,
        followsLenght: this.connectedUser.follows.length
      });
      firebase
      .firestore()
      .collection(collectionConstant.USER_INFOS_COLLECTION)
      .doc(this.profileUser.id)
      .update({followers: this.profileUser.followers});
      document.dispatchEvent(new CustomEvent(EventConstant.IS_FOLLOWING, {detail: {isUserFollowing: true}}));
    } else {
      // @todo UNFOLLOW HERE => delete current user from profile user followers and delete profile user from current user follows
      console.log("You already follow this user")
    }
  }

  firstUpdated(_changedProperties) {

    document.addEventListener(EventConstant.USER_LOGGED, () => this.connectedUser = JSON.parse(localStorage.getItem('user')));
    document.addEventListener(EventConstant.USER_LOGOUT, () => this.connectedUser = null);

    document.addEventListener(EventConstant.DISPLAY_PROFILE_SIDEBAR, ({detail}) => {
      this.profileUser = detail.profileUser;
      this.setProfileUserData();
    });

    document.addEventListener(EventConstant.FOLLOW, () => {this.manageFollow()});
  }


  render() {
    return html`
            <div class="profile-info">
              <div class="content">
                <div class="sidebar-header">
                    <div class="image" style="background-image: url('${this.avatar}');"></div>
                    <div class="banner" style="background-image: url('${this.banner}');"></div>
                </div>
                <div class="sidebar-infos-user">
                    <div class="name">${this.profileUser.name} ${this.profileUser.surname}</div>
                    <div class="tag">@${this.profileUser.nickname}</div>
                    <div class="text">${this.profileUser.resume}</div>
                </div>
                <nav>
                  <div class="count">
                    <h4>1537</h4>
                    <h6>Tweets</h6>
                  </div>
                  <div class="following">
                    <h4>${this.profileUser.follows ? this.profileUser.follows.length : 0}</h4>
                    <h6>Following</h6>
                  </div>
                  <div class="followers">
                    <h4>${this.profileUser.followers ? this.profileUser.followers.length : 0}</h4>
                    <h6>Followers</h6>
                  </div>
                </nav>
                <div class="divider"></div>
                </div>
            </div>
    `
  }
}

customElements.define('profile-info', ProfileInfo);