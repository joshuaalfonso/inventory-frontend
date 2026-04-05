import React from "react";
import { Box, Button, Float, Input, InputGroup, Separator, Stack, Text } from "@chakra-ui/react";
import { LuTrash2 } from "react-icons/lu";
import { RHFCombobox } from "@/shared/components/RHFComboBox";

interface Props {
  field: any;
  index: number;
  control: any;
  register: any;
  remove: (index: number) => void;
  customCardBg: string;
  employees: any[];
}

const PurchaseOrderItemRow = ({
  field,
  index,
  control,
  register,
  remove,
  customCardBg,
  employees
}: Props) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 border-b! border-dashed last:border-b-0! py-6! w-full">

      {/* ITEM INFO */}
      <div>
        <h1 className="flex-1 my-auto! text-sm!">
          {field.item_name} - {field.brand_name}
        </h1>
        <Stack direction={'row'}>
          <Text fontSize={'xs'} color={'fg.muted'}>
            {field.category_name}
          </Text>
          <Separator orientation="vertical" />
          <Text fontSize={'xs'} color={'fg.muted'}>
            {field.item_type_name}
          </Text>
        </Stack>
      </div>

      {/* EMPLOYEE */}
      <Box position="relative">
        <RHFCombobox
          name={`purchase_order_item.${index}.employee_id`}
          control={control}
          items={employees ?? []}
          rules={{
            required: "Employee is required",
            validate: value => value != 0 || "Employee is required"
          }}
          placeholder="Employee"
          getLabel={(item) => item.employee_name}
          getValue={(item) => item.employee_id}
        />
        <Float offsetX="11" placement={'top-start'} bg={customCardBg} px={1.5}>
          <Text fontSize={'xs'} color={'fg.muted'}>Employee</Text>
        </Float>
      </Box>

      {/* QUANTITY */}
      <Box position="relative">
        <InputGroup endElement={<span>{field.unit_of_measure_name}</span>}>
          <Input
            type="number"
            placeholder="Qty"
            {...register(`purchase_order_item.${index}.ordered_quantity`, {
              valueAsNumber: true,
              min: 1
            })}
          />
        </InputGroup>
        <Float offsetX="10" placement={'top-start'} bg={customCardBg} px={1.5}>
          <Text fontSize={'xs'} color={'fg.muted'}>Quantity</Text>
        </Float>
      </Box>

      {/* PRICE */}
      <Box position="relative">
        <InputGroup endElement="PHP">
          <Input
            type="number"
            placeholder="Price"
            {...register(`purchase_order_item.${index}.price`, {
              valueAsNumber: true,
              min: 0
            })}
          />
        </InputGroup>
        <Float offsetX="7" placement={'top-start'} bg={customCardBg} px={1.5}>
          <Text fontSize={'xs'} color={'fg.muted'}>Price</Text>
        </Float>
      </Box>

      {/* REMOVE BUTTON */}
      <div className="flex justify-center">
        <Button
          type="button"
          variant="ghost"
          colorPalette="red"
          onClick={() => remove(index)}
        >
          <LuTrash2 />
        </Button>
      </div>

    </div>
  );
};

export default React.memo(PurchaseOrderItemRow);