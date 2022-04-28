<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('employee.employee') }}
        <v-spacer />
        <v-spacer />
        <router-link
          :to="{ path: '/employeeForm'}"
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
        :items="List"
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
                :to="'/employeeForm/' + item.id"
              >
                <v-btn
                  small
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
        </template>

        <template
          v-slot:no-data
          loading
        >
          <p>{{ $t('actions.noData') }}</p>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  const Service = ServiceFactory.get('Employee')
  export default {
    name: 'Employee',
    data: (vm) => ({
      search: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      List: [],
      loading: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: vm.$t('employee.username'), sortable: false, value: 'employeename' },
        { text: vm.$t('employee.mobile'), sortable: false, value: 'phone' },
        { text: vm.$t('employee.email'), sortable: false, value: 'email' },
        { text: vm.$t('employee.location'), sortable: false, value: 'location' },
        { text: vm.$t('actions.actions'), value: 'actions', sortable: false },
      ],
    }),
    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
    },
    methods: {
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const List = await Service.getAllItems(itemsPerPage, page, pageNumber)
        console.log('List', List)
        this.List = List.list
        this.total = List.count
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
