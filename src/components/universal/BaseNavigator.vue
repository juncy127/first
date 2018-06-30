<template>
  <nav
    class="iridium-navigator"
    :class="{ 'iridium-navigator--hide': !toggleNav }"
  >
    <transition name="fade" mode="out-in">
      <section v-if="toggleNav" key="open">
        <h1 class="iridium-logo">万科物业定位管理系统</h1>
        <ul class="iridium-navigator-list">
          <li class="iridium-navigator-category">
            <span
              class="iridium-navigator-category-title"
              @click="updateActiveTag(homeTag)"
            >
              <i class="glyphicon glyphicon-home"></i>
              <strong class="iridium-navigator-category-text">{{ homeTag.title }}</strong>
            </span>
          </li>
          <li
            v-for="(item, index) in nav"
            :key="index"
            class="iridium-navigator-category"
            :class="{ 'iconfont icon-angle': item.sub, 'padding-bottom': index !== 0 && current === index, 'active': current === index }"
          >
            <span
              class="iridium-navigator-category-title"
              @click="toggle($event, index)"
              :class="{ 'active': current === index }">
              <i :class="item.icon"></i>
              <strong class="iridium-navigator-category-text">{{ item.title }}</strong>
            </span>
            <!-- <transition name="slide-up"> -->
              <ul
                v-show="toggleNav && current === index"
                class="iridium-navigator-sub-list">
                <li
                  v-for="(sub, index) in item.sub"
                  :key="index"
                  @click="updateTreeTags(sub)"
                  class="iridium-navigator-sub-item"
                  :class="{'iridium-navigator-sub-item--active':  activeTag.routeName === sub.routeName }"
                >
                  {{ sub.title }}
                </li>
              </ul>
            <!-- </transition> -->
          </li>
        </ul>
      </section>
      <section v-if="!toggleNav" key="close">
        <h1 class="iridium-logo iridium-logo--hide">万科物业定位管理系统</h1>
        <ul>
          <li
            v-for="(item, index) in nav"
            :key="index"
            class="iridium-navigator-category"
          >
            <span
              class="iridium-navigator-category-title"
              @click="updateToggleNav($event, index, true)"
            >
              <i class="font-larger" :class="item.icon"></i>
            </span>
          </li>
        </ul>
      </section>
    </transition>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BaseNavigator',
  data () {
    return {
      current: -1,
      nav: [
        {
          title: '基础信息管理',
          icon: 'iconfont icon-baseInfo',
          sub: [
            {
              title: '员工信息管理',
              routeName: 'EmployeeInfoManagement'
            },
            {
              title: '固定标签信息管理',
              routeName: 'FixLabelManagement'
            },
            {
              title: '移动标签信息管理',
              routeName: 'MobileLabelManagement'
            },
            {
              title: '员工移动标签设置',
              routeName: 'EmployeeLabelSetting'
            },
            {
              title: '出勤率规则设置',
              routeName: 'AttendanceRuleSetting'
            },
            {
              title: '移动标签出勤率设置',
              routeName: 'MobileLabelAttendanceRateSetting'
            }
          ]
        },
        {
          title: '抽查信息管理',
          icon: 'iconfont icon-spotCheck',
          sub: [
            {
              title: '移动标签补卡',
              routeName: 'MoveTabs'
            },
            {
              title: '移动标签补卡',
              routeName: 'MoveTabs1'
            },
            {
              title: '移动标签补卡',
              routeName: 'MoveTabs2'
            },
            {
              title: '抽查信息录入',
              routeName: 'CheckInfomationInput'
            }
          ]
        },
        {
          title: '报警信息管理',
          icon: 'iconfont icon-alarm',
          sub: [
            {
              title: '出勤率报警',
              routeName: 'AlarmAttendanceRate'
            },
            {
              title: '覆盖率报警',
              routeName: 'AlarmCoverageRate'
            },
            {
              title: '设备异常报警',
              routeName: 'AlarmFacilityAbnormality'
            },
            {
              title: '脱岗报警',
              routeName: 'AlarmOffWork'
            },
            {
              title: '年龄报警',
              routeName: 'AlarmAge'
            }
          ]
        },
        {
          title: '统计报表',
          icon: 'iconfont icon-statistical',
          sub: [
            {
              title: '考勤日报表',
              routeName: 'DailySheet'
            },
            {
              title: '考勤月报表',
              routeName: 'MonthlySheet'
            },
            {
              title: '项目结算',
              routeName: ''
            },
            {
              title: '员工出勤率与覆盖率统计',
              routeName: 'AttendanceAndCoverage'
            },
            {
              title: '项目考勤月报表',
              routeName: 'ProjectAttendanceMonthlyReport'
            }
          ]
        },
        {
          title: '任务质检',
          icon: 'iconfont icon-qualityInspection',
          sub: [
            {
              title: '项目结算配置',
              routeName: 'ProjectSettlementConfig'
            },
            {
              title: '项目结算',
              routeName: 'ProjectSettlement'
            },
            {
              title: '已结算项目',
              routeName: 'ProjectSettlementReport'
            },
            {
              title: '保洁任务',
              routeName: 'CleaningTaskList'
            }
          ]
        },
        {
          title: '系统管理',
          icon: 'iconfont icon-systemSetting',
          sub: [
            {
              title: '项目设置',
              routeName: 'SyetemProjectManagement'
            },
            {
              title: '项目用户管理',
              routeName: 'SyetemStaffManagement'
            },
            {
              title: '管理中心',
              routeName: 'SyetemManagementCenter'
            },
            {
              title: '组织结构管理',
              routeName: 'SyetemStructureManagement'
            },
            {
              title: '供方管理',
              routeName: 'SyetemSupplierManagement'
            },
            {
              title: '手动计算',
              routeName: 'SyetemManualCalculate'
            },
            {
              title: '用户管理',
              routeName: 'SyetemUserManagement'
            },
            {
              title: '负责人管理',
              routeName: 'SyetemLeaderManagement'
            },
            {
              title: '角色管理',
              routeName: 'SyetemRoleManagement'
            },
            {
              title: '数据导入',
              routeName: 'SyetemDataImport'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      toggleNav: 'getToggleNav',
      treeTags: 'getTreeTags',
      homeTag: 'getHomeTag',
      activeTag: 'getActiveTreeTag',
      positionTag: 'getPositionTreeTag',
      wrapWidth: 'getTreeTagsWrapWidth',
      treeTagOffset: 'getTreeTagsOffset'
    })
  },
  methods: {
    updateToggleNav (e, index, data) {
      this.current = index
      this.$store.dispatch('UPDATE_TOGGLENAV', data)
    },
    updateActiveTag (tag) {
      let positionIndex = this.getPositionIndex(tag)
      let prevListWidth = this.getPrevListWidth(positionIndex + 1)
      let nextListWidth = this.getNextListWidth(positionIndex - 1)
      let formerTagsWidth = 0
      let prevTag = null
      this.$store.dispatch('UPDATE_ACTIVETAG', tag)
      if (prevListWidth < this.wrapWidth - 200) {
        this.$store.dispatch('UPDATE_POSITIONTAG', this.homeTag)
        this.scrollTo(0)
      } else if (nextListWidth < this.wrapWidth) {
        let latterTagsWidth = 0
        do {
          latterTagsWidth = this.getNextListWidth(positionIndex - 1)
          positionIndex--
        } while (latterTagsWidth < this.wrapWidth - 200)
        prevTag = this.treeTags[positionIndex - 1]
        formerTagsWidth = this.getPrevListWidth(positionIndex)
        this.$store.dispatch('UPDATE_POSITIONTAG', prevTag)
        this.scrollTo(-formerTagsWidth)
      } else {
        prevTag = this.treeTags[positionIndex - 1]
        formerTagsWidth = this.getPrevListWidth(positionIndex)
        this.$store.dispatch('UPDATE_POSITIONTAG', prevTag)
        this.scrollTo(-formerTagsWidth)
      }
    },
    updateTreeTags (tag) {
      // 如果是添加标签，执行更新标签函数，否则执行切换当前标签函数
      if (this.treeTags.findIndex(item => item.routeName === tag.routeName) < 0) {
        this.$store.dispatch('UPDATE_TREETAGS', { flag: 'add', tag: tag })
        let listWidth = this.getListWidth()
        let prevTag = null
        let prevIndex = 0
        let positionIndex = this.getPositionIndex(tag)
        let count = positionIndex
        let moveOffset = 0
        if (listWidth > this.wrapWidth) {
          prevIndex = this.compareFormerWidth(positionIndex + 1, count)
          moveOffset = this.getPrevListWidth(prevIndex + 1)
          prevTag = this.treeTags[prevIndex]
          this.$store.dispatch('UPDATE_POSITIONTAG', prevTag)
          this.scrollTo(-moveOffset)
        }
      } else {
        this.updateActiveTag(tag)
      }
      this.$router.push({
        name: tag.routeName
      })
    },
    toggle (e, index) {
      if (this.current === index) {
        $(e.target).parents('.iridium-navigator-category').children('.iridium-navigator-sub-list').slideUp(300, () => {
          this.current = -1
        })
      } else {
        $('.iridium-navigator-category').eq(this.current).children('.iridium-navigator-sub-list').slideUp(300)
        this.current = index
        $(e.target).parents('.iridium-navigator-category').children('.iridium-navigator-sub-list').slideDown()
      }
    },
    getPositionIndex (tag) {
      return this.treeTags.findIndex(item => item.routeName === tag.routeName)
    },
    getPrevListWidth (end, start) {
      let listWidth = 0
      if (!start) {
        $(`.iridium-tree-tags-item:lt(${end})`).each(function () {
          listWidth += $(this).outerWidth(true)
        })
      } else {
        let list = $('.iridium-tree-tags-item').filter(function () {
          return $(this).index() > start && $(this).index() < end
        })
        list.each(function () {
          listWidth += $(this).outerWidth(true)
        })
      }
      return listWidth
    },
    getNextListWidth (start, end) {
      let listWidth = 0
      if (!end) {
        $(`.iridium-tree-tags-item:gt(${start})`).each(function () {
          listWidth += $(this).outerWidth(true)
        })
      } else {
        let list = $('.iridium-tree-tags-item').filter(function () {
          return $(this).index() > start && $(this).index() < end
        })
        list.each(function () {
          listWidth += $(this).outerWidth(true)
        })
      }
      return listWidth
    },
    compareFormerWidth (positionIndex, count) {
      if (count <= 0) throw Error('已经遍历到最前面的元素了！')
      let formerTagsWidth = this.getPrevListWidth(positionIndex + 1, count - 2)
      count--
      if (formerTagsWidth > this.wrapWidth - 200) {
        return count
      } else {
        return this.compareFormerWidth(positionIndex, count)
      }
    },
    compareLatterWidth (positionIndex, count) {
      if (count >= this.treeTags.length) throw Error('已经遍历到最后面的元素了！')
      let latterTagsWidth = this.getNextListWidth(positionIndex - 1, count + 2)
      count++
      if (latterTagsWidth > this.wrapWidth - 200) {
        return count
      } else {
        return this.compareLatterWidth(positionIndex, count)
      }
    },
    getListWidth () {
      let listWidth = 0
      $('.iridium-tree-tags-item').each(function () {
        listWidth += $(this).outerWidth(true)
      })
      return listWidth
    },
    scrollTo (offset) {
      $('.iridium-tree-tags-list').animate({'left': offset + 'px'})
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/_variables.css';
@define-mixin initNavItem {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}

@component navigator {
  width: 220px;
  background: var(--navBgColor);
  color: var(--navColor);
  font-size: var(--fontSmaller);
  cursor: pointer;
  transition: all var(--transitionDuration) var(--transitionTimingFuction);
  overflow-y: scroll;
  position: relative;
  z-index:2;

  @descendent list {}

  @descendent category {
    @mixin initNavItem;
    position: relative;
    font-size: 13px;
    line-height: var(--navItemHeight);
    transition: width var(--transitionDuration) var(--transitionTimingFuction);
    &.icon-angle {
      display: block;
      font-weight: bold;
      &::before {
        position: absolute;
        right: 20px;
        content: '\e60e';
        transform: rotate(90deg);
        line-height: var(--navItemHeight);
      }
    }
    &.padding-bottom {
      padding-bottom: 10px;
    }
    &:hover,
    &:active{
      background: var(--navBgColorDark);
    }
    &.active{
      background: var(--navBgColorDark);
      &.icon-angle::before {
        content: '\e60e';
        transform: rotate(0);
      }
    }
  }

  @descendent category-title {
    display: block;
    font-weight: bold;
    padding-left: var(--navItemLeftPadding);
    & .iconfont{
      margin-right: 8px;
    }
    &.active {
      color: var(--primaryColor);
    }
    &.border {
       border-left: 2px solid var(--primaryColor);
    }
  }

  @descendent category-text {}

  @descendent sub-list {
    font-weight: bold;
    color: var(--navColor);
  }

  @descendent sub-item {
    @mixin initNavItem;
    line-height: var(--navSubItemHeight);
    padding-left: var(--navSubItemLeftPadding);

    &:hover{
      color: #fff;
    }

    &:active,
    &.active {
      color: var(--primaryColor);
    }
    @modifier active {
      color: var(--primaryColor);
      border-left: 2px solid var(--primaryColor);

      &:hover{
        color: var(--primaryColor);
      }
    }
  }

  @modifier hide {
    width: 70px;
  }
}

@component logo {
  height: 105px;
  background: url(../../assets/images/logo-nav.png) no-repeat center center;
  text-indent: -9999px;

  @modifier hide {
    background-image: url(../../assets/images/logo-nav-hide.png);
    background-size: 24px 30px;
  }
}
::-webkit-scrollbar {
  width: 0;
}
</style>
