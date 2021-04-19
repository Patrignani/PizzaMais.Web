
const formTemplate = `<div class="body">
<b-card>
  <b-form>
    $$rows$$
    <ButtonsForm :configButtons="configButtons" />
  </b-form>
</b-card>
</div> `

const rowTemplate = `  <b-row class="body-col" id="$$rowId$$">
    $$column$$
</b-row> `

const columnTemplate = `  <b-col :sm="$$col$$" id="$$colId$$">
    $$component$$
</b-col> `

const createComponent = (propsColumn) => {
  let component = " ";
  switch (propsColumn.componentType) {
    case "input":
      component += `<Input
        labelGroupName="${propsColumn.component.labelGroupName}"
        inputId="${propsColumn.component.inputId}"
        :value="column.component.value"
        v-on:input="column.component.value = $event"
        $$disabled$$

        $$validate$$

      />`

      component = component.replace("$$disabled$$", propsColumn.component.disabled != undefined ? propsColumn.component.disabled : false)

      if (propsColumn.component.validate) {
        component = component.replace("$$validate$$", ` :validate="{
          using: column.component.validate.using,
          state: column.component.validate.state,
          message: column.component.validate.message,
        }" `)
      }
      else {
        component = component.replace("$$validate$$", "")
      }

      break;
  }

  return component
}

export const createForm = (rowsParam) => {
  let rows = " "
  rowsParam.forEach(rowParam => {
    let row = rowTemplate.replace('$$rowId$$', row.id)
    let columns = " "
    rowParam.columns.forEach(columnParam => {
      let column = columnTemplate.replace("$$col$$", columnParam.col)
        .replace("$$colId$$", columnParam.id)

        column = column.replace("$$component$$", createComponent(columnParam))

      columns += column
    })

    row = row.replace("$$column$$", columns)
    rows += row
  });

  formTemplate.replace("$$rows$$",rows)
}