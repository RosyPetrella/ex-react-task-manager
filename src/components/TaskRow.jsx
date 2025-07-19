import React from "react";
import { Link } from "react-router-dom";

function TaskRow({ id, title, status, createdAt }) {
  let bgColor;

  if (status === "To do") bgColor = "red";
  else if (status === "Doing") bgColor = "yellow";
  else if (status === "Done") bgColor = "green";
  return (
    <tr>
      <td>
        <Link to={`/task/${id}`}>{title}</Link>
      </td>
      <td style={{ backgroundColor: bgColor }}>{status}</td>
      <td>{createdAt}</td>
    </tr>
  );
}

export default React.memo(TaskRow);
