import { Reactive } from 'vue-class-composition'

export default class Updater extends Reactive {
  _updatePromise = Promise.resolve();

  updaterDialog = {
    visible: false,
    loading: false
  }

  updateForm = {};

  constructor(deps) {
    super();
    this.$deps = deps;
  }

  getItem() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.updateForm = {
          name: '麒麟',
          time: '2020-05-13',
          desc: '这是一段描述文字，你们不要看了，没啥意思'
        }
        resolve();
      }, 600)
    })
  }

  openUpdateDialog() {
    if (this.updaterDialog.loading) return;

    this.updaterDialog.loading = true;
    this.getItem().finally(() => this.updaterDialog.loading = false);
    this.updaterDialog.visible = true;
  }

  closeUpdateDialog(updateFormIns) {
    updateFormIns.resetFields();
    this.updaterDialog.visible = false;
  }

  updateBeforeClose(done) {
    this._updatePromise.finally(() => done());
  }

  update(updateFormIns) {
    if (this.updaterDialog.loading) return;

    this.updaterDialog.loading = true;
    updateFormIns.validate().then(() => {
      console.log('表单验证成功 =>', { ...this.updateForm });
      // 用定时器模拟异步请求
      this._updatePromise = new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      return this._updatePromise;
    }).then(() => {
      updateFormIns.resetFields();
      this.closeUpdateDialog(updateFormIns);
      this.$deps.table.getTableData();
    }).finally(() => this.updaterDialog.loading = false)
  }
}