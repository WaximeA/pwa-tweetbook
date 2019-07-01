import {LitElement, html, css} from 'lit-element/lit-element';

export default class UserInfo extends LitElement {

  constructor() {
    super();
    this.name = '';
    this.surname = '';
    this.nickname = '';
    this.follows = [];
    this.followers = [];
    this.resume= "Hi, I'm an Eclatax Dev !";
  }

  static get properties() {
    return {
      name: String,
      surname: String,
      nickname: String,
      follows: Array,
      followers: Array,
      resume: String
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
      background: url('https://cdn.pixabay.com/photo/2015/10/29/14/39/web-1012468_960_720.jpg');
      background-size: contain;
      border-radius: 50%;
      border: 3px solid white;
      height: 71px;
      left: 9px;
      position: absolute;
      top: 89px;
      width: 71px;
      transform-origin: 50% 100%;
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
    .lives {
      left: 12px;
      position: absolute;
      top: 312px;
    }
    .problems {
      left: 90px;
      position: absolute;
      top: 312px;
    }
    .count {
      font-size: 15px;
      font-weight: bold;
      margin-right: 6px;
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
    });
  }

  render() {
    return html`
    <div class="phone">
      <div class="content">
        <div class="drop image"></div>
        <div class="avatar"></div>
        <div class="name">${this.name} ${this.surname}</div>
        <div class="tag">@${this.nickname}</div>
        <div class="text">${this.resume}</div>
        <div class="lives">
          <span class="count">${this.followers.length}</span><span class="what">followers</span>
        </div>
        <div class="problems">
          <span class="count">${this.follows.length}</span><span class="what">follows</span>
        </div>
        <div class="divider"></div>
        </div>
      </div>
    </div>
  
    `
  }
}

customElements.define('user-info', UserInfo);