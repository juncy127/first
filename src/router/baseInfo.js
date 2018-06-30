// 基础信息管理
import EmployeeInfoManagement from '@/components/views/EmployeeInfoManagement'
import FixLabelManagement from '@/components/views/FixLabelManagement'
import MobileLabelManagement from '@/components/views/MobileLabelManagement'
import EmployeeLabelSetting from '@/components/views/EmployeeLabelSetting'
import AttendanceRuleSetting from '@/components/views/AttendanceRuleSetting'
import MobileLabelAttendanceRateSetting from '@/components/views/MobileLabelAttendanceRateSetting'

export default [
  { path: '/employee-info-management', name: 'EmployeeInfoManagement', component: EmployeeInfoManagement },
  { path: '/fix-label-management', name: 'FixLabelManagement', component: FixLabelManagement },
  { path: '/mobile-label-management', name: 'MobileLabelManagement', component: MobileLabelManagement },
  { path: '/employee-label-setting', name: 'EmployeeLabelSetting', component: EmployeeLabelSetting },
  { path: '/attendance-rule-setting', name: 'AttendanceRuleSetting', component: AttendanceRuleSetting },
  { path: '/mobile-label-attendance-rate-setting', name: 'MobileLabelAttendanceRateSetting', component: MobileLabelAttendanceRateSetting }
]
