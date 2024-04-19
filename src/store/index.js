// third-party
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { mainManagement } from '../hooks/api/MainManagement/MainManagement';
import { loginManagement } from '../hooks/api/LoginManagement/LoginManagement';
import { boardManagement } from '../hooks/api/BoardManagement/BoardManagement';
import { pictureManagement } from '../hooks/api/PictureManagement/PictureManagement';
import { studentsManagement } from '../hooks/api/StudentsManagement/StudentsManagement';
import { preferencesManagement } from '../hooks/api/PreferencesManagement/PreferencesManagement';
import { statisticsManagement } from '../hooks/api/StatisticsManagement/StatisticsManagement';
import { fileManagement } from '../hooks/api/FileManagement/FileManagement';
import { calenderManagement } from '../hooks/api/CalenderManagement/CalenderManagement';
import { userManagement } from '../hooks/api/UserManagement/UserManagement';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

export const store = configureStore({
    reducer: {
        [loginManagement.reducerPath]: loginManagement.reducer,
        [mainManagement.reducerPath]: mainManagement.reducer,
        [boardManagement.reducerPath]: boardManagement.reducer,
        [pictureManagement.reducerPath]: pictureManagement.reducer,
        [studentsManagement.reducerPath]: studentsManagement.reducer,
        [preferencesManagement.reducerPath]: preferencesManagement.reducer,
        [statisticsManagement.reducerPath]: statisticsManagement.reducer,
        [fileManagement.reducerPath]: fileManagement.reducer,
        [calenderManagement.reducerPath]: calenderManagement.reducer,
        [userManagement.reducerPath]: userManagement.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(loginManagement.middleware)
            .concat(mainManagement.middleware)
            .concat(boardManagement.middleware)
            .concat(pictureManagement.middleware)
            .concat(studentsManagement.middleware)
            .concat(preferencesManagement.middleware)
            .concat(statisticsManagement.middleware)
            .concat(fileManagement.middleware)
            .concat(calenderManagement.middleware)
            .concat(userManagement.middleware)
});

setupListeners(store.dispatch);
