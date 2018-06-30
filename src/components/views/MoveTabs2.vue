<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">结算日报表</h5>
    <div class="iridium-page-content">
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          日期：
          <DatePicker type="date"
            :placeholder="date"
            @on-change="pickerDate"
            >
          </DatePicker>
        </Col>
        <Col>
          项目名称：
          <Select placeholder="所属项目" v-model="query.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </Col>
        <Col>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="search">查询</button>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius">批量审批</button>
        </Col>
      </Row>
<table class="iridium-table iridium-table--striped iridium-table--hover">
        <thead>
          <tr class="iridium-table-row">
            <th rowspan="3" class="iridium-table-title">标签编号</th>
            <th colspan="3" rowspan="1" class="iridium-table-title">出勤情况</th>
            <th colspan="6" rowspan="1" class="iridium-table-title">覆盖情况</th>
            <th colspan="4" rowspan="1" class="iridium-table-title">抽查清洁结果</th>
            <th colspan="4" rowspan="1" class="iridium-table-title">报警情况</th>
            <th rowspan="3" class="iridium-table-title">应得工时</th>
            <th rowspan="3" class="iridium-table-title">补卡操作</th>
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
            <td class="iridium-table-item" @click="cardApplication">{{ item.cardOperation }}</td>
            <td class="iridium-table-item">{{ item.addHours }}</td>
            <td class="iridium-table-item">{{ item.finallyGetHours }}</td>
          </tr>
        </tbody>
      </table>
      <div id="pagination" class="pagination"></div>
    </div>
    <Modal
      v-model="showModal"
      title="补卡申请"
      >
    </Modal>
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
  name: 'MoveTabs2',
  components: {
    DatePicker,
    Select,
    Option
  },
  data () {
    return {
      date: day().format('YYYY-MM-DD'),
      projects: [],
      isApplication: false,
      showModal: false,
      list: [
        {
          labelId: '01',
          attendanceStartTime: '2018-05-12',
          attendanceEndTime: '2018-05-13',
          attendanceHours: '4',
          points: '22',
          coveragePoint1: '3',
          coveragePoint2: '6',
          coverageRate: '90%',
          coverageRemainHours: '2',
          coverageRemark: '备注',
          cleanResultCheckTime: '',
          cleanResultCheckArea: '',
          cleanResultCheckLevel: '2',
          cleanResultCheckHours: '6',
          alarmConditionTime: '',
          alarmConditionReason: '',
          alarmConditionCheckHour: '5',
          alarmConditionRemark: '',
          dueHours: '3',
          cardOperation: '补卡申请',
          addHours: '2',
          finallyGetHours: '10'
        }
      ],
      query: {
        projectCode: '',
        workTime: day().format('YYYY-MM-DD')
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
    cardApplication () {
      this.isApplication = true
    }
  }
}
</script>

<style scoped>
.ivu-select{
  width:auto;
}
</style>
