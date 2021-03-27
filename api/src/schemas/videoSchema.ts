import * as yup from "yup";

export const createVideoSchema = yup.object({
  link: yup.string().min(1).required(),
});

export const patchVideoSchema = yup.object({
  link: yup.string().min(1),
});
