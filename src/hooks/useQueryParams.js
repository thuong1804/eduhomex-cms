import { useCallback, useMemo } from "react";
import queryString from "query-string";
import { useSearchParams } from "react-router-dom";

const parseSearchParams = (query) =>
    queryString.parse(query, {
        arrayFormat: "comma",
        parseNumbers: false,
        parseBooleans: true,
    });

const stringifySearchParams = (searchParams) =>
    queryString.stringify(searchParams, {
        arrayFormat: "comma",
        skipEmptyString: true,
        skipNull: true,
    });

const useQueryParams = (defaultInit) => {
    const [urlSearchParams, setUrlSearchParams] = useSearchParams(defaultInit);

    const queryParams = useMemo(() => parseSearchParams(urlSearchParams.toString()), [urlSearchParams]);

    const setQueryParams = useCallback(
        (params) => {
            const newParams = typeof params === "function" ? params(queryParams) : params;
            setUrlSearchParams(stringifySearchParams(newParams));
        },
        [queryParams, setUrlSearchParams]
    );

    return [queryParams, setQueryParams];
}

export default useQueryParams;
