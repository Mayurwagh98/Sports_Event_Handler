import React, { useMemo } from "react";
import "./RequestsPage.css";
import { useSelector } from "react-redux";
import { Button, Divider, Space, notification } from "antd";
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from "@ant-design/icons";
import Cookies from "cookies-js";

const RequestsPage = () => {
  let localReq = JSON.parse(localStorage.getItem("requests"));
  console.log(localReq);

  let user = Cookies.get("user");
  const Context = React.createContext({
    name: "Default",
  });
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      description: <Context.Consumer>{({ name }) => name}</Context.Consumer>,
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: "Request Accepted",
    }),
    []
  );

  let handleAccept = (item) => {
    item.status = "accepted";
    localStorage.setItem("requests", JSON.stringify(localReq));
    openNotification("topRight");
  };

  return (
    <div>
      <h1>Requests</h1>
      <table>
        <thead>
          <tr style={{ backgroundColor: "#454545" }}>
            <th>Username</th>
            <th>User</th>
            <th>Event Title</th>
            <th>Accept Request</th>
            <th>Reject Request</th>
          </tr>
        </thead>
        <tbody>
          {localReq
            ?.filter((el) => {
              return user == el.userID;
            })
            .map((item, index) => {
              return (
                <tr key={index} style={{ backgroundColor: "#F3E8FF" }}>
                  <td>{item.username}</td>
                  <td>{item.user}</td>
                  <td>{item.title}</td>
                  <td>
                    <Context.Provider value={contextValue}>
                      {contextHolder}
                      <Space>
                        <Button
                          type="primary"
                          onClick={() => {
                            handleAccept(item);
                          }}
                        >
                          Accept
                        </Button>
                      </Space>
                    </Context.Provider>
                  </td>
                  <td>
                    <Button type="primary">Reject</Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export { RequestsPage };
