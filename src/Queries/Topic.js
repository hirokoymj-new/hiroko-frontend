import gql from "graphql-tag";

import { CategoryFragments } from "./CategoryFragments";
import { SubCategoryFragments } from "./SubCategoryFragments";

export const TOPICS = gql`
  query Topics {
    topics {
      id
      title
      url
      category {
        ...CategoryInfo
      }
      subCategory {
        ...SubCategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
  ${SubCategoryFragments.subCategoryInfo}
`;

export const TOPIC_BY_ID = gql`
  query TopicById($id: ID!) {
    topicById(id: $id) {
      id
      title
      url
      category {
        ...CategoryInfo
      }
      subCategory {
        ...SubCategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
  ${SubCategoryFragments.subCategoryInfo}
`;

export const TOPIC_BY_CATEGORY = gql`
  query TopicByCategory($id: ID!) {
    topicByCategory(categoryId: $id) {
      id
      title
      url
      category {
        ...CategoryInfo
      }
      subCategory {
        ...SubCategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
  ${SubCategoryFragments.subCategoryInfo}
`;

export const TOPIC_BY_CATEGORY_ABBR = gql`
  query TopicByCategoryAbbr($abbr: String!) {
    topicByCategoryAbbr(abbr: $abbr) {
      id
      title
      url
      category {
        ...CategoryInfo
      }
      subCategory {
        ...SubCategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
  ${SubCategoryFragments.subCategoryInfo}
`;
