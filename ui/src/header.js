import React from "react";

function Header({ setSelectedTable }) {
  return (
    <header>
      <button onClick={() => setSelectedTable("snake")}>Snake</button>
      <button onClick={() => setSelectedTable("hospital")}>Hospital</button>
    </header>
  );
}

export default Header;
