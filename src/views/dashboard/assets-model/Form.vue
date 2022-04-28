<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('assetModel.editModel') : $t('assetModel.addModel') }}
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
                <v-combobox
                  v-model="data.assetModelName"
                  :items="LKP"
                  outlined
                  :label="$t('assetModel.assetModelName')"
                  required
                />
                <v-chip
                  small
                  color="orange"
                >
                  IF YOU ADD NEW DATA MUST PRESS ON ENTER BUTTON BEFORE PRESS ON ADD BUTTON
                </v-chip>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.assetBrandId"
                  :items="LKPBrand"
                  item-text="name"
                  item-value="id"
                  :label="$t('assetModel.chooseBrand')"
                  outlined
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
      center
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
      center
      :timeout="timeout"
    >
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const AssetsModelService = ServiceFactory.get('AssetsModel')
  const AssetsBrandService = ServiceFactory.get('AssetsBrand')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        assetModelId: null,
        assetBrandId: null,
        assetModelName: '',
      },
      LKP: [],
      LKPBrand: [],
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
      this.getLKPBrand()
      this.getLKPAssets()
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            assetModelId: this.data.assetModelId,
            assetModelName: this.data.assetModelName,
            assetBrandId: this.data.assetBrandId,
          })
        } else {
          this.newItem(
            {
              assetModelName: this.data.assetModelName,
              assetBrandId: this.data.assetBrandId,
            },
          )
        }
      },
      async newItem (data) {
        const item = await AssetsModelService.updateAddAssetsModel(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            if (this.$route.name === 'Assets Model Form') {
              this.$router.push('/Assets-model')
            } else {
              this.data.assetBrandId = null
              this.data.assetModelName = ''
            }
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (data) {
        const item = await AssetsModelService.updateAddAssetsModel(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Assets-model')
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
        const company = await AssetsModelService.fetchOneItem(id)
        this.data = company.object
        this.dataLoading = false
      },
      async getLKPAssets () {
        this.dataLoading = true
        const LKPItems = await AssetsModelService.getLKPModel()
        LKPItems.list.forEach(item => { this.LKP.push(item.name) })
        this.dataLoading = false
      },
      async getLKPBrand () {
        this.dataLoading = true
        const LKPBrand = await AssetsBrandService.getLKPBrand()
        this.LKPBrand = LKPBrand.list
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
