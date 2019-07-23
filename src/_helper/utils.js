import {EventConstant} from "../Constants/event.constant";

export const disableLozad = (Componant, lozadElem) => {
    if (Componant.observer !== null) {
        lozadElem.forEach(item => {
            Componant.observer.observer.unobserve(item);
            item.style = "";
            item.dataset.loaded = "false";
        });
    }
};

export const listenerUser = (component) => {
    document.addEventListener(EventConstant.USER_LOGGED, () => component.user = JSON.parse(localStorage.getItem('user')));
    document.addEventListener(EventConstant.USER_LOGOUT, () => component.user = null);
};