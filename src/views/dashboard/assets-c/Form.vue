<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-card class="py-5">
      <v-card-title>
        {{ this.$route.params.id ? $t('assets.editAssets') : $t('assets.addAssets') }}
      </v-card-title>
      <template>
        <v-form
          v-model="valid"
          @submit.prevent="submitForm()"
        >
          <v-container fluid>
            <v-row class="mx-md-8 px-md-8">
              <h3>{{ $t('assets.basicInfo') }}</h3>
              <v-col cols="12">
                <div class="border py-5">
                  <v-row class=" px-2">
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-combobox
                        :items="LKPAssets"
                        outlined
                        :label="$t('assets.assetName')"
                        @keypress="addName"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="data.assetDescription"
                        :label="$t('assets.assetDescription')"
                        outlined
                        dense
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-select
                        v-model="data.poid"
                        :items="LKPPO"
                        item-text="povendor"
                        item-value="poid"
                        :label="$t('assets.choosePO')"
                        outlined
                        dense
                      />
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <h3>{{ $t('assets.assetsInfo') }}</h3>
              <v-col cols="12">
                <div class="border py-5">
                  <v-row class=" px-2">
                    <v-col
                      cols="12"
                      md="6"
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
                      <span v-if="!this.$route.params.id">
                        <div
                          v-for="role in Roles"
                          :key="role"
                        >
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-if="role === 'AssetCategory.AddOrUpdate'"
                                color="green"
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                @click="addAssetCategory = true"
                              >
                                <v-icon>
                                  fa-plus
                                </v-icon>
                              </v-btn>
                            </template>
                            {{ $t('actions.addCategory') }}
                          </v-tooltip>
                        </div>
                      </span>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
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
                      <span v-if="!this.$route.params.id">
                        <div
                          v-for="role in Roles"
                          :key="role"
                        >
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-if="role === 'AssetType.AddOrUpdate'"
                                color="green"
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                @click="addAssetType = true"
                              >
                                <v-icon>
                                  fa-plus
                                </v-icon>
                              </v-btn>
                            </template>
                            {{ $t('actions.addType') }}
                          </v-tooltip>
                        </div>
                      </span>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
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
                      <span v-if="!this.$route.params.id">
                        <div
                          v-for="role in Roles"
                          :key="role"
                        >
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-if="role === 'AssetBrand.AddOrUpdate'"
                                color="green"
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                @click="addAssetBrand = true"
                              >
                                <v-icon>
                                  fa-plus
                                </v-icon>
                              </v-btn>
                            </template>
                            {{ $t('actions.addBrand') }}
                          </v-tooltip>
                        </div>
                      </span>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
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
                      <span v-if="!this.$route.params.id">
                        <div
                          v-for="role in Roles"
                          :key="role"
                        >
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-if="role === 'AssetModel.AddOrUpdate'"
                                color="green"
                                outlined
                                v-bind="attrs"
                                v-on="on"
                                @click="addAssetModel = true"
                              >
                                <v-icon>
                                  fa-plus
                                </v-icon>
                              </v-btn>
                            </template>
                            {{ $t('actions.addModel') }}
                          </v-tooltip>
                        </div>
                      </span>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                      class="d-flex"
                    >
                      <v-select
                        v-model="data.assetStatusId"
                        :items="LKPStatus"
                        item-text="name"
                        item-value="id"
                        :label="$t('assets.chooseStatus')"
                        outlined
                        dense
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="data.erpCode"
                        :label="$t('assets.ERPCode')"
                        outlined
                        dense
                        required
                      />
                    </v-col>
                    <v-col
                      v-if="this.$route.params.id"
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="data.assetSerialNumber"
                        :label="$t('assets.assetSerialNumber')"
                        outlined
                        dense
                        required
                      />
                    </v-col>
                    <v-col
                      v-if="!this.$route.params.id"
                      cols="12"
                      md="6"
                    >
                      <v-text-field
                        v-model="data.assetCount"
                        :label="$t('assets.assetCount')"
                        outlined
                        dense
                        required
                        type="number"
                      />
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <h3>{{ $t('assets.companiesInfo') }}</h3>
              <v-col cols="12">
                <div class="border py-5">
                  <v-row class=" px-2">
                    <v-col
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
              <h3>{{ $t('assets.datesInfo') }}</h3>
              <v-col cols="12">
                <div class="border py-5">
                  <v-row class=" px-2">
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-menu
                        v-model="assetProductionDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="data.assetProductionDate"
                            :label="$t('assets.assetProductionDate')"
                            prepend-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="data.assetProductionDate"
                          class="mt-0 mb-0"
                          @input="assetProductionDate = false"
                        />
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-menu
                        v-model="assetExpiryDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="data.assetExpiryDate"
                            :label="$t('assets.assetExpiryDate')"
                            prepend-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="data.assetExpiryDate"
                          class="mt-0 mb-0"
                          @input="assetExpiryDate = false"
                        />
                      </v-menu>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <v-menu
                        v-model="assetMaintinanceDate"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="data.assetMaintinanceDate"
                            :label="$t('assets.assetMaintinanceDate')"
                            prepend-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          />
                        </template>
                        <v-date-picker
                          v-model="data.assetMaintinanceDate"
                          class="mt-0 mb-0"
                          @input="assetMaintinanceDate = false"
                        />
                      </v-menu>
                    </v-col>
                  </v-row>
                </div>
              </v-col>
              <!-- <v-col
                v-if="!this.$route.params.id"
                cols="12"
                md="6"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      small
                      fab
                      outlined
                      dense
                      class="mx-1 my-1"
                      color="blue"
                      v-bind="attrs"
                      @click="addNewSerial()"
                      v-on="on"
                    >
                      <v-icon>
                        fa-plus
                      </v-icon>
                    </v-btn>
                  </template>
                  {{ $t('assets.addSerial') }}
                </v-tooltip>
              </v-col>
              <v-col
                cols="12"
              >
                <template v-if="formSerial.length >= 1">
                  <h3 class="mb-4">
                    {{ $t('assets.serialsInfo') }}
                  </h3>
                  <v-row
                    class="border"
                  >
                    <v-col
                      v-for="(item, index) in formSerial"
                      :key="index"
                      cols="12"
                      md="6"
                    >
                      <v-card
                        class="pa-2 ma-2"
                      >
                        <v-card-title>
                          <span class="text-h4">{{ $t('assets.newSerial') }}</span>
                          <v-spacer />

                          <v-icon
                            aria-label="Close"
                            @click="deleteSerial(index)"
                          >
                            mdi-close
                          </v-icon>
                        </v-card-title>
                        <v-text-field
                          v-model="item.assetSerialNumber"
                          :label="$t('assets.arrayOfAssetSerialNumber')"
                          outlined
                          dense
                          required
                        />
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-col> -->
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
      <v-dialog
        v-model="addAssetCategory"
        persistent
        max-width="1200"
      >
        <v-card
          class="text-center"
        >
          <base-material-card
            :title="$t('assetCategory.addCategory')"
            color="green"
            class="pt-12"
          >
            <v-card-text class="mt-2">
              <assetCategoryForm />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                outlined
                @click="closeAddCategory()"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </base-material-card>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="addAssetType"
        persistent
        max-width="1200"
      >
        <v-card
          class="text-center"
        >
          <base-material-card
            :title="$t('assetsType.addType')"
            color="green"
            class="pt-12"
          >
            <v-card-text class="mt-2">
              <assetTypeForm />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                outlined
                @click="closeAddType()"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </base-material-card>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="addAssetBrand"
        persistent
        max-width="1200"
      >
        <v-card
          class="text-center"
        >
          <base-material-card
            :title="$t('assetsBrand.addBrand')"
            color="green"
            class="pt-12"
          >
            <v-card-text class="mt-2">
              <assetBrandForm />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                outlined
                @click="closeAddBrand()"
              >
                {{ $t('actions.close') }}
              </v-btn>
            </v-card-actions>
          </base-material-card>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="addAssetModel"
        persistent
        max-width="1200"
      >
        <v-card
          class="text-center"
        >
          <base-material-card
            :title="$t('assetModel.addModel')"
            color="green"
            class="pt-12"
          >
            <v-card-text class="mt-2">
              <assetModelForm />
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                outlined
                @click="closeAddModel()"
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
  import moment from 'moment'
  import assetCategoryForm from '../assets-category/Form.vue'
  import assetTypeForm from '../assets-type/Form.vue'
  import assetBrandForm from '../assets-brand/Form.vue'
  import assetModelForm from '../assets-model/Form.vue'
  const AssetsService = ServiceFactory.get('Assets')
  const AssetsTypeService = ServiceFactory.get('AssetsType')
  const AssetsCategoryService = ServiceFactory.get('AssetsCategory')
  const AssetsBrandService = ServiceFactory.get('AssetsBrand')
  const AssetsModelService = ServiceFactory.get('AssetsModel')
  const POService = ServiceFactory.get('PO')
  const CompaniesFloorService = ServiceFactory.get('CompaniesFloor')
  const CompanyRoomService = ServiceFactory.get('CompanyRoom')
  const AssetsStatusService = ServiceFactory.get('AssetsStatus')
  const AuthenticationService = ServiceFactory.get('Authentication')
  export default {
    name: 'Companies',
    components: {
      assetCategoryForm,
      assetTypeForm,
      assetBrandForm,
      assetModelForm,
    },
    data: (vm) => ({
      dataLoading: false,
      isLoading: false,
      valid: false,
      assetMaintinanceDate: false,
      assetExpiryDate: false,
      assetProductionDate: false,
      printDate: false,
      addAssetCategory: false,
      addAssetType: false,
      addAssetBrand: false,
      addAssetModel: false,
      data: {
        assetId: null,
        assetName: '',
        assetDescription: '',
        erpCode: '',
        assetCategoryId: null,
        assetTypeId: null,
        assetBrandId: null,
        assetModelId: null,
        assetSerialNumber: '',
        branchId: null,
        floorId: null,
        roomId: null,
        poid: null,
        assetProductionDate: null,
        assetExpiryDate: null,
        assetMaintinanceDate: null,
        arrayOfAssetSerialNumber: [],
        assetCount: null,
        assetStatusId: null,
      },
      LKPAssets: [],
      LKPType: [],
      LKPCategory: [],
      LKPBrand: [],
      LKPModel: [],
      LKPBrnch: [],
      LKPFloor: [],
      LKPRoom: [],
      LKPStatus: [],
      LKPPO: [],
      formSerial: [],
      Roles: [],
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
      this.checkLinksRole()
      this.getLKPCategory()
      this.getLKPBrnch()
      this.getLKPStatus()
      this.getLKPAssets()
      this.getLKPPO()
    },
    methods: {
      addName (event) {
        setTimeout(() => {
          // this.LKP.push(event.target.value)
          this.data.assetName = event.target.value
          console.log('LKP', event.target.value)
        }, 3000)
      },
      addAssetCategory () {
        this.addAssetCategory = true
      },
      closeAddCategory () {
        this.getLKPCategory()
        this.addAssetCategory = false
      },
      closeAddType () {
        console.log(this.data.assetCategoryId)
        if (this.data.assetCategoryId) {
          this.getLKPType(this.data.assetCategoryId)
        }
        this.addAssetType = false
      },
      closeAddBrand () {
        if (this.data.assetTypeId) {
          this.getLKPBrand(this.data.assetTypeId)
        }
        this.addAssetBrand = false
      },
      closeAddModel () {
        if (this.data.assetBrandId) {
          this.getLKPModel(this.data.assetBrandId)
        }
        this.addAssetModel = false
      },
      async  submitForm () {
        this.loading = true
        this.disabled = true
        if (this.$route.params.id) {
          this.updateContent({
            assetId: this.data.assetId,
            assetName: this.data.assetName,
            assetDescription: this.data.assetDescription,
            assetCategoryId: this.data.assetCategoryId,
            assetTypeId: this.data.assetTypeId,
            assetBrandId: this.data.assetBrandId,
            assetModelId: this.data.assetModelId,
            branchId: this.data.branchId,
            floorId: this.data.floorId,
            roomId: this.data.roomId,
            assetStatusId: this.data.assetStatusId,
            poid: this.data.poid,
            erpCode: this.data.erpCode,
            assetProductionDate: moment(this.data.assetProductionDate).format(),
            assetExpiryDate: moment(this.data.assetExpiryDate).format(),
            assetMaintinanceDate: moment(this.data.assetMaintinanceDate).format(),
            printDate: moment(this.data.printDate).format(),
            assetSerialNumber: this.data.assetSerialNumber,
          })
        } else {
          this.newItem(
            {
              assetName: this.data.assetName,
              assetDescription: this.data.assetDescription,
              assetCategoryId: this.data.assetCategoryId,
              assetTypeId: this.data.assetTypeId,
              assetBrandId: this.data.assetBrandId,
              assetModelId: this.data.assetModelId,
              branchId: this.data.branchId,
              floorId: this.data.floorId,
              roomId: this.data.roomId,
              assetStatusId: this.data.assetStatusId,
              poid: this.data.poid,
              erpCode: this.data.erpCode,
              assetProductionDate: moment(this.data.assetProductionDate).format(),
              assetExpiryDate: moment(this.data.assetExpiryDate).format(),
              assetMaintinanceDate: moment(this.data.assetMaintinanceDate).format(),
              printDate: moment(this.data.printDate).format(),
              arrayOfAssetSerialNumber: this.data.arrayOfAssetSerialNumber,
              assetCount: parseInt(this.data.assetCount),
            },
          )
        }
      },
      async newItem (data) {
        const item = await AssetsService.addAssets(data)
        console.log('new Item', data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Assets')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      async updateContent (data) {
        console.log('update Item', data)
        const item = await AssetsService.updateAssets(data)
        if (item.success === true) {
          this.successMessage = 'Successful'
          this.successSnackbar = true
          setTimeout(() => {
            this.$router.push('/Assets')
          }, 1500)
        } else {
          this.errorMessage('something Error')
          this.errorSnackbar = true
        }
        this.disabled = false
        this.loading = false
      },
      // addNewSerial () {
      //   this.data.arrayOfAssetSerialNumber = this.formSerial
      //   if (this.data.arrayOfAssetSerialNumber.length < this.data.assetCount) {
      //     this.data.arrayOfAssetSerialNumber.push({
      //       assetSerialNumber: null,
      //     })
      //   }
      // },
      // deleteSerial (id) {
      //   this.data.arrayOfAssetSerialNumber.splice(id, 1)
      //   console.log(this.data.arrayOfAssetSerialNumber)
      // },
      async fetchOneItem (id) {
        this.dataLoading = true
        const assets = await AssetsService.fetchOneItem(id)
        this.getLKPType(assets.object.assetCategoryId)
        this.getLKPBrand(assets.object.assetTypeId)
        this.getLKPModel(assets.object.assetBrandId)
        this.getLKPFloor(assets.object.branchId)
        this.getLKPRoom(assets.object.floorId)
        assets.object.assetProductionDate = moment(assets.object.assetProductionDate).format('YYYY-MM-DD')
        assets.object.assetExpiryDate = moment(assets.object.assetExpiryDate).format('YYYY-MM-DD')
        assets.object.assetMaintinanceDate = moment(assets.object.assetMaintinanceDate).format('YYYY-MM-DD')
        assets.object.printDate = moment(assets.object.printDate).format('YYYY-MM-DD')
        this.data = assets.object
        console.log('assets.object', assets.object)
        this.dataLoading = false
      },
      async getLKPAssets () {
        this.dataLoading = true
        const LKP = await AssetsService.getLKPAsset()
        // this.LKPAssets = LKP.list
        LKP.list.forEach(item => { this.LKPAssets.push(item.name) })
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
        const LKPBrnch = await AuthenticationService.getUserBranch()
        console.log('LKPBranch', LKPBrnch)
        this.LKPBrnch = LKPBrnch.object
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
      async getLKPPO () {
        this.dataLoading = true
        const LKPPO = await POService.getAllItems()
        this.LKPPO = LKPPO.list
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
.border{
  border: 1px solid #d2d2d2;
  border-radius: 5px;
  margin-bottom: 20px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details{
  display: none !important;
}
</style>
