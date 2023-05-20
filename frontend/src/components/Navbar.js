import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const navItems = [
    {
      label: "Traveler Form",
      route: "",
    },
    {
      label: "Traveler Details",
      route: "traveler-details",
    },
  ];
  return (
    <div className="navbar_container">
      {navItems.map((item, index) => (
        <div className="nav-item" key={index} onClick={(e) => navigate(`/${item.route}`)}>
          {item.label}
        </div>
      ))}
    </div>
  );
}
export default NavBar;
