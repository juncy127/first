// 任务质检
import ProjectSettlementConfig from '@/components/views/ProjectSettlementConfig'
import ProjectSettlement from '@/components/views/ProjectSettlement'
import ProjectSettlementReport from '@/components/views/ProjectSettlementReport'
import ProjectSettlementDetail from '@/components/views/ProjectSettlementDetail'
import CleaningTaskList from '@/components/views/CleaningTaskList'

export default [
  { path: '/project-settlement-config', name: 'ProjectSettlementConfig', component: ProjectSettlementConfig },
  { path: '/project-settlement', name: 'ProjectSettlement', component: ProjectSettlement },
  { path: '/project-settlement-report', name: 'ProjectSettlementReport', component: ProjectSettlementReport },
  { path: '/project-settlement-detail', name: 'ProjectSettlementDetail', component: ProjectSettlementDetail },
  { path: '/cleaning-task-list', name: 'CleaningTaskList', component: CleaningTaskList }
]
