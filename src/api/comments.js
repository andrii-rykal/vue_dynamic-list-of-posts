import { client } from "@/utils/http";

export const getComments = (postId) => {
  return client.get(`/comments?postId=${postId}`);
};