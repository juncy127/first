<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">结算日报表</h5>
    <div class="iridium-page-content">
      <Row type="flex" justify="start" :gutter="15" class="row_margin">
        <Col>
          移动标签：
          <Select placeholder="请选择" v-model="query.labelId">
            <Option v-for="item in labels" :value="item.labelId" :key="item.labelId">{{ item.name }}</Option>
          </Select>
        </Col>
        <Col>
          <Select placeholder="请选择" v-model="query.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </Col>
      </Row>
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          工作时段：
          <DatePicker type="date"
            :placeholder="date"
            @on-change="pickerDate"
            >
          </DatePicker>
        </Col>
        <Col>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="search">查询</button>
        </Col>
      </Row>
      <table class="iridium-table iridium-table--striped iridium-table--hover">
        <thead>
          <tr class="iridium-table-row">
                <th rowspan="3" class="iridium-table-title">标签号</th>
                <th rowspan="3" class="iridium-table-title">日期</th>
                <th colspan="3" rowspan="1" class="iridium-table-title">出勤情况</th>
                <th colspan="6" rowspan="1" class="iridium-table-title">覆盖情况</th>
                <th colspan="4" rowspan="1" class="iridium-table-title">抽查清洁结果</th>
                <th colspan="4" rowspan="1" class="iridium-table-title">报警情况</th>
                <th rowspan="3" class="iridium-table-title">应得工时</th>
                <th rowspan="3" class="iridium-table-title">补工时</th>
                <th rowspan="3" class="iridium-table-title">最终得到工时</th>
              </tr>
              <tr class="iridium-table-row">
                <th rowspan="2" class="iridium-table-title">时间（上）</th>
                <th rowspan="2" class="iridium-table-title">时间（下）</th>
                <th rowspan="2" class="iridium-table-title">工时</th>

                <th rowspan="2" class="iridium-table-title">点位数</th>
                <th rowspan="2" class="iridium-table-title">覆盖数（一）</th>
                <th rowspan="2" class="iridium-table-title">覆盖数（二）</th>
                <th rowspan="2" class="iridium-table-title">覆盖率</th>
                <th rowspan="2" class="iridium-table-title">考核剩余工时</th>
                <th rowspan="2" class="iridium-table-title">备注</th>

                <th rowspan="2" class="iridium-table-title">时间</th>
                <th rowspan="2" class="iridium-table-title">地点</th>
                <th rowspan="2" class="iridium-table-title">考核等级</th>
                <th rowspan="2" class="iridium-table-title">考核工时</th>

                <th rowspan="2" class="iridium-table-title">时间段</th>
                <th rowspan="2" class="iridium-table-title">报警原因</th>
                <th rowspan="2" class="iridium-table-title">考核工时</th>
                <th rowspan="2" class="iridium-table-title">备注</th>
              </tr>
        </thead>
        <tbody>
          <tr
             v-for="(item,index) in list"
             :key="index"
             class="iridium-table-row">
            <td class="iridium-table-item">{{ item.labelId }}</td>
            <td class="iridium-table-item">{{ item.dateTime }}</td>
            <td class="iridium-table-item">{{ item.attendanceStartTime }}</td>
            <td class="iridium-table-item">{{ item.attendanceEndTime }}</td>
            <td class="iridium-table-item">{{ item.attendanceHours }}</td>
            <td class="iridium-table-item">{{ item.points }}</td>
            <td class="iridium-table-item">{{ item.coveragePoint1 }}</td>
            <td class="iridium-table-item">{{ item.coveragePoint2 }}</td>
            <td class="iridium-table-item">{{ item.coverageRate }}</td>
            <td class="iridium-table-item">{{ item.coverageRemainHours }}</td>
            <td class="iridium-table-item">{{ item.coverageRemark }}</td>
            <td class="iridium-table-item">{{ item.cleanResultCheckTime }}</td>
            <td class="iridium-table-item">{{ item.cleanResultCheckArea }}</td>
            <td class="iridium-table-item">{{ item.cleanResultCheckLevel }}</td>
            <td class="iridium-table-item">{{ item.cleanResultCheckHours }}</td>
            <td class="iridium-table-item">{{ item.alarmConditionTime }}</td>
            <td class="iridium-table-item">{{ item.alarmConditionReason }}</td>
            <td class="iridium-table-item">{{ item.alarmConditionCheckHour }}</td>
            <td class="iridium-table-item">{{ item.alarmConditionRemark }}</td>
            <td class="iridium-table-item">{{ item.dueHours }}</td>
            <td class="iridium-table-item">{{ item.addHours }}</td>
            <td class="iridium-table-item">{{ item.finallyGetHours }}</td>
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
    pageRange: 4,
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
  name: 'DailySheet',
  components: {
    DatePicker,
    Select,
    Option
  },
  data () {
    return {
      mockData: null,
      date: day().format('YYYY-MM-DD'),
      labels: [],
      projects: [],
      list: [],
      query: {
        projectCode: '',
        labelId: '',
        workTime: day().format('YYYY-MM-DD')
      },
      defaultUrl: this.$api.getDailySheet
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
    /* this.$axios.get(this.$api.getMovingLabel)
      .then(res => {
        if (res.data.code === 0) {
          this.labels = res.data.data
        } else {
          this.$message.error({content: res.data.msg})
        }
      }) */
  },
  mounted () {
    initPagination(this, this.defaultUrl)
  },
  methods: {
    search () {
      // 获取开始时间
      let url = this.defaultUrl
      // 处理查询字符串
      if (this.query.projectCode || this.query.workTime || this.query.labelId) {
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
      this.query.workTime = value
    }
  }
}
</script>

<style scoped>
.ivu-select{
  width:auto;
}
.row_margin{
  margin-bottom:14px;
}
</style>
