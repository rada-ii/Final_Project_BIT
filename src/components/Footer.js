import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  return (
    <footer>
      <div className="container foot">
        &copy; BIT {currentMonth} {currentYear} By Aleksa Ojdanic, Andrija
        Cvorovic, Milos Drobnjak & Radmila Ivankovic
      </div>
    </footer>
  );
}

export default Footer;
