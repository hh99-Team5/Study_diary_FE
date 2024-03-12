// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
  reducer: {
    // 다른 리듀서들도 추가할 수 있습니다.
  },
});

export default store;