import React, { useState, useEffect } from "react";
import { fetchTransactionsWithStats } from "../api";
import StatisticsBox from "./StatisticsBox";
import BarChart from "./BarChart";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [month, setMonth] = useState("3");
  const [statistics, setStatistics] = useState({ totalSales: 0, soldItems: 0, notSoldItems: 0 });
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchTransactionsWithStats(month, search, page)
      .then((res) => {
        setTransactions(res.data.transactions);
        setTotalCount(res.data.totalCount);
        setStatistics(res.data.statistics);
        setBarChartData(res.data.barChartData);
      })
      .catch((err) => console.error(err));
  }, [month, search, page]);

  return (
    <>
      <h2>Transactions</h2>

      {/* Input and Select container */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field"
        />

        <div className="select-container">
          <label>Select Month: </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="select-dropdown"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("en", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions table */}
      <table>
        <thead>
          <tr>
            <th width="10px">Id</th>
            <th>Title</th>
            <th>Description</th>
            <th width="10px">Price</th>
            <th width="10px">Category</th>
            <th width="10px">Sold</th>
            <th width="10px">Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td className="truncate-text">{transaction.title}</td>
                <td className="truncate-text">{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? "Yes" : "No"}</td>
                <td>
                  {transaction.image ? (
                    <img
                      src={transaction.image}
                      alt={transaction.title}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div
        style={{
          height: "100px",
          width: "80%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            textAlign: "left",
            paddingLeft: "20px",
            fontWeight: 700,
          }}
        >
          Page No - {page}
        </div>

        <div style={{ display: "flex", justifyContent: "center", flex: 1 }}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>

        <div
          style={{
            flex: 1,
            textAlign: "right",
            paddingRight: "20px",
            fontWeight: 700,
          }}
        >
          Per Page - {transactions.length} / {totalCount}
        </div>
      </div>

      {/* Pass statistics and barChartData to the respective components */}
      <StatisticsBox statistics={statistics} month={month} />
      <BarChart chartData={barChartData} month={month} />
    </>
  );
};

export default TransactionsTable;
