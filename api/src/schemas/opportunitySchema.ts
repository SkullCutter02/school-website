import * as yup from "yup";

export const createOpportunitySchema = yup.object({
  imageUrl: yup.string(),
  name: yup.string().min(1).max(100).required(),
  description: yup.string().min(1).max(1000).required(),
  contactEmail: yup.string().email().required(),
});
