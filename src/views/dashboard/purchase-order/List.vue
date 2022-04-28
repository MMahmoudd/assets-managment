<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('po.po') }}
        <v-spacer />
        <v-spacer />
        <router-link
          :to="{ path: '/poForm'}"
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
                :to="'/poForm/' + item.poid"
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
  import moment from 'moment'
  const Service = ServiceFactory.get('PO')
  export default {
    name: 'PO',
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
          value: 'poid',
        },
        { text: vm.$t('po.povendor'), sortable: false, value: 'povendor' },
        { text: vm.$t('po.ponumber'), sortable: false, value: 'ponumber' },
        { text: vm.$t('po.poissuePerson'), sortable: false, value: 'poissuePerson' },
        { text: vm.$t('po.poissueDate'), sortable: false, value: 'poissueDate' },
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
        if (List.list) {
          List.list.forEach(item => {
            item.poissueDate = moment(item.poissueDate).format('YYYY-MM-DD')
          })
        }
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
