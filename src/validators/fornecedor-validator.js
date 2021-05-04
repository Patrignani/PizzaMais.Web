import validatorBasico from "./basico";

export default class fornecedorValidator extends validatorBasico {
    constructor() {
        super()

        this.documento = {
            isValid: undefined,
            message: "Campo obrigatório",
            validModel: (model) => {
                let value = (model.tipoDocumento == 1 && model.documento.length == 18) || (model.tipoDocumento == 2 && model.documento.length == 14)
                this.documento.isValid = value ? undefined : false
                return value
            }
        }
    }
    valid(model) {
        return this.validAll(model)
    }
    validAll(model) {
        let valids = []
        valids.push(this.nome.validModel(model.nome))
        valids.push(this.documento.validModel(model))
        return !valids.some(valid => !valid)
    }
}