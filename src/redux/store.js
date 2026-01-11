import { configureStore } from "@reduxjs/toolkit";
import baseApi from "./api/baseApi";
import authReducer from "./slices/authSlice";
import { rtkQueryErrorLogger } from "./middleware/rtkQueryErrorLogger";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware).concat(rtkQueryErrorLogger),
});

export default store;
