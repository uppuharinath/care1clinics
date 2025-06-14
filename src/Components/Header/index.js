import Navbar from "../../Pages/navbar";
import { MdSavedSearch } from "react-icons/md";
import Navsidebar from "../../Pages/navsidebar";
import LoginHome from "../../loginhome";
import Plus from "../Plus/plus";      
import logo from "../../../src/assets/logo.jpeg"; 
import { useNavigate } from "react-router-dom";   
import { useAuth } from "../../contexts/auth";  

// import Navigation from "../../Pages/navigation";
// import CountryDropdown from "../CountryDropdown";
// import { CiUser } from "react-icons/ci";
// import { BsCart4 } from "react-icons/bs";
// import { FcMenu } from "react-icons/fc";
// import { FaAngleDown } from "react-icons/fa";
// import Body from "../../Pages/body";
// import { useState } from 'react';

const Header = ({ searchInput, setSearchInput }) => {
  const { userLoggedIn, isLoading} = useAuth()
  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    console.log("Search term:", e.target.value);
  };

  const navigate = useNavigate();

  const handleSearch = () => {
    console.log("Search term HANDLING:", searchInput);
    // Apply your search logic here
  };

  return (
    <div className="header-wrapper ">
      <div className="container header">
        <div className="text-center branding flex  gray jcsa jcc aic">
          <div className="logo-nav cursor" onClick={() => navigate("/")}>
              <img src={logo} className="logo-nav-img" alt="Logo" />
          </div>
          
          <div>
          

            <strong >
              
              <Plus/>
              
            <span className="clinicname">

              <span>C</span>
              <span>a</span>
              <span>r</span>
              <span>e</span>
              <span className="one">1</span>
              <span>C</span>
              <span>l</span>
              <span>i</span>
              <span>n</span>
              <span>i</span>
              <span>c</span>
              <span>s</span>
            </span>


            </strong> 
          </div>
          
          <div > <span className=" text-black"> <strong>Contact :</strong> 9490049955</span> </div>
         
        </div>
         <div>
            <LoginHome />
          </div>
      </div>


      <div className="container">
        <div className="row flex jcc box-shadow1">
          <div className="col-12 ">
            <Navbar />
          </div>
        </div>
      </div>
{userLoggedIn && !isLoading && (
      <div className="container searching">
        <div className="row">
          <div className="col-12 this">
              <div className=" flex w-50 jcc aic search ">
                  <input
                    type="text"
                    placeholder="Search ..."
                    className="input"
                    value={searchInput}
                    onChange={handleInputChange}
                    onKeyUp={(e) => e.key === "Enter" && handleSearch()}
                  />
                  
                  <button className="icon-btn" onClick={handleSearch}>
                    <MdSavedSearch />
                  </button>
          </div>
          </div>
          <div className="col-6"><Navsidebar /></div>
        </div>
      </div>
      
)
}

      {/* Future layout code can be uncommented and used here */}
    </div>
  );
};
export default Header;


