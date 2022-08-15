<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('assetsType.editType') : $t('assetsType.addType') }}
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
                  :items="LKP"
                  outlined
                  :label="$t('assetsType.assetTypeDesc')"
                  required
                  @keypress="addName"
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-select
                  v-model="data.assetCategoryId"
                  :items="LKPCategory"
                  item-text="name"
                  item-value="id"
                  :label="$t('assetsType.chooseCategory')"
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
  const AssetsTypeService = ServiceFactory.get('AssetsType')
  const AssetsCategoryService = ServiceFactory.get('AssetsCategory')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      data: {
        assetTypeId: null,
        assetTypeDesc: '',
        assetCategoryId: null,
      },
      LKPCategory: [],
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
      this.getLKPCategory()
      this.getLKPAssets()
    },
    methods: {
      addName (event) {
        setTimeout(() => {
          // this.LKP.push(event.target.value)
          this.data.assetTypeDesc = event.target.value
          console.log('LKP', event.target.value)
        }, 3000)
      },
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            assetTypeId: this.data.assetTypeId,
            assetTypeDesc: this.data.assetTypeDesc,
            assetCategoryId: this.data.assetCategoryId,
          })
        } else {
          this.newItem(
            {
              assetTypeDesc: this.data.assetTypeDesc,
              assetCategoryId: this.data.assetCategoryId,
            },
          )
        }
      },
      async newItem (data) {
        const item = await AssetsTypeService.updateAddAssetsType(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            if (this.$route.name === 'Assets Type Form') {
              this.$router.push('/Assets-type')
            } else {
              this.data.assetTypeDesc = ''
              this.data.assetCategoryId = null
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
        const item = await AssetsTypeService.updateAddAssetsType(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Assets-type')
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
        const company = await AssetsTypeService.fetchOneItem(id)
        this.data = company.object
        this.dataLoading = false
      },
      async getLKPAssets () {
        this.dataLoading = true
        const LKPItems = await AssetsTypeService.getLKPType()
        LKPItems.list.forEach(item => { this.LKP.push(item.name) })
        this.dataLoading = false
      },
      async getLKPCategory () {
        this.dataLoading = true
        const LKPCategory = await AssetsCategoryService.getLKPCategory()
        this.LKPCategory = LKPCategory.list
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
