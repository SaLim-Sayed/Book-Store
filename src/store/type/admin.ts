export type MenuStore = {
  menuStatus:
    | "Admin Panel"
    | "Create Product"
    | "Create Category"
    | "Users"
    | string;

  userMenuStatus: "Dashboard" | "Profile" | "Orders" | string;
};

export type MenuStoreActions = {
  menuStatusSetter: (menuStatus: MenuStore["menuStatus"]) => void;
  userMenuStatusSetter: (userMenuStatus: MenuStore["userMenuStatus"]) => void;
};
