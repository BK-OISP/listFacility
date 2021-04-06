import React from "react";
import { useDispatch } from "react-redux";
import localStorageService from "../../../helper/localStorage/localStorageService";

import * as actionCreator from "../../../store/action/index";

const UserMenu = (props) => {
  const { id, index, icon, active, tabIndex, toggleRightMenu } = props;

  const dispatch = useDispatch();

  const handleUserMenuClick = (item) => {
    switch (item.key) {
      case "clear":
        localStorageService.clearAll();
        return dispatch(actionCreator.authLogout());

      default:
        break;
    }
  };

  const USER_MENU = [
    {
      key: "profile",
      icon: "person",
      text: "Profile",
    },
    { key: "settings", icon: "settings", text: "Settings" },
    { key: "clear", icon: "clear", text: "Log out" },
  ];
  return (
    <li className="nv--item owdropdown avt-wrapper">
      <div className="avt" id={id}>
        <span
          className="material-icons"
          tabIndex={tabIndex}
          onClick={() => {
            toggleRightMenu(index);
          }}
          onBlur={() => toggleRightMenu(index)}
        >
          {icon}
        </span>

        <ul className={`owdropdown-menu ${active ? "owdropdown-expand" : ""}`}>
          {USER_MENU.map((item) => {
            return (
              <li key={item.key} className="owdropdown-menu--item">
                <div
                  onClick={() => handleUserMenuClick(item)}
                  className="owdropdown-menu--link"
                >
                  <div>
                    <span className="material-icons">{item.icon}</span>
                  </div>
                  <span className="owdropdown-menu--text">{item.text}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default UserMenu;
