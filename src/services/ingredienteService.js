import axios from 'axios'

export const inserir = (model) => {
    return axios.post(`${process.env.VUE_APP_URL_PIZZA}/api/Ingrediente`, model)
}

export const update = (model, id) => {
    return axios.put(`${process.env.VUE_APP_URL_PIZZA}/api/Ingrediente/${id}`, model)
}

export const obter = (id) => {
    return axios.get(`${process.env.VUE_APP_URL_PIZZA}/api/Ingrediente/${id}`)
}

export const obterTodos = (filtros) => {
    return axios.get(`${process.env.VUE_APP_URL_PIZZA}/api/Ingrediente`, {
        params: filtros
    })
}

export const deletar = (id) => {
    return axios.delete(`${process.env.VUE_APP_URL_PIZZA}/api/Ingrediente/${id}`)
}