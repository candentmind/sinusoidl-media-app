import { FaMusic } from "react-icons/fa";

const Nav = (props) => {
  return (
    <nav className="fixed-top">
      <h1>SinusoidL</h1>
      <button onClick={props.onToggleLibraryVisibility}>
        Library
        <FaMusic style={{marginLeft: "0.5em"}}/>
      </button>
    </nav>
  );
};

export default Nav;
