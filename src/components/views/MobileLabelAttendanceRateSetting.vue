<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">员工移动标签设置</h5>
    <div class="iridium-page-content">
      <common-loading :show="loading"/>
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          员工姓名：
          <input class="iridium-form-input" v-model="query.employeeName"/>
        </Col>
        <Col>
          标签名称：
          <input class="iridium-form-input" v-model="query.mobileLabelName"/>
        </Col>
        <Col>
          <Select placeholder="所属项目" v-model="query.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
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
            <th class="iridium-table-title">员工姓名</th>
            <th class="iridium-table-title">员工工号</th>
            <th class="iridium-table-title">标签名称</th>
            <th class="iridium-table-title">移动标签名称</th>
            <th class="iridium-table-title">移动标签代码</th>
            <th class="iridium-table-title">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="(item, index) in list"
             :key="item.id"
             class="iridium-table-row">
            <td class="iridium-table-item align-center">{{ index + 1 }}</td>
            <td class="iridium-table-item">{{ item.employeeName }}</td>
            <td class="iridium-table-item">{{ item.employeeCode }}</td>
            <td class="iridium-table-item">{{ item.mobileLabelName }}</td>
            <td class="iridium-table-item">{{ item.mobileLabelCode }}</td>
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
      title="员工移动标签设置"
      cancelText="关闭"
      @on-ok="editAction"
    >
      <form class="iridium-form">
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">所属项目：</Col>
            <Col span="18">
              <Select placeholder="请选择项目" v-model="detail.projectId" @on-change="changeLabelList">
                <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工</Col>
            <Col span="18">
              <Select placeholder="请选择员工" v-model="detail.employeeId">
                <Option v-for="item in employees" :value="item.employeeId" :key="item.employeeId">{{ item.employeeName }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">移动标签</Col>
            <Col span="18">
              <Select placeholder="请选择移动标签" v-model="detail.mobileLabelId">
                <Option v-for="item in labels" :value="item.mobileLabelId" :key="item.mobileLabelId">{{ item.mobileLabelName }}</Option>
              </Select>
            </Col>
          </Row>
        </div>
      </form>
    </Modal>
    <Modal
      v-model="showDeleteModal"
      title="员工移动标签设置"
      cancelText="关闭"
      @on-ok="deleteLabel"
    >
      <p>确定要删除员工移动标签吗？</p>
    </Modal>
  </section>
</template>

<script>
import { Row, Col, Select, Option, Modal } from 'iview'
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
  name: 'MobileLabelManagement',
  components: {
    Row,
    Col,
    Modal,
    Select,
    Option,
    CommonLoading
  },
  data () {
    return {
      showEditModal: false,
      showDeleteModal: false,
      defaultUrl: this.$api.getEmployeeMobileLabelList,
      projects: [],
      labels: [],
      employees: [],
      list: [],
      query: {},
      detail: {},
      loading: false
    }
  },
  created () {
    // 加载项目选项卡数据
    this.$axios.get(this.$api.getProjects)
      .then(res => {
        if (res.data.code === 0) {
          this.projects = res.data.data
        } else {
          this.$message.error(res.data.msg)
        }
      })
  },
  methods: {
    search () {
      let url = ''
      // 处理查询字符串
      if (this.query.projectId || this.query.employeeName || this.query.mobileLabelName
      ) {
        url = this.$utils.spliceSearchQuery(this.defaultUrl, this.query)
      } else {
        this.$message.warning('请选择项目！')
        return
      }
      initPagination(this, url)
    },
    changeLabelList (value) {
      if (value) {
        this.$axios.get(this.$api.getProjectMobileLabelList(value))
          .then(res => {
            if (res.data.code === 0) {
              this.labels = res.data.data
            } else {
              this.$message.error(res.data.msg)
            }
          })
        this.$axios.get(this.$api.getProjectEmployeeList(value))
          .then(res => {
            if (res.data.code === 0) {
              this.employees = res.data.data
            } else {
              this.$message.error(res.data.msg)
            }
          })
      }
    },
    openEditModal (type, item) {
      this.showEditModal = true
      this.detail = item || {}
      this.editActionType = type
    },
    editAction () {
      this[`${this.editActionType}EmployeeLabel`]()
    },
    openDeleteModal (item) {
      this.showDeleteModal = true
      this.detail = item
    },
    createEmployeeLabel () {
      this.$axios.post(this.$api.createEmployeeMobileLabel, this.detail)
        .then(res => {
          if (res.data.code === 0) {
            this.showEditModal = false
            this.$message.success('创建员工移动标签成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    updateEmployeeLabel () {
      this.$axios.patch(this.$api.updateEmployeeMobileLabel(this.detail), this.detail)
        .then(res => {
          if (res.data.code === 0) {
            this.showEditModal = false
            this.$message.success('更新员工移动标签成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    deleteEmployeeLabel () {
      this.$axios.delete(this.$api.deleteEmployeeMobileLabel(this.detail))
        .then(res => {
          if (res.data.code === 0) {
            this.showDeleteModal = false
            this.$message.success('删除员工移动标签成功！')
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
