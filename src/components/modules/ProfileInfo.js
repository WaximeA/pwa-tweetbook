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
      this.profileUser.resume = userInfo.data().resume;

      firebase.storage().ref("avatar").child(userInfo.data().avatar).getDownloadURL().then((url) => {
        this.avatar = url;
        this.profileUser.avatar = url;
      });
      firebase.storage().ref("banniere").child(userInfo.data().banner).getDownloadURL().then((url) => {
        this.banner = url;
        this.profileUser.banner = url;
      });
    });
    // console.log(this.connectedUser.follows);
    // console.log(this.follows);
  }



  // updateFollow(json, isForProfile = false) {
  //   let user = this.connectedUser;
  //
  //   if (isForProfile) {
  //     console.log();
  //     user = this.profileUser;
  //   }
  //
  //   let followData = {
  //     id: user.id,
  //     name: user.name,
  //     surname: user.surname,
  //     nickname: user.nickname,
  //     followersLenght: user.followers.length,
  //     followsLenght: user.follows.length
  //   };
  //   let index = json.findIndex((json) => {
  //     return json.id = this.profileUser.id
  //   });
  //
  //   if (index === -1){
  //     json.push(followData);
  //   } else {
  //     console.log("object already exists");
  //   }
  //
  //   firebase
  //   .firestore()
  //   .collection(collectionConstant.USER_INFOS_COLLECTION)
  //   .doc(this.connectedUser.id)
  //   .update(this.connectedUser);
  //
  //   // firebase
  //   // .firestore()
  //   // .collection(collectionConstant.USER_INFOS_COLLECTION)
  //   // .doc(this.profileUser.id)
  //   // .update(this.profileUser);
  // }

  manageFollow() {
    console.log('in manage follow');
    // si je follow quelqu'un => if current follow profile
    // il s'ajoute à mes follow => profile go current follows
    // et je suis ajouté à ses followers => current go profile followers
    //
    // si j'unfollow quelqu'un => if current unfollow profile
    // Il est retiré de mes follow => profile go out current follows
    // et je suis retiré de ses followers => current go out profile followers


    // personnes que JE follow
    // let connectedUserFollows = this.connectedUser.follows;

    console.log('this.connectedUser.follows;');
    console.log(this.connectedUser.follows);

    // personnes qui ME followent INUTILES
    let connectedUserFollowers = this.connectedUser.followers;

    // personnes que l'utilisateur profile follow
    let profileUserFollows = this.profileUser.follows;

    // personnes qui followent l'utilisatuer profil
    let profileUserFollowers = this.profileUser.followers;


    // let profileFollowersData = {
    //   id: this.connectedUser.id,
    //   name: this.connectedUser.name,
    //   surname: this.connectedUser.surname,
    //   nickname: this.connectedUser.nickname,
    //   followersLenght: this.connectedUser.followers.length,
    //   followsLenght: this.connectedUser.follows.length
    // };

    // let test = JSON.parse(JSON.stringify(connectedFollowsData));

    // console.log('JSON.stringify(connectedFollowsData)');
    // console.log(JSON.stringify(connectedFollowsData));
    // console.log('JSON.parse(JSON.stringify(connectedFollowsData))');
    // console.log(JSON.parse(JSON.stringify(connectedFollowsData)));
    // console.log('JSON.parse(connectedFollowsData.id)');
    // console.log(JSON.parse(connectedFollowsData.id));


    // let index = connectedUserFollows.findIndex((json) => {
    //   console.log('json.id');
    //   console.log(json.id);
    //
    //   console.log('this.profileUser.id');
    //   console.log(this.profileUser.id);
    //
    //   return json.id == this.profileUser.id
    // });
    // // here you can check specific property for an object whether it exist in your array or not
    //
    // console.log('index');
    // console.log(index);
    // if (index === -1){
    //   connectedUserFollows.push(connectedFollowsData);
    // }
    // else console.log("object already exists");


    let index = this.connectedUser.follows.findIndex(json => json.id === this.profileUser.id);
    if (index === -1) {
      this.connectedUser.follows.push({
        id: this.profileUser.id,
        name: this.profileUser.name,
        surname: this.profileUser.surname,
        nickname: this.profileUser.nickname,
        followersLenght: this.profileUser.followers.length,
        followsLenght: this.profileUser.follows.length
      });

    } else {
      console.log("You already follow this user")
    }

    firebase
    .firestore()
    .collection(collectionConstant.USER_INFOS_COLLECTION)
    .doc(this.connectedUser.id)
    .update(this.connectedUser);

    // firebase
    // .firestore()
    // .collection(collectionConstant.USER_INFOS_COLLECTION)
    // .doc(this.profileUser.id)
    // .update(this.profileUser);
    //
    // console.log('personnes que JE follow');
    // console.log(connectedUserFollows);
    //
    // console.log('personnes qui ME followent INUTILES');
    // console.log(connectedUserFollowers);
    //
    // console.log(' personnes que l\'utilisateur profile follow');
    // console.log(profileUserFollows);
    //
    // console.log('personnes qui followent l\'utilisatuer profil');
    // console.log(profileUserFollowers);

    // array.indexOf(newItem) === -1 ? array.push(newItem) : console.log("This item already exists");
    // this.connectedUser
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