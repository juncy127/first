// 报警信息管理
import AlarmAttendanceRate from '@/components/views/AlarmAttendanceRate'
import AlarmCoverageRate from '@/components/views/AlarmCoverageRate'
import AlarmFacilityAbnormality from '@/components/views/AlarmFacilityAbnormality'
import AlarmOffWork from '@/components/views/AlarmOffWork'
import AlarmAge from '@/components/views/AlarmAge'

export default [
  { path: '/alarm-attendance-rate', name: 'AlarmAttendanceRate', component: AlarmAttendanceRate },
  { path: '/alarm-coverage-rate', name: 'AlarmCoverageRate', component: AlarmCoverageRate },
  { path: '/alarm-facility-abnormality', name: 'AlarmFacilityAbnormality', component: AlarmFacilityAbnormality },
  { path: '/alarm-off-work', name: 'AlarmOffWork', component: AlarmOffWork },
  { path: '/alarm-age', name: 'AlarmAge', component: AlarmAge }
]
