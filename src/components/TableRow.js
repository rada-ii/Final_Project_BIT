import React from "react";
import DateComponent from "./DateComponent";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
function TableRow({ report, onClicked }) {
  const clickHandler = (e) => {
    onClicked(report);
  };
  return (
    <tr className="table">
      <td>{report.companyName}</td>
      <td id="date">
        <DateComponent date={report.interviewDate} />
      </td>
      <td id="status">{report.status}</td>
      <td>
        <RemoveRedEyeIcon className="red-eye" onClick={clickHandler} />
      </td>
    </tr>
  );
}

export default TableRow;
