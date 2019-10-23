<template>
  <div class="register-container">
    <lang-select class="set-language" />

    <el-form v-if="isNotRegistered" ref="registerForm" :model="registerForm" :rules="registerRules" class="form-wrapper" autocomplete="off" label-position="left">
      <div class="flex">
        <img src="../../assets/img/onino-logo.png" class="login-logo"/>
      </div>

      <el-form-item prop="email" class="el-form-item">
        <span class="svg-container">
          <svg-icon icon-class="email" />
        </span>
        <el-input
          ref="email"
          v-model="registerForm.email"
          placeholder="email"
          name="email"
          type="text"
          tabindex="1"
        />
      </el-form-item>

      <el-form-item prop="phone" class="el-form-item">
          <span class="svg-container">
            <i class="el-icon-phone" />
          </span>
          <el-input
          ref="phone"
          v-model="registerForm.phone"
          :placeholder="$t('root.phone')"
          name="phone"
          type="text" 
          tabindex="2"
          />
      </el-form-item>

      <el-form-item class="el-form-item">
        <label class="radio-label">Chọn Tên đăng nhập: </label>
        <div style="display:inline-block;">
          <el-radio-group v-model="registerForm.usernameOption">
            <el-radio label="email" border>
              Email
            </el-radio>
            <el-radio label="sms" border>
              SMS
            </el-radio>
          </el-radio-group>
        </div>
      </el-form-item>


      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password" class="el-form-item">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="registerForm.password"
            :type="passwordType"
            :placeholder="$t('login.password')"
            name="password"
            tabindex="3"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="confirmPassword" class="el-form-item">
          <span class="svg-container">
              <svg-icon icon-class="password" />
          </span>
          <el-input
              :key="passwordType"
              ref="confirmPassword"
              v-model="registerForm.confirmPassword"
              :type="passwordType"
              :placeholder="$t('register.confirmPassword')"
              name="confirmPassword"
              tabindex="4"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleRegister"
          />
          <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
          </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">
        {{ $t('root.register') }}
      </el-button>

      {{ $t('register.hasAccount') }}? <router-link
        to="/login"
        class="app-link"
      >
      {{ $t('root.login') }}
      </router-link>
    </el-form>


    <!-- Verify form -->
    <el-form v-if="!isNotRegistered" ref="verifyForm" :model="verifyForm" :rules="verifyRules" autocomplete="off" label-position="left" class="app-container m-auto" >
      <el-card class="box-card">
        <div slot="header" class="header-success">
          <span><i class="el-icon-success" /> {{ $t('register.activateAccount') }}</span>
        </div>
        <div class="box-item">
          <p>{{ $t('register.verifyByCode')}}</p>

          <el-form-item prop="verificationCode" class="el-form-item">
            <el-input v-model="verifyForm.verificationCode"
              ref="verificationCode"
              name="verificationCode"
              type="number"
              :placeholder="$t('register.verificationCode')"
              class="verify-code"
            />
          </el-form-item>

          <el-button :loading="verifying" type="primary" style="width:100%;margin-bottom:20px;" @click.native.prevent="handleVerify">
            {{ $t('register.activateAccount') }}
          </el-button>
        </div>

        {{ $t('register.hasAccount') }}? <router-link
          to="/login"
          class="app-link"
        >
        {{ $t('root.login') }}
        </router-link>
      </el-card>
    </el-form>
    <!-- end of verify form -->
  </div>
</template>

<script>
import { isEmpty, validEmail } from '@/utils/validate'
import codes from '@/utils/country-code'
import LangSelect from '@/components/LangSelect'
import i18n from '@/lang'

export default {
  name: 'Register',
  components: { LangSelect },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error(i18n.t('login.passwordError1')))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (this.registerForm.usernameOption === 'email' && !validEmail(value)) {
        callback(new Error(i18n.t('root.incorrectEmail')))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (this.registerForm.usernameOption === 'sms' && isEmpty(value)) {
        callback(new Error(i18n.t('root.emptyString')))
      } else {
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (isEmpty(value) || value !== this.registerForm.password) {
        callback(new Error(i18n.t('register.confirmPasswordError')))
      } else {
        callback()
      }
    }
    const validateVerificationCode = (rule, value, callback) => {
      if (value.length !== 6) {
        callback(new Error(i18n.t('register.verificationCodeError')))
      } else {
        callback()
      }
    }

    return {
      isNotRegistered: true,

      registerForm: {
        username: '',
        phone: '',
        password: '',
        confirmPassword: '',
        email: '',
        usernameOption: 'email'
      },
      verifyForm: {
        verificationCode: '',
      },
      registerRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        email: [{ required: false, trigger: 'blur', validator: validateEmail }],
        phone: [{ required: false, trigger: 'blur', validator: validatePhone }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: validateConfirmPassword }]
      },
      verifyRules: {
        verificationCode: [{ required: true, trigger: 'blur', validator: validateVerificationCode }],
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      verifying: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.$refs.email && this.registerForm.email === '') {
      this.$refs.email.focus()
    } else if (this.$refs.password && this.registerForm.password === '') {
      this.$refs.password.focus()
    } else if (this.$refs.verificationCode && this.verifyForm.verificationCode === '') {
      this.$refs.verificationCode.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          const registerForm = this.registerForm;
          let username = registerForm.email;
          let phone = '';
          if (registerForm.phone) {
            if (registerForm.phone.indexOf(codes.vn) == -1) {
              phone = codes.vn + registerForm.phone.substr(1);
            }
          }

          this.registerForm = {
            ...this.registerForm,
            username,
            phone
          }
          const registerData = {
            ...registerForm,
            username,
            phone
          }

          this.$store.dispatch('user/register', registerData)
            .then(() => {
              // this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
              this.isNotRegistered = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleVerify() {
      this.$refs.verifyForm.validate(valid => {
        if (valid) {
          this.verifying = true;

          const verifyData = {
            username: this.registerForm.username,
            verificationCode: this.verifyForm.verificationCode
          }

          this.$store.dispatch('user/verify', verifyData)
          .then(() => {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
            this.$message({
              message: i18n.t('register.verifySuccessful'),
              type: 'success',
              showClose: true,
              duration: 4000
            })
            this.verifying = false
          })
          .catch(() => {
            this.verifying = false
          })
        } else {
          return false;
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
.verify-code {
  input {
    text-align: center !important;
    padding: 0 !important;
  }
}
</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container, .forgot-password-container {
  min-height: 100%;
  width: 100%;
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('../../assets/img/login-bg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
  display: flex;

  .set-language {
    position: absolute;
    top: 30px;
    right: 30px;
    font-size: 18px;
    cursor: pointer;
  }

  .login-logo {
    width: 150px;
    height: 50px;
    margin: 0 auto 40px auto;
  }

  .tips {
    font-size: 14px;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
