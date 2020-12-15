import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import Link from "@material-ui/core/Link";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link as RouterLink } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

import { CATEGORIES } from "Queries/Category";
import { Table } from "Components/Tables/Table";
import { Title } from "Components/Titles/Title";

const useStyles = makeStyles((theme) => ({
  actionIcons: {
    marginRight: theme.spacing(2),
  },
}));

export const CategoryTable = ({ openDialog }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(CATEGORIES);

  const categories = get(data, "categories");
  const mappedData = map(categories, (category) => {
    const { id, name, abbr, order } = category;
    const actions = (
      <>
        <Link
          component={RouterLink}
          to={{
            pathname: `/editCategory/${id}`,
            state: { title: "Edit Category" },
          }}
        >
          <EditIcon className={classes.actionIcons} color="secondary" />
        </Link>
        <Link href="#" onClick={(e) => openDialog(e, id)}>
          <DeleteIcon className={classes.actionIcons} color="secondary" />
        </Link>
      </>
    );
    return {
      id,
      name,
      abbr,
      order,
      actions,
    };
  });

  return (
    <>
      <Title text="List Category" />
      <Table
        data={mappedData}
        loading={loading}
        colmuns={[
          {
            label: "ID",
            field: "id",
          },
          {
            label: "Category Name",
            field: "name",
          },
          {
            label: "Abbreviation",
            field: "abbr",
          },
          {
            label: "Order",
            field: "order",
            align: "right",
          },
          {
            label: "Actions",
            field: "actions",
            align: "center",
          },
        ]}
      />
    </>
  );
};
