import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { title: 'login', icon: 'login', noCache: true }
  },
  {
    path: '/forgot-password',
    component: () => import('@/views/forgot-password/index'),
    hidden: true,
    meta: { title: 'forgotPassword', icon: 'guide', noCache: true }
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
    meta: { title: 'register', icon: 'guide', noCache: true }
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/camera',
    component: Layout,
    redirect: '/camera/CameraSlide',
    name: 'Camera',
    meta: {
      title: 'camera',
      icon: 'fa fa-camera'
    },
    children: [
      {
        path: 'tat-ca',
        component: () => import('@/views/camera/CameraGrid'),
        meta: { title: 'camera' }
      },
      {
        path: 'chi-tiet',
        component: () => import('@/views/camera/CameraDetail'),
        meta: { title: 'camera', icon: 'eye-open' },
        hidden: true
      }
    ]
  },
  {
    path: '/room',
    component: Layout,
    redirect: '/room/tat-ca',
    name: 'Room',
    meta: {
      title: 'room',
      icon: 'fa fa-windows'
    },
    children: [
      {
        path: 'tat-ca',
        component: () => import('@/views/room/RoomGrid'),
        meta: { title: 'roomList', icon: 'fa fa-th', noCache: true }
      },
      {
        path: 'them-moi',
        component: () => import('@/views/room/CreateRoom'),
        meta: { title: 'newRoom', icon: 'fa fa-plus-square', noCache: true },
      },
      {
        path: 'chi-tiet/:id',
        component: () => import('@/views/room/RoomDetail/index'),
        meta: { title: 'roomDetail', icon: 'eye-open', noCache: true },
        hidden: true
      },
      {
        path: 'thiet-bi/:id',
        component: () => import('@/views/room/RoomDetail/DeviceDetail'),
        meta: { title: 'device', icon: 'eye-open', noCache: true },
        hidden: true
      },
      {
        path: 'cap-nhat/:id',
        component: () => import('@/views/room/EditRoom'),
        meta: { title: 'update', icon: 'eye-open', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/cau-hinh',
    component: Layout,
    meta: {
      title: 'configuration',
      icon: 'fa fa-cogs'
    },
    children: [
      {
        path: 'tat-ca',
        component: () => import('@/views/ConfigurationTemplate/Grid'),
        name: 'Cau hinh',
        meta: { title: 'all', icon: 'fa fa-th', noCache: true },
      },
      {
        path: 'chi-tiet/:id',
        component: () => import('@/views/ConfigurationTemplate/Detail/index'),
        name: 'Cau hinh',
        meta: { title: 'configurationDetail', icon: 'fa fa-cogs', noCache: true },
        hidden: true
      },
      {
        path: 'them-moi',
        component: () => import('@/views/ConfigurationTemplate/Create/index'),
        name: 'Cau hinh',
        meta: { title: 'addNewConfiguration', icon: 'fa fa-plus-square', noCache: true },
      }
    ]
  },
  {
    path: '/thong-ke',
    component: Layout,
    redirect: '/thong-ke/dien-nang',
    name: 'thongke',
    meta: {
      title: 'summary',
      icon: 'fa fa-line-chart'
    },
    children: [
      {
        path: 'dien-nang',
        component: () => import('@/views/summary/electric/index'),
        name: 'Electric',
        meta: { title: 'electric', icon: 'fa fa-bolt', noCache: true }
      },
      {
        path: 'nuoc',
        component: () => import('@/views/summary/water/index'),
        name: 'Water',
        meta: { title: 'water', icon: 'fa fa-tint', noCache: true }
      },
      {
        path: 'gas',
        component: () => import('@/views/summary/gas/index'),
        name: 'Gas',
        meta: { title: 'Gas', icon: 'fa fa-fire', noCache: true }
      }
    ]
  },
  {
    path: '/thong-bao',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Thong bao',
        meta: { title: 'notification', icon: 'fa fa-bell', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile',
    children: [
      {
        path: '',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/cai-dat',
    component: Layout,
    redirect: '/cai-dat',
    children: [
      {
        path: '',
        component: () => import('@/views/setting/index'),
        name: 'Setting',
        meta: { title: 'setting', icon: 'fa fa-cog', noCache: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'createArticle', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'editArticle', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'articleList', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  hash: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
