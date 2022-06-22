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
    GetAllAssetsForPrint(itemsPerPage, page, pageNumber, data) {
        return Service.post(`${resource}/GetAssetsForPrint?page=${page}&limit=${itemsPerPage}`, data)
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
    printAssets(printerIPAddress, item) {
        // return Service.post(`https://${printerIPAddress}/pstprnt`,
        //         `^XA
        //   ^RS,,,3,N,,,2
        //   ^RR3
        //   ^XZ
        //   ^XA
        //   ^SZ2^JMA
        //   ^MCY^PMN
        //   ^PW490
        //   ~JSN
        //   ^JZY
        //   ^LH0,0^LRN
        //   ^XZ
        //   ^XA
        //   ^FO130,80
        //   ^BY3^BCN,72,N,N^FD>;${item.assetSerialNumber}^FS
        //   ^FT166,185
        //   ^CI0
        //   ^A0N,34,46^FD${item.assetSerialNumber}^FS
        //   ^FT133,58
        //   ^A0N,34,46^FD${item.assetDescription}^FS
        //   ^RFW,H,1,2,1^FD1400^FS
        //   ^RFW,H,2,3,1^FD${item.assetSerialNumber}^FS
        //   ^PQ1,0,1,Y
        //   ^XZ`,
        // )
        //   .then((response) => {
        //       console.log(response)
        //     // if (response.status === 200) {
        //     //     return response.data
        //     // }
        // })
        // console.log('Starting connection to WebSocket Server', item)
        // console.log(new WebSocket('ws://4.0.80.80))
        const socket = new WebSocket('ws://0.0.0.0:8080')
        console.log(socket)
        socket.send(
                `^XA
              ^RS,,,3,N,,,2
              ^RR3
              ^XZ
              ^XA
              ^SZ2^JMA
              ^MCY^PMN
              ^PW490
              ~JSN
              ^JZY
              ^LH0,0^LRN
              ^XZ
              ^XA
              ^FO130,80
              ^BY3^BCN,72,N,N^FD>;${item.assetSerialNumber}^FS
              ^FT166,185
              ^CI0
              ^A0N,34,46^FD${item.assetSerialNumber}^FS
              ^FT133,58
              ^A0N,34,46^FD${item.assetDescription}^FS
              ^RFW,H,1,2,1^FD1400^FS
              ^RFW,H,2,3,1^FD${item.assetSerialNumber}^FS
              ^PQ1,0,1,Y
              ^XZ`)
            .then((socket) => {
                console.log('socket', socket)
                    // if (response.status === 200) {
                    //     return response.data
                    // }
            })

        socket.onmessage = function(event) {
            console.log(event)
        }

        socket.onopen = function(event) {
            console.log(event)
            console.log('Successfully connected to the echo websocket server...')
        }
    },
}
