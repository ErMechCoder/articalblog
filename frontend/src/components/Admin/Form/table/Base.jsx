import React from "react";
import Table from "./Table";
import FormService from "../../../../services/FormService";
import { toast } from "react-toastify";

const EditableTextCell = (props) => {
  const { column, row, cell, updateMyData } = props;
  const value = cell.value;
  const rowIndex = row.index;
  const columnId = column.id;
  const onChange = (e) => {
    updateMyData(rowIndex, columnId, e.target.value);
    console.log(row.original);
  };
  return <input value={value} onChange={onChange} className="form-control" />;
};

const EditableDropDown = (props) => {
  const { column, row, cell, updateMyData } = props;
  const value = cell.value;
  const rowIndex = row.index;
  const columnId = column.id;

  //   const onChange = (e) => {
  //     updateMyData(rowIndex, columnId, e.target.value);
  //   };

  if (cell.value.length > 0) {
    return (
      <select
        value={value}
        onChange={() => {
          alert("hi");
          console.log(value);
        }}
      >
        {cell.value.map((item, index) => {
          return <option value={item}>{item.label}</option>;
        })}
      </select>
    );
  } else {
    return <p className="text-danger">not available </p>;
  }
};

const injectClass = (status) => {
  if (status === "Pending") {
    return "bg-warning";
  } else if (status === false) {
    return "bg-danger";
  } else if (status === true) {
    return "bg-success";
  }
};

const DisplayStatus = (props) => {
  const { column, row, cell, updateMyData } = props;
  const value = cell.value;
  return (
    <span className={`badge ${injectClass(value)}`}>
      {value ? "Enabled" : "Disabled"}
    </span>
  );
};

const staticData = [
  { id: "item-1", description: "First thing", one: 0, two: 5, sum: 0 },
  { id: "item-2", description: "Second thing", one: 7, two: 1, sum: 0 },
  { id: "item-3", description: "Third thing", one: 2, two: 4, sum: 0 },
];

const Base = ({ data, setData }) => {
  const formService = new FormService();
  const columns = React.useMemo(() => {
    const DescriptionCell = (props) => {
      return (
        <div className="d-flex align-items-center justify-content-center">
          <UpDownArrow {...props} />
          <EditableTextCell {...props} />
        </div>
      );
    };
    const TextCell = (props) => {
      return (
        <div>
          <EditableTextCell {...props} />
        </div>
      );
    };

    const DropDownCell = (props) => {
      return (
        <div>
          <EditableDropDown {...props} />
        </div>
      );
    };

    const StatusCell = (props) => {
      return (
        <div>
          <DisplayStatus {...props} />
        </div>
      );
    };

    return [
      {
        Header: "Label",
        accessor: "label",
        Cell: DescriptionCell,
      },
      {
        Header: "Type",
        accessor: "type",
        Cell: TextCell,
      },
      {
        Header: "Place Holder Text",
        accessor: "placeHolder",
        Cell: TextCell,
      },
      {
        Header: "Options",
        // accessor: (row) => row.one + row.two,
        Cell: DropDownCell,
        accessor: "options",
      },
      {
        Header: "Required?",
        accessor: "required",
        Cell: TextCell,
      },
      // {
      //   Header: "Peer Button?",
      //   accessor: "hasButton",
      //   Cell: TextCell,
      // },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusCell,
      },
      {
        Header: "Action",
        Cell: (props) => {
          return (
            <div className="d-flex align-items-center justify-content-between">
              <button
                className={`btn ${
                  props.row.original.status ? "btn-danger" : "btn-success"
                } btn-sm mx-1`}
                onClick={async () => {
                  try {
                    let status = !props.row.original.status;

                    const res = await formService.updateStatus(
                      props.row.original.id,
                      status
                    );
                    if (res.status === 200) {
                      updateMyData(props.row.index, "status", status);
                    }
                  } catch (err) {
                    toast.error(err.message);
                  }
                }}
              >
                {props.row.original.status ? "Disable" : "Enable"}
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={async () => {
                  const confirmed = window.confirm("Are you sure?");

                  try {
                    if (confirmed) {
                      const res = await formService.deleteForm(
                        props.row.original.id
                      );
                      if (res.status === 200) {
                        // remove the row from table
                        deleteMyData(props.row.index);
                      }
                    }
                  } catch (err) {
                    toast.error(err.message);
                  }
                }}
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ];
  }, []);

  const [idCount, setIdCount] = React.useState(staticData.length + 1);

  const resetData = () => setData(staticData);
  const removeRow = (rowIndex) => {
    setData((old) => old.filter((row, index) => index !== rowIndex));
  };
  const addRow = () => {
    const one = Math.floor(Math.random() * 10);
    const two = Math.floor(Math.random() * 10);
    const sum = one + two;
    setData((old) => [
      ...old,
      {
        id: `item-${idCount}`,
        description: `Thing ${idCount}`,
        one,
        two,
        sum,
      },
    ]);
    setIdCount(idCount + 1);
  };
  const updateMyData = (rowIndex, columnID, newValue) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...oldData[rowIndex],
            [columnID]: newValue,
          };
        }
        return row;
      })
    );
  };

  const deleteMyData = (rowIndex) => {
    setData((oldData) =>
      oldData.filter((row, index) => {
        return index !== rowIndex;
      })
    );
  };

  const reorderData = (startIndex, endIndex) => {
    const newData = [...data];
    const [movedRow] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, movedRow);

    setData(newData);

    Promise.all(
      newData.map((row, index) => formService.setOrder(row.id, index))
    )
      .then(() => {
        toast.success("Order Updated");
      })
      .catch(() => {
        toast.error("Error updating order");
      });
  };

  const UpDownArrow = (props) => (
    <span
      {...props.dragHandleProps}
      className={props.className}
      aria-label="move"
      role="img"
    >
      ↕️
    </span>
  );

  return (
    <div className="row">
      <div className="col-md-12">
        <Table
          columns={columns}
          data={data}
          updateMyData={updateMyData}
          removeRow={removeRow}
          addRow={addRow}
          resetData={resetData}
          reorderData={reorderData}
        />
      </div>
    </div>
  );
};

export default Base;
