import * as yup from "yup";

export const createPostSchema = yup.object({
  user: yup.string().min(1).max(30).required(),
  title: yup.string().min(1).max(200).required(),
  body: yup.string().min(0).max(3000).required(),
});
