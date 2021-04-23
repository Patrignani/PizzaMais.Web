import { PAGE } from '../../utils/constants'

export default {
    state: {
       state: 1, // 1 = new, 2 = Edit, 3 = details
       namePath: ""
    },
    mutations: {
        [PAGE.STATE]: (state, value) => state.state = value,
        [PAGE.NAMEPATH]: (state, path) => state.namePath = path,
    },
    getters: {
        [PAGE.STATE]: state => state.state,
        [PAGE.NAMEPATH]: state => state.namePath
    },
}