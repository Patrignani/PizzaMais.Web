
const formTemplate = `<div class="body">
<b-card>
  <b-form>
    $$row$$
    <div class="buttons">
      $$buttons$$
    </div>
  </b-form>
</b-card>
</div>`

const buttonTemplate = `    <b-button size="lg" variant="primary">Cancelar</b-button>
<b-button size="lg" variant="primary" @click="save">Salvar</b-button>`

const rowTemplate = `  <b-row class="body-col" id="$$rowId$$">
    $$column$$
</b-row>`

const columnTemplate = `  <b-col :sm="column.col" id="$$colId$$">
    $$component$$
</b-col>`


export const createForm = (rowsParam) => {
    let form = formTemplate
    let rows = " "
    rowsParam.forEach(rowParam => {
        let row = rowTemplate.replace('$$rowId$$', row.id)

        rowParam.columns.forEach(columnParam => {
            // let column = 
        })

        rows += row
    });
}