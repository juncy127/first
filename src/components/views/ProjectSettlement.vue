<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">项目结算管理</h5>
    <div class="iridium-page-content">
      <common-loading :show="loading"/>
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          <Select placeholder="所属项目" v-model="query.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </Col>
        <Col>
          任务创建时间：
          <DatePicker type="daterange"
            :placeholder="dateRange"
            @on-change="pickerDate"
            >
          </DatePicker>
        </Col>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="search">查询</button>
        </Col>
      </Row>
      <form class="iridium-form iridium-form--vertical">
        <Row :gutter="30">
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">开始时间：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.workPeriodStartTime"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">结束时间：</label>
              <input
                class="iridium-form-input disabled" readonly
              :value="summary.workPeriodEndTime"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">结算金额：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.settlementAmount"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">出勤率应得总工时：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.attendanceRateWorkingHours"/>
            </div>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">最终实际应得总工时：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.finalWorkingHours"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">覆盖率应得工时：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.coverageWorkingHours"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">覆盖率扣除工时：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.minusCoverageWorkingHours"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">抽检次数：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.checkCounts"/>
            </div>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">补卡工时：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.rePunchCardWorkingHours"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">抽检扣除工时：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.minusCheckWorkingHours"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">抽检奖/惩金：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.checkRewardsOrPunishments"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">及时反馈率：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.inTimeFeedbackRate"/>
            </div>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">反馈超时扣工时：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.feedbackOvertimeWorkingHours"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">反馈超时率扣除金额：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.feedbackOvertimeRateAmount"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">累积反馈率奖励金额：</label>
              <input
                class="iridium-form-input disabled" readonly
                :value="summary.feedbackRateRewardAmount"/>
            </div>
          </Col>
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">临时用工费用</label>
              <input
                class="iridium-form-input"
                v-model="summary.temporaryLaborCounts"
                @change="recordLaborAmount"/>
            </div>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="6">
            <div class="iridium-form-item">
              <label class="iridium-form-label">奖惩费用</label>
              <input
                class="iridium-form-input"                v-model="summary.rewardsOrPunishmentsCounts"
                @change="recordRewardOrPunishAmount"/>
            </div>
          </Col>
        </Row>
        <Row :gutter="30">
          <Col span="6">
            <div class="iridium-form-item">
              <button
                :disabled="hideSettleBtn"
                type="button"
                class="iridium-btn iridium-btn--danger iridium-btn--radius left" @click="selectSettler">结算</button>
            </div>
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
    <Modal
      v-model="showSelectSettlerModal"
      title="结算"
      width="400"
      cancelText="关闭"
      @on-ok="settle"
    >
      <form class="iridium-form">
        <label class="iridium-form-label">责任人：</label>
        <Select placeholder="请选择责任人" :label-in-value="true" @on-change="changeLeader">
          <Option
            v-for="clerk in settleClerks"
            :key="clerk.id"
            :value="clerk.id"
          >{{ clerk.name }}
          </Option>
        </Select>
      </form>
    </Modal>
    <Modal
      v-model="showSettleConflictModal"
      okText="确定"
    >
      <slot name="header"></slot>
      <p class="conflict-text align-left">当前工作时段 {{ query.workPeriodStartTime }} - {{ query.workPeriodEndTime }} 中存在已结算的记录如下，如果需要继续结算，请在已结算项目中撤销该时间段内的已结算记录。</p>
      <table class="iridium-table iridium-table--center">
        <thead>
          <tr class="iridium-table-row">
            <th class="iridium-table-title">项目</th>
            <th class="iridium-table-title">开始时间</th>
            <th class="iridium-table-title">结束时间</th>
            <th class="iridium-table-title">结算时间</th>
            <th class="iridium-table-title">操作人</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in duplicatedRecords"
            :key="index"
            class="iridium-table-row"
          >
            <td class="iridium-table-item">{{ item.projectName }}</td>
            <td class="iridium-table-item">{{ item.workPeriodStartTime }}</td>
            <td class="iridium-table-item">{{ item.workPeriodEndTime }}</td>
            <td class="iridium-table-item">{{ item.settleDate }}</td>
            <td class="iridium-table-item">{{ item.settlementClerk }}</td>
          </tr>
        </tbody>
      </table>
    </Modal>
  </section>
</template>

