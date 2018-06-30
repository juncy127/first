const ADD_TREETAG = 'ADD_TREETAG'
const REMOVE_TREETAG = 'REMOVE_TREETAG'
const UPDATE_TREETAGS = 'UPDATE_TREETAGS'
const UPDATE_ACTIVETAG = 'UPDATE_ACTIVETAG'
const UPDATE_POSITIONTAG = 'UPDATE_POSITIONTAG'
const UPDATE_WRAPWIDTH = 'UPDATE_WRAPWIDTH'
const UPDATE_OFFSET = 'UPDATE_OFFSET'

const homeTag = { title: '首页', routeName: 'IridiumHome' }

const state = {
  treeTags: [],
  homeTag: homeTag,
  activeTag: homeTag,
  positionTag: homeTag,
  wrapWidth: 0
  // listOffset: 0
}

const mutations = {
  [ADD_TREETAG] (state, data) {
    state.treeTags.push(data)
  },
  [REMOVE_TREETAG] (state, index) {
    state.treeTags.splice(index, 1)
  },
  [UPDATE_TREETAGS] (state, data) {
    state.treeTags = data
  },
  [UPDATE_ACTIVETAG] (state, data) {
    state.activeTag = data
  },
  [UPDATE_POSITIONTAG] (state, data) {
    state.positionTag = data
  },
  [UPDATE_WRAPWIDTH] (state, data) {
    state.wrapWidth = data
  },
  [UPDATE_OFFSET] (state, data) {
    state.listOffset = data
  }
}

const actions = {
  UPDATE_TREETAGS ({state, commit}, data) {
    let { flag, tag } = data
    switch (flag) {
      case 'add':
        commit(ADD_TREETAG, tag)
        commit(UPDATE_ACTIVETAG, tag)
        break
      case 'reset':
        commit(UPDATE_TREETAGS, [])
        commit(UPDATE_ACTIVETAG, homeTag)
        commit(UPDATE_POSITIONTAG, homeTag)
        break
      case 'one':
        commit(UPDATE_TREETAGS, [tag])
        commit(UPDATE_ACTIVETAG, tag)
        commit(UPDATE_POSITIONTAG, homeTag)
        break
      case 'remove':
        commit(REMOVE_TREETAG, data.removeTagIndex)
        break
      default:
        break
    }
  },
  UPDATE_ACTIVETAG ({commit}, data) {
    commit(UPDATE_ACTIVETAG, data)
  },
  UPDATE_WRAPWIDTH ({commit}, data) {
    commit(UPDATE_WRAPWIDTH, data)
  },
  UPDATE_POSITIONTAG ({commit}, data) {
    commit(UPDATE_POSITIONTAG, data)
  },
  UPDATE_OFFSET ({commit}, data) {
    commit(UPDATE_OFFSET, data)
  }
}

const getters = {
  getTreeTags (state) {
    return state.treeTags
  },
  getHomeTag (state) {
    return state.homeTag
  },
  getActiveTreeTag (state) {
    return state.activeTag
  },
  getPositionTreeTag (state) {
    return state.positionTag
  },
  getTreeTagsWrapWidth (state) {
    return state.wrapWidth
  },
  getTreeTagsOffset (state) {
    return state.listOffset
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
