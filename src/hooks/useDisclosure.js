import { useCallback } from 'react';
import { useState } from 'react';

function useDisclosure(initial = false, { onClose, onOpen } = {}) {
	const [opened, setOpened] = useState(initial);

	const open = useCallback(() => {
		setOpened((isOpen) => {
			if (!isOpen) {
				onOpen?.();
				return true;
			}

			return isOpen;
		});
	}, [onOpen]);

	const close = useCallback(() => {
		setOpened((isOpen) => {
			if (isOpen) {
				onClose?.();
				return false;
			}

			return isOpen;
		});
	}, [onClose]);

	const toggle = useCallback(() => (opened ? close() : open()), [opened, onClose, onOpen]);

	return [opened, { open, close, toggle }];
}

export default useDisclosure;
