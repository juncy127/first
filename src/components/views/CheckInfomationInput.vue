<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">抽查信息管理</h5>
    <div class="iridium-page-content">
      <Row type="flex" justify="start" :gutter="15" class="row-margin">
        <Col>
          抽查日期：
          <DatePicker type="date"
            :placeholder="date"
            @on-change="pickerDate"
            >
          </DatePicker>
        </Col>
        <Col>
          <Select placeholder="所属项目" v-model="query.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </Col>
        <Col>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="search">查询</button>
        </Col>
      </Row>
      <Row type="flex" justify="start">
        <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="showModal = true"><i class="glyphicon glyphicon-plus"></i> 添加</button>
      </Row>
      <table class="iridium-table iridium-table--striped iridium-table--hover">
        <thead>
          <tr class="iridium-table-row">
            <th class="iridium-table-title">序号</th>
            <th class="iridium-table-title">移动标签</th>
            <th class="iridium-table-title">抽查日期</th>
            <th class="iridium-table-title">抽查时间</th>
            <th class="iridium-table-title">抽查等级</th>
            <th class="iridium-table-title">抽查状态</th>
            <th class="iridium-table-title">抽查位置</th>
            <th class="iridium-table-title">抽查图片</th>
            <th class="iridium-table-title">备注</th>
            <th class="iridium-table-title">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="(item,index) in list"
             :key="index"
             class="iridium-table-row">
            <td class="iridium-table-item">{{ item.serialNumber }}</td>
            <td class="iridium-table-item">{{ item.movingLabel }}</td>
            <td class="iridium-table-item">{{ item.checkDate }}</td>
            <td class="iridium-table-item">{{ item.checkTime }}</td>
            <td class="iridium-table-item">{{ item.checkLevel }}</td>
            <td class="iridium-table-item">{{ item.checkStatus }}</td>
            <td class="iridium-table-item">{{ item.checkArea }}</td>
            <td class="iridium-table-item">
              <button class="iridium-btnlink-default" @click="handleShowImg(index)">查看</button>
            </td>
            <td class="iridium-table-item">{{ item.remark }}</td>
            <td class="iridium-table-item">
              <button class="iridium-btnlink-link" @click="deleteMessage(index)">
                删除
              </button>
              <span class="iridium-btnlink-link-border">|</span>
              <button class="iridium-btnlink-link">
                修改
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="pagination" class="pagination"></div>
    </div>
    <Modal
        v-model="showModal"
        title="抽查信息管理">
        <Row type="flex" justify="start" :gutter="15" class="row-margin">
          <Col span="5">所属项目：</Col>
          <Col span="19">
            <Select placeholder="请选择" v-model="formList.projectId">
              <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" justify="start" :gutter="15" class="row-margin">
          <Col span="5">移动标签：</Col>
          <Col span="19">
            <Select placeholder="请选择" v-model="formList.labelId">
              <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" justify="start" :gutter="15" class="row-margin">
          <Col span="5">抽查日期：</Col>
          <Col span="19">
            <DatePicker type="date"
              :placeholder="date"
              @on-change="pickerDate"
              >
            </DatePicker>
          </Col>
        </Row>
        <Row type="flex" justify="start" :gutter="15" class="row-margin">
          <Col span="5">抽查时间：</Col>
          <Col span="19">
            <TimePicker type="time"
              :placeholder="time"
              @on-change="pickerTime"
              >
            </TimePicker>
          </Col>
        </Row>
        <Row type="flex" justify="start" :gutter="15" class="row-margin">
          <Col span="5">抽查状态：</Col>
          <Col span="19">
            <Select placeholder="请选择" v-model="formList.checkStatus">
              <Option value="已完成">已完成</Option>
              <Option value="未审批">未审批</Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" justify="start" :gutter="15" class="row-margin">
          <Col span="5">抽查等级：</Col>
          <Col span="19">
            <Select placeholder="请选择" v-model="formList.checkLevel">
              <Option value="1级">1级</Option>
              <Option value="2级">2级</Option>
              <Option value="3级">3级</Option>
              <Option value="4级">4级</Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" justify="start" :gutter="15" class="row-margin">
          <Col span="5">抽查位置：</Col>
          <Col span="9">
            <Select placeholder="请选择区域" v-model="formList.checkArea">
              <Option value="1级">1级</Option>
            </Select>
          </Col>
          <Col span="9" offset="1">
            <Select placeholder="请选择地点" v-model="formList.CheckAddress">
              <Option value="1级">1级</Option>
            </Select>
          </Col>
        </Row>
        <Row type="flex" justify="start" :gutter="15" class="row-margin">
          <Col span="5">抽查图片上传：</Col>
          <Col span="15">
            <Upload action="//jsonplaceholder.typicode.com/posts/" :before-upload="handleUpload">
              <div class="flex">
                <button class="iridium-file-text">选择文件</button>
                <input class="iridium-upload-input" v-model="fileName"/>
              </div>
            </Upload>
          </Col>
          <Col span="4">
            <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="upload">上传</button>
          </Col>
        </Row>
        <Row type="flex" justify="start" :gutter="15" class="row-margin">
          <Col span="5">备注：</Col>
          <Col span="19">
            <textarea class="iridium-textarea" v-model="formList.remark" rows="3"></textarea>
          </Col>
        </Row>
    </Modal>
    <Modal
      v-model="showImg"
      title="查看图片"
      cancel-text=""
      :closable="false"
    >
    <div v-if="isImg">
      <img src="" alt=""></img>
    </div>
    <div v-else>
      暂无图片
    </div>
    </Modal>
    <Modal
      v-model="showWarning"
      title="警告"
      class="modal-warning"
    >
      确定要删除抽查信息吗？
    </Modal>
  </section>
