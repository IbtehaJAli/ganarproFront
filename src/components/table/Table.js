import React from "react";

const Table = () => {
  return (
    <table className="table table-hover">
      <thead className="border-0">
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
