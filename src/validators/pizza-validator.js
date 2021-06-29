import validatorBasico from "./basico";

export default class pizzaValidator extends validatorBasico {
    constructor() {
        super()
        this.codigo = {
            isValid: undefined,
            message: "Campo obrigatório",
            validModel: (field) => {
                let value = field.length >= 1
                this.codigo.isValid = value ? undefined : false
                return value
            }
        }
        this.preco = {
            isValid: undefined,
            message: "Campo obrigatório",
            validModel: (field) => {
                var value = field > 0
                this.preco.isValid = value ? undefined : false
                return value
            }
        }

        this.ingredientes = {
            isValid: undefined,
            message: "Campo obrigatório",
            validModel: (field) => {
                var value = field.filter(x => x.status != 3)
                this.ingredientes.isValid = value.length > 0 ? undefined : false
                return value.length > 0 
            }
        }
    }
    valid(model) {
        return this.validAll(model, ['nome', 'preco', 'codigo', 'ingredientes'], this)
    }
    validAll(model, fields) {
        let self = this
        let valids = []
        fields.forEach(field => {
            valids.push(self[field].validModel(model[field]))
        });
        return !valids.some(valid => !valid)
    }
}