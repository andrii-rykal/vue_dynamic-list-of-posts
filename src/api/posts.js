import { client } from "@/utils/http";

export const getPosts = (userId) => {
  return client.get(`/posts?userId=${userId}`);
};

