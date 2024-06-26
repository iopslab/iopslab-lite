import * as Vue from 'vue'
import * as VueRouter from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'
import request from '../api/request'
import stats from '../utils/stats'
import store from '../store'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
 **/
export const constantRouterMap = [
  {
    path: '/login',
    component: Vue.defineAsyncComponent(() => import('../views/login/Login')),
    hidden: true,
  },
  {
    path: '/404',
    component: Vue.defineAsyncComponent(() => import('../views/404')),
    hidden: true,
  },
  { path: '/', redirect: '/spiders' },

  // Crawlab Pages
  // {
  //   path: '/home',
  //   component: Layout,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('../views/home/Home'),
  //       meta: {
  //         title: 'Home',
  //         icon: 'fa fa-home'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/spiders',
    component: Layout,
    meta: {
      title: 'Spider',
      icon: 'fa fa-bug',
    },
    children: [
      {
        path: '',
        name: 'SpiderList',
        component: () => import('../views/spider/SpiderList'),
        meta: {
          title: 'Spiders',
          icon: 'fa fa-bug',
        },
      },
      // {
      //   path: ':id',
      //   name: 'SpiderDetail',
      //   component: () => import('../views/spider/SpiderDetail'),
      //   meta: {
      //     title: 'Spider Detail',
      //     icon: 'fa fa-circle-o'
      //   },
      //   hidden: true
      // }
    ],
  },
  {
    path: '/tasks',
    component: Layout,
    meta: {
      title: 'Task',
      icon: 'fa fa-list',
    },
    children: [
      {
        path: '',
        name: 'TaskList',
        component: () => import('../views/task/TaskList'),
        meta: {
          title: 'Tasks',
          icon: 'fa fa-list',
        },
      },
      {
        path: ':id',
        name: 'TaskDetail',
        component: () => import('../views/task/TaskDetail'),
        meta: {
          title: 'Task Detail',
          icon: 'fa fa-circle-o',
        },
        hidden: true,
      },
    ],
  },
  {
    path: '/schedules',
    component: Layout,
    meta: {
      title: 'Schedules',
      icon: 'fa fa-calendar',
    },
    hidden: false,
    children: [
      {
        path: '',
        name: 'ScheduleList',
        component: () => import('../views/schedule/ScheduleList'),
        meta: {
          title: 'Schedules',
          icon: 'fa fa-calendar',
        },
      },
    ],
  },
  // {
  //   path: '/setting',
  //   component: Layout,
  //   meta: {
  //     title: 'Setting',
  //     icon: 'fa fa-gear'
  //   },
  //   children: [
  //     {
  //       path: '',
  //       name: 'Setting',
  //       component: () => import('../views/setting/Setting'),
  //       meta: {
  //         title: 'Setting',
  //         icon: 'fa fa-gear'
  //       }
  //     }
  //   ]
  // },

  { path: '/:pathMatch(.*)*', redirect: '/404', hidden: true },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: constantRouterMap, // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    top: 0,
  }),
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    window.document.title = `Crawlab Lite - ${to.meta.title}`
  } else {
    window.document.title = 'Crawlab Lite'
  }

  if (['/login', '/signup'].includes(to.path)) {
    next()
  } else {
    if (window.localStorage.getItem('token')) {
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(async (to, from, next) => {
  if (to.path) {
    const res = await request.get('/version')
    const version = res.data.data
    store.commit('version/SET_VERSION', version)
    sessionStorage.setItem('v', version)
    stats.sendPv(to.path)
  }
})

export default router
