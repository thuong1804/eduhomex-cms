import React, { useCallback } from "react";
import { Editor } from "@tinymce/tinymce-react";
import FormItem from "@/components/Form/FormItem";

const TinyEditorField = ({
    ...formItemProps
}) => {
    const EditorInput = useCallback(({ ...inputProps }) => {
        const handleEditorChange = (content) => {
            inputProps?.onChange?.(content);
        };

        return (
            <div >
                <Editor
                    apiKey="ed1s2654ba1s5xhooycof7pyumtmyo4huwisv8i0s48n1g7k"
                    init={{
                        plugins:
                            "anchor autolink codesample link lists media searchreplace table visualblocks wordcount checklist footnotes typography inlinecss code",
                        toolbar:
                            "undo redo | blocks fontsizeinput | bold italic underline strikethrough | table | align lineheight | checklist numlist bullist indent outdent | code | removeformat",
                        font_size_formats: "8px 9px 10px 11px 12px 14px 18px 24px 30px 36px 48px 60px 72px 96px",
                    }}
                    onEditorChange={handleEditorChange}
                    spellCheck="false"
                    value={inputProps.value}
                />
            </div>
        );
    }, [])

    return (
        <FormItem {...formItemProps}>
            <EditorInput />
        </FormItem>
    )
}

export default TinyEditorField;
