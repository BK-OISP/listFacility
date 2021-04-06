import roles from "../helper/config/Roles";

const MENU = [
  {
    key: "dashboard",
    title: "Dashboard",
    link: "/dashboard",
    icon: "dashboard",
    role: [roles.FULLTIME],
  },
  {
    key: "facility",
    title: "Quản lý tài sản",
    icon: "dashboard",
    role: [roles.FULLTIME],
    sub: [
      {
        key: "manageRequest",
        title: "Quản lý các đề xuất",
        link: "/facility/manage",
        role: [
          roles.FM_DEPUTY_HEAD,
          roles.ACCOUNTANT_LEAD,
          roles.DIRECTOR,
          roles.FM_ADMIN_LEAD,
          roles.FM_FACILITY_TEAM_LEAD,
        ],
      },
      {
        key: "viewRequest",
        title: "Theo dõi đề xuất của bạn",
        link: "/facility/status",
        role: [roles.FULLTIME],
      },
    ],
  },
];

export default MENU;
