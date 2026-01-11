import { isRejectedWithValue } from "@reduxjs/toolkit";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
        console.warn("We got a rejected action!");

        // Access error message
        const errorMessage = action.payload?.data?.message || action.error?.message || "An unknown error occurred";

        console.error("Redux Middleware Error:", errorMessage);

        // You can integrate a toast library here in the future
        // toast.error(errorMessage);
    }

    return next(action);
};
