import { Reactive } from 'vue-class-composition'

export default class SearchForm extends Reactive {
  form = {
    name: '',
    time: ''
  }

  searchByName(getTableData) {
    getTableData()
  }
  searchByTime(getTableData) {
    getTableData()
  }
}