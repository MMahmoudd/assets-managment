<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('users.users') }}
        <v-spacer />
        <!-- <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('search')"
          single-line
          hide-details
        /> -->
        <v-spacer />
        <router-link
          :to="{ path: '/userForm'}"
          color="primary"
        >
          <v-btn
            outlined
            class="mx-2"
            color="primary"
          >
            {{ $t('actions.Add') }}
          </v-btn>
        </router-link>
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :search="search"
        :items="Users"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :options.sync="options"
        :server-items-length="total"
        :page-count="numberOfPages"
        @fetchAllItems="fetchAllItems"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <router-link
                :to="'/userForm/' + item.userid"
              >
                <v-btn
                  x-small
                  fab
                  outlined
                  class="mx-2"
                  color="blue"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </router-link>
            </template>
            {{ $t('actions.edit') }}
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                x-small
                fab
                outlined
                class="mx-2"
                color="blue"
                v-bind="attrs"
                v-on="on"
                @click="openDialog(item)"
              >
                <v-icon>
                  fa-exclamation
                </v-icon>
              </v-btn>
            </template>
            {{ $t('actions.changeStatus') }}
          </v-tooltip>
        </template>

        <template
          v-slot:no-data
          loading
        >
          <p>{{ $t('actions.noData') }}</p>
        </template>
      </v-data-table>
      <v-dialog
        v-model="changeDialog"
        max-width="600"
      >
        <v-card
          class="text-center"
        >
          <base-material-card
            :title="$t('actions.changeStatus')"
            color="green"
            class="pt-12"
          >
            <v-card-text class="mt-2">
              <v-btn
                text
                class="mx-2"
                color="blue"
                @click="activeUser(true)"
              >
                Active
              </v-btn>
              <v-btn
                text
                class="mx-2"
                color="red"
                @click="activeUser(false)"
              >
                Deactive
              </v-btn>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                outlined
                @click="changeDialog = false"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </base-material-card>
        </v-card>
      </v-dialog>
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
  const AuthenticationService = ServiceFactory.get('Authentication')
  export default {
    name: 'Authentication',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      user: {},
      Users: [],
      loading: false,
      changeDialog: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'userid',
        },
        { text: vm.$t('users.username'), sortable: false, value: 'username' },
        { text: vm.$t('users.userfullname'), sortable: false, value: 'userfullname' },
        { text: vm.$t('users.mobile'), sortable: false, value: 'mobile' },
        { text: vm.$t('users.email'), sortable: false, value: 'email' },
        { text: vm.$t('users.companyName'), sortable: false, value: 'companyName' },
        { text: vm.$t('users.branchName'), sortable: false, value: 'branchName' },
        { text: vm.$t('actions.actions'), value: 'actions', sortable: false },
      ],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      disabled: false,
    }),
    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
    },
    methods: {
      openDialog (item) {
        this.user = item
        this.changeDialog = true
      },
      async activeUser (status) {
        this.dataLoading = true
        const change = await AuthenticationService.changeStatus(this.user.userid, status)
        if (change.success === true) {
          this.changeDialog = false
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.fetchAllItems()
          }, 1500)
        } else {
          this.changeDialog = false
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.dataLoading = false
      },
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const users = await AuthenticationService.getAllItems(itemsPerPage, page, pageNumber)
        this.Users = users.list
        this.total = users.resultPaging.total
        // this.numberOfPages = companies.data.pageCount
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
