import { login, logout, getInfo, register, verify } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  user: {}
}

const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    state.user = userInfo
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const user = `username=${username}&password=${password}&grant_type=password`;

      login(user).then(response => {
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit }, userInfo){
    const { username, email, phone, password } = userInfo;
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password, role: "ROLE_USER" }).then(response => {
        // const { data } = response
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  verify({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      verify({ username: userInfo.username, verificationCode: userInfo.verificationCode }).then(response => {
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        if (!response) {
          reject('Verification failed, please Login again.')
        }

        const { authorities } = response

        // roles must be a non-empty array
        if (!authorities || authorities.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', authorities)
        commit('SET_NAME', response.profile.fullName)
        commit('SET_AVATAR', response.profile.avatarURL)
        commit('SET_INTRODUCTION', '')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  // logout({ commit, state, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       commit('SET_ROLES', [])
  //       removeToken()
  //       resetRouter()

  //       // reset visited views and cached views
  //       // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //       dispatch('tagsView/delAllViews', null, { root: true })

  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  // resetToken({ commit }) {
  //   return new Promise(resolve => {
  //     commit('SET_TOKEN', '')
  //     commit('SET_ROLES', [])
  //     removeToken()
  //     resolve()
  //   })
  // },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
