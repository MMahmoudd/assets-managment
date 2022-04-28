<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('assetsStatus.editStatus') : $t('assetsStatus.addStatus') }}
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
              >
                <v-combobox
                  v-model="data.assetStatusDesc"
                  :items="LKP"
                  outlined
                  :label="$t('assetsStatus.assetStatusDesc')"
                  required
                />
                <v-chip
                  medium
                  color="orange"
                >
                  IF YOU ADD NEW DATA MUST PRESS ON ENTER BUTTON BEFORE PRESS ON ADD BUTTON
                </v-chip>
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
  const AssetsStatusService = ServiceFactory.get('AssetsStatus')
  export default {
    name: 'StatusForm',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        assetStatusId: null,
        assetStatusDesc: '',
      },
      LKP: [],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    created () {
      if (this.$route.params.id) {
        this.fetchOneItem(this.$route.params.id)
      }
      this.getLKPAssets()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            assetStatusId: this.data.assetStatusId,
            assetStatusDesc: this.data.assetStatusDesc,
          })
        } else {
          this.newItem(
            {
              assetStatusDesc: this.data.assetStatusDesc,
            },
          )
        }
      },
      async newItem (data) {
        const item = await AssetsStatusService.updateAddAssetsStatus(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Assets-status')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (data) {
        const item = await AssetsStatusService.updateAddAssetsStatus(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Assets-status')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const company = await AssetsStatusService.fetchOneItem(id)
        this.data = company.object
        this.dataLoading = false
      },
      async getLKPAssets () {
        this.dataLoading = true
        const LKPItems = await AssetsStatusService.getLKPStatus()
        LKPItems.list.forEach(item => { this.LKP.push(item.name) })
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
