const validValue = (model,field, self) => {
    let value = model[field].length > 1
    self[field].isValid = value ? undefined : false
    return value
}

const validAll = (model, fields, self) => {
    let valids = []
    fields.forEach(field => {
        valids.push(validValue(model, field, self))
    });

    return valids.some(valid => valid)
}

export default class validatorBasico{
    constructor(){

        this.nome= {
            isValid: undefined,
            message: "Campo obrigatório",
            Valid: (model) => validValue(model, 'nome', this),
          }
    }
    valid(model){
        return validAll(model, ['nome'], this)
    }
}

