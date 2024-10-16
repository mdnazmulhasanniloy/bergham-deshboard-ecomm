declare var process: {
    env: {
        REACT_APP_API_URL: string;
        REACT_APP_FEATURE_FLAG: string;
        [key: string]: string | undefined;
    };
};
