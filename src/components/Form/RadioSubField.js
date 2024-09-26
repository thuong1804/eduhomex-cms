import { Radio, Space } from "antd";
import { useCallback } from "react";

import FormItem from "@/components/Form/FormItem";
import RadioSubOption from "./RadioSubOption";

const RadioSubField = ({
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
            <Space size={24}>
                {(options || []).map(({ label, value, subOptions }, index) => {
                    if (subOptions) {
                        return (
                            <RadioSubOption
                                label={label}
                                value={value}
                                subOptions={subOptions}
                                valueSelected={inputProps.value}
                                onChange={inputProps.onChange}
                                key={index}
                            />
                        );
                    }

                    return (
                        <Radio
                            value={value}
                            key={index}
                            onChange={inputProps.onChange}
                            checked={value === inputProps.value}
                        >
                            {label}
                        </Radio>
                    );
                })}
            </Space>
        )
    }, [options, disabled, value])

    return (
        <FormItem
            {...formItemProps}>
            <RadioGroup />
        </FormItem>
    )
}

export default RadioSubField;