import {LitElement} from "lit-element/lit-element";
import firebase from "firebase/app";
import "firebase/firestore";
import {EventConstant} from "../../Constants/event.constant";
import {collectionConstant} from "../../Constants/collection.constant";

class TweetStore extends LitElement {
    constructor() {
        super();
        this.collection = "";
        this.data = [];
    }

    static get properties() {
        return {
            collection: String,
            data: Array
        };
    }

    firstUpdated(_changedProperties) {
        firebase.initializeApp(document.config);
        firebase
            .firestore()
            .collection(this.collection)
            .onSnapshot(ref => {
                ref.docChanges().forEach(change => {
                    const {doc, type} = change;
                    if (type === "added") {
                        this.data = [...this.data, {id: doc.id, data: doc.data()}];
                        this.dataUpdated();
                    } else if (type === "removed") {
                        this.data = this.data.filter(item => {
                            return item.id !== doc.id;
                        });
                        this.dataUpdated();
                    } else if (type === "modified") {
                        this.data = this.data.map(item => {
                            if (item.id === doc.id) {
                                return {id: doc.id, data: doc.data()};
                            } else {
                                return item;
                            }
                        });
                        this.dataUpdated();
                    }
                });
            });
        document.addEventListener(EventConstant.NEW_TWEET, e => this.push(e));
        document.addEventListener(EventConstant.DELETE_TWEET, e => this.delete(e));
        document.addEventListener(EventConstant.LIKE, e => this.like(e));
        document.addEventListener(EventConstant.RESPONSE_TWEET, e => this.response(e));
        document.addEventListener(EventConstant.RT, e => this.retweet(e));
    }

    // -- Gestion du push d'un tweet
    push({detail}) {
        const user = localStorage.getItem("user");
        if (!user) throw new Error("User's not logged");
        const userInfos = JSON.parse(user);
        firebase
            .firestore()
            .collection(this.collection)
            .add({
                content: detail,
                date: new Date().getTime(),
                user: {
                    id: userInfos.id,
                    avatar: userInfos.avatar,
                    banner: userInfos.banner,
                    name: userInfos.name,
                    surname: userInfos.surname,
                    nickname: userInfos.nickname
                },
                responses: [],
                like: 0
            })
            .then(resp => {
                console.log(resp);
            });
    }

    // -- Gestion de la suppression
    delete({detail}) {
        firebase
            .firestore()
            .collection(this.collection)
            .doc(detail)
            .delete();
    }

    // -- Update trigger
    dataUpdated() {
        this.dispatchEvent(new CustomEvent("child-changed", {detail: this.data}));
    }
  
  // -- Gestion des retweets
  retweet({ detail }) {
    const connecteduser = JSON.parse(localStorage.getItem("user"));
    if (!connecteduser) throw new Error("User's not logged");
    firebase
    .firestore()
    .collection(this.collection)
    .add({
      content: detail.tweet.data.content,
      rtuser: {
        id:connecteduser.id,
        nickname:connecteduser.nickname
      },
      date: new Date().getTime(),
      user: {
        id: detail.tweet.data.user.id,
        avatar: detail.tweet.data.user.avatar,
        banner: detail.tweet.data.user.banner,
        name: detail.tweet.data.user.name,
        surname: detail.tweet.data.user.surname,
        nickname: detail.tweet.data.user.nickname
      },
      responses: [],
      like: 0
    })
    .then(resp => {
      console.log(resp);
    }); 
  }

  // -- Gestion des likes
  like({detail}) {
      let like = detail.tweet.data.like;
      //on check si on retrouve le like dans la liste des likes de l'user
      const json_user = localStorage.getItem("user");
      const user = JSON.parse(json_user);
      const exist = user.likes.filter(item => {
          return item === detail.tweet.id;
      });
      if (exist.length === 0) {
          like++;
          user.likes.push(detail.tweet.id);
          localStorage.setItem("user", JSON.stringify(user));
      } else {
          like--;
          user.likes = user.likes.filter(item => {
              return item !== detail.tweet.id;
          });
          localStorage.setItem("user", JSON.stringify(user));
      }
      firebase
          .firestore()
          .collection(collectionConstant.USER_INFOS_COLLECTION)
          .doc(user.id)
          .update(user);
      firebase
          .firestore()
          .collection(this.collection)
          .doc(detail.tweet.id)
          .update({
              like: like
          });
    }

    // -- Response aux tweets
    response({detail}) {
        const {parent, newTweet} = detail;
        const user = localStorage.getItem("user");
        if (!user) throw new Error("User's not logged");

        const userInfos = JSON.parse(user);
        const datas = {
            responses: [
                ...parent.data.responses,
                {
                    content: newTweet,
                    date: new Date().getTime(),
                    user: {
                        id: userInfos.id,
                        avatar: userInfos.avatar,
                        banner: userInfos.banner,
                        name: userInfos.name,
                        surname: userInfos.surname,
                        nickname: userInfos.nickname
                    },
                    responses: [],
                    like: 0
                }
            ]
        };
        firebase
            .firestore()
            .collection(this.collection)
            .doc(parent.id)
            .update(datas)
            .then(() => {
                document.dispatchEvent(new CustomEvent(EventConstant.RESPONSE_TWEET_DONE, {detail: datas}))
            });
    }
}

customElements.define("tweet-store", TweetStore);
