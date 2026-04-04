import { DatePicker, parseDate, Portal } from "@chakra-ui/react";
import { Controller, type Control, type FieldValues, type Path, type RegisterOptions } from "react-hook-form";
import { LuCalendar } from "react-icons/lu";



interface RHFDatePickerProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    rules?: RegisterOptions<T, Path<T>>;
    placeholder?: string;
    min?: string; // e.g., "1900-01-01"
    max?: string; // e.g., "2026-12-31"
}

export function RHFDatePicker<T extends FieldValues>({
  name,
  control,
  rules,
  placeholder = "Select date",
}: RHFDatePickerProps<T>) {
  return (
    <Controller
      name={name} 
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="w-full">
          <DatePicker.Root
            {...field}
            onValueChange={(e) =>
                field.onChange(e.value[0]?.toString() ?? "")
            }
            value={field.value ? [parseDate(field.value)] : []}
            maxWidth=""
          >
            <DatePicker.Control>
              <DatePicker.Input
                placeholder={placeholder}
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              />
              <DatePicker.IndicatorGroup>
                <DatePicker.Trigger>
                  <LuCalendar />
                </DatePicker.Trigger>
              </DatePicker.IndicatorGroup>
            </DatePicker.Control>

            <Portal>
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
            </Portal>
          </DatePicker.Root>

          {/* Error display */}
          {/* {fieldState.error && (
            <p style={{ color: "red", fontSize: "0.875rem" }}>
              {fieldState.error.message}
            </p>
          )} */}
        </div>
      )}
    />
  );
}