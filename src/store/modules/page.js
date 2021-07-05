import { PAGE } from '../../utils/constants'

export default {
    state: {
        state: 1, // 1 = new, 2 = Edit, 3 = details
        namePath: "",
        pageLoadName: "",
        BeforeSave: "",
        BeforeEdit: "",
        BeforeCancel: "",
        BeforeBack: "",
        BeforeNew: ""
    },
    mutations: {
        [PAGE.STATE]: (state, value) => state.state = value,
        [PAGE.NAMEPATH]: (state, path) => state.namePath = path,
        [PAGE.PAGELOAD]: (state, page) => state.pageLoadName = page,
        [PAGE.BEFORESAVE]: (state, uid) => state.BeforeSave = uid,
        [PAGE.BEFORECANCEL]: (state, uid) => state.BeforeCancel = uid,
        [PAGE.BEFOREEDIT]: (state, uid) => state.BeforeEdit = uid,
        [PAGE.BEFOREBACK]: (state, uid) => state.BeforeBack = uid,
        [PAGE.BEFORENEW]: (state, uid) => state.BeforeNew = uid,
    },
    getters: {
        [PAGE.STATE]: state => state.state,
        [PAGE.NAMEPATH]: state => state.namePath,
        [PAGE.PAGELOAD]: state => state.pageLoadName,
        [PAGE.BEFORESAVE]: state => state.BeforeSave,
        [PAGE.BEFORECANCEL]: state => state.BeforeCancel,
        [PAGE.BEFOREEDIT]: state => state.BeforeEdit,
        [PAGE.BEFOREBACK]: state => state.BeforeBack,
        [PAGE.BEFORENEW]: state => state.BeforeNew,
    },
}