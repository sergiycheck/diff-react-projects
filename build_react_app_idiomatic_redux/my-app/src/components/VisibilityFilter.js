import React from "react";
import { filterTypes } from "../redux/actionsData";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import cx from "classnames";

const VisibilityFilter = () => {
  const arrValuesFilterTypes = Object.values(filterTypes);
  const renderedFilterLinks = arrValuesFilterTypes.map((filter, i) => {
    return (
      <FilterLink key={i} filter={filter}>
        {filter}
        {i < arrValuesFilterTypes.length - 1 && ", "}
      </FilterLink>
    );
  });

  return <div className="visibility-filters">{renderedFilterLinks}</div>;
};

export const FilterLink = ({ filter, children }) => {
  const toRes = filter === filterTypes.All ? "/" : filter;
  const params = useParams();
  return (
    <Link
      to={toRes}
      className={cx(
        "filter",
        ((!params.filter && filter === filterTypes.All) || params.filter === filter) && "filter-active"
      )}
    >
      {children}
    </Link>
  );
};

FilterLink.propTypes = {
  filter: PropTypes.oneOf([...Object.values(filterTypes)]).isRequired,
  children: PropTypes.node.isRequired,
};

export default VisibilityFilter;
