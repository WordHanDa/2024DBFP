function Header({ setSelectedTable }) {
  return (
    <header>
      <button onClick={() => setSelectedTable("snake")}>Snake</button>
      <button onClick={() => setSelectedTable("hospital")}>Hospital</button>
      <button onClick={() => setSelectedTable("color")}>顏色</button> 
      <button onClick={() => setSelectedTable("pattern")}>斑紋</button>
      <button onClick={() => setSelectedTable("headShape")}>頭形</button>
      <button onClick={() => setSelectedTable("location")}>位置</button>
    </header>
  );
}

export default Header;
