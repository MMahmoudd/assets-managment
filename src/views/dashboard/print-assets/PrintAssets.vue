<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('assets.filterAsset') }}
      </v-card-title>
      <div class="border py-2">
        <h5 class="mx-5 mb-2">
          {{ $t('assets.assetsInfo') }}
        </h5>
        <v-row class=" px-2">
          <v-col
            cols="6"
            md="3"
            class="d-flex"
          >
            <v-select
              v-model="data.assetCategoryId"
              :items="LKPCategory"
              item-text="name"
              item-value="id"
              :label="$t('assets.chooseCtegory')"
              outlined
              dense
              @input="getLKPType(data.assetCategoryId)"
            />
          </v-col>
          <v-col
            cols="6"
            md="3"
            class="d-flex"
          >
            <v-select
              v-model="data.assetTypeId"
              :items="LKPType"
              item-text="name"
              item-value="id"
              :label="$t('assets.chooseType')"
              outlined
              dense
              @input="getLKPBrand(data.assetTypeId)"
            />
          </v-col>
          <v-col
            cols="6"
            md="3"
            class="d-flex"
          >
            <v-select
              v-model="data.assetBrandId"
              :items="LKPBrand"
              item-text="name"
              item-value="id"
              :label="$t('assets.chooseBrand')"
              outlined
              dense
              @input="getLKPModel(data.assetBrandId)"
            />
          </v-col>
          <v-col
            cols="6"
            md="3"
            class="d-flex"
          >
            <v-select
              v-model="data.assetModelId"
              :items="LKPModel"
              item-text="name"
              item-value="id"
              :label="$t('assets.chooseModel')"
              outlined
              dense
            />
          </v-col>
        </v-row>
      </div>
      <div class="border py-2">
        <h5 class="mx-5 mb-2">
          {{ $t('assets.companiesInfo') }}
        </h5>
        <v-row class=" px-2">
          <v-col
            cols="6"
            md="3"
          >
            <v-select
              v-model="data.branchId"
              :items="LKPBrnch"
              item-text="name"
              item-value="id"
              :label="$t('assets.chooseBranch')"
              outlined
              dense
              @input="getLKPFloor(data.branchId)"
            />
          </v-col>
          <v-col
            cols="6"
            md="3"
          >
            <v-select
              v-model="data.floorId"
              :items="LKPFloor"
              item-text="name"
              item-value="id"
              :label="$t('assets.chooseFloor')"
              outlined
              dense
              @input="getLKPRoom(data.floorId)"
            />
          </v-col>
          <v-col
            cols="6"
            md="3"
          >
            <v-select
              v-model="data.roomId"
              :items="LKPRoom"
              item-text="name"
              item-value="id"
              :label="$t('assets.chooseRoom')"
              outlined
              dense
            />
          </v-col>
          <v-col
            cols="6"
            md="3"
          >
            <v-btn
              outlined
              color="green"
              @click="fetchAllItems()"
            >
              {{ $t('actions.getAssets') }}
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
    <v-card>
      <v-card-title>
        {{ $t('sidbar.printAssets') }}
        <v-spacer />
        <v-text-field
          v-model="printerIPAddress"
          append-icon="fa-at"
          :label="$t('assets.printerIPAddress')"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :search="search"
        :items="assets"
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
            <template
              v-slot:activator="{ on, attrs }"
            >
              <v-btn
                small
                fab
                outlined
                class="mx-2"
                color="green"
                v-bind="attrs"
                v-on="on"
                @click="printAssets(item)"
              >
                <v-icon>
                  fa-print
                </v-icon>
              </v-btn>
            </template>
            {{ $t('actions.print') }}
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
                        {{ $t('assets.assetExpiryDate') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.assetMaintinanceDate') }}
                      </th>
                      <th class="text-center">
                        {{ $t('assets.assetProductionDate') }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{{ assetsDetails.branchName }}</td>
                      <td>{{ assetsDetails.floorName }}</td>
                      <td>{{ assetsDetails.roomName }}</td>
                      <td>{{ assetsDetails.assetExpiryDate }}</td>
                      <td>{{ assetsDetails.assetMaintinanceDate }}</td>
                      <td>{{ assetsDetails.assetProductionDate }}</td>
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
    </v-card>
    <v-snackbar
      v-model="warningSnackbar"
      color="orange"
      shaped
      bottom
      right
      :timeout="timeout"
    >
      {{ warningMessage }}
    </v-snackbar>
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  import moment from 'moment'
  const AssetsService = ServiceFactory.get('Assets')
  const AssetsTypeService = ServiceFactory.get('AssetsType')
  const AssetsCategoryService = ServiceFactory.get('AssetsCategory')
  const AssetsBrandService = ServiceFactory.get('AssetsBrand')
  const AssetsModelService = ServiceFactory.get('AssetsModel')
  const CompanyBranchesService = ServiceFactory.get('companyBranches')
  const CompaniesFloorService = ServiceFactory.get('CompaniesFloor')
  const CompanyRoomService = ServiceFactory.get('CompanyRoom')
  export default {
    name: 'PendingAssets',
    data: (vm) => ({
      search: '',
      printerIPAddress: '',
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      assets: [],
      Roles: [],
      LKPType: [],
      LKPCategory: [],
      LKPBrand: [],
      LKPModel: [],
      LKPBrnch: [],
      LKPFloor: [],
      LKPRoom: [],
      data: {
        assetCategoryId: 0,
        assetTypeId: 0,
        assetBrandId: 0,
        assetModelId: 0,
        branchId: 0,
        floorId: 0,
        roomId: 0,
      },
      connection: null,
      moreDetails: false,
      acceptTransferDailog: false,
      assetsDetails: {},
      timeout: 3000,
      warningSnackbar: false,
      errorSnackbar: false,
      warningMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
      editedIndex: -1,
      headers: [
        {
          text: vm.$t('companies.id'),
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: vm.$t('assets.assetName'), sortable: false, value: 'assetName' },
        { text: vm.$t('assets.assetDescription'), sortable: false, value: 'assetDescription' },
        { text: vm.$t('assets.assetBrandName'), sortable: false, value: 'assetBrandName' },
        { text: vm.$t('assets.assetCategoryName'), sortable: false, value: 'assetCategoryName' },
        { text: vm.$t('assets.assetModelName'), sortable: false, value: 'assetModelName' },
        { text: vm.$t('assets.assetTypeName'), sortable: false, value: 'assetTypeName' },
        { text: vm.$t('assets.assetSerialNumber'), sortable: false, value: 'assetSerialNumber' },
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
    created () {
      this.getLKPCategory()
      this.getLKPBrnch()
      // console.log('Starting connection to WebSocket Server')
      // this.connection = new WebSocket('ws://0.0.0.0:8080')
      // this.connection = new WebSocket('wss://10.10.11.36:6101')
      this.connection = new WebSocket('wss://echo.websocket.org')
      // console.log('socket', this.connection)

      this.connection.onmessage = function (event) {
        console.log('event', event)
      }

      this.connection.onopen = function (event) {
        console.log(event)
        console.log('Successfully connected to the echo websocket server...')
      }
    },
    methods: {
      moreDetailsD (item) {
        this.moreDetails = true
        item.assetExpiryDate = moment(item.assetExpiryDate).format('YYYY-MM-DD hh:mm a')
        item.assetMaintinanceDate = moment(item.assetMaintinanceDate).format('YYYY-MM-DD hh:mm a')
        item.assetProductionDate = moment(item.assetProductionDate).format('YYYY-MM-DD hh:mm a')
        this.assetsDetails = item
        console.log('assetsDetails', this.assetsDetails)
      },
      async fetchAllItems () {
        this.dataLoading = true
        const { page, itemsPerPage } = this.options
        const pageNumber = page - 1
        const assets = await AssetsService.GetAllAssetsForPrint(itemsPerPage, page, pageNumber, this.data)
        console.log('Assets', assets)
        this.assets = assets.list
        this.total = assets.count
        this.dataLoading = false
      },
      async printAssets (item) {
        // this.dataLoading = true
        // if (this.printerIPAddress.length > 0) {
        //   localStorage.setItem('printerIPAddress', this.printerIPAddress)
        //   const print = await AssetsService.printAssets(this.printerIPAddress, item)
        //   console.log(print)
        // } else if (localStorage.getItem('printerIPAddress')) {
        //   const printerIPAddress = localStorage.getItem('printerIPAddress', this.printerIPAddress)
        //   console.log('printerIPAddress', printerIPAddress)
        //   const print = await AssetsService.printAssets(printerIPAddress, item)
        //   console.log(print)
        // } else {
        //   this.warningMessage = 'You must enter a valid IP address'
        //   this.warningSnackbar = true
        // }
        // this.dataLoading = false
        console.log('Hello')
        console.log(this.connection.send(
          {
            serial: item.assetSerialNumber,
            description: item.assetDescription,
          },
        ))
        this.connection.send(
          {
            serial: item.assetSerialNumber,
            description: item.assetDescription,
          },
        )
      },
      async getLKPCategory () {
        this.dataLoading = true
        const LKPCategory = await AssetsCategoryService.getLKPCategory()
        this.LKPCategory = LKPCategory.list
        this.dataLoading = false
      },
      async getLKPType (item) {
        this.dataLoading = true
        console.log('category Id', item)
        const LKPType = await AssetsTypeService.getTypeByCategory(item)
        this.LKPType = LKPType.list
        this.dataLoading = false
      },
      async getLKPBrand (item) {
        this.dataLoading = true
        const LKPBrand = await AssetsBrandService.getBrandByType(item)
        this.LKPBrand = LKPBrand.list
        this.dataLoading = false
      },
      async getLKPModel (item) {
        this.dataLoading = true
        const LKPModel = await AssetsModelService.getModelByBrand(item)
        this.LKPModel = LKPModel.list
        this.dataLoading = false
      },
      async getLKPBrnch () {
        this.dataLoading = true
        const LKPBrnch = await CompanyBranchesService.getLKPBrnch()
        this.LKPBrnch = LKPBrnch.list
        this.dataLoading = false
      },
      async getLKPFloor (item) {
        this.dataLoading = true
        const LKPFloor = await CompaniesFloorService.getFloorByBranch(item)
        this.LKPFloor = LKPFloor.list
        this.dataLoading = false
      },
      async getLKPRoom (item) {
        this.dataLoading = true
        const LKPRoom = await CompanyRoomService.getRoomByFloor(item)
        this.LKPRoom = LKPRoom.list
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
