import http from "./http-common";
import ICafeData from "../types/cafeType";

const getAll = (category: any) => {
  return http.get<Array<ICafeData>>(`/${category}`);
};

const CafeService = { getAll };
  
export default CafeService;