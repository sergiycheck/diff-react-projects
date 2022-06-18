import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUserIds, selectUserById, toggleUser, ReqResUser } from "./usersSlice";

const UserList = () => {
  const userIds = useAppSelector(selectUserIds) as string[];

  const renderedListItems = userIds.map((userId) => {
    return <UserListItem key={userId} id={userId} />;
  });

  return (
    <React.Fragment>
      <ul className="todo-list">{renderedListItems}</ul>
    </React.Fragment>
  );
};

type UserListItemProps = {
  id: string;
};

const UserListItem = (props: UserListItemProps) => {
  const { id } = props;
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => {
    return selectUserById(state, id);
  }) as ReqResUser;

  return (
    <li>
      <img src={user.avatar} alt={user.email} style={{ height: "200px", width: "200px" }} />
      <details
        onClick={(e) => {
          e.preventDefault();
          dispatch(toggleUser(id));
        }}
        open={user.toggled}
      >
        <summary>
          {user.first_name} {user.last_name}
        </summary>
        {user.email}
      </details>
    </li>
  );
};

export default UserList;
