<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('assetCategory.editCategory') : $t('assetCategory.addCategory') }}
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
                  :items="LKP"
                  outlined
                  :label="$t('assetCategory.assetCategoryName')"
                  @keypress="addName"
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
  const AssetsCategoryService = ServiceFactory.get('AssetsCategory')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      search: null,
      data: {
        assetCategoryId: null,
        assetCategoryName: '',
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
      addName (event) {
        setTimeout(() => {
          // this.LKP.push(event.target.value)
          this.data.assetCategoryName = event.target.value
          console.log('LKP', event.target.value)
        }, 3000)
      },
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          console.log('this.data', this.data)
          this.updateContent({
            assetCategoryId: this.data.assetCategoryId,
            assetCategoryName: this.data.assetCategoryName,
          })
        } else {
          console.log('this.data', this.data)
          this.newItem(
            {
              assetCategoryName: this.data.assetCategoryName,
            },
          )
        }
      },
      async newItem (data) {
        console.log('new data', data)
        const item = await AssetsCategoryService.updateAddAssetsCategory(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            if (this.$route.name === 'Assets Category Form') {
              this.$router.push('/Assets-category')
            } else {
              this.data.assetCategoryName = ''
            }
          }, 1000)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (data) {
        console.log('update Content item', data)
        const item = await AssetsCategoryService.updateAddAssetsCategory(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Assets-category')
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
        const company = await AssetsCategoryService.fetchOneItem(id)
        this.data = company.object
        this.dataLoading = false
      },
      async getLKPAssets () {
        this.dataLoading = true
        const LKPItems = await AssetsCategoryService.getLKPCategory()
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
