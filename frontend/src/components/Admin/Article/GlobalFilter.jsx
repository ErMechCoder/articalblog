import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";



export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 300);

  return (
   
    <div className="form-group has-search mx-2 my-2" >
        <span className="fa fa-search form-control-feedback" ></span>
        <input type="text" class="form-control" placeholder="Search in articles"  value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}/>
    </div>
  );
}