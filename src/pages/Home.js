import Card from "../components/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search";
// import mockedData from "../../public/data.json";
function Home() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // fetch(`http://localhost:3333/api/candidates`);
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((dataObj) => {
        setData(dataObj.candidates);
        console.log(dataObj);
      });
  }, []);

  const searchHandler = (e) => {
    setInputValue(e.target.value);
  };

  let filterArr = data.filter((user) =>
    user.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <section className="hero">
      <div className="container">
        <div className="search-wrap">
          <h1 className="hero-title">Candidates</h1>

          <Search inputValue={inputValue} searchHandler={searchHandler} />
        </div>
        <div className="list-wrap">
          {filterArr.map((user, i) => (
            <Link key={user.id} to={`/reportpage/${user.id}`}>
              <Card
                type="card"
                image={`${require(`../images/profiles/${user.name
                  .split(" ")
                  .at(0)
                  .toLowerCase()}.jpg`)}`}
                person={user}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
