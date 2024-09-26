import { Radio } from "antd";
import { useCallback } from "react";

import FormItem from "@/components/Form/FormItem";

const RadioField = ({
    options,
    disabled,
    optionType,
    buttonStyle,
    size,
    defaultValue,
    value,
    ...formItemProps
}) => {

    const RadioGroup = useCallback(({ ...inputProps }) => {
        return (
            <Radio.Group
                options={options}
                disabled={disabled}
                optionType={optionType}
                buttonStyle={buttonStyle}
                size={size}
                defaultValue={defaultValue}
                {...inputProps}
            />
        )
    }, [options, disabled, value])

    return (
        <FormItem
            {...formItemProps}>
            <RadioGroup />
        </FormItem>
    )
}

export default RadioField;