import axios from 'axios'
import qs from 'qs'

export const inserir = (model) => {
    return axios.post(`${process.env.VUE_APP_URL_PIZZA}/api/borda`, model)
}

export const update = (model, id) => {
    return axios.put(`${process.env.VUE_APP_URL_PIZZA}/api/borda/${id}`, model)
}

export const obter = (id) => {
    return axios.get(`${process.env.VUE_APP_URL_PIZZA}/api/borda/${id}`)
}

export const obterTodos = (filtros) => {
    return axios.get(`${process.env.VUE_APP_URL_PIZZA}/api/borda`, {
        params: filtros,
        paramsSerializer: params => {
            return qs.stringify(params)
        }
    })
}

export const deletar = (id) => {
    return axios.delete(`${process.env.VUE_APP_URL_PIZZA}/api/borda/${id}`)
}