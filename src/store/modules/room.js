import { getGroupIcons, createRoom, getAllRoom, deleteRoom, getInfo, updateRoom } from '@/api/room'
import i18n from '@/lang';

const state = {
    groupIcons: [],
    roomList: [],
    roomListLoaded: false
}

const mutations = {
    SET_GROUP_ICONS: (state, groupIcons) => {
        state.groupIcons = groupIcons
    },
    GET_ALL_ROOMS: (state, roomList) => {
        state.roomList = roomList
        state.roomListLoaded =  true
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
                commit('GET_ALL_ROOMS', response.groups)
            }).catch(error => {
                reject(error)
            })
        })
    },
    deleteRoom({ commit, state}, groupId) {
        return new Promise((resolve, reject) => {
            deleteRoom(groupId).then(response => {
                const allRom = state.roomList;
                const newRoomList= allRom.filter(room => room.id !== groupId);
                commit('SET_ROOMS', newRoomList);
                resolve(response);
            }).catch(error => {
                reject(error)
            })
        })
    },
    getInfo({ commit, state }, groupId) {
        return new Promise((resolve, reject) => {
            getInfo(groupId).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },
    updateRoom({ commit, state }, data) {
        return new Promise((resolve, reject) => {
            const groupId = data.id;
            delete data.id;
            updateRoom(data, groupId).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
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
