/* eslint-disable space-before-function-paren */
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/Report`

export default {
    GetProcedures() {
        return Service.get(`${resource}/GetProcedures`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    ExcuteProcedure(data) {
        const procedure = (data.procedure && data.procedure !== null) ? data.procedure : ''
            // const name = (data.name && data.name !== null) ? data.name : ''
        const from = (data.from && data.from !== null) ? data.from : ''
        const to = (data.to && data.to !== null) ? data.to : ''
        const categoryId = (data.categoryId && data.categoryId !== null) ? data.categoryId : 0
        const modelId = (data.modelId && data.modelId !== null) ? data.modelId : 0
        const typeId = (data.typeId && data.typeId !== null) ? data.typeId : 0
        const brandId = (data.brandId && data.brandId !== null) ? data.brandId : 0
        const branchId = (data.branchId && data.branchId !== null) ? data.branchId : 0
        const floorId = (data.floorId && data.floorId !== null) ? data.floorId : 0
        const roomId = (data.roomId && data.roomId !== null) ? data.roomId : 0
        const statusId = (data.statusId && data.statusId !== null) ? data.statusId : 0

        const filterQuery = { procedure, from, to, categoryId, modelId, typeId, brandId, branchId, floorId, roomId, statusId }
        return Service.post(`${resource}/ExcuteProcedure`, filterQuery)
            .then((response) => {
                if (response.status === 200) {
                    return response
                }
            })
    },
}
