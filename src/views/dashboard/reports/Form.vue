<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ $t('reports.reportDetails') }}
        <template>
          <v-form
            v-model="valid"
            @submit.prevent="submitForm()"
          >
            <v-container
              fluid
            >
              <v-row
                class="mx-md-16 px-md-16"
              >
                <h3 v-if="filterdList.indexOf('CategoryId') >= 0 || filterdList.indexOf('TypeId') >= 0 || filterdList.indexOf('BrandId') >= 0 || filterdList.indexOf('ModelId') >= 0 || filterdList.indexOf('StatusId') >= 0">
                  {{ $t('assets.assetsInfo') }}
                </h3>
                <v-col
                  v-if="filterdList.indexOf('CategoryId') >= 0 || filterdList.indexOf('TypeId') >= 0 || filterdList.indexOf('BrandId') >= 0 || filterdList.indexOf('ModelId') >= 0 || filterdList.indexOf('StatusId') >= 0"
                  cols="12"
                >
                  <div
                    class="border py-5"
                  >
                    <v-row
                      class=" px-2"
                    >
                      <v-col
                        v-if="filterdList.indexOf('CategoryId') >= 0 || filterdList.indexOf('TypeId') >= 0 || filterdList.indexOf('BrandId') >= 0 || filterdList.indexOf('ModelId') >= 0"
                        cols="12"
                        md="6"
                      >
                        <v-select
                          v-model="data.categoryId"
                          :items="LKPCategory"
                          item-text="name"
                          item-value="id"
                          :label="$t('assets.chooseCtegory')"
                          outlined
                          dense
                          @input="getLKPType(data.categoryId)"
                        />
                      </v-col>
                      <v-col
                        v-if="filterdList.indexOf('TypeId') >= 0 || filterdList.indexOf('BrandId') >= 0 || filterdList.indexOf('ModelId') >= 0"
                        cols="12"
                        md="6"
                      >
                        <v-select
                          v-model="data.typeId"
                          :items="LKPType"
                          item-text="name"
                          item-value="id"
                          :label="$t('assets.chooseType')"
                          outlined
                          dense
                          @input="getLKPBrand(data.typeId)"
                        />
                      </v-col>
                      <v-col
                        v-if="filterdList.indexOf('BrandId') >= 0 || filterdList.indexOf('ModelId') >= 0"
                        cols="12"
                        md="6"
                      >
                        <v-select
                          v-model="data.brandId"
                          :items="LKPBrand"
                          item-text="name"
                          item-value="id"
                          :label="$t('assets.chooseBrand')"
                          outlined
                          dense
                          @input="getLKPModel(data.brandId)"
                        />
                      </v-col>
                      <v-col
                        v-if="filterdList.indexOf('ModelId') >= 0"
                        cols="12"
                        md="6"
                      >
                        <v-select
                          v-model="data.modelId"
                          :items="LKPModel"
                          item-text="name"
                          item-value="id"
                          :label="$t('assets.chooseModel')"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        v-if="filterdList.indexOf('StatusId') >= 0"
                        cols="12"
                        md="6"
                      >
                        <v-select
                          v-model="data.statusId"
                          :items="LKPStatus"
                          item-text="name"
                          item-value="id"
                          :label="$t('assets.chooseStatus')"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
                <h3 v-if="filterdList.indexOf('BranchId') >= 0 || filterdList.indexOf('FloorId') >= 0 || filterdList.indexOf('RoomId') >= 0">
                  {{ $t('assets.companiesInfo') }}
                </h3>
                <v-col
                  v-if="filterdList.indexOf('BranchId') >= 0 || filterdList.indexOf('FloorId') >= 0 || filterdList.indexOf('RoomId') >= 0"
                  cols="12"
                >
                  <div class="border py-5">
                    <v-row class=" px-2">
                      <v-col
                        v-if="filterdList.indexOf('BranchId') >= 0 || filterdList.indexOf('FloorId') >= 0 || filterdList.indexOf('RoomId') >= 0"
                        cols="12"
                        md="6"
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
                        v-if="filterdList.indexOf('FloorId') >= 0 || filterdList.indexOf('RoomId') >= 0"
                        cols="12"
                        md="6"
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
                        v-if="filterdList.indexOf('RoomId') >= 0"
                        cols="12"
                        md="6"
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
                    </v-row>
                  </div>
                </v-col>
                <h3 v-if="filterdList.indexOf('From') >= 0 || filterdList.indexOf('To') >= 0">
                  {{ $t('assets.datesInfo') }}
                </h3>
                <v-col
                  v-if="filterdList.indexOf('From') >= 0 || filterdList.indexOf('To') >= 0"
                  cols="12"
                >
                  <div class="border py-5">
                    <v-row class=" px-2">
                      <v-col
                        v-if="filterdList.indexOf('From') >= 0 || filterdList.indexOf('To') >= 0"
                        cols="12"
                        md="6"
                      >
                        <v-menu
                          v-model="from"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="data.from"
                              :label="$t('assets.from')"
                              prepend-icon="mdi-calendar"
                              readonly
                              outlined
                              dense
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="data.from"
                            class="mt-0 mb-0"
                            @input="from = false"
                          />
                        </v-menu>
                      </v-col>
                      <v-col
                        v-if="filterdList.indexOf('From') >= 0 || filterdList.indexOf('To') >= 0"
                        cols="12"
                        md="6"
                      >
                        <v-menu
                          v-model="to"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="data.to"
                              :label="$t('assets.to')"
                              prepend-icon="mdi-calendar"
                              readonly
                              outlined
                              dense
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="data.to"
                            class="mt-0 mb-0"
                            @input="to = false"
                          />
                        </v-menu>
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-btn
                  type="submit"
                  class="mx-1 my-auto"
                  color="indigo"
                  :loading="loading"
                  :disabled="disabled"
                >
                  {{ $t('actions.viewReport') }}
                </v-btn>
                <v-btn
                  v-if="rows.length >= 1"
                  class="mx-1 my-auto"
                  color="indigo"
                  :loading="loading"
                  :disabled="disabled"
                  @click="exportExel()"
                >
                  {{ $t('actions.export') }}
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </template>
      </v-card-title>
      <v-simple-table
        fixed-header
        height="450px"
      >
        <template v-slot:default>
          <thead>
            <tr>
              <th
                v-for="item in header"
                :key="item"
                class="text-center"
              >
                {{ item }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in rows"
              :key="i"
            >
              <td
                v-for="(item, x) in row"
                :key="x"
                class="text-center"
              >
                {{ item }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
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
  const ReportsService = ServiceFactory.get('Reports')
  const AssetsTypeService = ServiceFactory.get('AssetsType')
  const AssetsCategoryService = ServiceFactory.get('AssetsCategory')
  const AssetsBrandService = ServiceFactory.get('AssetsBrand')
  const AssetsModelService = ServiceFactory.get('AssetsModel')
  const CompanyBranchesService = ServiceFactory.get('companyBranches')
  const CompaniesFloorService = ServiceFactory.get('CompaniesFloor')
  const CompanyRoomService = ServiceFactory.get('CompanyRoom')
  const AssetsStatusService = ServiceFactory.get('AssetsStatus')
  export default {
    name: 'Companies',
    data: (vm) => ({
      dataLoading: false,
      valid: false,
      fixedHeader: true,
      from: false,
      to: false,
      data: {
        procedure: '',
        from: null,
        to: null,
        categoryId: null,
        modelId: null,
        typeId: null,
        brandId: null,
        branchId: null,
        floorId: null,
        roomId: null,
        statusId: null,
      },
      bookType: 'xlsx',
      autoWidth: true,
      header: [],
      rows: [],
      LKPType: [],
      LKPCategory: [],
      LKPBrand: [],
      LKPModel: [],
      LKPBrnch: [],
      LKPFloor: [],
      LKPRoom: [],
      LKPStatus: [],
      row: {},
      successSnackbar: false,
      errorSnackbar: false,
      timeout: 3000,
      successMessage: '',
      errorMessage: '',
      loading: false,
      disabled: false,
    }),
    computed: {
      filterdList () {
        if (localStorage.getItem('filterdList')) {
          console.log('filterdList.split', localStorage.getItem('filterdList').indexOf('Mahmoud'))
          return localStorage.getItem('filterdList')
          // return filterdList.split(',')
        } else {
          return false
        }
      },
    },
    created () {
      // if (this.$route.params.id) {
      //   this.fetchOneItem(this.$route.params.id)
      // }
      this.getLKPCategory()
      this.getLKPBrnch()
      this.getLKPStatus()
    },
    methods: {
      exportExel () {
        this.loading = true
        import('@/vendor/Export2Excel').then(excel => {
        const tHeader = this.header
        const list = this.rows
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
          if (v === 'timestamp') {
            return v
          } else {
            return v
          }
        })
      },
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.data.procedure = this.$route.params.id
          this.getReport({
            procedure: this.data,
          })
        }
      },
      async getReport (data) {
        const item = await ReportsService.ExcuteProcedure(
          {
            procedure: this.data.procedure,
            from: this.data.from ? moment(this.data.from).format() : new Date(),
            to: this.data.to ? moment(this.data.to).format() : new Date(),
            categoryId: this.data.categoryId,
            modelId: this.data.modelId,
            typeId: this.data.typeId,
            brandId: this.data.brandId,
            branchId: this.data.branchId,
            floorId: this.data.floorId,
            roomId: this.data.roomId,
            statusId: this.data.statusId,
          }
        )
        if (item.status === 200) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          this.header = item.data.header
          this.rows = []
          item.data.rows.forEach(element => {
            this.row = element.split(',***,')
            this.rows.push(this.row)
          })
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.loading = false
        this.disabled = false
      },
      async fetchOneItem (id) {
        this.dataLoading = true
        const floor = await CompanyRoomService.fetchOneItem(id)
        this.data = floor.object
        this.dataLoading = false
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
      async getLKPStatus () {
        this.dataLoading = true
        const LKPStatus = await AssetsStatusService.getLKPStatus()
        this.LKPStatus = LKPStatus.list
        this.dataLoading = false
      },
    },
  }
</script>
<style>
a{
  text-decoration: none;
}
.border{
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
