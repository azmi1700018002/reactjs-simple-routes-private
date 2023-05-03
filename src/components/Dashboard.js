import React from "react";
import { useSelector } from "react-redux";
import { getAuthToken } from "../features/auth/authSlice";

export default function Dashboard(props) {
  const token = useSelector(getAuthToken);

  return (
    <div className="dashboard">
      <div className="dashbaord-center">
        <h1>Selamat Datang</h1>
        <p>{token.IDUser}</p>
      </div>
      <div className="dashboard-right">
        <h1>Task Progress</h1>
      </div>
    </div>
  );
}
