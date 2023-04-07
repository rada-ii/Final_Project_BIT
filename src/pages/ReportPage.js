import React, { useEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useParams } from "react-router-dom";
import DateComponent from "../components/DateComponent";
import PopUpModal from "../components/PopUpModal";
import TableRow from "../components/TableRow";

import maleImg from "../images/male.jpg";
import femaleImg from "../images/female.jpg";

export default function ReportPage() {
  const [userInfo, setUserInfo] = useState();
  const [transformedData, setTransformedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const { id } = useParams();

  const clickedHandler = (data) => {
    setModalData(data);
    setShowModal(true);
  };

  const cancelHandler = () => {
    setShowModal(false);
  };

  const fetchReportData = async () => {
    const res = await fetch(
      `http://localhost:3333/api/reports?candidateId=${id}`
    );
    const data = await res.json();
    setTransformedData(data);
  };
  const fetchUserData = async () => {
    const res = await fetch(`http://localhost:3333/api/candidates?id=${id}`);
    const [data] = await res.json();
    setUserInfo(data);
  };

  useEffect(() => {
    Promise.all([fetchReportData(), fetchUserData()]);
  }, [id]);

  useEffect(() => {
    if (userInfo) {
      const { name } = userInfo;
      setName(name);
      const femaleNames = ["Tiffany Lynch", "Aisha Dare", "Rosalyn Batz DDS"];
      const gender = femaleNames.includes(name) ? "female" : "male";
      setGender(gender);
    }
  }, [userInfo]);

  return (
    <section className="reportpage-section">
      <div className="container">
        <article className="report-details">
          {name && (
            <img
              className="report-img"
              src={gender === "female" ? femaleImg : maleImg}
              alt="candidatePhoto"
            />
          )}

          <div className="report report-name">
            <p className="report-info">Name:</p>
            <p className="report-info-details">{userInfo && userInfo.name}</p>
          </div>
          <div className="report report-birthday">
            <p className="report-info">Date of birth:</p>
            <p className="report-info-details">
              {userInfo && <DateComponent date={userInfo.birthday} />}
            </p>
          </div>
          <div className="report report-email">
            <p className="report-info">Email: </p>
            <p className="report-info-details">{userInfo && userInfo.email}</p>
          </div>
          <div className="report report-education">
            <p className="report-info">Education:</p>
            <p className="report-info-details">
              {userInfo && userInfo.education}
            </p>
          </div>
        </article>
        <article>
          <h2 className="report-heading">Reports</h2>
          <table>
            <thead>
              <tr>
                <th>
                  <div className="th-wrap">
                    <ArrowDropDownIcon />
                    <p>Company</p>
                  </div>
                </th>
                <th id="date-h">
                  <div className="th-wrap">
                    <ArrowDropDownIcon />
                    <p>Interview Date</p>
                  </div>
                </th>
                <th id="status-h" colSpan={2}>
                  <div className="th-wrap">
                    <ArrowDropDownIcon /> <p>Status</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {transformedData.map((report) => (
                <TableRow
                  key={report.id}
                  report={report}
                  onClicked={clickedHandler}
                />
              ))}
            </tbody>
          </table>
        </article>
      </div>
      {showModal && <PopUpModal onCancel={cancelHandler} details={modalData} />}
    </section>
  );
}
