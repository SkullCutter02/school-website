import * as yup from "yup";

const USER_MAX = 30;
const TITLE_MAX = 200;
const BODY_MAX = 3000;

export const createPostSchema = yup.object({
  user: yup.string().min(1).max(USER_MAX).required(),
  title: yup.string().min(1).max(TITLE_MAX).required(),
  body: yup.string().min(0).max(BODY_MAX).required(),
  images: yup.array().of(yup.string()),
});

export const patchPostSchema = yup.object({
  title: yup.string().min(1).max(TITLE_MAX),
  body: yup.string().min(0).max(BODY_MAX),
  images: yup.array().of(yup.string()),
});
