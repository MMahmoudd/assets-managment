<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('assets.assets') }}
        <v-spacer />
        <v-text-field
          v-model="filter.search"
          append-icon="mdi-magnify"
          :label="$t('actions.search')"
          single-line
          hide-details
          @keyup="fetchAllItems"
        />
        <v-spacer />
        <v-select
          v-model="filter.brnch"
          :items="LKPBrnch"
          item-text="name"
          item-value="id"
          :label="$t('assets.chooseBranch')"
          single-line
          hide-details
          @input="fetchAllItems"
        />
        <v-spacer />
        <v-btn
          class="mx-1 my-auto"
          color="indigo"
          :loading="loading"
          :disabled="disabled"
          @click="exportExel()"
        >
          {{ $t('actions.export') }}
        </v-btn>
        <router-link
          v-for="role in Roles"
          :key="role"
          :to="{ path: '/assetsForm'}"
          color="primary"
        >
          <v-btn
            v-if="role === 'Asset.Add'"
            outlined
            class="mx-2"
            color="primary"
          >
            {{ $t('actions.Add') }}
          </v-btn>
        </router-link>
      </v-card-title>
      <v-data-table
        v-model="selectedItems"
        show-select
        :loading="dataLoading"
        :headers="headers"
        :items="assets"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :options.sync="options"
        :server-items-length="total"
        :page-count="numberOfPages"
        item-key="assetId"
      >
        <template
          v-if="selectedItems.length >= 1"
          v-slot:top
        >
          <v-toolbar
            flat
          >
            <v-spacer />
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  fab
                  outlined
                  class="mx-2"
                  color="success"
                  v-bind="attrs"
                  v-on="on"
                  @click="editERP()"
                >
                  <v-icon>
                    fa-edit
                  </v-icon>
                </v-btn>
              </template>
              <span>{{ $t('assets.editERPCode') }}</span>
            </v-tooltip>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip
            v-for="role in Roles"
            :key="role"
            bottom
          >
            <template
              v-if="role === 'Asset.GetById'"
              v-slot:activator="{ on, attrs }"
            >
              <router-link
                :to="'/assetsForm/' + item.assetId"
              >
                <v-btn
                  small
                  fab
                  outlined
                  class="mx-1 my-1"
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
                small
                fab
                outlined
                class="mx-1 my-1"
                color="blue"
                v-bind="attrs"
                v-on="on"
                @click="moreDetailsD(item)"
              >
                <v-icon>
                  fa-eye
                </v-icon>
              </v-btn>
            </template>
            {{ $t('actions.moreDetails') }}
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
        v-model="moreDetails"
        max-width="1200"
      >
        <v-card
          class="text-center"
        >
          <base-material-card
            :title="$t('assets.moreDetails') + assetsDetails.assetName"
            color="info"
            class="pt-12"
          >
            <v-card-text class="mt-2">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-center">
                        {{ $t('assets.branchName') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.floorName') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.roomName') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.poName') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.assetExpiryDate') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.assetMaintinanceDate') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.assetProductionDate') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.ERPCode') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ assetsDetails.branchName }}</td>
                      <td>{{ assetsDetails.floorName }}</td>
                      <td>{{ assetsDetails.roomName }}</td>
                      <td>{{ assetsDetails.poName }}</td>
                      <td>{{ assetsDetails.assetExpiryDate }}</td>
                      <td>{{ assetsDetails.assetMaintinanceDate }}</td>
                      <td>{{ assetsDetails.assetProductionDate }}</td>
                      <td>{{ assetsDetails.erpCode }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                outlined
                @click="moreDetails = false"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </base-material-card>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="editErpDialog"
        max-width="500"
      >
        <v-card
          class="text-center"
        >
          <base-material-card
            :title="$t('assets.editERPCode')"
            color="info"
            class="pt-12"
          >
            <v-card-text class="mt-2">
              <v-text-field
                v-model="erpCode"
                :label="$t('assets.ERPCode')"
                outlined
                dense
                required
              />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="success"
                outlined
                @click="sednNewERP()"
              >
                {{ $t('actions.save') }}
              </v-btn>
              <v-btn
                color="error"
                outlined
                @click="editErpDialog = false"
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
  const AssetsService = ServiceFactory.get('Assets')
  const CompanyBranchesService = ServiceFactory.get('companyBranches')
  export default {
    name: 'Assets',
    data: (vm) => ({
      filter: {
        brnch: null,
        search: '',
      },
      singleSelect: false,
      selectedItems: [],
      ids: [],
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      assets: [],
      Roles: [],
      LKPBrnch: [],
      loading: false,
      moreDetails: false,
      editErpDialog: false,
      assetsDetails: {},
      erpCode: '',
      IsPagination: false,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'assetId',
        },
        { text: vm.$t('assets.assetName'), sortable: false, value: 'assetName' },
        { text: vm.$t('assets.assetDescription'), sortable: false, value: 'assetDescription' },
        { text: vm.$t('assets.assetBrandName'), sortable: false, value: 'assetBrandName' },
        { text: vm.$t('assets.assetCategoryName'), sortable: false, value: 'assetCategoryName' },
        { text: vm.$t('assets.assetModelName'), sortable: false, value: 'assetModelName' },
        { text: vm.$t('assets.assetTypeName'), sortable: false, value: 'assetTypeName' },
        { text: vm.$t('assets.assetStatusName'), sortable: false, value: 'assetStatusName' },
        { text: vm.$t('assets.assetSerialNumber'), sortable: false, value: 'assetSerialNumber' },
        { text: vm.$t('actions.actions'), value: 'actions', sortable: false },
        // { text: '', value: 'select', sortable: false },
      ],
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      disabled: false,
      filename: 'Assets',
      bookType: 'xlsx',
      autoWidth: true,
    }),
    watch: {
      options: {
        handler () {
          this.fetchAllItems()
        },
      },
    },
    created () {
      this.checkLinksRole()
      this.getLKPBrnch()
    },
    methods: {
      editERP () {
        // const selected = []
        // console.log('item', selected.push(item))
        console.log('this.selected', this.selectedItems)
        this.selectedItems.map(item => {
          this.ids.push(item.assetSerialNumber)
        })
        this.editErpDialog = true
      },
      moreDetailsD (item) {
        this.moreDetails = true
        item.assetExpiryDate = moment(item.assetExpiryDate).format('YYYY-MM-DD hh:mm a')
        item.assetProductionDate = moment(item.assetProductionDate).format('YYYY-MM-DD hh:mm a')
        item.assetMaintinanceDate = moment(item.assetMaintinanceDate).format('YYYY-MM-DD hh:mm a')
        this.assetsDetails = item
        console.log('assetsDetails', this.assetsDetails)
      },
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const paginate = this.IsPagination = true
        const assets = await AssetsService.getAllItems(itemsPerPage, page, pageNumber, this.filter, paginate)
        console.log('assets', assets)
        this.assets = assets.list
        this.total = assets.resultPaging.total
        this.numberOfPages = assets.resultPaging.page
        this.dataLoading = false
      },
      async sednNewERP () {
        this.dataLoading = true
        const sendERP = await AssetsService.sednNewERP(this.ids, this.erpCode)
        console.log('sendERP', sendERP)
        if (sendERP.success === true) {
          this.successMessage = sendERP.message
          this.successSnackbar = true
          this.editErpDialog = false
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.dataLoading = false
      },
      async getLKPBrnch () {
        this.dataLoading = true
        const LKPBrnch = await CompanyBranchesService.GetUserBranch()
        this.LKPBrnch = LKPBrnch.object
        this.dataLoading = false
      },
      checkLinksRole () {
        const userDataPermission = localStorage.getItem('userDataPermission')
        const permissions = userDataPermission.split(',')
        this.Roles = permissions
        console.log('this.Roles', this.Roles)
      },
      async exportExel () {
        this.loading = true
        const paginate = this.IsPagination = false
        const assets = await AssetsService.getAllItems(0, 1, 1, this.filter, paginate)
        import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['assetId', 'assetName', 'assetDescription', 'assetCategoryId', 'assetCategoryName', 'assetTypeId', 'assetTypeName', 'assetBrandId', 'assetBrandName', 'assetModelId', 'assetModelName', 'branchName', 'branchId', 'floorId', 'floorName', 'roomId', 'roomName', 'poid', 'poName', 'assetProductionDate', 'assetExpiryDate', 'assetMaintinanceDate', 'assetSerialNumber', 'assetSerialGenerated', 'assetStatusId', 'assetStatusName', 'printCode', 'printStatus', 'printDate', 'printUserId', 'printUserName', 'erpCode']
        const list = assets.list
        const data = this.formatJson(list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType,
        })
        this.loading = false
      })
      },
      formatJson (jsonData) {
        return jsonData.map(v => {
          return Object.values(v)
        })
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
