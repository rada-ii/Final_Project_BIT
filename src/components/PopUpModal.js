import CloseIcon from "@mui/icons-material/Close";
import DateComponent from "./DateComponent";
function PopUpModal(props) {
  const cancel = (e) => {
    if (!e.target.closest(".popup-card") || e.target.closest(".x-wrap"))
      props.onCancel();
  };
  return (
    <div onClick={cancel} className="overlay-wrap">
      <div className="popup-card">
        <div className="popup-head">
          <h3 className="popup-name">{props.details.candidateName}</h3>
          <div className="x-wrap">
            <CloseIcon onClick={cancel} className="x" />
          </div>
          <div className="divider"></div>
        </div>
        <div className="popup-body-wrap">
          <div className="popup-info-wrap">
            <div className="label-wrap">
              <h3 className="popup-label">Company</h3>
              <h4 className="popup-title">{props.details.companyName}</h4>
            </div>
            <div className="label-wrap">
              <h3 className="popup-label">Interview Date</h3>
              <h4 className="popup-title">
                <DateComponent date={props.details.interviewDate} />
              </h4>
            </div>
            <div className="label-wrap">
              <h3 className="popup-label">Phase</h3>
              <h4 className="popup-title">{props.details.phase}</h4>
            </div>
            <div className="label-wrap">
              <h3 className="popup-label">Status</h3>
              <h4 className="popup-title">{props.details.status}</h4>
            </div>
          </div>
          <div className="popup-desc-wrap">
            <div className="popup-label">Notes</div>
            <p className="popup-desc">{props.details.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUpModal;
