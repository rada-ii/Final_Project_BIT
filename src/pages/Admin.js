import React from "react";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import AdminReport from "../components/AdminReport";
import { useNavigate } from "react-router-dom";
function Admin(props) {
  const [inputValue, setInputValue] = useState("");
  const [reports, setReports] = useState([]);

  let navigate = useNavigate();

  const createReportHandler = () => {
    navigate("/admin/reports/createreport");
  };
  const fetchReports = async () => {
    const res = await fetch(`http://localhost:3333/api/reports`);
    const data = await res.json();
    setReports(data);
  };

  const onDeleteHandler = (reportId) => {
    const filtertedData = reports.filter(
      (report) => report.id !== Number(reportId)
    );

    setReports(filtertedData);
  };

  const searchHandler = (e) => {
    setInputValue(e.target.value);

    // setReports(filteredData);
  };
  const filteredData = reports.slice().filter((report) => {
    if (
      report.companyName.toLowerCase().includes(inputValue.toLowerCase()) ||
      report.candidateName.toLowerCase().includes(inputValue.toLowerCase())
    )
      return report;
  });

  useEffect(() => {
    fetchReports();
  }, []);
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
