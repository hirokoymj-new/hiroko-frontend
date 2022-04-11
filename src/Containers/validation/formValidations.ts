import * as yup from "yup";

export const topicFormSchema = yup.object().shape({
  category: yup.string().required(),
  subCategory: yup.string().required(),
  title: yup.string().required(),
  url: yup.string().required(),
  order: yup.string().optional(),
});

export const categoryFormSchema = yup.object().shape({
  name: yup.string().required("Category name is required."),
  abbr: yup.string().required("Abbreviation is required."),
});
