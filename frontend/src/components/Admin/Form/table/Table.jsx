import React from "react";
import { useTable } from "react-table";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
    const { source, destination } = result;

    if (!destination) return;

    reorderData(source.index, destination.index);
  };

  //   const AddItem = (props) => (
  //     <span
  //       className={props.className}
  //       onClick={() => props.addRow()}
  //       role="img"
  //       aria-label="add"
  //     >
  //       1️⃣ Add Item
  //     </span>
  //   );

  //   const ResetData = (props) => (
  //     <span
  //       className={props.className}
  //       onClick={() => props.resetData()}
  //       role="img"
  //       aria-label="reset"
  //     >
  //       Reset Items 🔁
  //     </span>
  //   );

  return (
    <>
      <table
        {...getTableProps()}
        className="table table-responsive table-bordered table-hover"
      >
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
                  {/* <td
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
                  </td> */}
                </tr>
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
      {/* <pre>
        {JSON.stringify(
          rows.map((row) => row.values),
          null,
          2
        )}
      </pre> */}
    </>
  );
}

export default Table;
