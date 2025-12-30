import React from "react";

type RenderListItemsProps<T> = {
  data: T[];
  renderItem: (item: T, index?: number) => React.ReactNode;
};

const RenderListItems = <T,>({ data, renderItem }: RenderListItemsProps<T>) => {
  return <>{data.map((item, index) => renderItem(item, index))}</>;
};

export default RenderListItems;
