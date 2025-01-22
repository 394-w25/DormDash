import { Group, Badge } from "@mantine/core";

const RequestTags = ({ request }) => {
  const TAGTOCOLOR = {
    Buy: "green",
    Sell: "red",
    Borrow: "yellow",
    Transportation: "violet",
    Cleaning: "orange",
  };
  const tags = Array.isArray(request.tags) ? request.tags : [];

  return (
    <Group>
      {tags.map((tag, idx) => (
        <Badge
          size="lg"
          radius="md"
          variant="filled"
          color={TAGTOCOLOR[tag] || "blue"}
          key={idx}
          className="[padding:1rem_!important]"
        >
          {tag}
        </Badge>
      ))}
    </Group>
  );
};

export default RequestTags;
