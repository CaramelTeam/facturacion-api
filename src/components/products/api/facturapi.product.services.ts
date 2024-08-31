import axios from "axios";
import envsConfig from "src/config/envs.config";
import { PaginationI } from "src/helpers/interfaces/pagination.interface";

const FACTURAPI_BASE_URL = envsConfig().app.FACTURAPI_URL;

export class ProductApiServices {
    constructor() { }

    async getCatalogUnits(pagination: PaginationI) {
        try {
            const data = await axios({
                url: `${FACTURAPI_BASE_URL}/catalogs/units`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${envsConfig().app.TEST_SECRET_KEY}`
                },
                params: {
                    q: pagination.search,
                    page: pagination.page,
                    limit: pagination.perPage
                }
            })
            return data?.data;
        } catch (error) {
            console.log(error);
        }

    }

}