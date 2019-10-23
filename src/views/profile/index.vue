<template>
  <div class="app-container">
    <div v-if="user">
      <account :user="user" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: 'activity'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ])
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.user = this.userInfo
    }
  }
}
</script>
