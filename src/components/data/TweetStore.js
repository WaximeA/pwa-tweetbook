import {LitElement} from "lit-element/lit-element";
import firebase from 'firebase/app';
import 'firebase/firestore';

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
                }
            });
        });

        document.addEventListener('new-tweet', e => this.push(e));
        document.addEventListener('delete-tweet', e => this.delete(e));
    }

    push({detail}) {
        firebase.firestore().collection(this.collection).add({
            content: detail,
            date: new Date().getTime(),
            user: {
                name: "Tanguy"
            }
        })
    }

    delete({detail}) {
        firebase.firestore().collection(this.collection).doc(detail).delete()
    }

    dataUpdated() {
        this.dispatchEvent(new CustomEvent('child-changed', {detail: this.data}));
    }
}

customElements.define('tweet-store', TweetStore);