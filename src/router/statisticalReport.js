// 统计报表
import DailySheet from '@/components/views/DailySheet'
import MonthlySheet from '@/components/views/MonthlySheet'
import AttendanceAndCoverage from '@/components/views/AttendanceAndCoverage'
import ProjectAttendanceMonthlyReport from '@/components/views/ProjectAttendanceMonthlyReport'

export default [
  { path: '/daily-sheet', name: 'DailySheet', component: DailySheet },
  { path: '/monthly-sheet', name: 'MonthlySheet', component: MonthlySheet },
  { path: '/attendance-and-coverage', name: 'AttendanceAndCoverage', component: AttendanceAndCoverage },
  { path: '/project-attendance-monthly-report', name: 'ProjectAttendanceMonthlyReport', component: ProjectAttendanceMonthlyReport }
]
