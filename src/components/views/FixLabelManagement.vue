<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">固定标签信息管理</h5>
    <div class="iridium-page-content">
      <common-loading :show="loading"/>
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          标签名称：
          <input class="iridium-form-input" v-model="query.fixLabelName"/>
        </Col>
        <Col>
          地址码：
          <input class="iridium-form-input" v-model="query.addressCode"/>
        </Col>
        <Col span="6">
          <Cascader class="align-left" :placeholder="'所属项目'" :data="cascaderData" :filterable="true" @on-change="changeSelectedProject"></Cascader>
        </Col>
        <Col>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="search">查询</button>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="openEditModal('create')">添加</button>
        </Col>
      </Row>
      <table class="iridium-table iridium-table--striped iridium-table--hover iridium-table--left">
        <thead>
          <tr class="iridium-table-row">
            <th class="iridium-table-title align-center">序号</th>
            <th class="iridium-table-title">固定标签名称</th>
            <th class="iridium-table-title">固定标签地址</th>
            <th class="iridium-table-title">固定标签父级</th>
            <th class="iridium-table-title">固定标签编码</th>
            <th class="iridium-table-title">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="(item, index) in list"
             :key="item.id"
             class="iridium-table-row">
            <td class="iridium-table-item align-center">{{ index + 1 }}</td>
            <td class="iridium-table-item">{{ item.fixLabelName }}</td>
            <td class="iridium-table-item">{{ item.addressCode }}</td>
            <td class="iridium-table-item">{{ item.addressName }}</td>
            <td class="iridium-table-item">{{ item.fixLabelCode }}</td>
            <td class="iridium-table-item">
              <button @click="openDeleteModal(item)"
                class="iridium-btn
                  iridium-btn--danger
                  iridium-btn--smallest
                  iridium-btn--radius"
              >
                <i class="glyphicon glyphicon-remove"></i>
              </button>
              <button @click="openEditModal('update', item)"
                class="iridium-btn
                  iridium-btn--warning
                  iridium-btn--smallest
                  iridium-btn--radius"
              >
                <i class="glyphicon glyphicon-file"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="pagination" class="pagination"></div>
    </div>
    <Modal
      v-model="showEditModal"
      title="固定标签信息管理"
    >
      <Form ref="formValidate" :model="detail" :rules="ruleValidate" :label-width="120" class="align-left">
        <FormItem label="所属项目：" prop="projectId">
          <Select placeholder="请选择项目" v-model="detail.projectId" @on-change="changeAreaList">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="固定标签名称：" prop="fixLabelName">
          <Input v-model="detail.fixLabelName"></Input>
        </FormItem>
        <FormItem label="固定标签父级：" prop="addressName">
          <Select placeholder="请选择区域" v-model="detail.addressName">
            <Option v-for="item in areas" :value="item.areaName" :key="item.areaCode">{{ item.areaName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="固定标签地址：" prop="addressCode">
          <Input v-model="detail.addressCode"></Input>
        </FormItem>
        <FormItem label="固定标签编码：" prop="fixLabelCode">
          <Input v-model="detail.fixLabelCode"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="editAction">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="showDeleteModal"
      title="固定标签信息管理"
      cancelText="关闭"
      @on-ok="deleteLabel"
    >
      <p>确定要删除固定标签信息吗？</p>
    </Modal>
  </section>
</template>

<script>
import { Row, Col, Cascader, Button, Input, Form, FormItem, Select, Option, Modal } from 'iview'
import CommonLoading from '@/components/universal/CommonLoading'
import 'paginationjs'
const initPagination = (context, dataSource) => {
  $('#pagination').pagination({
    dataSource: dataSource,
    locator: 'data.records',
    totalNumberLocator: (res) => {
      return res.data.totalCount
    },
    pageRange: 6,
    firstText: '首页',
    lastText: '末页',
    prevText: '上一页',
    nextText: '下一页',
    alias: {
      pageNumber: 'pageNum',
      pageSize: 'numPerPage'
    },
    callback: (data, pagination) => {
      context.list = data
    }
  })
}
export default {
  name: 'FixLabelManagement',
  components: {
    Row,
    Col,
    Button,
    Input,
    Form,
    FormItem,
    Cascader,
    Modal,
    Select,
    Option,
    CommonLoading
  },
  data () {
    return {
      showEditModal: false,
      showDeleteModal: false,
      defaultUrl: this.$api.getFixLabelList,
      cascaderData: [],
      list: [],
      projects: [],
      areas: [],
      query: {},
      detail: {},
      ruleValidate: {
        projectId: [
          { required: true, message: '请选择所属项目', trigger: 'change' }
        ],
        fixLabelName: [
          { required: true, message: '请填写固定标签名称', trigger: 'blur' }
        ],
        addressName: [
          { required: true, message: '请选择固定标签父级', trigger: 'change' }
        ],
        addressCode: [
          { required: true, message: '请填写固定标签地址', trigger: 'blur' }
        ],
        fixLabelCode: [
          { required: true, message: '请填写固定标签编码', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created () {
    // 加载项目选项卡数据
    this.$axios.get(this.$api.getProjects)
      .then(res => {
        if (res.data.code === 0) {
          this.projects = res.data.data
          this.cascaderData = this.$utils.convertCascaderProjects(this.$utils.organizations, this.$utils.companies, this.projects)
        } else {
          this.$message.error(res.data.msg)
        }
      })
  },
  methods: {
    changeSelectedProject (value) {
      this.query.projectId = value[value.length - 1]
    },
    search () {
      let url = ''
      // 处理查询字符串
      if (this.query.projectId || this.query.fixLabelName || this.query.addressCode
      ) {
        url = this.$utils.spliceSearchQuery(this.defaultUrl, this.query)
      } else {
        this.$message.warning('请选择项目！')
        return
      }
      initPagination(this, url)
    },
    changeAreaList (value) {
      value && this.$axios.get(this.$api.getProjectLabelArea(value))
        .then(res => {
          if (res.data.code === 0) {
            this.areas = res.data.data
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    openEditModal (type, item) {
      this.showEditModal = true
      this.detail = item || {}
      this.editActionType = type
    },
    editAction () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this[`${this.editActionType}Label`]()
          this.$refs['formValidate'].resetFields()
        }
      })
    },
    openDeleteModal (item) {
      this.showDeleteModal = true
      this.detail = item
    },
    cancel () {
      this.showEditModal = false
      this.$refs['formValidate'].resetFields()
    },
    createLabel () {
      this.$axios.post(this.$api.createFixLabel, this.detail)
        .then(res => {
          if (res.data.code === 0) {
            this.showEditModal = false
            this.$message.success('创建固定标签信息成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    updateLabel () {
      this.$axios.patch(this.$api.updateFixLabel(this.detail), this.detail)
        .then(res => {
          if (res.data.code === 0) {
            this.showEditModal = false
            this.$message.success('更新固定标签信息成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    deleteLabel () {
      this.$axios.delete(this.$api.deleteFixLabel(this.detail))
        .then(res => {
          if (res.data.code === 0) {
            this.showDeleteModal = false
            this.$message.success('删除固定标签信息成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    }
  }
}
</script>

<style scoped>
</style>
