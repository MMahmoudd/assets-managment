import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}/AssetBrand`

export default {

  getAllItems (itemsPerPage, page, pageNumber) {
        return Service.get(`${resource}/GetAll`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    fetchOneItem (id) {
      return Service.get(`${resource}/GetById?TypeId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getBrandByType (id) {
      return Service.get(`${resource}/GetBrandByType?TypeId=${id}`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    getLKPBrand () {
      return Service.get(`${resource}/LKPBrand`)
      .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
    },
    updateAddAssetsBrand (data) {
      return Service.post(`${resource}/AddOrUpdate`, data)
      .then((response) => {
          console.log(response)
        if (response.status === 200) {
            return response.data
        }
    })
    },
}
