<template>
  <section class="iridium-tree-tags">
    <button class="
      iridium-btn-outline
      iridium-btn-outline--default
      iridium-tree-tags-btn
      iridium-tree-tags--prev"
      @click="prev"
    >
      <i class="iconfont icon-leftArrow"></i>
    </button>
    <div class="iridium-tree-tags-list-wrap">
      <ul class="iridium-tree-tags-list">
        <li
          class="iridium-tree-tags-item"
          :class="{ 'iridium-tree-tags-item--active': activeTag.routeName === homeTag.routeName }"
          @click="updateActiveTag(homeTag)"
        >
          {{ homeTag.title }}
        </li>
        <li
          v-for="(tag, index) in treeTags"
          :key="index"
          class="iridium-tree-tags-item"
          :class="{ 'iridium-tree-tags-item--active': activeTag.routeName === tag.routeName }"
          @click="updateActiveTag(tag)"
        >
          {{ tag.title }} <i
            class="iconfont icon-close"
            @click="removeTreeTag($event, tag)"
          ></i>
        </li>
      </ul>
    </div>
    <button class="
      iridium-btn-outline
      iridium-btn-outline--default
      iridium-tree-tags-btn
      iridium-tree-tags--next"
      @click="next"
    >
      <i class="iconfont icon-rightArrow"></i>
    </button>
    <dropdown
      :title="dropdown.title"
      :icon="dropdown.icon"
      :datalist="dropdown.datalist"
      class="iridium-tree-tags-dropdown"
      @select="switchTreeTagsActive"
    />
    <!--
    <button class="
      iridium-btn-outline
      iridium-btn-outline--default
      iridium-tree-tags-btn
      iridium-tree-tags--exit"
    >
      <i class="fa fa-sign-out"></i>退出
    </button>
    -->
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import dropdown from '@/components/universal/CommonDropdown'
export default {
  name: 'BaseTreeTags',
  components: {
    dropdown
  },
  data () {
    return {
      homtTagWidth: 57,
      dropdown: {
        title: '关闭操作',
        icon: 'iconfont icon-dropdown',
        datalist: [
          {text: '定位当前选项卡'},
          {text: '关闭全部选项卡', division: true},
          {text: '关闭其他选项卡'}
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      treeTags: 'getTreeTags',
      homeTag: 'getHomeTag',
      activeTag: 'getActiveTreeTag',
      positionTag: 'getPositionTreeTag',
      wrapWidth: 'getTreeTagsWrapWidth',
      treeTagOffset: 'getTreeTagsOffset'
    })
  },
  methods: {
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
      this.$router.push({
        name: tag.routeName
      })
    },
    removeTreeTag (e, tag) {
      e.cancelBubble = true
      if (this.treeTags.length <= 1) {
        this.closeAllTags()
        return
      }
      let newActiveTag = null
      let positionIndex = this.getPositionIndex(tag)
      // 判断是否更新当前标签
      if (this.activeTag.routeName === tag.routeName) {
        if (this.treeTags.length > positionIndex + 1) {
          newActiveTag = this.treeTags[positionIndex + 1]
        } else {
          newActiveTag = this.treeTags[positionIndex - 1]
        }
        this.$store.dispatch('UPDATE_ACTIVETAG', newActiveTag)
      }
      // 移除按钮
      this.$store.dispatch('UPDATE_TREETAGS', { flag: 'remove', tag: {}, removeTagIndex: positionIndex })
      // 判断滚动
      let listWidth = this.getListWidth()
      let positionTag = null
      let nextListWidth = this.getNextListWidth(positionIndex - 2)
      let moveOffset = 0
      if (listWidth < this.wrapWidth) {
        this.$store.dispatch('UPDATE_POSITIONTAG', this.homeTag)
        this.scrollTo(0)
      } else {
        if (nextListWidth < this.wrapWidth) {
          positionTag = this.treeTags[positionIndex - 1]
          moveOffset = this.getPrevListWidth(positionTag)
          this.$store.dispatch('UPDATE_POSITIONTAG', positionTag)
          this.scrollTo(-moveOffset)
        }
      }
      this.$router.push({
        name: newActiveTag.routeName
      })
    },
    prev () {
      let listWidth = this.getListWidth()
      let prevListWidth = 0
      let positionIndex = 0
      // 宽度太小不计算滚动return
      if (listWidth < this.wrapWidth) return
      // 超过可视宽度时计算滚动
      positionIndex = this.getPositionIndex(this.positionTag)
      prevListWidth = this.getPrevListWidth(positionIndex + 1)
      if (prevListWidth < this.wrapWidth) {
        this.$store.dispatch('UPDATE_POSITIONTAG', this.homeTag)
        this.scrollTo(0)
      } else {
        let prevTag = null
        let count = positionIndex
        let prevIndex = this.compareFormerWidth(positionIndex, count)
        let moveOffset = this.getPrevListWidth(prevIndex)
        prevTag = this.treeTags[prevIndex - 1]
        this.$store.dispatch('UPDATE_POSITIONTAG', prevTag)
        this.scrollTo(-moveOffset)
      }
    },
    next () {
      let listWidth = this.getListWidth()
      // let nextListWidth = 0
      let positionIndex = 0
      let moveOffset = 0
      // 宽度太小不计算滚动
      if (listWidth < this.wrapWidth) return
      // 超过可视宽度时计算滚动
      positionIndex = this.getPositionIndex(this.positionTag)
      let nextTag = null
      let count = positionIndex
      let newIndex = 0
      newIndex = this.compareLatterWidth(positionIndex, count)
      nextTag = this.treeTags[newIndex]
      moveOffset = this.getPrevListWidth(newIndex + 1)
      this.$store.dispatch('UPDATE_POSITIONTAG', nextTag)
      this.scrollTo(-moveOffset)
    },
    switchTreeTagsActive (data) {
      let option = data.option
      switch (option.text) {
        case this.dropdown.datalist[0].text:
          this.updateActiveTag(this.activeTag)
          break
        case this.dropdown.datalist[1].text:
          this.closeAllTags()
          break
        case this.dropdown.datalist[2].text:
          this.closeOtherTags()
          break
        default:
          break
      }
    },
    closeAllTags () {
      if (this.treeTags.length > 0) {
        this.$store.dispatch('UPDATE_TREETAGS', { flag: 'reset', tag: [] })
        this.scrollTo(0)
      }
    },
    closeOtherTags () {
      if (this.treeTags.length > 1) {
        this.$store.dispatch('UPDATE_TREETAGS', { flag: 'one', tag: this.activeTag })
        this.scrollTo(0)
      }
    },
    getWrapWidth () {
      return $('.iridium-tree-tags-list-wrap').outerWidth()
    },
    scrollTo (offset) {
      $('.iridium-tree-tags-list').animate({'left': offset + 'px'})
    },
    getPositionIndex (tag) {
      let index = this.treeTags.findIndex(item => item.routeName === tag.routeName)
      index = index < 0 ? 0 : index
      return index
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
    getListWidth () {
      let listWidth = 0
      $('.iridium-tree-tags-item').each(function () {
        listWidth += $(this).outerWidth(true)
      })
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
    }
  },
  mounted () {
    this.$store.dispatch('UPDATE_WRAPWIDTH', this.getWrapWidth())
  }
}
</script>

<style>
@import '../../assets/css/_variables.css';
@component tree-tags {
  position: relative;
  font-size: var(--fontSmaller);
  color: #999;
  height: 25px;
  border-top: 1px solid var(--borderColor);
  border-bottom: 1px solid var(--borderColor);
  @descendent btn {
    position: absolute;
    z-index: 2;
    top: 0;
    background: #fff;
    font-size: inherit;
    color: #999;
    height: 25px;
    margin: -1px 0 0;
  }
  @descendent list-wrap {
    position: absolute;
    left: 32px;
    right: 156px;
    height: 24px;
    overflow: hidden;
  }
  @descendent list {
    position: absolute;
    top: 0;
    left: 0;
    width: 9999px;
    height: 24px;
    overflow: hidden;
  }
  @descendent item {
    background: #fff;
    float: left;
    line-height: 23px;
    border-right: 1px solid var(--borderColor);
    padding: 0 10px;
    cursor: pointer;
    list-style: none;
    transition: all var(--transitionDuration) var(--transitionTimingFuction);
    &:hover {
      background: var(--whiteColorDark);
      color: var(--treeColorDark);
    }
    & .fa {
      color: #ccc;
      &:hover {
        color: var(--dangerColor);
      }
    }
    &.iridium-tree-tags-item--active {
      background: var(--treeBgColorDark);
      color: var(--treeColor);
      &:hover {
        color: var(--treeColorDark);
      }
    }
    @modifier active {
    }
  }
  @descendent dropdown {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 30px;
    width: 90px;
    font-size: inherit;
    background: #fff;
    line-height: 23px;
    margin: -1px 0 0;
    &:hover .iridium-dropdown-title {
      height: 25px;
    }
    & .iridium-dropdown-title {
      top: calc(100% + 3px);
      height: 25px;
      padding:0;
      padding-right: 12px;
    }
    & .iridium-dropdown-list {
      top: calc(100%);
    }
  }
  @modifier prev {
    position: absolute;
    left: 0;
  }
  @modifier next {
    right: 119px;
  }
  @modifier exit {
    right: 1px;
    width: 60px;
    padding: 0;
  }
}
.icon-close{
  font-size: 13px;
  margin-left: 4px;
}
.iridium-btn-outline{
  padding: 2px 8px;
}
.icon-rightArrow, .icon-leftArrow {
  font-size: 14px;
}

</style>
