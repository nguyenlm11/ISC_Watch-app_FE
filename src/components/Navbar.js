import React, { useState, useEffect } from "react";
import { Menu, Layout, Badge } from "antd";
import {
  HomeOutlined,
  ShopOutlined,
  ClockCircleOutlined,
  FileOutlined,
  DownOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserAddOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const { SubMenu } = Menu;
const { Header } = Layout;

const Navbar = () => {
  const { user, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0); // State to track cart item count

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(cart.length);
  }, []); // Update cart count on component mount

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: "Home", link: "/" },
    {
      key: "2",
      icon: <FileOutlined />,
      label: "Documentation",
      link: "/documentation",
    },
  ];

  if (user && user.isAdmin) {
    menuItems.push({
      key: "SubMenu",
      icon: <DownOutlined />,
      label: "Management",
      items: [
        { key: "3", label: "Brands", link: "/brands", icon: <ShopOutlined /> },
        {
          key: "4",
          label: "Watches",
          link: "/watches",
          icon: <ClockCircleOutlined />,
        },
        { key: "5", label: "Users", link: "/users", icon: <UserOutlined /> },
        {
          key: "6",
          label: "Orders",
          link: "/orders",
          icon: <ShoppingCartOutlined />,
        },
      ],
    });
  }

  const subMenuItems = user
    ? [
        {
          key: "9",
          icon: <ProfileOutlined />,
          label: "Profile",
          link: "/profile",
        },
        {
          key: "10",
          icon: <ShoppingCartOutlined />,
          label: "Cart",
          link: "/checkout",
        },
        {
          key: "11",
          icon: <LogoutOutlined />,
          label: "Logout",
          link: "/",
          onClick: handleLogout,
        },
      ]
    : [
        { key: "7", icon: <LoginOutlined />, label: "Login", link: "/login" },
        {
          key: "8",
          icon: <UserAddOutlined />,
          label: "Register",
          link: "/register",
        },
      ];

  const accountLabel = user ? user.membername : "Account";

  return (
    <Header>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        {menuItems.map((item) => {
          if (item.items) {
            return (
              <SubMenu key={item.key} icon={item.icon} title={item.label}>
                {item.items.map((subItem) => (
                  <Menu.Item key={subItem.key}>
                    <Link to={subItem.link}>
                      {subItem.icon} {subItem.label}
                    </Link>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.link}>{item.label}</Link>
              </Menu.Item>
            );
          }
        })}
        <SubMenu
          key="subMenu"
          icon={<UserOutlined />}
          title={accountLabel}
          style={{ position: "absolute", right: "3.5%" }}
        >
          {subMenuItems.map((item) => (
            <Menu.Item key={item.key} onClick={item.onClick}>
              {item.link ? (
                <Link to={item.link}>
                  {item.icon} {item.label}
                </Link>
              ) : (
                item.label
              )}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Header>
  );
};

export default Navbar;
