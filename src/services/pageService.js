import { PAGE } from '../utils/constants'

export default class Page {
    constructor(vueComponent, server) {
        this.vueComponent = vueComponent
        this.server = require(`/${server}`)
        this.configButtons = obterConfigButtons(this)
    }
    async init() {
        let id = this.vueComponent.$route.params.id
        let state = this.vueComponent.$route.params.state
        this.vueComponent.$store.commit(PAGE.NAMEPATH, this.vueComponent.name)

        if (id != 'new') {
            this.vueComponent.model.id = parseInt(id);
            switch (state) {
                case 'edit':
                    this.vueComponent.$store.commit(PAGE.STATE, 2)
                    break;
                case 'details':
                    this.vueComponent.$store.commit(PAGE.STATE, 3)
                    break;
                default:
                    this.vueComponent.$store.commit(PAGE.STATE, 2)
                    break;
            }

            let loader = obterLoader(this)
            let value = await this.server.obter(this.vueComponent.model.id)
            loader.hide()
            this.vueComponent.model = value.data
        }
        else {
            this.vueComponent.$store.commit(PAGE.STATE, 1)
            this.vueComponent.newModel()
        }
    }
}

const obterLoader = (self) => {
    return self.vueComponent.$loading.show({
        loader: 'Bars',
        height: 128,
        width: 128,
        color: '#0062cc'
    });
}

const routerRedirect = (self, state) => {
    let router = ""
    if (state == 'new') {
        router = `/${self.vueComponent.name}/${state}`
    }
    else {
        router = `/${self.vueComponent.name}/${self.vueComponent.model.id}/${state}`
    }

    self.vueComponent.$router.replace(
        { path: router },
    );
    self.init()
}

const insert = (self) => {
    if (self.vueComponent.validate.valid(self.vueComponent.model)) {
        let loader = obterLoader(self)

        const actionError = (error) => {
            console.log(error)
            loader.hide()
            self.vueComponent.$toast.error(`Ocorreu um erro. Entre em contato com o administrador do sistema! ${error}`)
        }

        const actionSuccess = (res) => {
            if (res.status == 200) {
                self.vueComponent.model = res.data;
                loader.hide()
                self.vueComponent.$toast.success('Salvo!')
                routerRedirect(self, "details")
            }
            else {
                loader.hide()
                self.vueComponent.$toast.error('Ocorreu um erro. Entre em contato com o administrador do sistema!')
            }
        };

        if (self.vueComponent.$store.getters[PAGE.STATE] == 1) {
            self.server.inserir(self.vueComponent.model).then(actionSuccess).catch(actionError);
        } else if (self.vueComponent.$store.getters[PAGE.STATE] == 2) {
            self.server.update(self.vueComponent.model, self.vueComponent.model.id)
                .then(actionSuccess).catch(actionError);
        }
    }
}

const obterConfigButtons = (self) => {
    return {
        save: () => {
            insert(self);
        },
        newState: () => {
            routerRedirect(self, 'new')
        },
        back: () => {
            self.vueComponent.$router.replace(
                { path: `/${self.vueComponent.name}` },
            );
        },
        edit: () => {
            routerRedirect(self, 'edit')
        },
        cancel: () => {
            if (self.vueComponent.$store.getters[PAGE.STATE] == 1) {
                self.vueComponent.$router.replace(
                    { path: `/${self.vueComponent.name}` },
                );
            }
            else {
                routerRedirect(self, 'details')
            }

        }
    }
}

