import React from "react";

const StatisticsBox = ({ statistics, month }) => {
  const getMonthName = (monthNumber) => {
    return new Date(0, monthNumber - 1).toLocaleString("en", { month: "long" });
  };

  return (
    <>
      <h3 className="statistics-boxh3">Statistics for {getMonthName(month)}</h3>
      <div className="statistics-box">
        <p>Total Sales: {Math.round(statistics.totalSales)}</p>
        <p>Sold Items: {statistics.soldItems}</p>
        <p>Not Sold Items: {statistics.notSoldItems}</p>
      </div>
    </>
  );
};

export default StatisticsBox;
