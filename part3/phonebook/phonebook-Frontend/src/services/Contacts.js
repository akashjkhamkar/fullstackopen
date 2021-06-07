import axios from "axios";

const url = "/api/persons";

const getAll = () => {
  return axios.get(url).then((res) => res.data);
};

const add = (NewContact) => {
  return axios.post(url, NewContact).then((res) => res.data);
};

const remove = (id) => {
  return axios.delete(url + `/${id}`).then((res) => res);
};

const update = (id, changedContact) => {
  return axios.put(url + `/${id}`, changedContact).then((res) => res.data);
};

const Contacts = {
  getAll,
  add,
  remove,
  update
};

export default Contacts;
