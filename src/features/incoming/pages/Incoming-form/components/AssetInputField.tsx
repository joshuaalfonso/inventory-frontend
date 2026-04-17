import { Box, Button, CloseButton, Dialog, Input, Portal, Text } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import { useFieldArray, useWatch, type Control, type Path, type UseFormRegister, type UseFormSetValue } from "react-hook-form";
import type { IncomingFormValues } from "../IncomingForm";
import SerialScanner from "./SerialScanner";
import { LuScanBarcode } from "react-icons/lu";

interface Props {
  index: number;
  control: Control<IncomingFormValues>;
  register: UseFormRegister<IncomingFormValues>;
  setValue: UseFormSetValue<IncomingFormValues>;
  itemType: string;
}

const AssetItemsField = ({ index, control, register, itemType, setValue }: Props) => {


  const [scannerOpen, setScannerOpen] = useState(false);
  const [activeAssetIndex, setActiveAssetIndex] = useState<number | null>(null);

  const { fields, replace } = useFieldArray({
    control,
    name: `incoming_item.${index}.asset_item`,
  });

  const receivedQty = useWatch({
    control,
    name: `incoming_item.${index}.received_quantity`,
  });

  const setSerial = (
    itemIndex: number,
    assetIndex: number,
    value: string
  ) => {
    console.log(value)
    setValue(
      `incoming_item.${itemIndex}.asset_item.${assetIndex}.serial_number` as Path<IncomingFormValues>,
      value,
      { shouldDirty: true }
    );
  };

  useEffect(() => {
    if (itemType != "Asset") return;

    const qty = Number(receivedQty) || 0;

    replace(
      Array.from({ length: qty }, () => ({
        serial_number: "",
        asset_tag: "",
      }))
    );
  }, [receivedQty, itemType, replace]);

  if (itemType !== "Asset") return null;

  return (
    <Box 
      // mt={receivedQty > 0 ? 4 : 0 } 
      borderLeft="2px solid" 
      borderColor="border.muted" 
      pl={4}
    >

      {/* <Text fontSize="sm" mb={2}>
        Serial Numbers
      </Text> */}

      {fields.map((field, assetIndex) => (
        <div key={field.id} className="flex items-center gap-3 w-full mt-6!">

          <Input
            placeholder="Serial Number"
            {...register(
              `incoming_item.${index}.asset_item.${assetIndex}.serial_number`,
              { required: "Serial number is required" }
            )}
          />



          {/* <Input
            placeholder="Asset Tag (optional)"
            {...register(
              `incoming_item.${index}.asset_item.${assetIndex}.asset_tag`
            )}
          /> */}

          <Button
            size="md"
            variant={'surface'}
            colorPalette={'gray'}
            onClick={() => {
              setActiveAssetIndex(assetIndex);
              setScannerOpen(true);
            }}
          >
            <LuScanBarcode />
            Scan
          </Button>


        </div>
      ))}

      <Dialog.Root
        open={scannerOpen}
        onOpenChange={(e) => setScannerOpen(e.open)}
        lazyMount
      >
        <Portal>
          <Dialog.Backdrop />

          <Dialog.Positioner>
            <Dialog.Content>

              <Dialog.Header>
                <Dialog.Title>Scan Serial Number</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                {scannerOpen && activeAssetIndex !== null && (
                  <Suspense fallback={<Text>Loading scanner...</Text>}>
                    <SerialScanner
                      onScanSuccess={(value) => {
                        setSerial(index, activeAssetIndex, value)

                        setScannerOpen(false);
                        setActiveAssetIndex(null);
                      }}
                      onClose={() => {
                        setScannerOpen(false);
                        setActiveAssetIndex(null);
                      }}
                    />
                  </Suspense>
                )}
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant={'outline'} colorPalette={'gray'}>Close</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>

              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" colorPalette={'gray'}  />
              </Dialog.CloseTrigger>

            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

    </Box>
  );
};

export default AssetItemsField;