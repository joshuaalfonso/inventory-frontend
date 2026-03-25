import { Button, CloseButton, Combobox, DatePicker, Dialog, Field, Fieldset, Heading, Input, Portal, Stack, Text, useFilter, useListCollection } from "@chakra-ui/react";
import { useItemDialogStore } from "../../hooks/useItemDialogStore";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useBrands } from "@/features/brand/hooks/useBrand";
import { useMemo, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { flushSync } from "react-dom";
import { LuCalendar } from "react-icons/lu";



const defaultValue = {
    item_id: 0,
    item_name: '',
    brand_id: 0,
    category_id: 0,
    item_type_id: 0,
    unit_of_measure_id: 0
}

interface FormInputs {
    item_id: number
    item_name: string
    brand_id: number
    category_id: number
    item_type_id: number
    unit_of_measure_id: number
}



const ItemDialog = () => {

    const isOpen = useItemDialogStore(state => state.isOpen);
    const closeDialog = useItemDialogStore(state => state.closeDialog);

    console.log('item dialog')

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
        estimateSize: () => 28,
        overscan: 10,
        scrollPaddingEnd: 32,
    })

    const handleScrollToIndexFn = (details: { index: number }) => {
        flushSync(() => {
            virtualizer.scrollToIndex(details.index, {
                align: "center",
                behavior: "auto",
            })
        })
    }


    const { 
        register, 
        handleSubmit,
        reset,
        formState: { errors, isDirty } 
    } = useForm<FormInputs>({
        defaultValues: defaultValue
    });

    const onSubmit: SubmitHandler<FormInputs> = data => {
        console.log(data)
    }

    return (
        <Dialog.Root 
            lazyMount 
            placement={'center'}
            initialFocusEl={() => null}
            size={{ mdDown: "xs", md: "lg" }}
            open={isOpen} 
            onOpenChange={(e) => {
                if (!e.open) {
                    closeDialog();
                    reset(defaultValue)
                }
            }}
        >
            {/* <Dialog.Trigger asChild>
                <Butto variant="outline">Open</Butto>
            </Dialog.Trigger> */}
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>
                            <Stack>
                                <Heading size={'xl'}>Item Form</Heading>
                                <Text fontSize={'sm'} color={'fg.muted'}>
                                    Field with * is required
                                </Text>
                            </Stack>
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Fieldset.Root size="lg" >

                                <Fieldset.Content>

                                    <Field.Root required>
                                        <Field.Label>
                                            Item Name
                                            <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input  
                                            {...register("item_name", { required: "Item name is required" })}
                                            autoComplete="off"
                                        />

                                        {errors.item_name?.message && (
                                            // <Field.ErrorText>This is an error text</Field.ErrorText>
                                            <Text color={'fg.error'}>{errors.item_name.message}</Text>
                                        )}
                                        
                                        {/* <Field.ErrorText>This is an error text</Field.ErrorText> */}
                                    </Field.Root>


                                    {/* <RHFCombobox
                                        name="brand_id"
                                        control={control}
                                        label="Brand"
                                        rules={{
                                            required: "Brand is required",
                                        }}
                                        items={brands ?? []}
                                        getLabel={(item) => item.brand_name}
                                        getValue={(item) => item.brand_id}
                                    /> */}

                                    {/* <Field.Root required>
                                        <Field.Label>
                                            Brand
                                            <Field.RequiredIndicator />
                                        </Field.Label>

                                        <RHFCombobox
                                            name="brand_id"
                                            control={control}
                                            label=""
                                            rules={{
                                                required: "Brand is required",
                                            }}
                                            items={frameworks ?? []}
                                        />

                                        {errors.brand_id?.message && (
                                            <Field.ErrorText>This is an error text</Field.ErrorText>
                                            <Text color={'fg.error'}>{errors.brand_id.message}</Text>
                                        )}
                                        
                                        <Field.ErrorText>This is an error text</Field.ErrorText>
                                    </Field.Root> */}

                                    <Combobox.Root
                                        collection={collection}
                                        onInputValueChange={(e) => filter(e.inputValue)}
                                        scrollToIndexFn={handleScrollToIndexFn}
                                        width=""
                                    >
                                        <Combobox.Label>Select framework</Combobox.Label>
                                        <Combobox.Control>
                                            <Combobox.Input placeholder="Type to search" />
                                            <Combobox.IndicatorGroup>
                                            <Combobox.ClearTrigger />
                                            <Combobox.Trigger onClick={resetCollection} />
                                            </Combobox.IndicatorGroup>
                                        </Combobox.Control>
                                        {/* <Portal> */}
                                            <Combobox.Positioner>
                                            <Combobox.Content 
                                                ref={contentRef}
                                                maxH="200px"
                                                overflowY="auto"
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
                                                            {item.brand_name}
                                                        </Combobox.ItemText>
                                                        <Combobox.ItemIndicator />
                                                    </Combobox.Item>
                                                    )
                                                })}
                                                </div>
                                            </Combobox.Content>
                                            </Combobox.Positioner>
                                        {/* </Portal> */}
                                    </Combobox.Root>

                                    <DatePicker.Root maxWidth="">
                                        <DatePicker.Label>Date of birth</DatePicker.Label>
                                        <DatePicker.Control>
                                            <DatePicker.Input />
                                            <DatePicker.IndicatorGroup>
                                            <DatePicker.Trigger>
                                                <LuCalendar />
                                            </DatePicker.Trigger>
                                            </DatePicker.IndicatorGroup>
                                        </DatePicker.Control>
                                        {/* <Portal> */}
                                            <DatePicker.Positioner>
                                            <DatePicker.Content>
                                                <DatePicker.View view="day">
                                                <DatePicker.Header />
                                                <DatePicker.DayTable />
                                                </DatePicker.View>
                                                <DatePicker.View view="month">
                                                <DatePicker.Header />
                                                <DatePicker.MonthTable />
                                                </DatePicker.View>
                                                <DatePicker.View view="year">
                                                <DatePicker.Header />
                                                <DatePicker.YearTable />
                                                </DatePicker.View>
                                            </DatePicker.Content>
                                            </DatePicker.Positioner>
                                        {/* </Portal> */}
                                    </DatePicker.Root>

                                    

                                </Fieldset.Content>
                            </Fieldset.Root>
                        </form>
                    </Dialog.Body>
                    <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline" colorPalette={'gray'}>Cancel</Button>
                        </Dialog.ActionTrigger>
                        <Button 
                            onClick={handleSubmit(onSubmit)} 
                            loading={false}
                            disabled={!isDirty}
                        >
                            Save
                        </Button>
                    </Dialog.Footer>
                    <Dialog.CloseTrigger asChild colorPalette={'gray'}>
                    <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default ItemDialog