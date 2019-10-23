<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>{{ $t('navbar.userInfo')}}</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="fileUploaded" :height="'200px'" :width="'200px'" :hoverable="false">
          <div>{{ $t('root.hello')}}</div>
          {{ user.profile.fullName }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.profile.fullName }}</div>
        <!-- <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div> -->
      </div>

      <input ref="avatar-upload-input" class="d-none" type="file" accept="image/*" @change="handleClickUpload">
      <el-button size="mini" type="success" icon="el-icon-upload" class="box-center" @click="handleUpload">Thay đổi Avatar</el-button>
    </div>

    <!-- <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>Education</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            JS in Computer Science from the University of Technology
          </div>
        </div>
      </div>
    </div> -->
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  props: {
    user: {}
  },
  data() {
    return {
      fileUploaded: this.user.profile.avatarURL
    }
  },
  methods: {
    handleUpload() {
      this.$refs['avatar-upload-input'].click()
    },
    handleClickUpload(e) {
      const avatar = e.target.files[0]
      console.log(avatar);
      this.fileUploaded = avatar;
    },
  }
}
</script>

<style lang="scss" scoped>
 .box-center {
   margin: 0 auto;
   display: table;
 }

 .text-muted {
   color: #777;
 }

 .user-profile {
   .user-name {
     font-weight: bold;
   }

   .box-center {
     padding-top: 10px;
   }

   .user-role {
     padding-top: 10px;
     font-weight: 400;
     font-size: 14px;
   }

   .box-social {
     padding-top: 30px;

     .el-table {
       border-top: 1px solid #dfe6ec;
     }
   }

   .user-follow {
     padding-top: 20px;
   }
 }

 .user-bio {
   margin-top: 20px;
   color: #606266;

   span {
     padding-left: 4px;
   }

   .user-bio-section {
     font-size: 14px;
     padding: 15px 0;

     .user-bio-section-header {
       border-bottom: 1px solid #dfe6ec;
       padding-bottom: 10px;
       margin-bottom: 10px;
       font-weight: bold;
     }
   }
 }
</style>
