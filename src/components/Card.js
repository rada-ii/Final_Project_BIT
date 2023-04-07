function Card({ person, image, type, onClick, name, selectedUser }) {
  return (
    <div
      onClick={onClick}
      data-name={name}
      className={
        type === "card"
          ? "card"
          : `${
              selectedUser === person.name
                ? "report-card selected-report-card"
                : "report-card"
            }`
      }
    >
      <div
        onClick={onClick}
        className={type === "card" ? "card-img-wrap" : "report-card-img-wrap"}
      >
        <img
          src={image}
          alt="whatever"
          className={type === "card" ? "card-img" : "report-card-img"}
        />
      </div>
      <div
        className={
          type === "card" ? "card-user-info-wrap" : "report-card-user-info-wrap"
        }
      >
        <p className={type === "card" ? "user-name" : "report-user-name"}>
          {person.name}
        </p>
        <p className={type === "card" ? "user-email" : "report-user-email"}>
          {person.email}
        </p>
      </div>
    </div>
  );
}

export default Card;
