import {LitElement, html, css} from 'lit-element/lit-element';

export default class FormEdit extends LitElement {

    constructor() {
        super();
        this.resume = "";
        this.avatar = {};
        this.banner = {};
        this.active = false;
    }

    static get properties() {
        return {
            resume: String,
            avatar: File,
            banner: File,
            active: Boolean
        }
    }

    static get styles() {
        return css`
            * {  box-sizing: border-box }

            .inactive{
                display: none;
            }
            footer {
                position: fixed;
                bottom: 0;
                width: 100%;
            }
            footer form {
                display: flex;
                justify-content: space-between;
                background-color: #ffffff;
                padding: 0.5rem 1rem;
                width: 100%;
            }

            footer form input {
                width: 100%;
            }

            button{
                text-decoration: none;
                background-color: #55acee;
                color: #fff;
                padding: 8px 20px;
                border-radius: 5px;
                transition: .2s;
                &:hover
                  background-color: darken(#55acee, 10%);
                  cursor: pointer;
            }

            textarea{
                width: 310px;
                height: 100px;
                position:absolute;
                resize: none;
                border-radius: 8px;
            }

            #banner{
                position: absolute;
                bottom: 45px;
            }

            #avatar{
                position: absolute;
                bottom: 115px;
            }

            .avatar-label{
                position: absolute;
                bottom: 135px;
            }

            .banner-label{
                position: absolute;
                bottom: 65px;
            }

        `
    }

    handleForm(e) {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent('edit-info', {
            detail: {
                resume:this.resume,
                avatar:this.avatar,
                banner:this.banner 
            }
        }));
        this.active = false;
    }

    handleClick(e) {
        this.active = !this.active;
    }

    
    handleAvatarUploadChange(e) {
        this.avatar = e.target.files[0];
    }

    
    handleBannerUploadChange(e) {
        this.banner = e.target.files[0];
    }

    render() {
        return html` 
                <button @click="${this.handleClick}" class="${this.active ? "inactive" : ""}">Edit</button>
                <form @submit="${this.handleForm}" class="${!this.active ? "inactive" : ""}">
                    <button type="submit">Send</button>
                    <p>Resume :</p>
                    <textarea name="" id="resume" @input="${e => this.resume = e.target.value}" .value="${this.resume}"></textarea>
                    <p class="avatar-label">Avatar :</p>
                    <input type="file" id="avatar" accept="image/*" @change="${this.handleAvatarUploadChange}">
                    <p class="banner-label">Banner :</p>
                    <input type="file" id="banner" accept="image/*" @change="${this.handleBannerUploadChange}">
                </form>`
    }
}

customElements.define('form-edit', FormEdit);