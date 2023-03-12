import { Avatar, Badge, Text, Tooltip } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";

type Props = {
  role: string;
  user: {
    name: string;
    username: string;
    verified: boolean;
    avatarUrl: string;
  };
};

export default function UserCard({ user, role }: Props) {
  return (
    <div>
      <h2 className="text-base font-semibold mb-[12px]">{role}</h2>

      <div className="flex flex-row items-center hover:scale-110 transition-all duration-[110ms] border-[1px] p-1 rounded-md mb-2 ">
        <Avatar src={user.avatarUrl} size="md" radius="xl" />
        <div className="flex flex-col ml-2">
          <h2 className="text-base font-semibold overflow-x-hidden">
            {user.name}
            {user.verified && (
              <Tooltip label="Подтвержденный пользователь" withArrow>
                <Badge color="green" variant="light" className="rounded-full ml-2">
                  <div className="flex flex-row flex-nowrap items-center justify-center">
                    <IconCheck color="green" size={15} />
                  </div>
                </Badge>
              </Tooltip>
            )}
          </h2>
          <Text color="dimmed" lineClamp={1}>
            <Link
              href={`/profile/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              @{user.username}
            </Link>
          </Text>
        </div>
      </div>
    </div>
  );
}
