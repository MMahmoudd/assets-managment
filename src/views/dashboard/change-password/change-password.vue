<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ $t('navbar.changePassword') }}
      </v-card-title>
      <template>
        <form
          @submit.prevent="submitForm()"
        >
          <v-container fluid>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="data.currentPassword"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show2 ? 'text' : 'password'"
                  counter
                  required
                  outlined
                  minlength="8"
                  :label="$t('login.currentPassword')"
                  :placeholder="$t('login.currentPassword')"
                  @click:append="show2 = !show2"
                />
              </v-col>

              <v-col
                cols="12"
              >
                <v-text-field
                  v-model="data.newPassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  counter
                  required
                  outlined
                  minlength="8"
                  :label="$t('login.newPassword')"
                  :placeholder="$t('login.newPassword')"
                  @click:append="show1 = !show1"
                />
              </v-col>
            </v-row>
            <v-btn
              type="submit"
              class="mx-auto my-auto d-flex"
              color="indigo"
              :loading="loading"
              :disabled="disabled"
            >
              {{ $t('actions.save') }}
            </v-btn>
          </v-container>
        </form>
      </template>
    </v-card>
    <v-snackbar
      v-model="successSnackbar"
      color="success"
      shaped
      absolute
      bottom
      right
      :timeout="timeout"
    >
      {{ successMessage }}
    </v-snackbar>
    <v-snackbar
      v-model="errorSnackbar"
      color="red"
      shaped
      absolute
      bottom
      right
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const Service = ServiceFactory.get('Authentication')
  export default {
    name: 'ChangePassword',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        currentPassword: '',
        newPassword: '',
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
      },
      show1: false,
      show2: false,
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        this.updateContent(this.data)
      },
      async updateContent (data) {
        const item = await Service.changePassword(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/')
          }, 1500)
        } else {
          this.errorMessage = item.message
          this.errorSnackbar = true
        }
        this.loading = false
        this.disabled = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
