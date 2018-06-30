<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">项目结算配置</h5>
    <div class="iridium-page-content">
      <common-loading :show="loading"/>
      <table class="iridium-table iridium-table--striped iridium-table--hover">
        <thead>
          <tr class="iridium-table-row">
            <th Rowspan="2" class="iridium-table-title" width="40">序号</th>
            <th Rowspan="2" class="iridium-table-title" width="70">项目编码</th>
            <th Rowspan="2" class="iridium-table-title" width="70">项目名称</th>
            <th Rowspan="2" class="iridium-table-title" width="100">强制关闭时间<br>（小时）</th>
            <th Rowspan="2" class="iridium-table-title" width="140">当日“需完成任务”的<br>最迟报单时刻</th>
            <th Rowspan="2" class="iridium-table-title">最晚<br>反馈时间</th>
            <th Rowspan="2" class="iridium-table-title">最晚<br>验证时间</th>
            <th Rowspan="2" class="iridium-table-title">最长挂起时限<br>（小时）</th>
            <th Colspan="5" class="iridium-table-title">事件等级</th>
            <th Rowspan="2" class="iridium-table-title">操作</th>
          </tr>
          <tr class="iridium-table-row">
              <th class="iridium-table-title">需求申请单</th>
              <th class="iridium-table-title">轻微不合格</th>
              <th class="iridium-table-title">严重不合格</th>
              <th class="iridium-table-title">黄线禁止项</th>
              <th class="iridium-table-title">红线禁止项</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="(item, index) in list"
             :key="item.id"
             class="iridium-table-row">
            <td class="iridium-table-item">{{ index + 1 }}</td>
            <td class="iridium-table-item">{{ item.projectCode }}</td>
            <td class="iridium-table-item">{{ item.projectName }}</td>
            <td class="iridium-table-item">{{ item.forceClosePeriod }}</td>
            <td class="iridium-table-item">{{ item.latestEventTime   }}</td>
            <td class="iridium-table-item">{{ item.latestFeedbackTime }}</td>
            <td class="iridium-table-item">{{ item.latestVerifyTime }}</td>
            <td class="iridium-table-item">{{ item.maxHangupPeriod }}</td>
            <template v-if="item.eventRanks.length">
              <td v-for="rank in item.eventRanks"
                :key="rank.eventRankId"
                class="iridium-table-item">
                {{ switchRankText(rank) }}
              </td>
            </template>
            <template v-else>
              <td v-for="(i, index) in [1, 2, 3, 4, 5]" :key="index"
                class="iridium-table-item"></td>
            </template>
            <td class="iridium-table-item">
              <button
                class="iridium-btn
                  iridium-btn--warning
                  iridium-btn--smallest
                  iridium-btn--radius"
                @click="edit(item)"
              >
                <i class="glyphicon glyphicon-edit"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="pagination" class="pagination"></div>
    </div>
    <modal
      v-model="showModal"
      title="项目结算配置"
      width="600"
    >
      <Form ref="formValidate" :model="item" :rules="ruleValidate" :label-width="200">
        <FormItem label="项目名称" prop="projectName">
          <input class="iridium-form-input full" v-model="item.projectName" placeholder="item.projectName" disabled />
        </FormItem>
        <FormItem label="强制关闭时间" prop="forceClosePeriod">
          <input class="iridium-form-input full" v-model="item.forceClosePeriod" placeholder="0" />
        </FormItem>
        <FormItem label="当日“需完成任务”的最迟报单时刻" prop="latestEventTime">
          <time-picker class="full" format="HH:mm" type="time" placeholder="时:分" :value="item.latestEventTime"></time-picker>
        </FormItem>
        <FormItem label="最晚反馈时间" prop="latestFeedbackTime">
          <time-picker class="full" format="HH:mm" type="time" placeholder="时:分" :value="item.latestFeedbackTime"></time-picker>
        </FormItem>
        <FormItem label="最晚验证时间" prop="latestVerifyTime">
          <time-picker class="full" format="HH:mm" type="time" placeholder="时:分" :value="item.latestVerifyTime"></time-picker>
        </FormItem>
        <FormItem label="最长挂起时限" prop="maxHangupPeriod">
            <input class="iridium-form-input full" v-model="item.maxHangupPeriod" placeholder="0" />
        </FormItem>
        <FormItem label="事件等级">
          <Row>
            <Col span="24"
              v-for="(rank, index) in item.eventRanks"
              :key="index"
            >
              <Row type="flex" justify="start">
                <Col span="5">
                  <label>{{ rank.eventName }}</label>
                </Col>
                <Col span="6">
                  <Select v-model="rank.handleWay">
                  <Option value="reward">奖励</Option>
                  <Option value="deduction">扣减</Option>
                </Select>
                </Col>
                <Col span="7">
                  <input class="iridium-form-input" v-model="rank.amount" placeholder="0" />
                </Col>
                <Col span="6">
                  <Select v-model="rank.handleType" @on-change="switchUnit(rank)">
                    <Option value="working_hours">工时</Option>
                    <Option value="unit_price">元</Option>
                  </Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="confirm">确定</Button>
      </div>
    </modal>
  </section>
