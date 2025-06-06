import { FaAngleDown } from "react-icons/fa";
import { useAuth } from "../contexts/auth";

const Navbar = () => {
  const { userLoggedIn } = useAuth();

  const navItems = [
    { id: 1, name: "Home", path: "/", hasIcon: true },
    { id: 5, name: "Gallery", path: "/gallery", hasIcon: true },
    { id: 3, name: "About", path: "/about", hasIcon: false },
  ];

  // Conditionally add Dashboard link
  if (userLoggedIn) {
    navItems.push({ id: 4, name: "Dashboard", path: "/dashboard", hasIcon: false });
  }

  const openDashboardFullscreen = () => {
    const win = window.open("/dashboard?fullscreen=true", "_blank", "width=screen.width,height=screen.height,left=0,top=0");
    win.focus();
  };

  return (
    <div className="container navbar">
      <div className="row">
        <ul className="flex flex-row flex-wrap col-12">
          {navItems.map((item) => (
  <li key={item.id} className="flex items-center">
    {item.name === "Dashboard" ? (
      <button
        onClick={openDashboardFullscreen}
        className="flex jcc aic items-center font-mont"
      >
        
        <a>{item.name}</a>
      </button>
    ) : (
      <a
        href={item.path}
        className="flex jcc aic items-center font-mont"
      >
        {item.name}
        {item.hasIcon && <FaAngleDown className="white" />}
      </a>
    )}
  </li>
))}

        </ul>
      </div>
    </div>
  );
};

export default Navbar;
