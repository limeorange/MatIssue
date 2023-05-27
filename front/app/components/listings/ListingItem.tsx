type ListingItemProps = {
  title: string;
  description: string;
};

const ListingItem = (props: ListingItemProps) => {
  const { title, description } = props;
  return (
    <div className="p-4 flex border gap-4">
      <h2 className="font-bold">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default ListingItem;
