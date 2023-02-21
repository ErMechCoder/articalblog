import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { userRequest } from "../../../requestMethods";
import { GlobalFilter } from "./GlobalFilter";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
} from "react-table";

const ArticleTable = ({  articleDisptach,articles, user }) => {

  console.log("articles",articles)

  const navigate = useNavigate();
  const isAdmin = user.dbAdmin.isAdmin;
  const [isLoading, setLoading] = useState(false);

  const productsData = useMemo(() => [...articles], [articles]);
  const productsColumns = useMemo(
    () =>
      articles[0]
        ? Object.keys(articles[0])
            .filter(
              (key) =>
                key !== "articleBody" && key !== "__v" && key !== "updatedAt"
            )
            .map((key) => {
              if (key === "imageFile")
                return {
                  Header: "IMAGE FILE",
                  accessor: key,
                  Cell: ({ value }) => (
                    // <img src={value} height={70} width={70} />
                    <LazyLoadImage
                    src={value}
                    height={70}
                    width={70}
                    />
                  ),
                };
              if (key === "createdAt") {
                return {
                  Header: "CREATED AT",
                  accessor: key,
                  Cell: ({ value }) => (
                    <div className="text-center px-3">{formateDate(value)}</div>
                  ),
                  maxWidth: 70,
                };
              }

              return { Header: key.toUpperCase(), accessor: key };
            })
        : [],
    [articles]
  );

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        Header: "INDEX",
        accessor: "",
        Cell: (row) => {
          return <div className="text-center">{row.row.index + 1}</div>;
        },
        disableSortBy: true,
        disableFilters: true,
      },
      ...columns,
      {
        id: "Edit",
        Header: "ACTION",
        Cell: ({ row }) => (
          <div className="d-flex align-items-center justify-content-center">
            <button
              className="btn mx-2 edit-btn"
              onClick={() => handlePush(row.values._id)}
            >
              <i class="bi bi-pencil-square"></i>
            </button>
            <button
              className="btn mx-2 delete-btn"
              onClick={() => handleDelete(row.values._id)}
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        ),
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
      initialState: {
        pageSize: 5,
        hiddenColumns: ["_id", "createdBy", "updatedAt","URL"],
      },
    },
    useGlobalFilter,
    tableHooks,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = tableInstance;

  const formateDate = (date) => {
    const newDate = new Date(date);
    const form = newDate.toLocaleDateString();
    const formate = form.split("/");
    if (formate[0].length === 1) {
      formate[0] = "0" + formate[0];
    }
    if (formate[1].length === 1) {
      formate[1] = "0" + formate[1];
    }
    const formateDate = formate[0] + "-" + formate[1] + "-" + formate[2];
    return `${formateDate}`;
  };

  const handlePush = (id) => {
    navigate(`/admin/update-article/${id}`);
  };

  const handleDelete = async (id) => {
    // pop up a confirmation box
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    setLoading(true);
    if (confirmed) {
      try {
        await userRequest.delete("/article/delete/" + id);
        articleDisptach({
          type: "DELETE_ARTICLE",
          payload: id,
        });
      
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert(err.message);
      }
    } else {
      setLoading(false);
      return;
    }
  };

  return (
    <div className="my-2 mx-2 shadow">
      <div className="py-3 px-3 admin-content-bg">
        <h4>All articles</h4>
      </div>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <div>
        <table class="table table-bordered table-hover " {...getTableProps()}>
          <thead className="table-primary">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    scope="col"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="table-light">
            {page.map((row, idx) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, idx) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          className="container align-items-center justify-content-center"
          style={{ padding: "0.5rem" }}
        >
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className=" btn btn-warning"
          >
            {"<<"}
          </button>{" "}
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="btn btn-warning"
          >
            {"<"}
          </button>{" "}
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="btn btn-warning"
          >
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="btn btn-warning"
          >
            {">>"}
          </button>
          <span className="text-center mx-3">
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ArticleTable;
