import { PAGE } from '../../utils/constants'

export default {
    state: {
       state: 1, // 1 = new, 2 = Edit, 3 = details
       namePath: "",
       pageLoadName: ""
    },
    mutations: {
        [PAGE.STATE]: (state, value) => state.state = value,
        [PAGE.NAMEPATH]: (state, path) => state.namePath = path,
        [PAGE.PAGELOAD]:(state, page) => state.pageLoadName = page,
    },
    getters: {
        [PAGE.STATE]: state => state.state,
        [PAGE.NAMEPATH]: state => state.namePath,
        [PAGE.PAGELOAD]:state => state.pageLoadName
    },
}