<template>
  <div class="home">
    <div class="search-form">
      <el-form :inline="true" :model="form">
        <el-form-item label="员工姓名">
          <el-input v-model="form.name" placeholder="请输入员工姓名搜索" @input="searchByName(getTableData)"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker
            v-model="form.time"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择时间搜索"
            @change="searchByTime(getTableData)"
          ></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="time" label="日期" width="180"></el-table-column>
        <el-table-column prop="desc" label="描述" width="auto"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="{ row }">
            <el-button size="small" type="primary" @click="openUpdateDialog">编辑</el-button>
            <el-button size="small" type="success" @click="openCreateDialog">新增</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
        :current-page="page"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
    <el-dialog title="新增" :visible.sync="createDialog.visible" width="30%" :before-close="createBeforeClose">
      <el-form ref="createForm" :model="createForm" :rules="rules" label-width="96px">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="createForm.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="time">
          <el-date-picker
            v-model="createForm.time"
            type="date"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            placeholder="请选择入职时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="createForm.desc" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button :disabled="createDialog.loading" @click="closeCreateDialog($refs.createForm)">取 消</el-button>
        <el-button type="primary" :loading="createDialog.loading" @click="create($refs.createForm)">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑" :visible.sync="updaterDialog.visible" width="30%" :before-close="updateBeforeClose">
      <el-form ref="updateForm" :model="updateForm" :rules="rules" label-width="96px">
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="updateForm.name" placeholder="请输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="time">
          <el-date-picker
            v-model="updateForm.time"
            type="date"
            style="width: 100%;"
            value-format="yyyy-MM-dd"
            placeholder="请选择入职时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="updateForm.desc" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button :disabled="updaterDialog.loading" @click="closeUpdateDialog($refs.updateForm)">取 消</el-button>
        <el-button type="primary" :loading="updaterDialog.loading" @click="update($refs.updateForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from "./model/table";
import SearchForm from "./model/searchForm";
import Creator from "./model/creator";
import Updater from "./model/updater";

export default {
  name: "home",
  setup() {
    const searchForm = new SearchForm();
    const table = new Table({ searchForm });
    const creator = new Creator({ table });
    const updater = new Updater({ table }); console.log(updater)

    return {
      // 表格搜索
      form: searchForm.form,
      searchByName: searchForm.searchByName,
      searchByTime: searchForm.searchByTime,

      // 表格
      tableData: table.tableData,
      page: table.page,
      pageSize: table.pageSize,
      getTableData: table.getTableData,
      handleCurrentChange: table.handleCurrentChange,

      // 新增
      createDialog: creator.dialog,
      createForm: creator.createForm,
      rules: creator.rules,
      openCreateDialog: creator.openCreateDialog,
      closeCreateDialog: creator.closeCreateDialog,
      createBeforeClose: creator.beforeClose,
      create: creator.create,

      // 编辑
      updaterDialog: updater.dialog,
      updateForm: updater.updateForm,
      openUpdateDialog: updater.openUpdateDialog,
      closeUpdateDialog: updater.closeUpdateDialog,
      updateBeforeClose: updater.beforeClose,
      update: updater.update
    };
  },
  // 组件数据初始化
  mounted() {
    this.getTableData();
  }
};
</script>
