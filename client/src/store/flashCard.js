import { createSlice } from "@reduxjs/toolkit";

const flashCardSlice = createSlice({
  name:'flashCard',
  initialState:{
    QAs:[],
    isFetching: false,
    error:false,
  },
  reducers:{
    getFlashCardStart:(state)=>{
      state.isFetching=true;  // ! fetch islemini baslatiyor
      state.error=false;
    },
    getFlashCardSuccess:(state,action)=>{
      state.isFetching=false; // ! fetch islemi basarili olunca bitiriyoruz
      state.error=false;
      state.QAs=action.payload;
    },
    getFlashCardFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },

    
    createFlashCardStart:(state)=>{
      state.isFetching=true;
      state.error=false;
    },
    createFlashCardSuccess:(state,action)=>{
      state.isFetching=false;
      state.error=false;
      state.QAs.push(action.payload);
    },
    createFlashCardFailure:(state)=>{
      state.isFetching=false;
      state.error=true;
    },

  },
})

export const {getFlashCardStart,
    getFlashCardSuccess,
    getFlashCardFailure,
    createFlashCardStart,
    createFlashCardSuccess,
    createFlashCardFailure,
  } = flashCardSlice.actions;
export default flashCardSlice.reducer;