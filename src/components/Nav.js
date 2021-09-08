// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FaMusic } from "react-icons/fa";

const Nav = (props) => {
  return (
    <nav>
      <h1>Waves</h1>
      <button>
        Library
        <FaMusic style={{marginLeft: "0.5em"}}/>
      </button>
    </nav>
  );
};

export default Nav;
