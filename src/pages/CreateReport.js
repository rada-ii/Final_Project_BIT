import React from "react";
import Search from "../components/Search";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
function CreateReport({ onCreateReportObject }) {
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState(1);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [reports, setReports] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [dateInterview, setDateInterview] = useState("");
  const [phase, setPhase] = useState("");
  const [status, setStatus] = useState("");
  const [textValue, setTextValue] = useState("");
  let navigate = useNavigate();
  const fetchUsers = async () => {
    // const res = await fetch(`http://localhost:3333/api/candidates`);
    const res = await fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setUsers(data.candidates);
  };

  const fetchReports = async () => {
    const res = await fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setReports(data.reports);
  };
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevPage = () => {
    setStep((prevStep) => prevStep - 1);
  };
  const searchHandler = (e) => {
    setInputValue(e.target.value);
  };
  const selectUserFunction = (e) => {
    let target = e.target.closest(".report-card");

    setSelectedUser(target.dataset.name);
  };
  const companySubmitter = (e) => {
    setCompanyName(e.target.dataset.name);
  };

  useEffect(() => {
    Promise.all([fetchUsers(), fetchReports()]);
  }, []);
  let filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  let companies = [...new Set(reports.map((report) => report.companyName))];
  let filteredCompanies = companies.filter((company) =>
    company.toLowerCase().includes(inputValue.toLowerCase())
  );

  const selectDate = (e) => {
    let chosenDate = new Date(e.target.value).getTime();
    if (chosenDate - Date.now() > 0) {
      setDateInterview(null);
      return;
    } else {
      setDateInterview(e.target.value);
    }
  };

  const selectPhase = (e) => {
    setPhase(e.target.value.toLowerCase());
  };
  const selectStatus = (e) => {
    setStatus(e.target.value.toLowerCase());
  };
  const textareaFunction = (e) => {
    setTextValue(e.target.value);
  };
  const createReportHandler = (e) => {
    let report = {
      id: Math.random(),
      companyName: companyName,
      candidateName: selectedUser,
      interviewDate: dateInterview,
      phase: phase,
      status: status,
      note: textValue,
    };
    onCreateReportObject([report]);
    navigate("/admin/reports");
  };

  return (
    <>
      <section className="createreport-main">
        <div className="container container-CR">
          <article className="steps-wrap">
            <div className={step === 1 ? "step step-bold" : "step"}>
              <div className="step-number">1</div>
              <p>Select Candidate</p>
            </div>
            <div className={step === 2 ? "step step-bold" : "step"}>
              <div className="step-number">2</div>
              <p>Select Company</p>
            </div>
            <div className={step === 3 ? "step step-bold" : "step"}>
              <div className="step-number">3</div>
              <p>Fill Report Details</p>
            </div>
            {step > 1 && <div className="divider-horizontal"></div>}
            {step >= 2 && (
              <div className="report-saved-user-info">
                <p className="report-saved-user-info-title">Candidate:</p>
                <p className="report-saved-user-info-value">{selectedUser}</p>
              </div>
            )}
            {step === 3 && (
              <div className="report-saved-user-info">
                <p className="report-saved-user-info-title">Company:</p>
                <p className="report-saved-user-info-value">{companyName}</p>
              </div>
            )}
          </article>
          <div className="divider-report"></div>
          <article className="multistep-wrap">
            {step < 3 && (
              <div className="createreport-search-wrap">
                <Search inputValue={inputValue} searchHandler={searchHandler} />
              </div>
            )}
            <div className="createreport-main-content">
              {step === 1 &&
                filteredUsers
                  .slice()
                  .map((user) => (
                    <Card
                      selectedUser={selectedUser}
                      onClick={selectUserFunction}
                      key={user.id}
                      name={user.name}
                      person={user}
                      image={user.avatar}
                    />
                  ))}

              {step === 2 && (
                <article className="company-table">
                  {filteredCompanies.map((company) => (
                    <div
                      onClick={companySubmitter}
                      data-name={company}
                      key={company}
                      className={
                        companyName === company
                          ? "company-option selected-company"
                          : "company-option"
                      }
                    >
                      {company}
                    </div>
                  ))}
                </article>
              )}
              {step === 3 && (
                <article className="step-3">
                  <div className="report-inputs-wrap">
                    <div className="date-input">
                      <label htmlFor="date-input">Interview date:</label>
                      <input
                        onSelect={selectDate}
                        type="date"
                        name=""
                        id="date-input"
                        required={true}
                      />
                    </div>
                    <div>
                      <label htmlFor="phase">Phase:</label>
                      <select
                        onChange={selectPhase}
                        name=""
                        id="phase"
                        required={true}
                      >
                        <option value="Select">Select</option>
                        <option value="CV">CV</option>
                        <option value="HR">HR</option>
                        <option value="Technical">Technical</option>
                        <option value="Final">Final</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="status">Status:</label>
                      <select
                        onChange={selectStatus}
                        name=""
                        id="status"
                        required={true}
                      >
                        <option value="Select">Select</option>
                        <option value="Passed">Passed</option>
                        <option value="Declined">Declined</option>
                      </select>
                    </div>
                  </div>
                  <div className="textarea-div">
                    <label htmlFor="textarea">Notes:</label>
                    <textarea
                      onChange={textareaFunction}
                      name=""
                      id="textarea"
                    ></textarea>
                  </div>
                </article>
              )}
            </div>
            <div className="createreport-buttons-wrap">
              {step !== 1 && (
                <button
                  onClick={prevPage}
                  className="report-btn report-btn-back"
                >
                  BACK
                </button>
              )}
              {step !== 3 && (
                <button
                  disabled={step === 1 ? !selectedUser : !companyName}
                  onClick={nextStep}
                  className="report-btn report-btn-next"
                >
                  NEXT
                </button>
              )}
              {step === 3 && (
                <button
                  disabled={
                    !textValue ||
                    !dateInterview ||
                    !phase ||
                    phase === "Select" ||
                    !status ||
                    status === "Select"
                  }
                  onClick={createReportHandler}
                  type="submit"
                  className="report-btn report-btn-submit"
                >
                  SUBMIT
                </button>
              )}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

export default CreateReport;
