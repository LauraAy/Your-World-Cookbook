import http from "../http-common";

const getAll = () => {
  return http.get("/regions");
};

const get = id => {
  return http.get(`/regions/${id}`);
};

const findByCountry = country => {
  return http.get(`/regions/search?country=${country}`);
};

const findByRegionName = regionName => {
  return http.get(`/regions/search?regionName=${regionName}`);
};

const create = data => {
  return http.post("/regions", data);
};

const update = (id, data) => {
  return http.put(`/regions/${id}`, data);
};

const remove = id => {
  return http.delete(`/regions/${id}`);
};

const removeAll = () => {
  return http.delete(`/regions`);
};


const RegionService = {
  getAll,
  get,
  findByCountry,
  findByRegionName,
  create,
  update,
  remove,
  removeAll
};

export default RegionService;