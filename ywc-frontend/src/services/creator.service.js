import http from "../http-common";

const getAll = () => {
  return http.get("/creators");
};

const get = id => {
  return http.get(`/creators/${id}`);
};

const create = data => {
  return http.post("/creators", data);
};

const update = (id, data) => {
  return http.put(`/creators/${id}`, data);
};

const destroy = id => {
  return http.delete(`/creators/${id}`);
};

const destroyAll = () => {
  return http.delete(`/creators`);
};

const findByCreatorName = creatorName => {
  return http.get(`/creators?creatorName=${creatorName}`);
};

const CreatorService = {
  getAll,
  get,
  create,
  update,
  destroy,
  destroyAll,
  findByCreatorName,
};

export default CreatorService;