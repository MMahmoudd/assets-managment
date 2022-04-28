<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('employee.edit') : $t('employee.add') }}
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
                <v-text-field
                  v-model="data.ponumber"
                  :label="$t('po.ponumber')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-menu
                  v-model="poissueDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="data.poissueDate"
                      :label="$t('po.poissueDate')"
                      prepend-icon="mdi-calendar"
                      readonly
                      outlined
                      dense
                      v-bind="attrs"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker
                    v-model="data.poissueDate"
                    class="mt-0 mb-0"
                    @input="poissueDate = false"
                  />
                </v-menu>
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.povendor"
                  :label="$t('po.povendor')"
                  outlined
                  required
                />
              </v-col>
              <v-col
                cols="12"
                md="6"
              >
                <v-text-field
                  v-model="data.poissuePerson"
                  :label="$t('po.poissuePerson')"
                  outlined
                  required
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
  import moment from 'moment'
  const Service = ServiceFactory.get('PO')
  export default {
    name: 'POForm',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      poissueDate: false,
      data: {
        poid: 0,
        ponumber: '',
        poissueDate: '',
        povendor: '',
        poissuePerson: '',

      },
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
    },
    methods: {
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            poid: this.data.poid,
            ponumber: this.data.ponumber,
            poissueDate: moment(this.data.poissueDate).format(),
            povendor: this.data.povendor,
            poissuePerson: this.data.poissuePerson,
          })
        } else {
          this.newItem(
            {
              ponumber: this.data.ponumber,
              poissueDate: moment(this.data.poissueDate).format(),
              povendor: this.data.povendor,
              poissuePerson: this.data.poissuePerson,
            },
          )
        }
      },
      async newItem (data) {
        const item = await Service.AddOrUpdate(data)
        console.log('new Item item', item)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/po')
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
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/po')
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
        const user = await Service.fetchOneItem(id)
        user.object.poissueDate = moment(user.object.poissueDate).format('YYYY-MM-DD')
        this.data = user.object
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
