import ReactQuill, { Quill } from 'react-quill'; // ES6
import React, { useMemo, useRef } from 'react';

import FormItem from './FormItem';

import 'react-quill/dist/quill.snow.css'; // ES6
import styles from './TextEditorField.module.scss';

const Clipboard = Quill.import('modules/clipboard');
const Delta = Quill.import('delta');

class PlainClipboard extends Clipboard {
	onPaste(e) {
		e.preventDefault();
		const range = this.quill.getSelection();
		const text = e.clipboardData.getData('text/plain');
		const delta = new Delta().retain(range.index).delete(range.length).insert(text);
		const index = text.length + range.index;
		const length = 0;
		this.quill.updateContents(delta, 'silent');
		this.quill.setSelection(index, length, 'silent');
		this.quill.scrollIntoView();
	}
}
ReactQuill.Quill.register('modules/clipboard', PlainClipboard, true);

const formats = [
	'header',
	'font',
	'size',
	'color',
	'background',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'align',
	'list',
	'bullet',
	'indent',
	'line-height',
	'link',
	'image',
	'video',
	'logo-itest'
];

const TextEditorField = ({
	type,
	disabled,
	onBlur,
	defaultValue,
	prefix,
	style,
	toolbarId,
	...formItemProps
}) => {
	const quillRef = useRef();
	// const { execute: executeUploadImage } = useFetch(apiConfig.grade.getList);

	const imageHandler = () => {
		const input = document.createElement('input');
		const editor = quillRef.current.editor;

		input.setAttribute('type', 'file');
		input.setAttribute('accept', 'image/*');
		input.click();

		input.onchange = async () => {
			const file = input.files[0];
            if (file) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    const base64Image = e.target.result;
                    const index = editor.getSelection(true).index;
                    editor.insertEmbed(index, 'image', base64Image);
                };
                
                reader.readAsDataURL(file);
            }
			// const imageUrl = await new Promise((res) => {
			// 	executeUploadImage({
			// 		params: {
			// 			file
			// 		},
			// 		onCompleted: (result) => {
			// 			res(result?.data);
			// 		},
			// 		onError: () => res()
			// 	});
			// });

			// if (imageUrl) {
			// 	const index = editor.getSelection(true).index;
			// 	editor.insertEmbed(index, 'image', `${IMAGE_URL}/${imageUrl}`);
			// }
		};
	};

	const modules = useMemo(() => {
		return {
			toolbar: {
				container: [
					[{ header: [2, 3, 4, 5, false] }],
					[{ color: [] }, { background: [] }],
					['bold', 'italic', 'underline', 'strike'],
					[{ align: [] }],
					[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
					['link', 'image', 'video'],
					['clean']
				],
				handlers: {
					// handlers object will be merged with default handlers object
					image: imageHandler
				}
			},
			clipboard: {
				matchVisual: false
			}
		};
	}, []);

	return (
		<FormItem {...formItemProps}>
			<ReactQuill
				style={style}
				formats={formats}
				modules={modules}
				readOnly={disabled}
				className={styles.textEditor}
				ref={quillRef}
			/>
		</FormItem>
	);
};

export default TextEditorField;
