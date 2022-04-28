<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ $t('employee.AssignAssetToEmployee') }}
      </v-card-title>
      <template>
        <v-form
          v-model="valid"
          @submit.prevent="submitForm()"
        >
          <v-container fluid>
            <v-row class="mx-md-16 px-md-16">
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.employeeId"
                  :items="LKPEmployee"
                  item-text="name"
                  item-value="id"
                  :label="$t('employee.username')"
                  outlined
                  @input="getLKPAssets()"
                  @change="getLKPAssets()"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.arrAssetId"
                  :items="LKPAssets"
                  item-text="name"
                  item-value="id"
                  :label="$t('employee.assets')"
                  outlined
                  multiple
                  chips
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
              {{ this.$route.params.id ? $t('actions.save') : $t('actions.add') }}
            </v-btn>
          </v-container>
        </v-form>
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
  const Service = ServiceFactory.get('Employee')
  const AssetsService = ServiceFactory.get('Assets')
  export default {
    name: 'EmployeeForm',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        employeeId: 0,
        arrAssetId: [],
      },
      LKPEmployee: [],
      LKPAssets: [],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    created () {
      this.getLKPEmployee()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        const form = {
          employeeId: this.data.employeeId,
          arrAssetId: this.data.arrAssetId,

        }
        if (this.$route.params.id) {
          this.updateContent(form)
        } else {
          this.newItem(form)
        }
      },
      async newItem (data) {
        const item = await Service.AddOrUpdate(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/employee')
          }, 1500)
        } else {
          this.errorMessage = item.message
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (data) {
        const item = await Service.AddOrUpdate(data)
        console.log('update Content item', data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/employee')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async getLKPEmployee () {
        this.dataLoading = true
        const user = await Service.getLKPEmployee()
        console.log('user', user)
        this.LKPEmployee = user.list
        this.dataLoading = false
      },
      async getLKPAssets () {
        this.dataLoading = true
        const LKP = await AssetsService.getLKPAsset()
        this.LKPAssets = LKP.list
        this.dataLoading = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
