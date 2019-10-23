<template>
    <div class="forgot-password-container">
        <lang-select class="set-language" />
        <el-form ref="forgotPasswordForm" :model="forgotPasswordForm" :rules="forgotPasswordRules" class="form-wrapper forgot-password-form" aria-autocomplete="off" label-position="left">
            <div class="flex">
                <img src="../../assets/img/onino-logo.png" class="onino-logo"/>
            </div>
            <el-form-item prop="email" class="el-form-item">
                <span class="svg-container">
                    <svg-icon icon-class="email" />
                </span>
                <el-input
                    ref="email"
                    v-model="forgotPasswordForm.email"
                    placeholder="email"
                    name="email"
                    type="email"
                    tabindex="1"
                />
            </el-form-item>

            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleResetPassword">{{ $t('login.resetPassword') }}</el-button>

            <div class="flex link-direction app-link">
                <router-link to="/login">
                {{ $t('login.logIn') }}?
                </router-link>

                <router-link to="/register">
                {{ $t('login.register') }}?
                </router-link>
            </div>
        </el-form>
    </div>
</template>

<script>
import { validEmail } from '@/utils/validate'
import LangSelect from '@/components/LangSelect'
import i18n from '@/lang'

export default {
    name: 'ForgotPassword',
    components: { LangSelect },
    data() {
        const validateEmail = (rule, value, callback) => {
            if (!validEmail(value)) {
                callback(new Error(i18n.t('forgotPassword.incorrectEmail')))
            } else {
                callback();
            }
        }
        return {
            forgotPasswordForm: {
                email: ''
            },
            forgotPasswordRules: {
                email: [{ required: true, trigger: 'blur', validator: validateEmail }]
            },
            loading: false,
        }
    },
    mounted() {
        if (this.forgotPasswordForm.email === '') {
            this.$refs.email.focus();
        }
    },
    methods: {
        handleResetPassword() {
            this.$refs.forgotPasswordForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                }
            })
        }
    },
    created() {
        const hash = window.location.search.slice(1)
        if (window.localStorage) {
            window.localStorage.setItem('x-admin-oauth-code', hash)
            window.close()
        }
    },
    render: function(h) {
        return h() // avoid warning message
    }
}
</script>

<style lang="scss" scoped>
$dark_gray:#889aa4;

.forgot-password-container {
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

  .onino-logo {
    width: 150px;
    height: 50px;
    margin: 0 auto 40px auto;
  }

  .forgot-password-form {
    position: relative;
    min-width: 500px;
    background-color: #FFF;
    border-radius: 4px;
    max-width: 100%;
    padding: 50px 35px;
    margin: auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    position: absolute;
    width: 30px;
    display: inline-block;
    z-index: 1;
  }

  @media only screen and (max-width: 470px) {
    .forgot-password-form {
      min-width: 90%
    }
  }
}
</style>
