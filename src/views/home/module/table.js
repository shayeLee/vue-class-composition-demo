import { Reactive } from 'vue-class-composition'
import axios from 'axios';

export default class Table extends Reactive {
  tableData = [];
  page = 1;
  pageSize = 10;

  constructor(deps) {
    super();
    this.$deps = deps;
  
    this.$computed('doublePage', function() {
      return this.page * 2;
    });

    this.$watch('page', function(newVal, oldVal) {
      console.log(this.doublePage);
    });
  }

  getTableData() {
    return axios.get('http://10.0.0.191/mock/25/getList', {
      params: {
        page: this.page,
        pageSize: this.pageSize,
        ...this.$deps.searchForm.form
      }
    })
      .then(({ data: { data } }) => {
        this.tableData = data;
      })
  }

  handleCurrentChange(page) {
    this.page = page;
    this.getTableData();
  }
}