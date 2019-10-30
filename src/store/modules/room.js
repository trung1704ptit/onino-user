import { getGroupIcons } from '@/api/room'
import i18n from '@/lang';

const state = {
    groupIcons: []
}

const mutations = {
    SET_GROUP_ICONS: (state, groupIcons) => {
        state.groupIcons = groupIcons
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
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
