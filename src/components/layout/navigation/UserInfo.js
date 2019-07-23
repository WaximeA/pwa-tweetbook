import { LitElement, html, css } from "lit-element/lit-element";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import { EventConstant } from "../../../Constants/event.constant";
import lozad from 'lozad';

export default class UserInfo extends LitElement {
  constructor() {
    super();
    this.name = "";
    this.surname = "";
    this.nickname = "";
    this.follows = [];
    this.followers = [];
    this.resume = "Hi, I'm an Eclatax Dev !";
    this.avatar = "";
    this.banner = "";
    this.collection = "";
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
      banner: String,
      collection: String
    };
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
        width: 350px;
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
    `;
  }

  firstUpdated() {
    document.addEventListener(EventConstant.FILL_USER_INFOS, data => {
      console.log("last");
      console.log(data);
      if(data.detail.name)this.name = data.detail.name;
      if(data.detail.surname)this.surname = data.detail.surname;
      if(data.detail.nickname)this.nickname = data.detail.nickname;
      if(data.detail.followers)this.followers = data.detail.followers;
      if(data.detail.follows)this.follows = data.detail.follows;
      if(data.detail.resume)this.resume = data.detail.resume;
      if(data.detail.avatar){
      firebase
        .storage()
        .ref("avatar")
        .child(data.detail.avatar)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          this.avatar = url;
        });
      }
      if(data.detail.banner){
      firebase
        .storage()
        .ref("banniere")
        .child(data.detail.banner)
        .getDownloadURL()
        .then(url => {
          console.log(url);
          this.banner = url;
        });
      }
    });
    
    document.addEventListener(EventConstant.EDIT_INFOS, data => {
      if (data) {
        console.log("last");
        console.log(data);
        let updates = {};
        if (data.detail.avatar) {
          firebase
            .storage()
            .ref(
              "avatar/" +
                firebase.auth().currentUser.uid +
                "." +
                data.detail.avatar.name.split(".").pop()
            )
            .put(data.detail.avatar)
            .then(metadata => {
              metadata.ref.getDownloadURL().then(url => {
                this.avatar = url;
                updates.avatar =
                  firebase.auth().currentUser.uid +
                  "." +
                  data.detail.avatar.name.split(".").pop();
              });
            });
        }
        if (data.detail.banner) {
          firebase
            .storage()
            .ref(
              "banniere/" +
                firebase.auth().currentUser.uid +
                "." +
                data.detail.banner.name.split(".").pop()
            )
            .put(data.detail.banner)
            .then(metadata => {
              metadata.ref.getDownloadURL().then(url => {
                this.banner = url;
                updates.banner =
                  firebase.auth().currentUser.uid +
                  "." +
                  data.detail.banner.name.split(".").pop();
              });
            });
        }
        if (data.detail.resume) {
          this.resume = data.detail.resume;
          updates.resume = data.detail.resume;
        }
        firebase
          .firestore()
          .collection(this.collection)
          .doc(firebase.auth().currentUser.uid)
          .update(updates)
          .then(() => {
            if (data.detail.resume) {
              this.resume = data.detail.resume;
            }
          });
      }
    });
  }

  render() {
    return html`
    <div class="phone">
      <div class="content">
        <div class="sidebar-header">
            <div class="image" style="background-image:url('${this.avatar}')"></div>
            <div class="banner" style="background-image:url('${this.banner}')"></div>
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
    </div>
    `;
  }
}

customElements.define("user-info", UserInfo);
