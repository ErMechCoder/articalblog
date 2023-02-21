import React from "react";
import { useTable } from "react-table";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FormService from "../../../services/FormService";
import { toast } from "react-toastify";

const EditableTextCell = (props) => {
  const { column, row, cell, updateMyData } = props;
  const value = cell.value;
  const rowIndex = row.index;
  const columnId = column.id;
  const onChange = (e) => {
    updateMyData(rowIndex, columnId, e.target.value);
  };
  return <input value={value} onChange={onChange} />;
};

const EditableDropDown = (props) => {
  const { column, row, cell, updateMyData } = props;
  const value = cell.value;
  const rowIndex = row.index;
  const columnId = column.id;

  const onChange = (e) => {
    updateMyData(rowIndex, columnId, e.target.value);
  };

  if (cell.value.length > 0) {
    return (
      <select value={value} onChange={onChange}>
        {cell.value.map((item, index) => {
          return <option value={item}>{item.label}</option>;
        })}
      </select>
    );
  } else {
    return <p>Not available </p>;
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

function Table({
  columns,
  data,
  updateMyData,
  removeRow,
  addRow,
  resetData,
  reorderData,
}) {
  const table = useTable({
    columns,
    data,
    // non-API instance pass-throughs
    updateMyData,
    removeRow,
    addRow,
    reorderData,
  });
  // console.log({ table });
  const { getTableProps, headerGroups, prepareRow, rows } = table;

  const handleDragEnd = async (result) => {
    console.log(result.draggableId);
    const { source, destination } = result;

    if (!destination) return;

    reorderData(source.index, destination.index);
  };

  return (
    <>
      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="table-body">
            {(provided, snapshot) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Draggable
                      draggableId={row.original.id}
                      key={row.original.id}
                      index={row.index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <tr
                            {...row.getRowProps()}
                            {...provided.draggableProps}
                            // {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                          >
                            {row.cells.map((cell) => (
                              <td {...cell.getCellProps()}>
                                {cell.render("Cell", {
                                  dragHandleProps: provided.dragHandleProps,
                                  isSomethingDragging: snapshot.isDraggingOver,
                                })}
                              </td>
                            ))}
                          </tr>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
                <tr>
                  <td
                    style={{ backgroundColor: "darkblue" }}
                    colSpan={columns.length}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        textAlign: "center",
                      }}
                    >
                      <AddItem addRow={addRow} />
                      <ResetData resetData={resetData} />
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      <pre>
        {JSON.stringify(
          rows.map((row) => row.values),
          null,
          2
        )}
      </pre>
    </>
  );
}

const TrashCan = ({ removeRow, row, className }) => (
  <span
    className={className}
    onClick={() => removeRow(row.index)}
    role="img"
    aria-label="delete"
  >
    🗑️
  </span>
);

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

const AddItem = (props) => (
  <span
    className={props.className}
    onClick={() => props.addRow()}
    role="img"
    aria-label="add"
  >
    1️⃣ Add Item
  </span>
);

const ResetData = (props) => (
  <span
    className={props.className}
    onClick={() => props.resetData()}
    role="img"
    aria-label="reset"
  >
    Reset Items 🔁
  </span>
);

function BaseForm({ data, setData }) {
  const formService = new FormService();
  const columns = React.useMemo(() => {
    const DescriptionCell = (props) => {
      return (
        <div>
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
        Header: "Status",
        accessor: "status",
        Cell: StatusCell,
      },
    ];
  }, []);

  const staticData = [
    { id: "item-1", description: "First thing", one: 0, two: 5, sum: 0 },
    { id: "item-2", description: "Second thing", one: 7, two: 1, sum: 0 },
    { id: "item-3", description: "Third thing", one: 2, two: 4, sum: 0 },
  ];

  // const [data, setData] = React.useState(staticData);
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
  const reorderData = (startIndex, endIndex) => {
    const newData = [...data];
    const [movedRow] = newData.splice(startIndex, 1);
    newData.splice(endIndex, 0, movedRow);

    setData(newData);
    // Promise.all(
    //   newData.map((row, index) => formService.setOrder(row.id, index))
    // );

    // promise.all with toast message

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

  return (
    <div>
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
  );
}

export default BaseForm;
