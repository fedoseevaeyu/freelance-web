import { Button, SimpleGrid } from "@mantine/core";

import Toolbar from "@app/(search)/components/Toolbar";
import { PostCard } from "@/@app/(search)/components/PostCard";

function createItem(id: number) {
  return {
    id,
    slug: `work_${id}`,
    cover: "https://cdn.freelance.ru/images/att/1739025_345_230.jpg",
    price: 100000,
    title: `Работа ${id}`,
    description: `<p>Какое-то описание ${id}</p>`,
    author: {
      username: `ivan_${id}`,
    },
  };
}

const items = [
  createItem(1),
  createItem(2),
  createItem(3),
  createItem(4),
  createItem(5),
  createItem(6),
  createItem(7),
  createItem(8),
];
const hasNextPage = false;
const isFetchingNextPage = false;

export default function Page() {
  function fetchNextPage() {}

  return (
    <div className="container pt-[32px] pb-[50px]">
      <div className="flex flex-col justify-center items-center">
        <Toolbar />
        <div className="w-full pt-[32px] flex flex-col gap-3 items-center justify-center flex-wrap">
          <SimpleGrid cols={4} spacing="xl" verticalSpacing="xl" className="w-full">
            {items.map(({ id, ...item }) => (
              <PostCard key={id} {...item} badgeLabel="Работа" />
            ))}
          </SimpleGrid>
          {hasNextPage && (
            <div className="flex flex-row gap-3 items-center mt-8 justify-center flex-wrap">
              <Button
                onClick={fetchNextPage}
                disabled={!isFetchingNextPage}
                variant="outline"
                mt="xl"
                className="mt-auto"
              >
                {isFetchingNextPage ? "Загрузка..." : "Загрузить ещё"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
