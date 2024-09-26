/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useBlocker } from './useBlocker'

export function useCallbackPrompt(when) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPrompt, setShowPrompt] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);
    const unblockRef = useRef();

    const cancelNavigation = useCallback(() => {
        setShowPrompt(false);
        setLastLocation(null);
    }, [])

    // handle blocking when user click on another route prompt will be shown
    const handleBlockedNavigation = useCallback(
        (nextLocation) => {
            // in if condition we are checking next location and current location are equals or not
            if (
                !confirmedNavigation &&
                nextLocation.location.pathname !== location.pathname
            ) {
                setShowPrompt(true);
                setLastLocation(nextLocation);
                return false;
            }
            console.log("here ______-");
            return true;
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [confirmedNavigation, location]
    )

    const confirmNavigation = useCallback(() => {
        setShowPrompt(false)
        setConfirmedNavigation(true)
    }, [])

    const forceNavigate = useCallback(url => {
        unblockRef.current && unblockRef.current();
        navigate(url);
    }, [])

    useEffect(() => {
        if (confirmedNavigation && lastLocation) {
            navigate(lastLocation.location?.pathname);

            // Clean-up state on confirmed navigation
            setConfirmedNavigation(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmedNavigation, lastLocation])

    useBlocker(handleBlockedNavigation, when, unblockRef);

    return { showPrompt, confirmNavigation, cancelNavigation, forceNavigate };
}