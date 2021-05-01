
export default class validatorBasico {
    constructor() {

        this.nome = {
            isValid: undefined,
            message: "",
            validModel: (field) => {
                let value = field.length > 1
                this.nome.isValid = value ? undefined : false
                this.nome.message = "Campo obrigatório."
                return value
            }
        }
    }
    valid(model) {
        return this.validAll(model, ['nome'])
    }
    validValue(model, field, self) {
        let value = model[field].length > 1
        self[field].isValid = value ? undefined : false
        return value
    }
    validAll(model, fields) {
        let valids = []
        fields.forEach(field => {
            valids.push(this[field].validModel(model[field]))
        });
        return !valids.some(valid => !valid)
    }
}

