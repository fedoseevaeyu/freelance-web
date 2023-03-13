import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import Link from "next/link";

import formatPrice from "@utils/format-price";
import { sanitize } from "@utils/sanitize";

type PostCardProps = {
  title: string;
  description: string;
  cover: string;
  price?: number;
  author: {
    username: string;
  };
  slug: string;
  badgeLabel?: string;
};

export function PostCard({ author, description, price, cover, slug, title, badgeLabel }: PostCardProps) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="max-w-sm w-full min-h-[21rem]">
      <Image src={cover} height={160} alt={title} />

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500} lineClamp={2}>
          {title}
        </Text>
        {badgeLabel && <Badge variant="light">{badgeLabel}</Badge>}
      </Group>

      <Text
        size="sm"
        color="dimmed"
        className="mb-[12px]"
        lineClamp={2}
        dangerouslySetInnerHTML={sanitize(description, undefined)}
      />

      <Text size="md">{price ? formatPrice(price) : "По договоренности"}</Text>

      <Link href={`/profile/${author?.username}/applications/${slug}`} target="_blank" rel="noopener noreferrer">
        <Button
          fullWidth
          mt="md"
          radius="md"
          className="transition-all duration-[110ms] hover:scale-105 bg-gray-900 hover:bg-black dark:bg-gradient-to-r dark:from-[#3b82f6] dark:to-[#2dd4bf] dark:text-white"
        >
          Подробнее
        </Button>
      </Link>
    </Card>
  );
}
