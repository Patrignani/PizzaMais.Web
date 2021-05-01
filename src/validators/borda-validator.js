import validatorBasico from "./basico";

export default class bordaValidator extends validatorBasico {
    constructor() {
        super()

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
        return this.validAll(model, ['nome', 'preco'], this)
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