<script>
import { Row, Col, DatePicker, Select, Option, Modal } from 'iview'
import CommonLoading from '@/components/universal/CommonLoading'
import day from 'dayjs'
import 'paginationjs'
const initPagination = (context, dataSource) => {
  $('#pagination').pagination({
    dataSource: dataSource || context.defaultUrl,
    locator: 'data.records',
    totalNumberLocator: (res) => {
      if (res.data.countResultMap.projectCode) {
        context.summary = res.data.countResultMap
        context.summary.projectId = context.query.projectId
        context.summary.temporaryLaborCounts = context.temporaryLaborCounts || 0
        context.summary.rewardsOrPunishmentsCounts = context.rewardsOrPunishmentsCounts || 0
        context.defaultSettleAmount = context.summary.settlementAmount - 0
        context.laborAmount = context.summary.temporaryLaborCounts
        context.rewardOrPunishAmount = context.summary.rewardsOrPunishmentsCounts
        context.hideSettleBtn = false
      } else {
        context.summary = {}
        context.hideSettleBtn = true
        this.$message.error('暂无数据！')
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
    }
  })
}
export default {
  name: 'CleaningTaskList',
  components: {
    Row,
    Col,
    DatePicker,
    Select,
    Option,
    Modal,
    CommonLoading
  },
  data () {
    return {
      showSelectSettlerModal: false,
      showSettleConflictModal: false,
      dateRange: day().format('YYYY-MM-DD') + ' - ' + day().format('YYYY-MM-DD'),
      projects: [],
      settleClerks: [],
      defaultUrl: this.$api.getProjectSettlementData,
      projectData: {},
      summary: {},
      list: [],
      query: {
        projectId: '00',
        workPeriodStartTime: day().format('YYYY-MM-DD'),
        workPeriodEndTime: day().format('YYYY-MM-DD')
      },
      settleClerk: {},
      laborList: 0,
      rewardOrPunishmentList: 0,
      hideSettleBtn: false,
      disableScanBtn: true,
      disableSettleBtn: true,
      duplicatedRecords: [],
      loading: false
    }
  },
  watch: {
    'laborAmount' (value) {
      this.summary.settlementAmount = this.defaultSettleAmount + value + this.rewardOrPunishAmount
    },
    'rewardOrPunishAmount' (value) {
      this.summary.settlementAmount = this.defaultSettleAmount + value + this.laborAmount
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
    this.search()
  },
  methods: {
    search () {
      // 获取开始时间
      let url = ''
      // 处理查询字符串
      if (this.query.projectId || this.query.workPeriodStartTime || this.query.workPeriodEndTime
      ) {
        url = this.$utils.spliceSearchQuery(this.defaultUrl, this.query)
      } else {
        this.$message.warning('请选择项目和结算月份！')
        return
      }
      initPagination(this, url)
    },
    getSettleClerks () {
      let getSettledClerk = this.$api.getSettledClerk(this.query)
      this.$axios.get(getSettledClerk).then(res => {
        if (res.data.code === 0) {
          this.settleClerks = res.data.data
        }
      })
    },
    changeLeader (value) {
      this.settleClerk = value
      this.disableSettleBtn = !this.settleClerk.value
    },
    pickerDate (value) {
      this.query.workPeriodStartTime = value[0]
      this.query.workPeriodEndTime = value[1]
    },
    selectSettler () {
      if (!this.query.projectId) {
        this.$message.warning('请先选择项目！')
        return
      }
      // 选择结算人
      this.getSettleClerks()
      // 打开结算人对话框
      this.showSelectSettlerModal = true
    },
    scan () {
      let param = {}
      this.disableScanBtn = true
      param.id = this.settleClerk.value
      if (!param.id) {
        this.$message.warning('请选择结算责任人！')
      }
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
      this.$axios.post(this.$api.scanProjectSettlementLeader, param)
        .then(res => {
          this.$spin.hide()
          this.disableScanBtn = false
          if (res.data.success) {
            if (res.data.statusCode === -1) {
              this.$modal.error({
                title: '系统提示',
                content: '不是本人，请重试。'
              })
            } else if (res.data.statusCode === -5) {
              this.$modal.warning({
                title: '系统提示',
                content: '没有权限操作指纹。'
              })
            } else {
              this.$modal.success({
                title: '系统提示',
                content: '已经验证，是本人。'
              })
            }
          } else {
            this.$message.error('请检查设备是否连接成功。')
          }
        }).catch(() => {
          this.$message.error('服务器内部错误')
        })
    },
    settle () {
      this.summary.projectId = this.query.projectId || '00'
      this.summary.settlementClerk = this.settleClerk.label
      this.disableSettleBtn = true
      // 提交项目结算配置数据
      this.$axios.post(this.$api.settleProject(this.summary), this.summary)
        .then(res => {
          this.disableSettleBtn = false
          if (res.data.code === 0) {
            this.$message.success('您操作的菜单已经保存成功。')
          } else if (res.data.code === 999) {
            this.duplicatedRecords = res.data.data
            this.showSettleConflictModal = true
          } else {
            this.$message.error(res.data.msg)
          }
        })
    },
    changeSettleAmount () {
      this.summary.settlementAmount = this.defaultSettleAmount + this.laborAmount + this.rewardOrPunishAmount
    },
    recordLaborAmount () {
      this.laborAmount = this.summary.temporaryLaborCounts - 0
      this.changeSettleAmount()
    },
    recordRewardOrPunishAmount () {
      this.rewardOrPunishAmount = this.summary.rewardsOrPunishmentsCounts - 0
      this.changeSettleAmount()
    }
  }
}
</script>

<style scoped>
.conflict-text {
  margin-top: 25px;
}
.ivu-btn.ivu-btn-text {
  display: none !important;
}
</style>
