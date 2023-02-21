import React, { useMemo, useState } from "react";
import { Modal, Button, Form, FloatingLabel, Alert } from "react-bootstrap";
import { userRequest } from "../../../requestMethods";
import {
  useGlobalFilter,
  useSortBy,
  useTable,
  usePagination,
} from "react-table";
import { GlobalFilter } from "../Article/GlobalFilter";

const QuoteComp = ({ quotes, setQuotes }) => {
  const [show, setShow] = useState(false);
  const [quoteData, setQuoteData] = useState({ writer: "", quote: "" });
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState({ variant: "", message: "" });

  const productsData = useMemo(() => [...quotes], [quotes]);
  const productsColumns = useMemo(
    () =>
      quotes[0]
        ? Object.keys(quotes[0])
            .filter(
              (key) =>
                key !== "articleBody" && key !== "__v" && key !== "updatedAt"
            )
            .map((key) => {
              if (key === "createdAt") {
                return {
                  Header: "CREATEDAT",
                  accessor: key,
                  Cell: ({ value }) => (
                    <div className=" text-center">{formateDate(value)}</div>
                  ),
                };
              }
              if (key === "writer") {
                return {
                  Header: "AUTHOR",
                  accessor: key,
                  Cell: ({ value }) => (
                    <div className="text-center">{value}</div>
                  ),
                };
              }

              return { Header: key.toUpperCase(), accessor: key };
            })
        : [],
    [quotes]
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
              onClick={() => handleEdit(row.values._id)}
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

  const handleEdit = async (id) => {
    try {
      setShow(true);
      const quote = quotes.find((quote) => quote._id === id);
      setQuoteData({ writer: quote.writer, quote: quote.quote });
      setEditId(id);
    } catch (error) {
      console.log(error);
    }
  };
  const editQuote = async () => {
    try {
      const res = await userRequest.put(`/quote/edit/${editId}`, {
        writer: quoteData.writer,
        quote: quoteData.quote,
      });
      if (res.status === 200) {
        setMessage({
          variant: "success",
          message: "Quote Edited Successfully",
        });
        const newQuotes = quotes.map((quote) =>
          quote._id === editId ? res.data : quote
        );
        setQuotes(newQuotes);
        setQuoteData({ writer: "", quote: "" });
        setEditId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quote?"
    );
    if (confirmed) {
      userRequest.delete("quote/delete/" + id).then((res) => {
        if (res.status === 200) {
          setQuotes(quotes.filter((quote) => quote._id !== id));
        }
      });
    } else {
      return;
    }
  };

  const handleModalClose = () => {
    setShow(false);
    setMessage({ variant: "", message: "" });
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

  return (
    <>
      <div className="my-2 mx-2 shadow">
        <div className="py-3 px-3 admin-content-bg">
          <h4>Quote</h4>
        </div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
        />
        <div>
          <table class="table table-bordered table-hover" {...getTableProps()}>
            <thead className="table-primary">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      scope="col"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
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
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        animation={true}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter text-center">
            Updating Quote
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message.show !== "" && message.variant !== "" ? (
            <>
              <Alert
                variant={message.variant}
                onClose={() => setMessage({ variant: "", message: "" })}
                dismissible
              >
                <p>{message.message}</p>
              </Alert>
            </>
          ) : (
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Quote Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={quoteData.quote}
                  onChange={(e) =>
                    setQuoteData({ ...quoteData, quote: e.target.value })
                  }
                />
              </Form.Group>

              <FloatingLabel
                className="mb-3"
                controlId="floatingPassword"
                label="Author"
              >
                <Form.Control
                  type="text"
                  placeholder="Author/Creator"
                  size="bg"
                  value={quoteData.writer}
                  onChange={(e) =>
                    setQuoteData({ ...quoteData, writer: e.target.value })
                  }
                />
              </FloatingLabel>

              <Button
                type="button"
                variant="primary"
                className="text-center"
                onClick={() => editQuote(editId)}
              >
                Submit
              </Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default QuoteComp;
