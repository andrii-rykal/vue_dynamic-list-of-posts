import { client } from "@/utils/http";

export const getUsers = () => {
  return client.get("/users");
};

export const getUser = (email) => {
  return getUsers().then(({ data }) => {
    // console.log(data);
    
    return data.find(user => user.email === email);
  });
};

export const createUser = (email, name) => {
  return client.post('/users', { email, name });
};