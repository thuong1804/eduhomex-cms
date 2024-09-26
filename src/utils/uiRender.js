import React from "react";
import { Col, Popover, Row, Select, Space, Typography } from "antd";
import { skillDDL, skillThumbnails } from "@/constants/masterData";
import { flatten } from ".";
const { Text } = Typography;

export const renderResourceItem = (label, value, item) => {
    return (
        <React.Fragment key={item.value}>
            {Array.isArray(item.options) ?
                <Select.OptGroup label={item.label}>
                    {item.options.map(op =>
                        <Select.Option
                            key={op['value']}
                            label={op['label']}
                            other={op['other']}>
                            {renderLabel ? renderLabel(op) : op['label']}
                        </Select.Option>
                    )}
                </Select.OptGroup>
                :
                <Select.Option
                    key={item['value']}
                    label={item['label']}
                >
                    {renderLabel ? renderLabel(item) : item['label']}
                </Select.Option>
            }
        </React.Fragment>
    )
}

export const renderLabel = (item) => {
    return (
        <React.Fragment>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }} title={item.label}>
                {item.label}
            </div>
        </React.Fragment>
    )
}


export const renderSkill = (parts = []) => {
    const skills = [...new Set(flatten(parts.map(el => el.skills)))].filter(Boolean);
    const skillsObj = skillDDL.filter(el => skills.includes(el.value))
    return (
        <Popover
            content={(
                <Row style={{ maxWidth: 276 }} gutter={[16, 16]}>
                    {skillsObj.map(skill => (
                        <Col span={12} key={skill.value} style={{ width: 130 }}>
                            <Space direction="horizontal">
                                <img
                                    style={{ display: 'block' }}
                                    width={18}
                                    height={18}
                                    src={skillThumbnails[skill.value]}
                                    alt=""
                                />
                                {skill.label}
                            </Space>
                        </Col>
                    ))}
                </Row>
            )}
            placement="left"
        >
            <Text underline style={{ color: '#0CA6ED' }}>{skills.length}</Text>
        </Popover>
    );
}

export const bannerTemplate = {
    1: "<div>\n" +
        "    <div style=\"text-align: right; margin: 0; line-height: 1.3; --align-mobile: left; --align-desktop: right\">\n" +
        "        <span style=\"font-size: 30px; font-weight: 700; color: rgb(127, 97, 248); --fz-mobile: 18px; --fz-desktop: 30px\"> Giải pháp quản lý </span>\n" +
        "    </div>\n" +
        "    <div style=\"text-align: right; margin: 0; line-height: 1.3; --align-mobile: left; --align-desktop: right\">\n" +
        "        <span style=\"font-size: 44px; font-weight: 700; color: #e3471b; --fz-mobile: 30px; --fz-desktop: 44px\"> đề thi online </span>\n" +
        "    </div>\n" +
        "    <div style=\"text-align: right; margin: 0; line-height: 1.3; --align-mobile: left; --align-desktop: right\">\n" +
        "        <span style=\"font-size: 30px; font-weight: 700; color: #000; --fz-mobile: 20px; --fz-desktop: 30px\"> Toàn diện cho mọi đối tượng </span>\n" +
        "    </div>\n" +
        "    <div style=\"text-align: right; margin: 20px 0; --align-mobile: left; --align-desktop: right\">\n" +
        "        <span style=\"font-size: 17px; font-weight: 700; color: #ff6337; --fz-mobile: 15px; --fz-desktop: 17px\">\n" +
        "            Giáo viên - Học viên - Phụ huynh - Nhà trường\n" +
        "        </span>\n" +
        "    </div>\n" +
        "    <div\n" +
        "        style=\"\n" +
        "            text-align: justify;\n" +
        "            margin: 0;\n" +
        "            font-size: 16px;\n" +
        "            line-height: 24px;\n" +
        "            color: #000;\n" +
        "            --fz-mobile: 15px;\n" +
        "            --fz-desktop: 16px;\n" +
        "            --align-mobile: justify;\n" +
        "            --align-desktop: justify;\n" +
        "        \"\n" +
        "    >\n" +
        "        <span style=\"font-weight: 700\">i-Test</span>\n" +
        "        <span>\n" +
        "            là nền tảng quản lý đề thi online toàn diện do Tập đoàn Giáo dục Đại Trường Phát tiên phong phát triển với hệ thống cơ sở dữ liệu phong phú, chất\n" +
        "            lượng, nội dung đề thi bám sát khung chương trình học chính khoá của Bộ Giáo dục &amp; Đào tạo và theo chuẩn quốc tế.\n" +
        "        </span>\n" +
        "    </div>\n" +
        "</div>",
    2: "<div>\n" +
        "    <div style=\"margin-bottom: 20px\">\n" +
        "        <div style=\"margin: 0; --align-mobile: left; --align-desktop: left\">\n" +
        "            <span style=\"font-size: 30px; font-weight: 700; color: rgb(127, 97, 248); --fz-mobile: 18px; --fz-desktop: 30px\"> Tính năng </span>\n" +
        "        </div>\n" +
        "        <div style=\"margin: 0; --align-mobile: left; --align-desktop: left\">\n" +
        "            <span style=\"font-size: 44px; font-weight: 700; color: #e3471b; --fz-mobile: 30px; --fz-desktop: 44px\"> Learning Management System (LMS) </span>\n" +
        "        </div>\n" +
        "        <div style=\"margin: 9px 0 0; display: flex; align-items: center; gap: 7px; --align-mobile: left; --align-desktop: left\">\n" +
        "            <label style=\"font-size: 30px; font-weight: 700; color: #000; --fz-mobile: 20px; --fz-desktop: 30px\">\n" +
        "                Đã chính thức có mặt trên\n" +
        "            </label>\n" +
        "            <span style=\"color: #fff; font-size: 18px; font-weight: 700; padding: 2px 10px; border-radius: 6.635px; background: #e3471b; white-space: nowrap; --fz-mobile: 16px; --fz-desktop: 18px\">\n" +
        "                i-Test\n" +
        "            </span>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <div\n" +
        "        style=\"\n" +
        "            text-align: justify;\n" +
        "            margin: 0;\n" +
        "            font-size: 16px;\n" +
        "            line-height: 24px;\n" +
        "            color: #000;\n" +
        "            --fz-mobile: 15px;\n" +
        "            --fz-desktop: 16px;\n" +
        "            --align-mobile: justify;\n" +
        "            --align-desktop: justify;\n" +
        "        \"\n" +
        "    >\n" +
        "        <span style=\"font-weight: 700\">i-Test</span>\n" +
        "        <span>\n" +
        "            là nền tảng quản lý đề thi online toàn diện do Tập đoàn Giáo dục Đại Trường Phát tiên phong phát triển với hệ thống cơ sở dữ liệu phong phú, chất\n" +
        "            lượng, nội dung đề thi bám sát khung chương trình học chính khoá của Bộ Giáo dục &amp; Đào tạo và theo chuẩn quốc tế.\n" +
        "        </span>\n" +
        "    </div>\n" +
        "</div>"
}