</template>

<script>
import Vue from 'vue'
import { Row, Col, Button, TimePicker, Form, FormItem, Select, Option, Modal } from 'iview'
import CommonLoading from '@/components/universal/CommonLoading'
import _ from 'lodash'
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
  name: 'ProjectSettlementConfig',
  components: {
    Row,
    Col,
    Button,
    TimePicker,
    Form,
    FormItem,
    Select,
    Option,
    Modal,
    CommonLoading
  },
  data () {
    return {
      showModal: false,
      list: [],
      editingProject: '',
      item: {},
      defaultUrl: this.$api.getProjectSettlementConfig,
      loading: false,
      eventRankLabels: [
        '需求申请单',
        '轻微不合格',
        '严重不合格',
        '黄线禁止项',
        '红线禁止项'
      ],
      ruleValidate: {
        forceClosePeriod: [
          { required: true, message: '不能为空', trigger: 'blur', type: 'number' }
        ],
        latestEventTime: [
          { required: true, type: 'string', message: '不能为空', trigger: 'change' }
        ],
        latestFeedbackTime: [
          { required: true, type: 'string', message: '不能为空', trigger: 'change' }
        ],
        latestVerifyTime: [
          { required: true, type: 'string', message: '不能为空', trigger: 'change' }
        ],
        maxHangupPeriod: [
          { required: true, message: '不能为空', trigger: 'blur', type: 'number' }
        ],
        eventRanks: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
    initPagination(this, this.defaultUrl)
    /* this.list = [
      {
        'id': 1,
        'projectCode': '21010011',
        'projectName': '金域蓝湾北区',
        'forceClosePeriod': 72.0,
        'latestEventTime': '15:30',
        'latestFeedbackTime': '16:30',
        'latestVerifyTime': '18:00',
        'maxHangupPeriod': 72.0,
        'eventRanks': [
          {
            'eventRankId': '1',
            'eventName': '需求申请单',
            'eventCode': '1',
            'handleType': 'working_hours',
            'handleWay': 'reward',
            'amount': 0.8000,
            'unit': '工时'
          },
          {
            'eventRankId': '2',
            'eventName': '轻微不合格',
            'eventCode': '2',
            'handleType': 'working_hours',
            'handleWay': 'reward',
            'amount': 0.8000,
            'unit': '工时'
          },
          {
            'eventRankId': '3',
            'eventName': '严重不合格',
            'eventCode': '3',
            'handleType': 'working_hours',
            'handleWay': 'reward',
            'amount': 0.8000,
            'unit': '工时'
          },
          {
            'eventRankId': '4',
            'eventName': '黄线禁止项',
            'eventCode': '4',
            'handleType': 'working_hours',
            'handleWay': 'reward',
            'amount': 0.8000,
            'unit': '工时'
          },
          {
            'eventRankId': '5',
            'eventName': '红线禁止项',
            'eventCode': '5',
            'handleType': 'working_hours',
            'handleWay': 'reward',
            'amount': 0.8000,
            'unit': '工时'
          }
        ]
      }
    ] */
  },
  methods: {
    switchRankText (rank) {
      let symbol
      switch (rank.handleWay) {
        case 'reward':
          symbol = '+'
          break
        case 'deduction':
          symbol = '-'
          break
        default:
          symbol = ''
      }
      return symbol + rank.amount + rank.unit
    },
    edit (item) {
      this.editingProject = item.projectCode
      this.item = _.cloneDeep(item)
      // 选项卡为空时设置默认值
      this.item.eventRanks.forEach(item => {
        item.handleWay = item.handleWay || 'reward'
        item.handleType = item.handleType || 'working_hours'
        item.unit = item.unit || '工时'
      })
      this.showModal = true
    },
    switchUnit (rank) {
      rank.unit = rank.handleType === 'working_hours' ? '工时' : '元'
    },
    cancel () {
      this.showModal = false
    },
    confirm () {
      this.$refs['formValidate'].validate((valid) => {
        if (valid) {
          this.showModal = false
          this.$axios.get(this.$api.modifyProjectSettlementConfig(this.item), this.item)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success('您操作的菜单已经保存成功。')
                let index = ''
                this.list.forEach((item, i) => {
                  if (item.projectCode === this.editingProject) {
                    index = i
                  }
                })
                Vue.set(this.list, index, this.item)
              } else {
                this.$message.error(res.data.msg)
              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
.conflict-text {
  margin-top: 25px;
}
.ivu-form-item-label {
  font-weight: bold;
}
.ivu-form-item-content {
  text-align: left;
  & .iridium-form-input {
    width: 98%;
    min-width: 98%;
  }
}
.ivu-col-span-24 {
  transform: translateX(-3px);
}
</style>
