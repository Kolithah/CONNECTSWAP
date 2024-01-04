import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signIn } from "../api";



const initialState = {
  loading:false,
  user: null,
  token: null,
  error: "null",
  payload:  null,
};
export const trySignIn = createAsyncThunk('auth/trySignIn', async(formData)=> {
  
  
  return signIn(formData).then((response) => (response.data));
 

}
  
)

const errorCheck = (err) => {
  let returnErr = "";
  switch(err) {
    case "Request failed with status code 400":
      returnErr = "Wrong Password"
      break;
    case "Request failed with status code 404":
      returnErr = "User doesn't exist"
      break;
    default:
      returnErr = err;
  }

  return returnErr;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    setLogin: (state, action) => {
      state.loading = true;
      state.user = action.payload.result._id;
      state.token = action.payload.token;
      state.loading = false;
    },
    setLogout: (state) => {
      state.error ="null";
      state.user = null;
      state.token = null;
      state.loading = false;
      
    },
  },
  extraReducers: builder => {
    builder.addCase(trySignIn.pending,state => {
      state.loading= true;
    })
    builder.addCase(trySignIn.fulfilled, (state,action)=>{
      state.error = "nope"
      state.loading = false;
      console.log("this is payload",action.payload);
      state.token = action.payload.token;
      state.user = action.payload.result._id;
      

    })
    builder.addCase(trySignIn.rejected, (state,action)=>{
      const responsErr = errorCheck(action.error.message);
      state.error= responsErr;
      state.loading = false;
      state.token = '';
      state.user= '';
      console.log("error",action.error);
      

    })

  }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;