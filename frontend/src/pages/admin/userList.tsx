import type { User } from "../../types/User";

type Props = {
    users: User[];
  onShow: (id: string) => void;
  onDelete: (id: string) => void;
};

export const UserList = ({ users, onShow, onDelete }: Props) => (
  <ul>
    {users.map((user) => (
      <li key={user._id}>
        {user._id} - {user.name} - {user.email}
        <button onClick={() => onShow(user._id)}>Show</button>
        <button onClick={() => onDelete(user._id)}>Delete</button>
      </li>
    ))}
  </ul>
);