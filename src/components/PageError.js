import { FaSadCry } from "react-icons/fa";

const PageError = () => {
  return (
    <div className="content">
      <FaSadCry className="sad" />
      <h3>
        There is problem with network, or problem fetching data. Try again!
      </h3>
    </div>
  );
};

export default PageError;
