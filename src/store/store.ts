import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import blogReducer from '../features/blog/blogSlice'
import uploadReducer from '../features/upload/fileUploadSlice'

export const store = configureStore({
    reducer:{
        auth:authReducer,
        blog:blogReducer,
        upload:uploadReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;