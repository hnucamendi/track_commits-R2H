import React from "react";
import "../styles/commitItem.css";

const CommitItem = ({ data }) => {
  return (
    <div className="containers">
      <h1>Commits</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Message</th>
            <th>SHA</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.date}</td>
              <td>{item.message}</td>
              <td>{item.sha}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitItem;
