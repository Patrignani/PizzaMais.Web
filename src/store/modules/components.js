import { APP } from '../../utils/constants'
import img from "../../assets/user-default.jpg"
import * as  componentService from '../../services/componentService'

export default {
    state: {
        menuList:[],
        subMenuSelected: undefined,
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
        [APP.TOGGLEMENU]: (state, isVisible) => componentService.isVisibleAction(state, 'isMenuVisible', isVisible),
        [APP.TOGGLESUBMENU]: (state, isVisible) => componentService.isVisibleAction(state, 'isSubMenu', isVisible),
        [APP.USER]: (state, payload) => state.user = payload,
        [APP.CADASTRO]: (state) => componentService.cadastro(state),
        [APP.PEDIDO]: (state) => componentService.notSubMenu(state),
        [APP.CONFIGURACAO]: (state) => componentService.configuracao(state),
        [APP.NOTSUBMENU]:(state) => componentService.notSubMenu(state),
    },
    getters: {
        [APP.TOGGLEMENU]: state => state.isMenuVisible,
        [APP.USER]: state => state.user,
        [APP.TOGGLESUBMENU]: state => state.isSubMenu,
        [APP.MENU]:state => state.menuList
    },
}