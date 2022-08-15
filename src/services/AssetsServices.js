/* eslint-disable eol-last */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-useless-escape */
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/Assets`

export default {

    getAllItems(itemsPerPage, page, pageNumber, filters, IsPagination) {
        const searchQuery = (filters.search && filters.search !== '') ? '&filter=' + filters.search : ''
        const searchByBranchQuery = (filters.brnch && filters.brnch !== '') ? '&branchId=' + filters.brnch : ''
        const filterQuery = searchQuery + searchByBranchQuery
        return Service.get(`${resource}/GetAll?page=${page}&limit=${itemsPerPage}${filterQuery}&IsPagination=${IsPagination}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    fetchOneItem(id) {
        return Service.get(`${resource}/GetById?AssetId=${id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getLKPType() {
        return Service.get(`${resource}/LKPType`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getLKPAsset() {
        return Service.get(`${resource}/LKPAsset`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    updateAssets(data) {
        return Service.post(`${resource}/Update`, data)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    addAssets(data) {
        return Service.post(`${resource}/Add`, data)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    MoveAssetfromBranchToBranch(data) {
        return Service.get(`${resource}/MoveAssetfromBranchToBranch?AssetId=${data.assetId}&NewBranchId=${data.NewBranchId}&Description=${data.description}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    MoveAssetInsideBranch(data) {
        return Service.post(`${resource}/MoveAssetInsideBranch`, data)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getPendingItems() {
        return Service.get(`${resource}/GetAllPendingAssets`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    acceptTransferBranch(data) {
        return Service.get(`${resource}/ApprovedAssetfromBranchToBranch?AssetId=${data}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    acceptTransfersFloorAndRoom(data) {
        return Service.get(`${resource}/ApprovedAssetInsideBranch?AssetId=${data}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    GetAllAssetsForPrint(itemsPerPage, page, pageNumber, data, IsPrint) {
        return Service.post(`${resource}/GetAssetsForPrint?page=${page}&limit=${itemsPerPage}&IsPrint=${IsPrint}`, data)
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    sednNewERP(serialArr, erpCode) {
        return Service.post(`${resource}/UpdateErpCode`, {
                serialArr: serialArr,
                erpCode: erpCode,
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    importAssets(file) {
        return Service.post(`${resource}/Import`, file)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    printAssetsStatus(data) {
      return Service.post(`${resource}/PrintAsset`, data)
          .then((response) => {
              if (response.status === 200) {
                  return response.data
              }
          })
  },
    printAssets(printerIPAddress, item) {
        console.log('socketData', item)
        const socket = new WebSocket('ws://127.0.0.1:80')
        console.log(socket)
        socket.onmessage = function(event) {
            console.log(event)
        }

        socket.onopen = function(event) {
            console.log(event)

            const socketData = printerIPAddress + ',' + item.join(',')
            console.log('socketData', item)
            socket.send(socketData)
            console.log('Successfully connected to the echo websocket server...')
        }
    },
}
