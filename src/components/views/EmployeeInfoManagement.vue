<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">员工信息管理</h5>
    <div class="iridium-page-content">
      <common-loading :show="loading"/>
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          员工姓名：
          <input class="iridium-form-input" v-model="query.employeeName"/>
        </Col>
        <Col>
          员工工号：
          <input class="iridium-form-input" v-model="query.employeeCode"/>
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
            <th class="iridium-table-title">员工姓名</th>
            <th class="iridium-table-title">生日</th>
            <th class="iridium-table-title">性别</th>
            <th class="iridium-table-title">员工工号</th>
            <th class="iridium-table-title">员工家庭地址</th>
            <th class="iridium-table-title">员工电话</th>
            <th class="iridium-table-title">身份证</th>
            <th class="iridium-table-title">指纹</th>
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
            <td class="iridium-table-item">{{ item.birthday }}</td>
            <td class="iridium-table-item">{{ item.gender }}</td>
            <td class="iridium-table-item">{{ item.employeeCode }}</td>
            <td class="iridium-table-item">{{ item.address }}</td>
            <td class="iridium-table-item">{{ item.telphone }}</td>
            <td class="iridium-table-item">
              <button @click="openUploadModal(item)"
                class="iridium-btn
                  iridium-btn--warning
                  iridium-btn--smallest
                  iridium-btn--radius"
              >
                <i class="fa fa-upload"></i>
              </button>
            </td>
            <td class="iridium-table-item">
              <button @click="openScanModal(item)"
                class="iridium-btn
                  iridium-btn--warning
                  iridium-btn--smallest
                  iridium-btn--radius"
              >
                <i class="fa fa-upload"></i>
              </button>
            </td>
            <td class="iridium-table-item">
              <button @click="openDeleteModal(item)"
                class="iridium-btn
                  iridium-btn--danger
                  iridium-btn--smallest
                  iridium-btn--radius"
              >
                <i class="glyphicon glyphicon-file"></i>
              </button>
              <button @click="showDetail(item)"
                class="iridium-btn
                  iridium-btn--info
                  iridium-btn--smallest
                  iridium-btn--radius"
              >
                <i class="glyphicon glyphicon-file"></i>
              </button>
              <button @click="openEditModal('update', item)"
                class="iridium-btn
                  iridium-btn--info
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
      v-model="showUploadModal"
      title="上传身份证文件"
      cancelText="关闭"
      @on-ok="updateIdCard"
    >
      <Upload :action="$api.uploadIdCard" @on-success="diaplayUploadedFile">
        <Button type="ghost" icon="ios-cloud-upload-outline">上传</Button>
        <div v-show="uploadedFile"><img :src="uploadedFile"/></div>
      </Upload>
    </Modal>
    <Modal
      v-model="showScanModal"
      title="上传指纹文件"
      cancelText="关闭"
    >
      <div v-show="scanedFingerprint"><img :src="scanedFingerprint"/></div>
      <div slot="footer">
        <Button type="text" size="large" @click="showScanModal = false">取消</Button>
        <Button type="warning" size="large" @click="scanFingerprint">扫描</Button>
        <Button type="primary" size="large" @click="updateFingerprint">确定</Button>
      </div>
    </Modal>
    <Modal
      class="hide-cancel-btn"
      v-model="showDetailModal"
      title="员工信息查看"
      width="600"
      okText="关闭"
    >
      <form class="iridium-form">
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工头像：</Col>
            <Col span="18"><img :src="detail.avatar"/></Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工姓名：</Col>
            <Col span="18">{{ detail.employeeName }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工生日：</Col>
            <Col span="18">{{ detail.birthday }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工性别：</Col>
            <Col span="18">{{ detail.gender }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">身份证号：</Col>
            <Col span="18">{{ detail.idCard }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工编号：</Col>
            <Col span="18">{{ detail.employeeCode }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工籍贯：</Col>
            <Col span="18">{{ detail.birthplace }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工地址：</Col>
            <Col span="18">{{ detail.address }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工电话：</Col>
            <Col span="18">{{ detail.telphone }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工职位：</Col>
            <Col span="18">{{ detail.position }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工描述：</Col>
            <Col span="18">{{ detail.description }}</Col>
          </Row>
        </div>
        <div class="iridium-form-item">
          <Row type="flex">
            <Col span="6">员工身份证信息：</Col>
            <Col span="18">{{ detail.idCardImage }}</Col>
          </Row>
        </div>
      </form>
    </Modal>
    <Modal
      v-model="showEditModal"
      title="员工信息管理"
    >
      <Form ref="formValidate" :model="detail" :rules="ruleValidate" :label-width="140" class="align-left">
        <FormItem label="员工头像：">
          <div><img :src="detail.avatar"/></div>
        </FormItem>
        <FormItem label="所属项目：" prop="projectId">
          <Select placeholder="请选择项目" v-model="detail.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="员工姓名：" prop="employeeName">
          <Input v-model="detail.employeeName"></Input>
        </FormItem>
        <FormItem label="员工性别：" prop="gender">
          <Select placeholder="请选择性别" v-model="detail.gender">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </FormItem>
        <FormItem label="身份证号：" prop="idCard">
          <Input v-model="detail.idCard"></Input>
        </FormItem>
        <FormItem label="员工民族：" prop="ethnicity">
          <Input v-model="detail.ethnicity"></Input>
        </FormItem>
        <FormItem label="员工编号：" prop="employeeCode">
          <Input v-model="detail.employeeCode"></Input>
        </FormItem>
        <FormItem label="员工籍贯：" prop="birthplace">
          <Input v-model="detail.birthplace"></Input>
        </FormItem>
        <FormItem label="员工地址：" prop="address">
          <Input v-model="detail.address"></Input>
        </FormItem>
        <FormItem label="员工电话：" prop="telphone">
          <Input v-model="detail.telphone"></Input>
        </FormItem>
        <FormItem label="员工职位：" prop="position">
          <Input v-model="detail.position"></Input>
        </FormItem>
        <FormItem label="员工描述：" prop="description">
          <Input type="textarea" v-model="detail.description"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="showEditModal = false">取消</Button>
        <Button type="warning" size="large" @click="scanFingerprint">扫描</Button>
        <Button type="primary" size="large" @click="editAction">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="showDeleteModal"
      title="员工信息管理"
      cancelText="关闭"
      @on-ok="deleteEmployee"
    >
      <p>确定要删除员工信息吗？</p>
    </Modal>
  </section>
</template>

<script>
import { Row, Col, Upload, Button, Input, Form, FormItem, Cascader, Select, Option, Modal } from 'iview'
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
  name: 'EmployeeManagement',
  components: {
    Row,
    Col,
    Upload,
    Input,
    Button,
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
      showUploadModal: false,
      showScanModal: false,
      showDetailModal: false,
      showEditModal: false,
      showDeleteModal: false,
      cascaderData: [],
      defaultUrl: this.$api.getEmployeeList,
      list: [],
      projects: [],
      query: {},
      uploadedFile: '',
      scanedFingerprint: '',
      detail: {},
      ruleValidate: {
        projectId: [
          { required: true, type: 'string', message: '请选择所属项目', trigger: 'change' }
        ],
        employeeName: [
          { required: true, type: 'string', message: '请填写姓名', trigger: 'blur' }
        ],
        gender: [
          { required: true, type: 'string', message: '请选择性别', trigger: 'change' }
        ],
        idCard: [
          { required: true, type: 'string', message: '请填写身份证', trigger: 'blur' },
          { type: 'number', message: '请输入合法的身份号', trigger: ' blur' }
        ],
        ethnicity: [
          { required: true, type: 'string', message: '请填写民族', trigger: 'blur' }
        ],
        employeeCode: [
          { required: true, type: 'string', message: '请填写员工编号', trigger: 'blur' }
        ],
        birthplace: [
          { required: true, type: 'string', message: '请填写籍贯', trigger: 'blur' }
        ],
        address: [
          { required: true, type: 'string', message: '请填写地址', trigger: 'blur' }
        ],
        telphone: [
          { required: true, type: 'string', message: '请填写电话', trigger: 'blur' }
        ],
        position: [
          { required: true, type: 'string', message: '请填写职位', trigger: 'blur' }
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
      if (this.query.projectId || this.query.employeeCode || this.query.employeeName
      ) {
        url = this.$utils.spliceSearchQuery(this.defaultUrl, this.query)
      } else {
        this.$message.warning('请选择项目！')
        return
      }
      initPagination(this, url)
    },
    showDetail (item) {
      this.showDetailModal = true
      this.$axios.get(this.$api.getEmployeeDetail(item))
        .then(res => {
          this.detail = res.data
          console.log(this.detail)
          if (res.data.code === 0) {
            this.showDetailModal = true
            this.detail = res.data.data
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
          this[`${this.editActionType}Employee`]()
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
    createEmployee () {
      this.$axios.post(this.$api.createEmployee, this.detail)
        .then(res => {
          if (res.data.code === 0) {
            this.showEditModal = false
            this.$message.success('创建员工信息成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    updateEmployee () {
      this.$axios.post(this.$api.updateEmployee(this.detail), this.detail)
        .then(res => {
          if (res.data.code === 0) {
            this.showEditModal = false
            this.$message.success('更新员工信息成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    deleteEmployee () {
      this.$axios.delete(this.$api.deleteEmployee(this.detail))
        .then(res => {
          if (res.data.code === 0) {
            this.showDeleteModal = false
            this.$message.success('删除员工信息成功！')
            this.search()
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    openUploadModal (item) {
      this.showUploadModal = true
      this.idCardData.employeeId = item.employeeId
    },
    diaplayUploadedFile (res, file) {
      this.uploadedFile = file
      this.idCardData.idCardImage = file
    },
    updateIdCard () {
      this.$axios.post(this.$api.updateIdCard, this.idCardData)
        .then(res => {
          if (res.data.code === 0) {
            this.showUploadModal = false
            this.$message.success('保存身份证成功！')
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    openScanModal (item) {
      this.showScanModal = true
      this.fingerprintData = item.employeeId
    },
    scanFingerprint () {
      this.$spin.show({
        render: (h) => {
          return h('div', [
            {
              'class': 'iridium-loading'
            },
            h('Icon', {
              'class': 'iridium-loading-icon',
              props: {
                type: 'load-d',
                size: 30
              }
            }),
            h('div', '扫描中，请等待.....')
          ])
        }
      })
      this.$axios.post(this.$api.scanFingerprint)
        .then(res => {
          this.$spin.hide()
          if (res.data.success) {
            this.scanedFingerprint = res.data.data.fingerprint
            this.fingerprintData.fingerprint = this.scanedFingerprint
          } else {
            this.$message.error('请检查设备是否连接成功。')
          }
        }).catch(() => {
          this.$message.error('服务器内部错误')
        })
    },
    updateFingerprint () {
      if (!this.scanedFingerprint) {
        this.$message.warning('请扫描指纹。')
        return
      }
      this.$axios.post(this.$api.updateFingerprint, this.fingerprintData)
        .then(res => {
          if (res.data.code === 0) {
            this.showScanModal = false
            this.$message.success('保存指纹成功！')
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
