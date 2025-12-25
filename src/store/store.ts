import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import projectReducer from "./features/projectSlice";
import blogReducer from "./features/blogSlice";
import contactReducer from "./features/contactSlice";
import dashboardReducer from "./features/dashboardSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        blog: blogReducer,
        contact: contactReducer,
        dashboard: dashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
