import UserCard from "@app/(chat)/components/Sidebar/UserCard";
import { Role } from "@domain/role";

interface User {
  id: string;
  role: Role;
  username: string;
  name: string;
  avatarUrl: string;
  verified: boolean;
}

interface ChatSidebarProps {
  me: User;
  user: User;
}

export function ChatSidebar({ me, user }: ChatSidebarProps) {
  return (
    <div className={`w-[230px] px-[8px] flex flex-col${me.role === Role.Client ? "-reverse" : ""}`}>
      <UserCard role={me.role === Role.Freelancer ? "Клиент" : "Вы"} user={me} />
      <UserCard role={me.role === Role.Client ? "Исполнитель" : "Вы"} user={user} />
    </div>
  );
}
