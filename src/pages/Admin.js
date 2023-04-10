import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import AdminReport from "../components/AdminReport";
import { useNavigate } from "react-router-dom";
import data from "../db/data.json";

function Admin(props) {
  const [inputValue, setInputValue] = useState("");
  const [reports, setReports] = useState([]);

  let navigate = useNavigate();

  const createReportHandler = () => {
    navigate("/admin/reports/createreport");
  };

  const fetchReports = async () => {
    // Commented out the fetch call to external API
    // const res = await fetch(`http://localhost:3333/api/reports`);
    // const data = await res.json();

    // Set the state with data from the imported data.json file
    setReports(data.reports);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const onDeleteHandler = (reportId) => {
    const filteredData = reports.filter(
      (report) => report.id !== Number(reportId)
    );

    setReports(filteredData);
  };

  const searchHandler = (e) => {
    setInputValue(e.target.value);
  };

  const filteredData = reports.filter(
    (report) =>
      report.companyName.toLowerCase().includes(inputValue.toLowerCase()) ||
      report.candidateName.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <>
      <section className="this-needs-more-padding">
        <div className="container">
          <div className="admin-search-wrap">
            <Search inputValue={inputValue} searchHandler={searchHandler} />
          </div>
          <section>
            {props.reportStateObj &&
              props.reportStateObj.map((report) => (
                <AdminReport
                  key={report.id}
                  info={report}
                  onDelete={onDeleteHandler}
                />
              ))}
            {filteredData.map((report) => (
              <AdminReport
                key={report.id}
                info={report}
                onDelete={onDeleteHandler}
              />
            ))}
            <button className="new-report-btn" onClick={createReportHandler}>
              +
            </button>
          </section>
        </div>
      </section>
    </>
  );
}

export default Admin;
