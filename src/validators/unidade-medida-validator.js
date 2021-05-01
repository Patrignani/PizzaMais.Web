import validatorBasico from "./basico";

export default class unidadeMedidaValidator extends validatorBasico {
    constructor() {
        super()

        this.sigla = {
            isValid: undefined,
            message: "Campo obrigatório",
            validModel: (field) => {
                console.log("efdrg")
                let value = field.length > 1

                if (value) {
                    value = field.length < 4
                    this.sigla.message = "É permitido apenas 3 caracteres."
                }
                else {
                    this.sigla.message = "Campo obrigatório."
                }

                this.sigla.isValid = value ? undefined : false

                return value
            }
        }
    }
    valid(model) {
        return this.validAll(model, ['nome', 'sigla'], this)
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