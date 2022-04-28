/* eslint-disable space-before-function-paren */
import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/PurchaseOrder`

export default {
    getAllItems(itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/GetAll?page=${page}&limit=${itemsPerPage}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    fetchOneItem(id) {
        return Service.get(`${resource}/GetById?POId=${id}`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getLKPEmployee() {
        return Service.get(`${resource}/LKPOrder`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    AddOrUpdate(data) {
        return Service.post(`${resource}/AddOrUpdate`, data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
}
