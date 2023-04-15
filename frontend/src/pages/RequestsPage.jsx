import React, { useMemo, useState } from "react";
import "./RequestsPage.css";
import { useSelector } from "react-redux";
import { Button, Space, notification } from "antd";
import Cookies from "js-cookie";

const RequestsPage = () => {
  let localReq = JSON.parse(localStorage.getItem("requests"));
  console.log(localReq);

  let [flag, setFlag] = useState(false);

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

  let localAccepted = JSON.parse(localStorage.getItem("accepted")) || [];

  let handleAccept = (item) => {
    item.status = "accepted";
    localStorage.setItem("requests", JSON.stringify(localReq));

    localAccepted.push(item);
    localStorage.setItem("accepted", JSON.stringify(localAccepted));
    setTimeout(() => {
      setFlag(true);
    }, 1200);
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
              return user == el.userID && el.status !== "accepted";
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
                          disabled={flag == true}
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
