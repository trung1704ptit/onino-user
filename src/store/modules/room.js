import { getGroupIcons, createRoom, getAllRoom } from '@/api/room'
import i18n from '@/lang';

const state = {
    groupIcons: [],
    roomList: [],
}

const mutations = {
    SET_GROUP_ICONS: (state, groupIcons) => {
        state.groupIcons = groupIcons
    },
    SET_ROOMS: (state, roomList) => {
        state.roomList = roomList
    }
}

const actions = {
    setGroupIcons({ commit }, groupIcons) {
        commit('SET_GROUP_ICONS', groupIcons)
    },
    getGroupIcons({ commit, state }) {
        return new Promise((resolve, reject) => {
            getGroupIcons().then(response => {
                if (!response) {
                    reject(i18n.t('root.somethingWentWrong'))
                }
                commit('SET_GROUP_ICONS', response)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    createRoom({ commit, state}, data) {
        return new Promise((resolve, reject) => {
            createRoom(data).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    getAllRoom({ commit, state}) {
        return new Promise((resolve, reject) => {
            getAllRoom().then(response => {
                resolve(response.groups);
                commit('SET_ROOMS', response.groups)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
