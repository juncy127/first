<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">考勤月报表</h5>
    <div class="iridium-page-content">
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          工作时段：
          <DatePicker type="daterange"
            :placeholder="dateRange"
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
          <button class="iridium-btn iridium-btn--danger iridium-btn--smaller iridium-btn--radius"><a class="aDownload" href="#" download="../../assets/images/logo-nav-hide.png">导出</a></button>
        </Col>
      </Row>
      <table class="iridium-table iridium-table--striped iridium-table--hover">
        <thead>
          <tr class="iridium-table-row">
            <th rowspan="3" class="iridium-table-title">员工<br/>标签号</th>
            <th rowspan="3" class="iridium-table-title">标签<br/>岗位</th>
            <th colspan="3" rowspan="1" class="iridium-table-title">出勤情况</th>
            <th colspan="2" rowspan="1" class="iridium-table-title">覆盖情况</th>
            <th colspan="2" rowspan="1" class="iridium-table-title">抽查清理结果</th>
            <th colspan="2" rowspan="1" class="iridium-table-title">报警情况</th>
            <th colspan="2" class="iridium-table-title">补卡情况</th>
            <th colspan="3" class="iridium-table-title">工资情况</th>
            <th rowspan="3" class="iridium-table-title">备注</th>
          </tr>
          <tr class="iridium-table-row">
            <th rowspan="2" class="iridium-table-title">理论<br/>工时</th>
            <th rowspan="2" class="iridium-table-title">出勤<br/>工时</th>
            <th rowspan="2" class="iridium-table-title">出勤率<br/>（出勤工时/合同工时）</th>
            <th rowspan="2" class="iridium-table-title">覆盖率</th>
            <th rowspan="2" class="iridium-table-title">覆盖率<br/>考核工时</th>
            <th rowspan="2" class="iridium-table-title">抽查<br/>岗位数</th>
            <th rowspan="2" class="iridium-table-title">清洁结果<br/>考核工时</th>
            <th rowspan="2" class="iridium-table-title">聚岗考核<br/>工时数</th>
            <th rowspan="2" class="iridium-table-title">漏岗考核<br/>工时数</th>
            <th rowspan="2" class="iridium-table-title">补卡次数</th>
            <th rowspan="2" class="iridium-table-title">补卡<br/>工时数</th>
            <th rowspan="2" class="iridium-table-title">应得<br/>工时</th>
            <th rowspan="2" class="iridium-table-title">工时单价<br/>（元）</th>
            <th rowspan="2" class="iridium-table-title">实际工资<br/>（元）</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="(item, itemIndex) in list"
             :key="itemIndex"
             class="iridium-table-row">
            <td class="iridium-table-item">{{ item.workerLabel }}</td>
            <td class="iridium-table-item">{{ item.labelStation }}</td>
            <td class="iridium-table-item">{{ item.theoreticalWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.attendanceWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.attendanceRate }}</td>
            <td class="iridium-table-item">{{ item.coverageRate }}</td>
            <td class="iridium-table-item">{{ item.coverageCheckHours }}</td>
            <td class="iridium-table-item">{{ item.checkJobs }}</td>
            <td class="iridium-table-item">{{ item.cleanResultCheckHours }}</td>
            <td class="iridium-table-item">{{ item.meetJobHours }}</td>
            <td class="iridium-table-item">{{ item.missJobHours }}</td>
            <td class="iridium-table-item">{{ item.addCards }}</td>
            <td class="iridium-table-item">{{ item.addCardHours }}</td>
            <td class="iridium-table-item">{{ item.dueHours }}</td>
            <td class="iridium-table-item">{{ item.oneHourPrice }}</td>
            <td class="iridium-table-item">{{ item.realWages }}</td>
            <td class="iridium-table-item">{{ item.remark }}</td>
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
  name: 'MonthlySheet',
  components: {
    DatePicker,
    Select,
    Option
  },
  data () {
    return {
      dateRange: day().format('YYYY-MM-DD') + ' - ' + day().format('YYYY-MM-DD'),
      projects: [],
      list: [],
      query: {
        projectCode: '',
        startTime: day().format('YYYY-MM-DD'),
        endTime: day().format('YYYY-MM-DD')
      },
      defaultUrl: this.$api.getMonthlySheet
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
      this.query.startTime = value[0]
      this.query.endTime = value[1]
    }
  }
}
</script>

<style scoped>
</style>
