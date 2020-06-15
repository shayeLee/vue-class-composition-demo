import { Reactive } from 'vue-class-composition'

/* export default class SearchForm extends Reactive {
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
} */

var SearchForm = Reactive.from(function() {
  this.form = {
    name: '',
    time: ''
  }

  this.$watch('form', {
    handler: function() {
      console.log(this.form)
    },
    deep: true
  });

  this.searchByName = function(getTableData) {
    getTableData()
  }
  this.searchByTime = function(getTableData) {
    getTableData()
  }
});

export default SearchForm;
