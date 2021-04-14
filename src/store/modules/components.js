import { APP } from '../../utils/constants'
import img from "../../assets/user-default.jpg"

let isVisibleAction = (state, field, value) => {
    {
        if (value === undefined) {
            state[field] = !state[field]
        }
        else {
            state[field] = value
        }
    }
}

export default {
    state: {
        isMenuVisible: true,
        isSubMenu: false,
        user: {
            nome: "Anderson",
            email: "anderson.patrignani@gmail.com",
            img: img
        },
        img: undefined
    },
    mutations: {
        [APP.TOGGLEMENU]: (state, isVisible) => isVisibleAction(state, 'isMenuVisible', isVisible),
        [APP.TOGGLESUBMENU]: (state, isVisible) => isVisibleAction(state, 'isSubMenu', isVisible),
        [APP.USER]: (state, payload) => state.user = payload
    },
    getters: {
        [APP.TOGGLEMENU]: state => state.isMenuVisible,
        [APP.USER]: state => state.user,
        [APP.TOGGLESUBMENU]: state => state.isSubMenu,
    },
}