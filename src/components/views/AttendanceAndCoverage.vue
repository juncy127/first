<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">员工出勤率与覆盖率统计</h5>
    <div class="iridium-page-content">
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          时间：
          <DatePicker type="date"
            :placeholder="date"
            @on-change="pickerDate"
            >
          </DatePicker>
        </Col>
        <Col>
          移动标签名称：
          <Select placeholder="标签名" v-model="query.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </Col>
        <Col>
          项目名称：
          <Select placeholder="所属项目" v-model="query.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </Col>
        <Col>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="search">查询</button>
        </Col>
      </Row>
      <table class="iridium-table iridium-table--striped iridium-table--hover">
        <thead>
          <tr class="iridium-table-row">
            <th class="iridium-table-title">序号</th>
            <th class="iridium-table-title">移动标签ID</th>
            <th class="iridium-table-title">移动标签名称</th>
            <th class="iridium-table-title">出勤率</th>
            <th class="iridium-table-title">覆盖率</th>
            <th class="iridium-table-title">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="(item, itemIndex) in list"
             :key="itemIndex"
             class="iridium-table-row">
            <td class="iridium-table-item">{{ item.serialNumber }}</td>
            <td class="iridium-table-item">{{ item.movingLabelId }}</td>
            <td class="iridium-table-item">{{ item.movingLabelName }}</td>
            <td class="iridium-table-item">{{ item.attendanceRate }}</td>
            <td class="iridium-table-item">{{ item.coverageRate }}</td>
            <td class="iridium-table-item">
              <a class="iridium-table-icon"><i class="fa fa-area-chart"></i></a>
              <a class="iridium-table-icon"><i class="fa fa-line-chart"></i></a>
              <a class="iridium-table-icon icon-item"><i class="fa fa-play-circle-o"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="pagination" class="pagination"></div>
    </div>
  </section>
</template>

<script>
import { DatePicker, Select, Option } from 'iview'
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
  name: 'AttendanceAndCoverage',
  components: {
    DatePicker,
    Select,
    Option
  },
  data () {
    return {
      date: day().format('YYYY-MM-DD'),
      projects: [],
      list: [],
      query: {
        projectCode: '',
        workTime: day().format('YYYY-MM-DD'),
        movingLabel: ''
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
    }
  }
}
</script>

<style scoped>
.ivu-select {
  width:auto;
}
.iridium-table-icon {
  width: 30px;
  height: 30px;
  padding: 6px 0;
  border-radius: 15px;
  text-align: center;
  font-size: 12px;
  line-height: 1.428571429;
  background-color: #23c6c8;
  border-color: #23c6c8;
  color: #FFF;
  box-sizing: border-box;
  vertical-align: middle;
}
.fa-play-circle-o {
  font-size: 20px;
  line-height: 30px;
}
.icon-item {
  padding: 0;
}
</style>
