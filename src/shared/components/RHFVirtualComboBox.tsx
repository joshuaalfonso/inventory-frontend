import { Combobox, useFilter, useListCollection } from "@chakra-ui/react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useMemo, useRef } from "react"
import { flushSync } from "react-dom"
import { Controller, type RegisterOptions } from "react-hook-form"

interface RHFVirtualComboBoxProps<T> {
    name: string
    control: any
    items: T[]
    label?: string
    placeholder?: string
    rules?: RegisterOptions
    itemToLabel: (item: T) => string
    itemToValue: (item: T) => string | number

}

const RHFVirtualComboBox = <T,> ({ 
    name,
    control,
    items,
    label,
    placeholder,
    rules,
    itemToLabel,
    itemToValue,
}: RHFVirtualComboBoxProps<T>) => {

    const contentRef = useRef<HTMLDivElement | null>(null)

    const { startsWith } = useFilter({ sensitivity: "base" })

    const stableItems = useMemo(() => items ?? [], [items])

    const { collection, filter, reset } = useListCollection({
        initialItems: stableItems,
        filter: startsWith,
        itemToString: itemToLabel,
        itemToValue: (item) => String(itemToValue(item)),
    })

    const virtualizer = useVirtualizer({
        count: collection.size,
        getScrollElement: () => contentRef.current,
        estimateSize: () => 28,
        overscan: 10,
    })

    const handleScrollToIndexFn = ({ index }: { index: number }) => {
        flushSync(() => {
        virtualizer.scrollToIndex(index, {
            align: "center",
        })
        })
    }

    return (
        <>
            <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                const hasError = !!fieldState.error

                return (
                <div>
                    <Combobox.Root
                    collection={collection}
                    value={field.value ? [String(field.value)] : []}
                    onValueChange={(details) => {
                        const val = details.value[0]
                        field.onChange(val)
                    }}
                    onInputValueChange={(e) => filter(e.inputValue)}
                    scrollToIndexFn={handleScrollToIndexFn}
                    invalid={hasError} // 🔥 important for styling (if supported)
                    >
                    {label && <Combobox.Label>{label}</Combobox.Label>}

                    <Combobox.Control>
                        <Combobox.Input
                        placeholder={placeholder || "Search..."}
                        />
                        <Combobox.IndicatorGroup>
                        <Combobox.ClearTrigger />
                        <Combobox.Trigger onClick={reset} />
                        </Combobox.IndicatorGroup>
                    </Combobox.Control>

                    <Combobox.Positioner>
                        <Combobox.Content
                        ref={contentRef}
                        maxH="200px"
                        overflowY="auto"
                        >
                        <div
                            style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            position: "relative",
                            }}
                        >
                            {virtualizer.getVirtualItems().map((virtualItem) => {
                            const item = collection.items[virtualItem.index]

                            return (
                                <Combobox.Item
                                key={itemToValue(item)}
                                item={item}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: `${virtualItem.size}px`,
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                                >
                                <Combobox.ItemText truncate>
                                    {itemToLabel(item)}
                                </Combobox.ItemText>
                                <Combobox.ItemIndicator />
                                </Combobox.Item>
                            )
                            })}
                        </div>
                        </Combobox.Content>
                    </Combobox.Positioner>
                    </Combobox.Root>

                    {/* 🔥 ERROR MESSAGE */}
                    {hasError && (
                    <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                        {fieldState.error?.message}
                    </p>
                    )}
                </div>
                )
            }}
            />

        </>
    )
}

export default RHFVirtualComboBox