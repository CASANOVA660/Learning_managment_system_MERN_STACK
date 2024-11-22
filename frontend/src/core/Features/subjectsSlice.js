import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from "../../lib/AxiosConfig"; // Adjust path as needed

export const fetchSubjects = createAsyncThunk("subjects/fetchSubjects", async () => {
    const response = await axiosRequest.get("/course/subjects");
    return response.data;
});

const subjectsSlice = createSlice({
    name: "subjects",
    initialState: {
        subjects: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSubjects.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects = action.payload;
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default subjectsSlice.reducer;
