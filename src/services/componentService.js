import { APP } from '../utils/constants'

export const cadastro = (state) => {
    let menuList = [
        { nome: "Pizza", descricao: "Cadastro de Pizza", router: "/test" },
        { nome: "Borda", descricao: "Cadastro de Borda", router: "/borda" },
        { nome: "Ingredientes", descricao: "Cadastro de Ingredientes", router: "/ingrediente" },
        { nome: "Unidade de Medida", descricao: "Cadastro de Unidade de Medida", router: "/unidade-de-medida" }
    ]

    actionMenu(state, APP.CADASTRO, menuList)
}

export const configuracao = (state) => {
    let menuList = [
        { nome: "Perfil", descricao: "Configuração do Perfil", router: "/test" },
    ]

    actionMenu(state, APP.CONFIGURACAO, menuList)
}

export const notSubMenu = (state) => {
    state.subMenuSelected = undefined
    state.menuList = []
    state.isSubMenu = false
}

export const isVisibleAction = (state, field, value) => {
    {
        if (value === undefined) {
            state[field] = !state[field]
        }
        else {
            state[field] = value
        }
    }
}

const actionMenu = (state, newSubMenu, menuList) => {

    if (checkVisibleSubMenu(state, newSubMenu)) {
        state.subMenuSelected = newSubMenu
        state.menuList = menuList
    }
    else {
        state.subMenuSelected = undefined
        state.menuList = []
    }
}

const checkVisibleSubMenu = (state, newSubmenu) => {

    let visible = false
    if (state.isMenuVisible) {

        if ((state.subMenuSelected == newSubmenu) || state.subMenuSelected == undefined)
            visible = !state.isSubMenu
        else {
            visible = state.isSubMenu
        }
    }

    state.isSubMenu = visible

    return visible
}