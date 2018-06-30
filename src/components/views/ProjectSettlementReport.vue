<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">已结算项目管理</h5>
    <div class="iridium-page-content">
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          <Select placeholder="所属项目" v-model="query.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </Col>
        <Col>
          工作时段：
          <DatePicker type="daterange"
            :placeholder="dateRange"
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
            <th class="iridium-table-title" width="80">项目</th>
            <th class="iridium-table-title">开始时间</th>
            <th class="iridium-table-title">结束时间</th>
            <th class="iridium-table-title">结算人</th>
            <th class="iridium-table-title">总结算金额</th>
            <th class="iridium-table-title">出勤率<br>应得总工时</th>
            <th class="iridium-table-title">最终实际<br>应得总工时</th>
            <th class="iridium-table-title">覆盖率<br>应得工时</th>
            <th class="iridium-table-title">覆盖率<br>扣除工时</th>
            <th class="iridium-table-title">抽检<br>次数</th>
            <th class="iridium-table-title">抽检<br>扣除工时</th>
            <th class="iridium-table-title">抽检<br>奖惩金</th>
            <th class="iridium-table-title">及时反馈率</th>
            <th class="iridium-table-title">反馈超时<br>扣除工时</th>
            <th class="iridium-table-title">反馈超时率<br>扣除金额</th>
            <th class="iridium-table-title">累积反馈率<br>奖励金额</th>
            <th class="iridium-table-title">临时用工单</th>
            <th class="iridium-table-title">奖惩单</th>
            <th class="iridium-table-title">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="item in list"
             :key="item.id"
             class="iridium-table-row">
            <td class="iridium-table-item">{{ item.projectName }}</td>
            <td class="iridium-table-item">{{ item.workPeriodStartTime }}</td>
            <td class="iridium-table-item">{{ item.workPeriodEndTime }}</td>
            <td class="iridium-table-item">{{ item.settlementClerk }}</td>
            <td class="iridium-table-item">{{ item.settlementAmount }}</td>
            <td class="iridium-table-item">{{ item.attendanceRateWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.finalWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.coverageWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.minusCoverageWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.checkCounts }}</td>
            <td class="iridium-table-item">{{ item.minusCheckWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.checkRewardsOrPunishments }}</td>
            <td class="iridium-table-item">{{ item.inTimeFeedbackRate }}</td>
            <td class="iridium-table-item">{{ item.feedbackOvertimeWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.feedbackOvertimeRateAmount }}</td>
            <td class="iridium-table-item">{{ item.feedbackRateRewardAmount }}</td>
            <td class="iridium-table-item">{{ item.temporaryLaborCounts }}</td>
            <td class="iridium-table-item">{{ item.rewardsOrPunishmentsCounts }}</td>
            <td class="iridium-table-item" width="70">
              <button @click="toDetailPage(item)"
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
  name: 'ProjectSettlementReport',
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
        projectId: '',
        taskCreateTimeBegin: day().format('YYYY-MM-DD'),
        taskCreateTimeEnd: day().format('YYYY-MM-DD')
      },
      defaultUrl: this.$api.getSettledProjects
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
  mounted () {
    initPagination(this, this.defaultUrl)
  },
  methods: {
    search () {
      // 获取开始时间
      let url = ''
      // 处理查询字符串
      if (this.query.projectId || this.query.workPeriodStartTime || this.query.workPeriodEndTime) {
        url = this.$utils.spliceSearchQuery(this.defaultUrl, this.query)
      }
      initPagination(this, url)
    },
    pickerDate (value) {
      this.query.taskCreateTimeBegin = value[0]
      this.query.taskCreateTimeEnd = value[1]
    },
    toDetailPage (item) {
      this.$router.push({
        path: '/project-settlement-detail',
        query: {
          projectId: item.id,
          workPeriodStartTime: item.workPeriodStartTime,
          workPeriodEndTime: item.workPeriodEndTime
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
