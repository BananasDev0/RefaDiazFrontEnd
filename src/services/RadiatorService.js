import Radiator from "../models/Radiator.js";
import Product from "../models/Product.js";
import axios from "./axiosConfig.js";

const getAllRadiators = async (name = "") => {
      const result = await axios.get(`/radiators`, {
        params: { name },
      });
      if (Array.isArray(result.response)) {
        const radiators = result.response.map((radiatorData) => {
          const productData = radiatorData.product;
          const product = new Product(productData);
          return new Radiator({...radiatorData, product});
        });
        return radiators;
      } else {
        return [];
      }
  };
  

export { getAllRadiators };
