import React, { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloseIcon from "@mui/icons-material/Close";
import DateComponent from "./DateComponent";
import PopUpModal from "./PopUpModal";
function AdminReport({ info, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState("");

  const modalHandler = () => {
    setModalData(info);
    setShowModal(true);
  };

  const cancelHandler = () => {
    setShowModal(false);
  };

  const deleteHandler = (e) => {
    const reportId = e.target.dataset.id;
    onDelete(reportId);
  };
  return (
    <div className="admin-report">
      <div id="admin-report-div-1">
        <p className="admin-report-values">{info.companyName}</p>
        <p className="admin-report-headings">Company</p>
      </div>
      <div id="admin-report-div-2">
        <p className="admin-report-values">{info.candidateName}</p>
        <p className="admin-report-headings">Candidate</p>
      </div>
      <div id="admin-report-div-3">
        <p className="admin-report-values">
          <DateComponent date={info.interviewDate} />
        </p>
        <p className="admin-report-headings">Interview Date</p>
      </div>
      <div id="admin-report-div-4" className="admin-report-status-div">
        <p className="admin-report-values">{info.status}</p>
        <p className="admin-report-headings">Status</p>
      </div>
      <div id="admin-report-div-5" className="admin-icons-wrap">
        <RemoveRedEyeIcon
          className="red-eye"
          onClick={modalHandler}
          sx={{
            fontSize: 25,
          }}
        />
        <CloseIcon
          className="close-icon"
          data-id={info.id}
          onClick={deleteHandler}
          sx={{
            fontSize: 25,
          }}
        />
      </div>
      {showModal && <PopUpModal onCancel={cancelHandler} details={modalData} />}
    </div>
  );
}

export default AdminReport;