</template>

<script>
import { DatePicker, Select, Option, TimePicker, Upload } from 'iview'
import day from 'dayjs'
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
  name: 'CheckInfomationInput',
  components: {
    DatePicker,
    Select,
    Option,
    TimePicker,
    Upload
  },
  data () {
    return {
      date: day().format('YYYY-MM-DD'),
      time: day().format('HH:mm:ss'),
      projects: [],
      showModal: false,
      showImg: false,
      isImg: false,
      showWarning: false,
      file: null,
      loadingStatus: false,
      fileName: '',
      list: [
        {
          'serialNumber': '1',
          'movingLabel': '04',
          'checkDate': '2018-06-25',
          'checkTime': '16:22:20',
          'checkLevel': '1',
          'checkStatus': '1',
          'checkArea': '外环1#,2#,3#，北门，垃圾房，8#，9#，物业商业街',
          'checkImage': '',
          'remark': '验收通过'
        }
      ],
      query: {
        projectCode: '',
        workTime: day().format('YYYY-MM-DD')
      },
      formList: {
        projectId: '',
        labelId: '',
        checkTime: '',
        checkDate: '',
        checkStatus: '',
        checkLevel: '',
        checkArea: '',
        checkAddress: '',
        remark: ''
      },
      defaultUrl: this.$api.getAttendanceAndCoverage
    }
  },
  created () {
    // 加载项目选项卡数据
    this.$axios.get(this.$api.getProjects)
      .then(res => {
        if (res.data.code === 0) {
          this.projects = res.data.data
        } else {
          this.$message.error({content: res.data.msg})
        }
      })
  },
  mounted () {
    initPagination(this, this.defaultUrl)
  },
  methods: {
    search () {
      // 获取开始时间
      let url = this.defaultUrl
      // 处理查询字符串
      if (this.query.projectCode || this.query.startTime || this.query.endTime) {
        url += '?'
        Object.entries(this.query).forEach((item, index, arr) => {
          if (index === arr.length - 1) {
            url += item.join('=')
          } else {
            url += item.join('=') + '&'
          }
        })
      }
      initPagination(this, url)
    },
    pickerDate (value) {
      this.query.startTime = value
    },
    pickerTime (value) {
      this.formList.checkTime = value
    },
    handleShowImg (i) {
      this.showImg = true
    },
    deleteMessage (i) {
      this.showWarning = true
    },
    handleUpload (file) {
      this.file = file
      this.fileName = this.file.name
      return false
    },
    upload () {
      this.loadingStatus = true
      setTimeout(() => {
        this.file = null
        this.loadingStatus = false
        this.$message.success('Success')
      }, 1500)
    }
  }
}
</script>

<style scoped>
</style>
