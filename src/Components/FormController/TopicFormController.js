import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";

import { CREATE_TOPIC } from "Mutations/Topic";
import { SUB_CATEGORIES } from "Queries/SubCategory";
import { CATEGORIES } from "Queries/Category";
import { TOPICS } from "Queries/Topic";

const makeDropdownOptions = (category_data, subcategory_data, loading) => {
  const categories =
    !loading && get(category_data, "categories.categoryFeed", []);
  const subcategories = !loading && get(subcategory_data, "subCategories", []);

  const category_options = map(categories, ({ id, name }) => {
    return {
      value: id,
      label: name,
    };
  });
  const subCategory_options = map(subcategories, ({ id, name, category }) => {
    return {
      value: id,
      label: name,
      categoryId: category.id,
    };
  });

  return {
    category_options,
    subCategory_options,
  };
};

export const TopicFormController = ({ children }) => {
  const [createTopic] = useMutation(CREATE_TOPIC, {
    refetchQueries: [{ query: TOPICS }],
  });
  const { data, loading } = useQuery(CATEGORIES);
  const { data: data_subCategory, loading: loading_subCategory } = useQuery(
    SUB_CATEGORIES
  );
  console.log("TopicFormController");
  console.log(data);

  const { category_options, subCategory_options } = makeDropdownOptions(
    data,
    data_subCategory,
    loading || loading_subCategory
  );

  const onSubmit = async (values, dispatch) => {
    try {
      await createTopic({
        variables: {
          input: {
            ...values,
          },
        },
      });
      console.log("Success");
      dispatch(destroy("Create_Topic_Form"));
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.category) errors.category = "Required";
    if (!values.subCategory) errors.subCategory = "Required";
    if (!values.title) errors.title = "Required";
    if (!values.url) errors.url = "Required";

    return errors;
  };

  return children({
    onSubmit,
    validate,
    category_options,
    subCategory_options,
    loading: loading || loading_subCategory,
  });
};
