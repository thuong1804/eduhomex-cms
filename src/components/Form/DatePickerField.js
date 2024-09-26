import { DatePicker } from "antd";
import FormItem from "./FormItem";
import { fieldTypes } from "@/constants";
import { useCallback } from "react";

const { RangePicker } = DatePicker;

const MODE = {
    SINGLE: "single",
    RANGER: "ranger",
};

const DatePickerField = ({
    mode,
    disabled,
    onChange,
    showTime,
    format,
    disabledDate,
    disabledTime,
    ...formItemProps
}) => {
    const DatePickerInput = useCallback(
        ({ getPlaceHolder, ...dateProps }) => {
            return (
                <DatePicker
                    disabled={disabled}
                    onChange={onChange}
                    showTime={showTime}
                    placeholder={getPlaceHolder()}
                    format={format}
                    disabledDate={disabledDate}
                    disabledTime={disabledTime}
                    {...dateProps}
                />
            );
        },
        [disabled, onChange, disabledDate, disabledTime]
    );

    const RangerPickerInput = useCallback(
        ({ getPlaceHolder, ...dateProps }) => {
            return (
                <RangePicker
                    disabled={disabled}
                    onChange={onChange}
                    placeholder={getPlaceHolder()}
                    format={format}
                    disabledDate={disabledDate}
                    disabledTime={disabledTime}
                    {...dateProps}
                />
            );
        },
        [disabled, onChange, disabledDate, disabledTime]
    );

    return (
        <FormItem fieldType={fieldTypes.DATE} {...formItemProps}>
            {mode === MODE.RANGER ? <RangerPickerInput /> : <DatePickerInput />}
        </FormItem>
    );
};

export default DatePickerField;
