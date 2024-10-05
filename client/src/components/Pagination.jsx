import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@material-ui/lab";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

const Pagination1 = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {posts} = useSelector((state) => state?.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={Math.ceil(posts.length/8)}
      page={page || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${1}`} />
      )}
    />
  );
};

export default Pagination1;
