<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card>
      <v-card-title>
        {{ $t('sidbar.moveAssets') }}
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
      </v-card-title>
      <v-data-table
        :loading="dataLoading"
        :headers="headers"
        :items="status"
        :items-per-page="20"
        :footer-props="{
          'items-per-page-options': [10, 20, 30, 40, 50]
        }"
        :options.sync="options"
        :server-items-length="total"
        :page-count="numberOfPages"
        @fetchAllItems="fetchAllItems"
      >
        <template
          v-slot:[`item.actions`]="{ item }"
        >
          <span
            v-for="role in Roles"
            :key="role"
          >
            <v-tooltip
              v-if="role === 'Asset.MoveAssetfromBranchToBranch'"
              bottom
            >
              <template
                v-slot:activator="{ on, attrs }"
              >
                <router-link
                  :to="'/moveAssetsBranch/' + item.assetId"
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
                      fa-code-branch
                    </v-icon>
                  </v-btn>
                </router-link>
              </template>
              {{ $t('actions.moveAssetsToBranch') }}
            </v-tooltip>
            <v-tooltip
              v-if="role === 'Asset.MoveAssetInsideBranch'"
              bottom
            >
              <template
                v-slot:activator="{ on, attrs }"
              >
                <router-link
                  :to="'/moveAssetsFloorAndRoom/' + item.assetId"
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
                      mdi-floor-plan
                    </v-icon>
                  </v-btn>
                </router-link>
              </template>
              {{ $t('actions.moveAssetsToFloor') }}
            </v-tooltip>
          </span>
          <v-tooltip
            bottom
          >
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
  </v-container>
</template>
<script>
  import { ServiceFactory } from '../../../services/ServiceFactory'
  import moment from 'moment'
  const AssetsService = ServiceFactory.get('Assets')
  const CompanyBranchesService = ServiceFactory.get('companyBranches')
  export default {
    name: 'Status',
    data: (vm) => ({
      filter: {
        brnch: null,
        search: '',
      },
      dataLoading: false,
      page: 0,
      total: 0,
      numberOfPages: 0,
      options: {},
      status: [],
      Roles: [],
      LKPBrnch: [],
      loading: false,
      moreDetails: false,
      assetsDetails: {},
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
      this.checkLinksRole()
      this.getLKPBrnch()
    },
    methods: {
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
        const status = await AssetsService.getAllItems(itemsPerPage, page, pageNumber, this.filter, paginate)
        console.log('status', status)
        this.status = status.list
        this.total = status.resultPaging.total
        this.numberOfPages = status.resultPaging.page
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
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
</style>
