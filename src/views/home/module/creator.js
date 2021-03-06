import { Reactive } from 'vue-class-composition'

export default class Creator extends Reactive {
  _createPromise = Promise.resolve();

  createDialog = {
    visible: false,
    loading: false
  }

  createForm = {
    name: '',
    time: '',
    desc: ''
  }

  rules = {
    name: [
      { required: true, message: '请输入员工姓名', trigger: 'blur' }
    ],
    time: [
      { required: true, message: '请选择入职时间', trigger: 'change' }
    ],
    desc: [
      { required: true, message: '请输入描述', trigger: 'blur' }
    ]
  }

  constructor(deps) {
    super();
    this.$deps = deps;
  }

  openCreateDialog() {
    this.createDialog.visible = true;
  }

  closeCreateDialog(createFormIns) {
    createFormIns.resetFields();
    this.createDialog.visible = false;
  }

  createBeforeClose(done) {
    this._createPromise.finally(() => done());
  }

  create(createFormIns) {
    if (this.createDialog.loading) return;

    this.createDialog.loading = true;
    createFormIns.validate().then(() => {
      console.log('表单验证成功 =>', { ...this.createForm });
      // 用定时器模拟异步请求
      this._createPromise = new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      return this._createPromise;
    }).then(() => {
      createFormIns.resetFields();
      this.closeCreateDialog(createFormIns);
      this.$deps.table.getTableData();
    }).finally(() => this.createDialog.loading = false)
  }
}