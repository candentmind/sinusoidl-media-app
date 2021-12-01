import { FaMusic } from "react-icons/fa";

const Nav = ({onToggleLibraryVisibility}) => {
  return (
    <nav className="fixed-top">
      <h2>Synusoidool</h2>
      <button onClick={onToggleLibraryVisibility}>
        Library
        <FaMusic style={{marginLeft: "0.5em"}}/>
      </button>
    </nav>
  );
};

export default Nav;
