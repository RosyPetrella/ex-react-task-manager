import React from "react";
function TaskRow({ title, status, createdAt }) {
  let bgColor;

  if (status === "To do") bgColor = "red";
  else if (status === "Doing") bgColor = "yellow";
  else if (status === "Done") bgColor = "green";
  return (
    <tr>
      <td>{title}</td>
      <td style={{ backgroundColor: bgColor }}>{status}</td>
      <td>{createdAt}</td>
    </tr>
  );
}

export default React.memo(TaskRow);
