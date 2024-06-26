import * as Vue from 'vue'
import * as Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import spider from './modules/spider'
import deploy from './modules/deploy'
import task from './modules/task'
import file from './modules/file'
import schedule from './modules/schedule'
import lang from './modules/lang'
import stats from './modules/stats'
import version from './modules/version'
import doc from './modules/doc'
import getters from './getters'

const store = Vuex.createStore({
  modules: {
    app,
    user,
    tagsView,
    spider,
    deploy,
    task,
    file,
    schedule,
    lang,
    version,
    doc,
    stats,
  },
  getters,
})

export default store
