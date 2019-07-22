import {LitElement, html, css} from 'lit-element/lit-element';

import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import {EventConstant} from '../../Constants/event.constant';

export default class ProfileInfo extends LitElement {

  constructor() {
    super();
    this.profileUser = {};
    this.name = '';
    this.surname = '';
    this.nickname = '';
    this.follows = [];
    this.followers = [];
    this.resume = "Hi, I'm an Eclatax Dev !";
    this.avatar = '';
    this.banner = '';
    this.userTweets = {}
  }

  static get properties() {
    return {
      profileUser: Object,
      name: String,
      surname: String,
      nickname: String,
      follows: Array,
      followers: Array,
      resume: String,
      avatar: String,
      banner: String,
      userTweets: Object
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

  firstUpdated(_changedProperties) {
    console.log('PROFILE INFOS firstUpdated');
    if (this.profileUser.id) {
      firebase.firestore().collection('usersInfo').doc(this.profileUser.id).get().then((userInfo) => {
        let userData = userInfo.data();

        this.name = userData.name;
        this.surname = userData.surname;
        this.nickname = userData.nickname;
        this.followers = userData.followers;
        this.follows = userData.follows;
        this.resume = userData.resume;
        console.log(this.name);
        console.log(userData.avatar);
        firebase.storage().ref("avatar").child(userData.avatar).getDownloadURL().then((url) => {
          this.avatar = url;
        });
        firebase.storage().ref("banniere").child(userData.banner).getDownloadURL().then((url) => {
          this.banner = url;
        });
      });

      firebase.firestore().collection('tweets/user/').doc(this.profileUser.id).get().then((tweet) => {
        console.log(tweet);
        let tweetsData = tweet.data();
        console.log(tweetsData);
      });


    }
  }

  updated(_changedProperties) {

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
                    <div class="name">${this.name} ${this.surname}</div>
                    <div class="tag">@${this.nickname}</div>
                    <div class="text">${this.resume}</div>
                </div>
                <nav>
                  <div class="count">
                    <h4>1537</h4>
                    <h6>Tweets</h6>
                  </div>
                  <div class="following">
                    <h4>${this.follows.length}</h4>
                    <h6>Following</h6>
                  </div>
                  <div class="followers">
                    <h4>${this.followers.length}</h4>
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