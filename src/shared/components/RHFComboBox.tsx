"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
  Field,
} from "@chakra-ui/react"
import { useMemo } from "react"
import {
  Controller,
  type FieldValues,
  type RegisterOptions,
} from "react-hook-form"

// type Item = {
//   label: string
//   value: string
// }

type RHFComboboxProps<T extends FieldValues> = {
    name: string
    control: any
    label?: string
    placeholder?: string
    items: T[]
    getLabel: (item: T) => string
    getValue: (item: T) => string | number
    rules?: RegisterOptions
}

export function RHFCombobox<T extends FieldValues>({
    name,
    control,
    label,
    placeholder = "Select option",
    items,
    getLabel,
    getValue,
    rules,
}: RHFComboboxProps<T>) {
  const { contains } = useFilter({ sensitivity: "base" });

    // const normalizedItems = items.map((item) => ({
    //     label: getLabel(item),
    //     value: getValue(item),
    // }))

    const stableItems = useMemo(() => items ?? [], [items]);

    const { collection, filter } = useListCollection({
        initialItems: stableItems,
        filter: contains,
        itemToString: getLabel,
        itemToValue: (item) => String(getValue(item)),
    })

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <Field.Root invalid={!!fieldState.error} required>
          {label && <Field.Label>{label}<Field.RequiredIndicator /></Field.Label>}

          <Combobox.Root
            collection={collection}
            // value={field.value ? [field.value] : []}
            // onValueChange={(e) => field.onChange(e.value[0] ?? "")}
            value={field.value !== undefined && field.value !== null
              ? [String(field.value)]
              : []
            }
            onValueChange={(details) => {
                  const val = details.value[0]
                  field.onChange(val ? Number(val) : 0)
              }}
            onInputValueChange={(e) => filter(e.inputValue)}
            lazyMount
          >
            <Combobox.Control>
              <Combobox.Input placeholder={placeholder} />
              <Combobox.IndicatorGroup>
                <Combobox.ClearTrigger />
                <Combobox.Trigger />
              </Combobox.IndicatorGroup>
            </Combobox.Control>

            <Portal>
              <Combobox.Positioner>
                <Combobox.Content>
                  <Combobox.Empty>No items found</Combobox.Empty>

                  {collection.items.map((item) => (
                    <Combobox.Item item={item} key={getValue(item)}>
                      {getLabel(item)}
                      <Combobox.ItemIndicator />
                    </Combobox.Item>
                  ))}
                </Combobox.Content>
              </Combobox.Positioner>
            </Portal>
          </Combobox.Root>

          {/* ✅ Error message */}
          {fieldState.error && (
            <Field.ErrorText>
              {fieldState.error.message}
            </Field.ErrorText>
          )}
        </Field.Root>
      )}
    />
  )
}