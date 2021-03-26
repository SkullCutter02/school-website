import * as yup from "yup";

export const createFeatureSchema = yup.object({
  title: yup.string().min(1).max(20).required(),
  body: yup.string().min(0).max(200).required(),
});
