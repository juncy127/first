<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">出勤率规则设置</h5>
    <div class="iridium-page-content">
      <common-loading :show="loading"/>
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="openEditModal('create')">添加</button>
        </Col>
      </Row>
      <table class="iridium-table iridium-table--striped iridium-table--hover iridium-table--left">
        <thead>
          <tr class="iridium-table-row">
            <th class="iridium-table-title align-center">序号</th>
            <th class="iridium-table-title">规则名称</th>
            <th class="iridium-table-title">考勤时间段1</th>
            <th class="iridium-table-title">考勤时间段2</th>
            <th class="iridium-table-title">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="(item, index) in list"
             :key="item.id"
             class="iridium-table-row">
            <td class="iridium-table-item align-center">{{ index + 1 }}</td>
            <td class="iridium-table-item">{{ item.attendanceRuleName }}</td>
            <td class="iridium-table-item">{{ item.attendanceStartTime }}</td>
            <td class="iridium-table-item">{{ item.attendanceEndTime }}</td>
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
      title="出勤率规则设置"
    >
      <Form ref="formValidate" :model="detail" :rules="ruleValidate" :label-width="140" class="align-left">
        <FormItem label="出勤率规则类型：" prop="attendanceRuleType">
          <Select placeholder="请选择出勤率规则类型" v-model="detail.attendanceRuleType">
            <Option
              v-for="item in ruleTypes"
              :value="item.name"
              :key="item.value"
            >
              {{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="出勤率规则名称：" prop="attendanceRuleName">
          <Input placeholder="请填写出勤率规则名称" v-model="detail.attendanceRuleName"></Input>
        </FormItem>
        <FormItem label="请选择出勤时间段：" prop="attendancePeriod">
          <TimePicker
            type="timerange"
            format="HH:mm"
            placeholder="请选择出勤时间段"
            v-model="detail.attendancePeriod"
            @on-change="changeAttendancePeriod">
          </TimePicker>
        </FormItem>
        <FormItem label="休息时间：" prop="restPeriod">
          <Input placeholder="请填写休息时间，单位为分钟" v-model="detail.restPeriod"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="editAction">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="showDeleteModal"
      title="出勤率规则设置"
      cancelText="关闭"
      @on-ok="deleteRule"
    >
      <p>确定要删除出勤率规则吗？</p>
    </Modal>
  </section>
</template>

<script>
import { Row, Col, Select, TimePicker, Button, Form, FormItem, Input, Option, Modal } from 'iview'
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
  name: 'AttendanceRuleSetting',
  components: {
    Row,
    Col,
    Input,
    TimePicker,
    Modal,
    Form,
    Button,
    FormItem,
    Select,
    Option,
    CommonLoading
  },
  data () {
    return {
      showEditModal: false,
      showDeleteModal: false,
      defaultUrl: this.$api.getAttendanceRuleList,
      list: [],
      detail: {},
      timeRange: [],
      ruleTypes: this.$utils.ATTENDANCE_RULE_TYPES,
      ruleValidate: {
        attendanceRuleType: [
          { required: true, message: '请选择出勤率规则类型', trigger: 'change' }
        ],
        attendanceRuleName: [
          { required: true, message: '请填写出勤率规则名称', trigger: 'blur' }
        ],
        attendancePeriod: [
          { required: true, type: 'array', message: '请选择考勤时段', trigger: 'change' }
        ],
        restPeriod: [
          { required: true, message: '请填写休息时间', trigger: ' blur' },
          { type: 'number', message: '请输入数字', trigger: ' blur' }
        ]
      },
      loading: false
    }
  },
  created () {
  },
  mounted () {
    this.search()
  },
  methods: {
    search () {
      initPagination(this, this.defaultUrl)
    },
    changeAttendancePeriod (value) {
      this.detail.attendanceStartTime = value[0]
      this.detail.attendanceEndTime = value[1]
    },
    getAttendanceTimePeriod () {
      return `${this.detail.attendanceStartTime} - ${this.detail.attendanceEndTime}`
    },
    openEditModal (type, item) {
      this.showEditModal = true
      this.detail = item || {}
      this.detail.attendancePeriod = ''
      this.editActionType = type
    },
    editAction () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this[`${this.editActionType}Rule`]()
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
    createRule () {
      this.$axios.post(this.$api.createAttendanceRule, this.detail)
        .then(res => {
          if (res.data.code === 0) {
            this.showEditModal = false
            this.$message.success('创建出勤率规则成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    updateRule () {
      this.$axios.patch(this.$api.updateAttendanceRule(this.detail), this.detail)
        .then(res => {
          if (res.data.code === 0) {
            this.showEditModal = false
            this.$message.success('更新出勤率规则成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    deleteRule () {
      this.$axios.delete(this.$api.deleteAttendanceRule(this.detail))
        .then(res => {
          if (res.data.code === 0) {
            this.showDeleteModal = false
            this.$message.success('删除出勤率规则成功！')
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
