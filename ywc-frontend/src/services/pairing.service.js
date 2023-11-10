import http from "../http-common";

const getAll = () => {
	return http.get("/pairings");
};

const get = id => {
  return http.get(`/pairings/${id}`);
};

const create = data => {
  return http.post("/pairings", data);
};

const update = (id, data) => {
  return http.put(`/pairings/${id}`, data);
};

const destroy = id => {
  return http.delete(`/pairings/${id}`);
};

const destroyAll = () => {
  return http.delete(`/pairings`);
};

const findByPairingName = pairingName => {
  return http.get(`/pairings?pairingName=${pairingName}`);
};

const PairingService = {
  getAll,
  get,
  create,
  update,
  destroy,
  destroyAll,
  findByPairingName,
};

export default PairingService;