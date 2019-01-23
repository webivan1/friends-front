import React from 'react';
import PaginationBase from "material-ui-flat-pagination";

const Pagination = props => {
  const { currentPage, onClick, ...otherProps } = props;

  const currentOffset = (currentPage - 1) * otherProps.limit;
  const totalPages = Math.ceil(props.total / props.limit);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationBase
      offset={currentOffset}
      {...otherProps}
      onClick={(e, offset) => {
        const page = Math.ceil(totalPages * offset / props.total);
        return onClick(e, page <= 0 ? 1 : page);
      }}
    />
  )
};

export default Pagination;