import { UNSAFE_NavigationContext } from 'react-router-dom';
import { useEffect, useContext } from 'react';

export function useBlocker(blocker, when = true, unblockRef) {
    const navigator = useContext(UNSAFE_NavigationContext).navigator;

    useEffect(() => {
        if (!when) return;

        const unblock = navigator.block((tx) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock();
                    tx.retry();
                },
            };

            blocker(autoUnblockingTx);
        });

        unblockRef.current = unblock;

        return unblock;
    }, [navigator, blocker, when]);
}