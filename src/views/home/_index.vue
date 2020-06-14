<script>
export default {
  name: "home",
  data() {
    return {
      tableData: [],
      form: {
        name: "",
        time: ""
      },
      page: 1,
      pageSize: 10,
      _createPromise: Promise.resolve(),
      _updatePromise: Promise.resolve(),
      createDialog: {
        visible: false,
        loading: false
      },
      updateDialog: {
        visible: false,
        loading: false
      },
      createForm: {
        name: "",
        time: "",
        desc: ""
      },
      updateForm: {},
      rules: {
        name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
        time: [
          { required: true, message: "请选择入职时间", trigger: "change" }
        ],
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }]
      }
    };
  },
  methods: {
    getTableData() {
      return axios
        .get("http://10.0.0.191/mock/25/getList", {
          params: {
            page: this.page,
            pageSize: this.pageSize,
            ...this.form
          }
        })
        .then(({ data: { data } }) => {
          this.tableData = data;
        });
    },
    searchByName() {
      this.getTableData();
    },
    searchByTime() {
      this.getTableData();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getTableData();
    },
    openCreateDialog() {
      this.createDialog.visible = true;
    },
    openUpdateDialog() {
      if (this.updateDialog.loading) return;

      this.updateDialog.loading = true;
      this.getItem().finally(() => (this.updateDialog.loading = false));
      this.updateDialog.visible = true;
    },
    getItem() {
      return new Promise(resolve => {
        setTimeout(() => {
          this.updateForm = {
            name: "麒麟",
            time: "2020-05-13",
            desc: "这是一段描述文字，你们不要看了，没啥意思"
          };
          resolve();
        }, 600);
      });
    },
    closeCreateDialog(createFormIns) {
      createFormIns.resetFields();
      this.createDialog.visible = false;
    },
    closeUpdateDialog(updateFormIns) {
      updateFormIns.resetFields();
      this.updateDialog.visible = false;
    },
    createBeforeClose(done) {
      this._createPromise.finally(() => done());
    },
    updateBeforeClose(done) {
      this._updatePromise.finally(() => done());
    },
    create(createFormIns) {
      if (this.createDialog.loading) return;

      this.createDialog.loading = true;
      createFormIns
        .validate()
        .then(() => {
          console.log("表单验证成功 =>", { ...this.createForm });
          // 用定时器模拟异步请求
          this._createPromise = new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
          return this._createPromise;
        })
        .then(() => {
          createFormIns.resetFields();
          this.closeCreateDialog(createFormIns);
          this.getTableData();
        })
        .finally(() => (this.createDialog.loading = false));
    },
    update(updateFormIns) {
      if (this.updateDialog.loading) return;

      this.updateDialog.loading = true;
      updateFormIns
        .validate()
        .then(() => {
          console.log("表单验证成功 =>", { ...this.updateForm });
          // 用定时器模拟异步请求
          this._updatePromise = new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, 1000);
          });
          return this._updatePromise;
        })
        .then(() => {
          updateFormIns.resetFields();
          this.closeUpdateDialog(updateFormIns);
          this.getTableData();
        })
        .finally(() => (this.updateDialog.loading = false));
    }
  },
  // 组件数据初始化
  mounted() {
    this.getTableData();
  }
};
</script>