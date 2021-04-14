import { MENU } from '../../utils/constants'

export default {
    state: {
        menuList:[]
    },
    mutations: {
        [MENU.CADASTRO]: (state) => cadastro(state),
        //[MENU.PEDIDO]: (state) => configuracao(state),
        [MENU.CONFIGURACAO]: (state) => configuracao(state),
    },
    getters: {
        [MENU.MENU]:state => state.menuList
    },
}

const cadastro = (state)=>{
    state.menuList =[
        { nome:"Pizza"},
        { nome:"ingredientes"},
        { nome:"Unidade de Medida"},
    ]
}

const configuracao = (state)=>{
    state.menuList =[
        { nome:"Perfil"},
    ]
}