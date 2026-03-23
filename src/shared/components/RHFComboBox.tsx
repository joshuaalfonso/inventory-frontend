"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
  Field,
} from "@chakra-ui/react"
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form"

// type Item = {
//   label: string
//   value: string
// }

type RHFComboboxProps<T extends FieldValues, TItem> = {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    items: TItem[]
    getLabel: (item: TItem) => string
    getValue: (item: TItem) => number
    rules?: RegisterOptions<T, Path<T>>
}

export function RHFCombobox<T extends FieldValues, TItem>({
    name,
    control,
    label,
    placeholder = "Select option",
    items,
    getLabel,
    getValue,
    rules,
}: RHFComboboxProps<T, TItem>) {
  const { contains } = useFilter({ sensitivity: "base" });

    const normalizedItems = items.map((item) => ({
        label: getLabel(item),
        value: getValue(item),
    }))

    const { collection, filter } = useListCollection({
        initialItems: normalizedItems,
        filter: contains,
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
            value={field.value ? [field.value] : []}
            onValueChange={(e) => field.onChange(e.value[0] ?? "")}
            onInputValueChange={(e) => filter(e.inputValue)}
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
                    <Combobox.Item item={item} key={item.value}>
                      {item.label}
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