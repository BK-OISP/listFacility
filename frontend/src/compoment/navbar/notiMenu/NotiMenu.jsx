import React from "react";

const NotiMenu = (props) => {
  const { id, index, icon, active, tabIndex, toggleRightMenu } = props;
  return (
    <li className="nv--item owdropdown">
      <div className="nv--link" id={id}>
        <span
          tabIndex={tabIndex}
          className="material-icons"
          onClick={() => {
            toggleRightMenu(index);
          }}
          onBlur={() => toggleRightMenu(index)}
        >
          {icon}
        </span>
        <div className="nvbar--badge">15</div>
      </div>

      <ul
        className={`owdropdown-menu notification-menu ${
          active ? "owdropdown-expand" : ""
        }`}
      >
        <div className="owdropdown-menu--header">Notifications</div>

        <div className="owdropdown-menu--content overlay-scrollbar">
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
          <li className="owdropdown-menu--item">
            <a href="/#" className="owdropdown-menu--link">
              <div>
                <span className="material-icons">bookmark_border</span>
              </div>
              <span className="owdropdown-menu--text">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                <br />
                <span>15/07/2020</span>
              </span>
            </a>
          </li>
        </div>

        <div className="owdropdown-menu--footer">View All Notifications</div>
      </ul>
    </li>
  );
};

export default NotiMenu;
