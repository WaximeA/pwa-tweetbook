import {LitElement, html, css} from 'lit-element/lit-element';

import firebase from 'firebase/app';
import 'firebase/storage';

export default class UserInfo extends LitElement {

  constructor() {
    super();
    this.name = '';
    this.surname = '';
    this.nickname = '';
    this.follows = [];
    this.followers = [];
    this.resume= "Hi, I'm an Eclatax Dev !";
    this.avatar='';
    this.banner='';
  }

  static get properties() {
    return {
      name: String,
      surname: String,
      nickname: String,
      follows: Array,
      followers: Array,
      resume: String,
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
    .phone {
      height: 44vh; 
    }
    img {
      margin-top: -21px;
      position: fixed;
      width: 414px;
    }
    .content {  
      position: absolute;
      width: 100%;
    }
    .image {
      background-size: 71px 71px;
      border-radius: 50%;
      border: 3px solid white;
      height: 71px;
      left: 9px;
      position: absolute;
      top: 89px;
      width: 71px;
      transform-origin: 50% 100%;
      background-repeat: no-repeat;
      background-position: center;
    }
    .name {
      font-size: 20px;
      position: absolute;
      top: 164px;
      font-weight: 700;
      left: 10px;
      letter-spacing: -0.3px;
    }
    .tag {
      color: #364651;
      left: 11px;
      letter-spacing: -0.85px;
      position: absolute;
      top: 191px;
    }
    .divider {
      background: #E6ECF0;
      height: 10px;
      position: absolute;
      top: 346px;
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
      left: 11px;
      position: absolute;
      top: 220px;
    }
    .banner{
      height: 135px;
      width: 350px;
      background-repeat: round;
    }

    nav {
      width: 100%;
      height: 58px;
      display: flex;
      padding-top: 140px;
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
      border-right: 1px solid #CCC;
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
      border-left: 1px solid #CCC;
    }
    `
  }

  firstUpdated() {
    document.addEventListener('fill-user-info', (data) => {
      console.info(data.detail);
      this.name = data.detail.name;
      this.surname = data.detail.surname;
      this.nickname = data.detail.nickname;
      this.followers = data.detail.followers;
      this.follows = data.detail.follows;
      firebase.storage().ref("avatar").child(data.detail.avatar).getDownloadURL().then((url) => {
        this.avatar = url;
      });
      firebase.storage().ref("banniere").child(data.detail.banner).getDownloadURL().then((url) => {
        this.banner = url;
      });
    });
  }

  render() {
    return html`
    <div class="phone">
      <div class="content">
        <div class="image" style="background-image: url('${this.avatar}');"></div>
        <div class="banner" style="background-image: url('${this.banner}');"></div>
        <div class="name">${this.name} ${this.surname}</div>
        <div class="tag">@${this.nickname}</div>
        <div class="text">${this.resume}</div>
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
    </div>
    `
  }
}

customElements.define('user-info', UserInfo);