<template>
  <el-card style="margin-bottom:20px;">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <div slot="header" class="clearfix">
          <span>{{ $t('navbar.userInfo') }}</span>
        </div>

        <div class="user-profile">
          <div class="box-center">
            <pan-thumb :image="avatarPreview" :height="'200px'" :width="'200px'" :hoverable="false">
              <div>{{ $t('root.hello') }}</div>
              {{ user.profile.fullName }}
            </pan-thumb>
          </div>
          <div class="box-center">
            <div class="user-name text-center">{{ user.profile.fullName }}</div>
            <!-- <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div> -->
          </div>
          <br />

          <!-- <input ref="avatar-upload-input" class="d-none" type="file" accept="image/*" @change="handleClickUpload"> -->
          <!-- <el-button size="mini" type="success" icon="el-icon-upload" class="box-center" @click="handleUpload">Thay đổi Avatar</el-button> -->
          <image-uploader
              :preview="false"
              :className="['fileinput', { 'fileinput--loaded': hasImage }]"
              capture="environment"
              :debug="1"
              :maxWidth="200"
              doNotResize="gif"
              :autoRotate="true"
              outputFormat="verbose"
              @input="setImage"
            >
              <label for="fileInput" slot="upload-label">
                <el-button for="fileInput" slot="upload-label" size="mini" type="success" icon="el-icon-upload" class="box-center upload-caption" @click="handleClickUpload">Thay đổi Avatar</el-button>
              </label>

          </image-uploader>
        </div>
      </el-col>

      <el-col :span="18" :xs="24">
        <el-form ref="updateForm" :model="updateForm" :rules="updateRules" class="form-wrapper form-wrapper" autocomplete="off" label-position="left">
          <el-form-item prop="fullName" class="el-form-item">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="fullName"
              v-model="updateForm.fullName"
              :placeholder="$t('root.fullName')"
              name="fullName"
              type="text"
              tabindex="1"
            />
          </el-form-item>

          <el-form-item prop="phoneNumber" class="el-form-item">
            <span class="svg-container">
              <i class="el-icon-phone" />
            </span>
            <el-input
              ref="phoneNumber"
              v-model="updateForm.phoneNumber"
              :placeholder="$t('root.phone')"
              name="phoneNumber"
              type="text"
              tabindex="1"
            />
          </el-form-item>

          <el-form-item prop="email" class="el-form-item">
            <span class="svg-container">
              <svg-icon icon-class="email" />
            </span>
            <el-input
              ref="email"
              v-model="updateForm.email"
              placeholder="Email"
              name="email"
              type="text"
              tabindex="1"
            />
          </el-form-item>

          <el-form-item prop="address" class="el-form-item">
            <span class="svg-container">
              <i class="el-icon-location" />
            </span>
            <el-input
              ref="address"
              v-model="updateForm.address"
              :placeholder="$t('root.address')"
              name="address"
              type="text"
              tabindex="1"
            />
          </el-form-item>

          <el-form-item>
            <el-button :loading="updating" type="primary" @click.native.prevent="updateProfile">{{ $t('root.update') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { isEmpty, validEmail } from '@/utils/validate'
import codes from '@/utils/country-code'
import i18n from '@/lang'
import PanThumb from '@/components/PanThumb'
import Vue from 'vue'
import { dataURLtoFile } from '@/utils'
import ImageUploader from "vue-image-upload-resize";

Vue.use(ImageUploader);

export default {
  components: { PanThumb },
  props: {
    user: {}
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!isEmpty(value) && !validEmail(value)) {
        callback(new Error(i18n.t('root.incorrectEmail')))
      } else {
        callback()
      }
    }
    const validateEmpty = (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error(i18n.t('root.emptyString')))
      } else {
        callback()
      }
    }
    const noValidate = (rule, value, callback) => {
      callback()
    }
    return {
      hasImage: false,
      image: null,
      updating: false,
      updateForm: {
        fullName: this.user.profile.fullName,
        email: this.user.profile.email,
        phoneNumber: this.user.profile.phoneNumber,
        address: this.user.profile.address,
        avatarURL: this.user.profile.avatarURL,
        dateOfBirth: this.user.profile.dateOfBirth,
        gender: this.user.profile.gender
      },
      updateRules: {
        email: [{ required: false, trigger: 'blur', validator: validateEmail }],
        fullName: [{ required: false, trigger: 'blur', validator: validateEmpty }],
        phoneNumber: [{ required: false, trigger: 'blur', validator: noValidate }],
        address: [{ required: false, trigger: 'blur', validator: noValidate }]
      },
      avatarPreview: this.user.profile.avatarURL,
      avatarUploaded: null
    }
  },
  methods: {
    updateProfile() {
      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          const form = this.updateForm
          this.updating = true
          let phone = form.phoneNumber
          if (phone.length > 7 && phone.indexOf(codes.vn) === -1) {
            phone = codes.vn + phone.substr(1)
          }

          let data = {
            email: form.email,
            fullName: form.fullName,
            address: form.address,
            phoneNumber: phone,
            avatarURL: form.avatarURL,
            dateOfBirth: form.dateOfBirth,
            gender: form.gender
          }

          if (this.avatarUploaded) {
            const formData = new FormData()
            formData.append('file', this.avatarUploaded)

            const response = await this.$store.dispatch('user/uploadAvatar', formData)
            if (response && response.data && response.data.avatarURL) data.avatarURL = response.data.avatarURL
          }
          this.$store.dispatch('user/updateProfile', data).then(() => {
            this.updating = false
            this.$message({
              message: i18n.t('profile.updateProfileSuccess'),
              type: 'success',
              showClose: true,
              duration: 4000
            })
            location.reload();
          })
        } else {
          this.updating = false
          return false
        }
      })
    },
    handleUpload() {
      this.$refs['avatar-upload-input'].click()
    },
    handleClickUpload(e) {
      // const avatar = e.target.files[0]
      // this.avatarPreview = URL.createObjectURL(avatar)
      // this.avatarUploaded = avatar;
      document.getElementById("fileInput").click()
    },
    setImage: function(output) {
      this.avatarPreview = output.dataUrl
      this.avatarUploaded = dataURLtoFile(output.dataUrl, 'avatar-user.png');
    },
  }
}
</script>

<style>
  #fileInput {
    display: none;
  }
</style>

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
