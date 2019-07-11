import {LitElement} from "lit-element/lit-element";
import firebase from 'firebase/app';
import 'firebase/firestore';
import {EventConstant} from "../../Constants/event.constant";
import {collectionConstant} from "../../Constants/collection.constant";

class TweetStore extends LitElement {
    constructor() {
        super();
        this.collection = '';
        this.data = [];
    }

    static get properties() {
        return {
            collection: String,
            data: Array
        }
    }

    firstUpdated(_changedProperties) {
        firebase.initializeApp(document.config);
        firebase.firestore().collection(this.collection).onSnapshot(ref => {
            ref.docChanges().forEach(change => {
                const {newIndex, oldIndex, doc, type} = change;
                if (type === 'added') {
                    this.data = [...this.data, {id: doc.id, data: doc.data()}];
                    this.dataUpdated();
                } else if (type === 'removed') {
                    this.data = this.data.filter(item => {
                        return item.id !== doc.id
                    });
                    this.dataUpdated();
                } else if (type === 'modified') {
                    this.data = this.data.map(item => {
                        if (item.id === doc.id) {
                            return {id: doc.id, data: doc.data()}
                        } else {
                            return item;
                        }
                    });
                    this.dataUpdated();
                }
            });
        });

        document.addEventListener(EventConstant.NEW_TWEET, e => this.push(e));
        document.addEventListener(EventConstant.DElETE_TWEET, e => this.delete(e));
        document.addEventListener(EventConstant.LIKE, e => this.like(e));
    }

    push({detail}) {
        const user = localStorage.getItem('user');
        if (!user) {
            throw new Error('User\'s not logged')
        }
        const userInfos = JSON.parse(user);
        firebase.firestore().collection(this.collection).add({
            content: detail,
            date: new Date().getTime(),
            user: {
                name: userInfos.name
            },
            like: 0
        }).then(resp => {
            console.log(resp);
        });
    }

    delete({detail}) {
        firebase.firestore().collection(this.collection).doc(detail).delete()
    }

    dataUpdated() {
        this.dispatchEvent(new CustomEvent('child-changed', {detail: this.data}));
    }

    like({detail}) {
        let like = detail.like;
        //on check si on retrouve le like dans la liste des likes de l'user
        const json_user = localStorage.getItem('user');
        const user = JSON.parse(json_user);
        const exist = user.likes.filter(item => {
            return item === detail.id
        });
        if (exist.length === 0) {
            like++;
            user.likes.push(detail.id);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            like--;
            user.likes = user.likes.filter(item => {
                return item !== detail.id
            });
            localStorage.setItem('user', JSON.stringify(user));
        }
        firebase.firestore().collection(collectionConstant.USER_INFOS_COLLECTION).doc(user.id).update(user);
        firebase.firestore().collection(this.collection).doc(detail.id).update({
            like: like
        });
    }
}

customElements.define('tweet-store', TweetStore);