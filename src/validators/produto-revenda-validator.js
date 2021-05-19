import validatorBasico from "./basico";

export default class produtoRevendaValidator extends validatorBasico {
    constructor() {
        super()

        this.codigo = {
            isValid: undefined,
            message: "Campo obrigatório",
            validModel: (field) => {
                let value = field.length > 1
                this.codigo.isValid = value ? undefined : false
                return value
            }
        }

        this.fornecedorId = {
            isValid: undefined,
            message: "Campo obrigatório",
            validModel: (field) => {
                console.log('fornecedor')
                let value = field && field > 0
                this.fornecedorId.isValid = value ? undefined : false
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
    }
    valid(model) {
        return this.validAll(model, ['nome', 'preco', 'codigo', 'fornecedorId'], this)
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