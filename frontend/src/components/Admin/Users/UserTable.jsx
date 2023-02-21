import React, { useMemo, useContext } from "react";
import axios from "axios";
// import EditUserModal from "./EditUserModal";
import { Button } from "react-bootstrap";

import {
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
} from "react-table";
import FormService from "../../../services/FormService";

const UserTable = ({ data, setData }) => {
  const productsData = useMemo(() => [...data], [data]);
  const [show, setShow] = React.useState(false);
  const [editData, setEditData] = React.useState({});

  console.log(data);
  const productsColumns = useMemo(
    () =>
      data[0]
        ? Object.keys(data[0])
            .filter(
              (key) =>
                key !== "__v" &&
                key !== "agreeToTerms" &&
                key !== "password" &&
                key !== "isBlocked" &&
                key !== "isAdmin" &&
                key !== "isVerified" &&
                key !== "isDeleted"
            )
            .map((key) => {
              if (key === "interestProfile")
                return {
                  Header: "Interest Profile ",
                  accessor: key,
                  Cell: (row) => (
                    <div>
                      {row.value.map((item) => {
                        return <div>{item._id}</div>;
                      })}
                    </div>
                  ),
                };
              if (key === "isMultiSelect")
                return {
                  Header: "Is Multi-Select",
                  accessor: key,
                  Cell: (row) => <div>{row.value ? "Yes" : "No"}</div>,
                };
              if (key === "label")
                return { Header: "Input Label", accessor: key };
              if (key === "options")
                return {
                  Header: "Options ",
                  accessor: key,
                  Cell: (row) => {
                    if (row.value.length > 0) {
                      return (
                        <div>
                          {row.value.map((option) => (
                            <div>{option.label}</div>
                          ))}
                        </div>
                      );
                    } else {
                      return <div className=" px-2">No Options</div>;
                    }
                  },
                };

              if (key === "status") {
                return {
                  Header: "Status",
                  accessor: key,
                  Cell: ({ value }) => {
                    return (
                      <span className={`badge ${injectClass(value)}`}>
                        {value ? "Enabled" : "Disabled"}
                      </span>
                    );
                  },
                };
              }
              if (key === "likes") {
                return {
                  Header: "Likes",
                  accessor: key,
                  Cell: (row) => {
                    return <span>{row.value.length}</span>;
                  },
                };
              }
              if (key === "createdAt") {
                return {
                  Header: "Created At",
                  accessor: key,
                  Cell: (row) => {
                    return <span>{formateDate(row.value)}</span>;
                  },
                };
              }

              return { Header: key, accessor: key };
            })
            .sort((a, b) => a.Header.localeCompare(b.Header))
        : [],
    [data]
  );

  const handleDelete = async (data) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this form?"
    );
    try {
      if (confirmed) {
        alert("Form Deleted");
        // const res = await formService.deleteForm(data._id);
        // res.status === 200 &&
        //   setData(productsData.filter((item) => item._id !== data._id));
      }
    } catch (error) {
      console.log(error);
    }
  };
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

  const handleStatus = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = async (data) => {
    try {
      setEditData(data);
      setShow(true);
    } catch (error) {
      alert(error.message);
    }
  };

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      {
        Header: "INDEX",
        accessor: "",
        Cell: (row) => {
          return <span className="text-center">{row.row.index + 1}</span>;
        },
        disableSortBy: true,
        disableFilters: true,
      },
      ...columns,
      {
        id: "Edit",
        Header: "ACTION",
        Cell: ({ row }) => (
          <div className="d-flex">
            <Button
              variant="primary"
              className={`${
                (!row.values.status && "btn-warning") ||
                (row.values.status && "btn-success") ||
                "btn-danger"
              } mx-1 btn-fill`}
              onClick={() => handleStatus(row.values)}
            >
              {(row.values.status && "Disable") ||
                (!row.values.status && "Enable") ||
                "Activate"}
            </Button>
            {/* <Button
              variant="primary"
              className="btn-warning mx-1 btn-fill"
              onClick={() => handleEdit(row.original)}
            >
              <i class="bi bi-three-dots"></i>
            </Button> */}
            <button
              variant="primary"
              className="btn-danger mx-1 btn-fill "
              onClick={() => handleDelete(row.original)}
            >
              <i class="bi bi-trash-fill px-1"></i>{" "}
            </button>
          </div>
        ),
        disableSortBy: true,
        disableFilters: true,
        sortable: false,
        filterable: false,
      },
    ]);
  };

  const tableInstance = useTable(
    {
      columns: productsColumns,
      data: productsData,
      initialState: {
        pageSize: 5,
        hiddenColumns: ["_id", "createdBy", "updatedAt"],
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

  const injectClass = (status) => {
    if (status === "Pending") {
      return "bg-warning";
    } else if (status === false) {
      return "bg-danger";
    } else if (status === true) {
      return "bg-success";
    }
  };

  return (
    <>
      {/* <EditUserModal show={show} setShow={setShow} editData={editData} /> */}
      <table class="table table-bordered table-hover " {...getTableProps()}>
        <thead className="table-primary" style={{ whiteSpace: "nowrap" }}>
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
          className=" btn btn-secondary"
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="btn btn-secondary"
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="btn btn-secondary"
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="btn btn-secondary"
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
    </>
  );
};

export default UserTable;
