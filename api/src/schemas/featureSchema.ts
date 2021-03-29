import * as yup from "yup";

export const createFeatureSchema = yup.object({
  title: yup.string().min(1).max(50).required(),
  body: yup.string().min(0).max(500),
});

export const patchFeatureSchema = yup.object({
  title: yup.string().min(1).max(20),
  body: yup.string().min(0).max(200),
});
