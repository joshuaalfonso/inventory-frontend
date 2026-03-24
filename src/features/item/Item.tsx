import { Button, Combobox, Heading, Portal, useFilter, useListCollection} from "@chakra-ui/react"
import { useItemDialogStore } from "./hooks/useItemDialogStore";
import ItemDialog from "./components/dialog/ItemDialog";
import { useBrands } from "@/features/brand/hooks/useBrand";
import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { flushSync } from "react-dom";


const Item = () => {

  const openDialog = useItemDialogStore(state => state.openDialog);

   const { brands } = useBrands();
  
      const contentRef = useRef<HTMLDivElement | null>(null)
  
      const { startsWith } = useFilter({ sensitivity: "base" });
  
      const stableBrands = useMemo(() => brands ?? [], [brands])
  
      const { collection, filter, reset: resetCollection } = useListCollection({
          initialItems: stableBrands ?? [],
          filter: startsWith,
          itemToString: (item) => item.brand_name,
          itemToValue: (item) => String(item.brand_id),
      });
  
      const virtualizer = useVirtualizer({
          count: collection.size,
          getScrollElement: () => contentRef.current,
          estimateSize: () => 36,
          overscan: 10,
           scrollPaddingEnd: 32,
      })
  
      const handleScrollToIndexFn = (details: { index: number }) => {
          flushSync(() => {
              virtualizer.scrollToIndex(details.index, {
                  align: "center",
                  behavior: "auto",
                  // behavior: "smooth",
              })
          })
      }

  return (
    <>
      <Heading 
        size={'md'}
        mb={10}
      >Item</Heading>

      <Button
        onClick={() => openDialog(null)}
      >
        Create
      </Button>

      <Combobox.Root
          collection={collection}
          onInputValueChange={(e) => filter(e.inputValue)}
          scrollToIndexFn={handleScrollToIndexFn}
          width="320px"
          positioning={{ strategy: "fixed" }}
      >
          <Combobox.Label>Select framework</Combobox.Label>
          <Combobox.Control>
          <Combobox.Input placeholder="Type to search" />
          <Combobox.IndicatorGroup>
              <Combobox.ClearTrigger />
              <Combobox.Trigger onClick={resetCollection} />
          </Combobox.IndicatorGroup>
          </Combobox.Control>
      <Portal>
          <Combobox.Positioner>
          <Combobox.Content 
              ref={contentRef}
              // style={{
              //     maxHeight: "240px",
              //     overflow: "auto",
              // }}
          >
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
                      key={item.brand_id}
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
                  >
                      <Combobox.ItemText truncate>
                          {/* <span aria-hidden style={{ marginRight: 4 }}>
                              {item.emoji}
                          </span> */}
                          {item.brand_name}
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

      <ItemDialog />

      
    </>
  )
}

export default Item