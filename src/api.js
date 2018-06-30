export default {
  install (Vue) {
    let baseUrl = 'rest/'
    let api = 'api/'
    Vue.prototype.$api = {
      authority: api + 'authority',
      userInfo: api + 'employees/me',
      getDictionaries: api + 'dictionaries',
      getProjects: baseUrl + 'projects',
      // 员工信息管理
      getEmployeeList: api + 'employee/list',
      createEmployee: api + 'employee/create',
      getEmployeeDetail (params) {
        return api + `employee/detail/${params.id}`
      },
      updateEmployee (params) {
        return api + `employee/update/${params.id}`
      },
      deleteEmployee (params) {
        return api + `employee/delete/${params.id}`
      },
      uploadIdCard: api + 'employee/idcard/upload',
      updateIdCard: api + 'employee/idcard/update',
      scanFingerprint: api + 'employee/fingerprint/scan',
      updateFingerprint: api + 'employee/fingerprint/update',
      // 固定标签
      getProjectLabelArea (id) {
        return api + `project/${id}/labelArea/list`
      },
      getFixLabelList: api + 'fixLabel/list',
      createFixLabel: api + 'fixLabel/create',
      getFixLabelDetail (params) {
        return api + `fixLabel/detail/${params.id}`
      },
      updateFixLabel (params) {
        return api + `fixLabel/update/${params.id}`
      },
      deleteFixLabel (params) {
        return api + `fixLabel/delete/${params.id}`
      },
      // 移动标签
      getMobileLabelList: api + 'mobileLabel/list',
      createMobileLabel: api + 'mobileLabel/create',
      getMobileLabelDetail (params) {
        return api + `mobileLabel/detail/${params.id}`
      },
      updateMobileLabel (params) {
        return api + `mobileLabel/update/${params.id}`
      },
      deleteMobileLabel (params) {
        return api + `mobileLabel/delete/${params.id}`
      },
      // 员工移动标签设置
      getEmployeeMobileLabelList: api + 'employee/mobileLabel/list',
      getProjectMobileLabelList (id) {
        return api + `project/${id}/mobileLabels`
      },
      getProjectEmployeeList (id) {
        return api + `project/${id}/employees`
      },
      createEmployeeMobileLabel: api + 'employee/mobileLabel/create',
      getEmployeeMobileLabelDetail (params) {
        return api + `employee/mobileLabel/detail/${params.id}`
      },
      updateEmployeeMobileLabel (params) {
        return api + `employee/mobileLabel/update/${params.id}`
      },
      deleteEmployeeMobileLabel (params) {
        return api + `employee/mobileLabel/delete/${params.id}`
      },
      // 出勤率规则
      getAttendanceRuleList: api + 'attendance/rule/list',
      createAttendanceRule: api + 'attendance/rule/create',
      getAttendanceRuleDetail (params) {
        return api + `attendance/rule/detail/${params.id}`
      },
      updateAttendanceRule (params) {
        return api + `attendance/rule/update/${params.id}`
      },
      deleteAttendanceRule (params) {
        return api + `attendance/rule/delete/${params.id}`
      },
      // 报警信息
      getAttendanceRateAlarmList: api + '/alarm/attendance',
      getCoverageRateAlarmList: api + '/alarm/coverage',
      getFacilityAbnormalityAlarmList: api + '/alarm/facility',
      getOffWorkAlarmList: api + '/alarm/offwork',
      getAgeAlarmList: api + '/alarm/age',
      // 统计报表
      getDailySheet: api + 'report/dailySheetList',
      getMovingLabel: api + 'movingLabel',
      getMonthlySheet: api + 'report/monthlySheetList',
      getAttendanceAndCoverage: api + 'report/attendanceAndCoverage',
      getProjectAttendanceMonthlyReport: api + 'report/projectAttendanceMonthlyReport',
      // 移动标签补卡
      getMoveTabs: api + 'checkInformation/MoveTabsList',
      // 抽查信息录入
      getCheckInfomationInput: api + 'checkInformation/CheckInfomationInputList',
      // 保洁任务
      getCleaningTasks: baseUrl + 'project/cleaningTasks',
      getCleaningTaskDetail (params) {
        return baseUrl + `project/cleaningTask/${params.id}`
      },
      modifyCleaningTasks: baseUrl + 'project/cleaningTasks/notSettle',
      // 已结算项目
      getSettledProjects: baseUrl + 'projects/settledProjects',
      getSettledProjectDetail (params) {
        return baseUrl + `projects/${params.projectId}/settleDetails`
      },
      // 项目结算
      getProjectSettlementData: baseUrl + 'projects/settlement',
      getSettledClerk (params) {
        return baseUrl + `projects/${params.projectId}/leaders`
      },
      scanProjectSettlementLeader: baseUrl + 'projectbill/projectbillScan',
      settleProject (params) {
        return baseUrl + `projects/${params.projectId}/settle`
      },
      // 项目结算配置
      getProjectSettlementConfig: baseUrl + 'projects/settleConfigs',
      modifyProjectSettlementConfig (params) {
        return baseUrl + `projects/${params.projectCode}/settleConfig`
      }
    }
  }
}
