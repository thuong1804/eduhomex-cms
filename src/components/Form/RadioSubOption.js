import { Checkbox, Radio, Space } from 'antd';
import { useState, useEffect } from 'react';

const RadioSubOption = ({ label, value, subOptions, valueSelected, onChange }) => {
    const subValues = subOptions.map(el => el.value);
    const values = [value, ...subValues];
    const isChecked = values.includes(valueSelected);

    const fromValueToSubValues = (valueSelected) => {
        return valueSelected === value ? subValues : [valueSelected].filter(Boolean);
    }

    const [subValuesSelected, setSubValuesSelected] = useState(fromValueToSubValues(valueSelected));

    const handleChange = e => {
        if (!isChecked) {
            onChange(subValues[0]);
            setSubValuesSelected([subValues[0]]);
        }
    }

    const fromSubValuesToValue = (arr) => {
        const isCheckAll = arr.length === subValues.length;
        return isCheckAll ? value : arr[0];
    }

    const handleSubOptionClick = e => {
        const { value: subValue } = e.target;
        const newSubValues = [...subValuesSelected];
        const index = newSubValues.indexOf(subValue);
        if (index === -1) {
            newSubValues.push(subValue);
        } else {
            newSubValues.splice(index, 1);
        }

        if (newSubValues.length) {
            onChange(fromSubValuesToValue(newSubValues));
        }
    }

    useEffect(() => {
        setSubValuesSelected(fromValueToSubValues(valueSelected));
    }, [valueSelected, subOptions]);

    return (
        <Space wrap>
            <Radio
                value={value}
                checked={isChecked}
                onChange={handleChange}
            >
                {label}
            </Radio>
            {isChecked && (
                <Space>
                    {subOptions.map(({ label, value: subValue }, index) => (
                        <Checkbox
                            onChange={handleSubOptionClick}
                            checked={subValuesSelected.includes(subValue)}
                            value={subValue}
                            key={index}
                        >
                            {label}
                        </Checkbox>
                    ))}
                </Space>
            )}
        </Space>
    );
};

export default RadioSubOption;