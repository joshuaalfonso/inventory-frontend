import React, { useMemo, useRef } from "react";
import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { flushSync } from "react-dom";
import { LuSearch } from "react-icons/lu";
import type { Items } from "@/features/item/item.model";


interface Props {
  items: Items[];
  onSelect: (item: Items) => void;
}

const ItemSelector: React.FC<Props> = ({ items, onSelect }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const { startsWith } = useFilter({ sensitivity: "base" });

  const stableItems = useMemo(() => items ?? [], [items]);

  const { collection, filter } = useListCollection({
    initialItems: stableItems,
    filter: startsWith,
    itemToString: (item) => item.item_name,
    itemToValue: (item) => String(item.item_id),
  });

  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => contentRef.current,
    estimateSize: () => 32,
    overscan: 10,
  });

  const handleScrollToIndexFn = ({ index }: { index: number }) => {
    flushSync(() => {
      virtualizer.scrollToIndex(index, { align: "center" });
    });
  };

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      scrollToIndexFn={handleScrollToIndexFn}
      openOnClick
      variant={'subtle'}
    >
        <Combobox.Control>
            <Combobox.Input placeholder="Search item..." />
            <Combobox.IndicatorGroup>
                <Combobox.ClearTrigger />
                <LuSearch />
            </Combobox.IndicatorGroup>
        </Combobox.Control>

        <Portal>
            <Combobox.Positioner>
                <Combobox.Content ref={contentRef}>
                    <Combobox.Empty>No items found</Combobox.Empty>
                    <div
                        style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                    {virtualizer.getVirtualItems().map((virtualItem) => {
                        const item = collection.items[virtualItem.index]
                        return (
                        <Combobox.Item
                            key={item.item_id}
                            item={item}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: `${virtualItem.size}px`,
                                transform: `translateY(${virtualItem.start}px)`,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                            onClick={() => onSelect(item)}
                        >
                            <Combobox.ItemText truncate>   
                                {item.item_name} - {item.brand_name}
                            </Combobox.ItemText>
                            <Combobox.ItemIndicator />
                        </Combobox.Item>
                        )
                    })}
                    </div>
                </Combobox.Content>
            </Combobox.Positioner>
        </Portal>


    </Combobox.Root>
  );
};

export default React.memo(ItemSelector);