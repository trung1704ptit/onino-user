import { login, logout, getInfo, register, verify, updateProfile } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  email: '',
  fullName: '',
  dateOfBirth: '',
  gender: '',
  avatar: '',
  introduction: '',
  phoneNumber: '',
  roles: [],
  user: {},
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
    state.fullName = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_DATE_OF_BIRTH: (state, dateOfBirth) => {
    state.dateOfBirth = dateOfBirth
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_PROFILE: (state, user) => {
    state.name = user.fullName;
    state.fullName = user.fullName;
    state.address = user.address;
    state.dateOfBirth = user.dateOfBirth;
    state.email = user.email;
    state.gender = user.gender;
    state.phoneNumber = user.phoneNumber;
    state.profile = user.profile;
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
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
        commit('SET_USER_INFO', response);
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // update user profile
  updateProfile({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      updateProfile(userInfo).then(response => {
        commit('SET_USER_PROFILE', response);
        resolve();
      }).catch(error => {
        reject(error)
      })
    })
  },

  // upload avatar
  uploadAvatar({ commit }, avatar) {
    return new Promise((resolve, reject) => {
      this.uploadAvatar(avatar).then(response => {
        commit('UPDATE_AVATAR', response.avatarURL);
        resolve();
      }).catch(error => {
        reject(error)
      })
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { authorities } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', authorities, { root: true })

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
