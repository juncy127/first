<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">
      已结算项目详情
      <router-link tag="a"
        class="iridium-btn iridium-btn--link right"
        :to="{ path: '/project-settlement-report' }">
        返回列表
      </router-link>
    </h5>
    <div class="iridium-page-content">
      <common-loading :show="loading"/>
      <form class="iridium-form iridium-form--vertical">
        <Row :gutter="30">
          <Col span="6">
            <label class="iridium-form-label">开始时间：</label>
            <span class="iridium-form-text">{{ summary.workPeriodStartTime || '0000-00-00' }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">结束时间：</label>
            <span class="iridium-form-text">{{ summary.workPeriodEndTime || '0000-00-00' }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">结算金额：</label>
            <span class="iridium-form-text">{{ summary.settlementAmount || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">出勤率应得总工时：</label>
            <span class="iridium-form-text">{{ summary.attendanceRateWorkingHours || 0 }}</span>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="6">
            <label class="iridium-form-label">最终实际应得总工时：</label>
            <span class="iridium-form-text">{{ summary.finalWorkingHours || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">覆盖率应得工时：</label>
            <span class="iridium-form-text">{{ summary.coverageWorkingHours || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">覆盖率扣除工时：</label>
            <span class="iridium-form-text">{{ summary.minusCoverageWorkingHours || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">抽检次数：</label>
            <span class="iridium-form-text">{{ summary.checkCounts || 0 }}</span>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="6">
            <label class="iridium-form-label">补卡工时：</label>
            <span class="iridium-form-text">{{ summary.rePunchCardWorkingHours || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">抽检扣除工时：</label>
            <span class="iridium-form-text">{{ summary.minusCheckWorkingHours || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">抽检奖/惩金：</label>
            <span class="iridium-form-text">{{ summary.checkRewardsOrPunishments || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">及时反馈率：</label>
            <span class="iridium-form-text">{{ summary.inTimeFeedbackRate || 0 }}</span>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="6">
            <label class="iridium-form-label">反馈超时扣工时：</label>
            <span class="iridium-form-text">{{ summary.feedbackOvertimeWorkingHours || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">反馈超时率扣除金额：</label>
            <span class="iridium-form-text">{{ summary.feedbackOvertimeRateAmount || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">累积反馈率奖励金额：</label>
            <span class="iridium-form-text">{{ summary.feedbackRateRewardAmount || 0 }}</span>
          </Col>
          <Col span="6">
            <label class="iridium-form-label">临时用工单：</label>
            <span class="iridium-form-text">{{ summary.temporaryLaborCounts || 0 }}</span>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="6">
            <label class="iridium-form-label">奖惩单：</label>
            <span class="iridium-form-text">{{ summary.rewardsOrPunishmentsCounts || 0 }}</span>
          </Col>
        </Row>
      </form>
      <table class="iridium-table iridium-table--striped iridium-table--hover iridium-table--left">
        <thead>
          <tr class="iridium-table-row">
            <th class="iridium-table-title">移动标签ID</th>
            <th class="iridium-table-title">规则名称</th>
            <th class="iridium-table-title">理论工时</th>
            <th class="iridium-table-title">出勤率应得工时</th>
            <th class="iridium-table-title">最终实际应得总工时</th>
            <th class="iridium-table-title">覆盖率应得工时</th>
            <th class="iridium-table-title">覆盖率扣除工时</th>
            <th class="iridium-table-title">抽检次数</th>
            <th class="iridium-table-title">补卡工时</th>
            <th class="iridium-table-title">抽检扣除工时</th>
            <th class="iridium-table-title">抽检奖惩金额</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="item in list"
             :key="item.id"
             class="iridium-table-row">
            <td class="iridium-table-item">{{ item.movingLabel }}</td>
            <td class="iridium-table-item">{{ item.ruleName }}</td>
            <td class="iridium-table-item">{{ item.theoreticalWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.attendanceRateWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.finalWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.coverageWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.minusCoverageWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.checkCounts }}</td>
            <td class="iridium-table-item">{{ item.rePunchCardWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.minusCheckWorkingHours }}</td>
            <td class="iridium-table-item">{{ item.checkRewardsOrPunishments }}</td>
          </tr>
        </tbody>
      </table>
      <div id="pagination" class="pagination"></div>
    </div>
  </section>
</template>

<script>
import { Row, Col } from 'iview'
import CommonLoading from '@/components/universal/CommonLoading'
import 'paginationjs'
const initPagination = (context, dataSource) => {
  $('#pagination').pagination({
    dataSource: dataSource,
    locator: 'data.records',
    totalNumberLocator: (res) => {
      if (!context.summary.projectId) {
        context.summary = res.data.countResultMap
      }
      return res.data.totalCount
    },
    pageSize: 1000,
    pageRange: 6,
    firstText: '首页',
    lastText: '末页',
    prevText: '上一页',
    nextText: '下一页',
    alias: {
      pageNumber: 'pageNum',
      pageSize: 'numPerPage'
    },
    ajax: {
      beforeSend: () => {
        context.loading = true
      }
    },
    callback: (data, pagination) => {
      context.loading = false
      context.list = data
      context.$spin.hide()
    }
  })
}
export default {
  name: 'ProjectSettlementDetail',
  components: {
    Row,
    Col,
    CommonLoading
  },
  data () {
    return {
      summary: {},
      list: [],
      loading: false,
      defaultUrl: ''
    }
  },
  created () {
    this.query = this.$route.query
    this.defaultUrl = this.$utils.spliceSearchQuery(this.$api.getSettledProjectDetail(this.query), this.query)
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
    }
  }
}
</script>

<style scoped>
.iridium-form-label {
  font-weight: bold;
}
.iridium-form-text {
  font-size: var(--fontSmallest);
}
.ivu-col {
  margin-bottom: 10px;
}
</style>
