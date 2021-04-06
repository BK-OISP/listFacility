import React, { useCallback, useState } from "react";

import Logo from "../../asset/img/oisp_favicon.ico";
import NotiMenu from "./notiMenu/NotiMenu";
import SearchForm from "./searchForm/SearchForm";
import UserMenu from "./userMenu/UserMenu";

const Navbar = (props) => {
  const { toggleSidebar } = props;
  const [handleRightMenu, setHandleRightMenu] = useState([
    {
      id: "notiMenu",
      index: 0,
      tabIndex: 0,
      icon: "notifications",
      active: false,
    },
    {
      id: "userMenu",
      index: 1,
      tabIndex: 1,
      icon: "account_circle",
      active: false,
    },
  ]);

  const toggleRightMenu = useCallback(
    (index) => {
      setHandleRightMenu(
        [...handleRightMenu].map((item) => {
          if (item.index === index) {
            return {
              ...item,
              active: !item.active,
            };
          } else
            return {
              ...item,
              active: false,
            };
        })
      );
    },
    [handleRightMenu]
  );

  return (
    <nav>
      <div className="nvbar">
        <ul className="nvbar--nav">
          <li className="nv--item">
            <div className="nv--link">
              <span className="material-icons" onClick={toggleSidebar}>
                menu
              </span>
            </div>
          </li>
          <li className="nv--item">
            <img src={Logo} alt="OISP-Logo" className="logo" />
          </li>
        </ul>
        <SearchForm />
        <ul className="nvbar--nav nv--right">
          <NotiMenu
            id={handleRightMenu[0].id}
            index={handleRightMenu[0].index}
            tabIndex={handleRightMenu[0].tabIndex}
            icon={handleRightMenu[0].icon}
            active={handleRightMenu[0].active}
            toggleRightMenu={toggleRightMenu}
          />
          <UserMenu
            id={handleRightMenu[1].id}
            index={handleRightMenu[1].index}
            tabIndex={handleRightMenu[1].tabIndex}
            icon={handleRightMenu[1].icon}
            active={handleRightMenu[1].active}
            toggleRightMenu={toggleRightMenu}
          />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
