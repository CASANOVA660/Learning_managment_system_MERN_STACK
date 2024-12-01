import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from "../../lib/AxiosConfig";

// Thunk to fetch all subjects
export const fetchSubjects = createAsyncThunk(
    "subjects/fetchSubjects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosRequest.get("/subjects");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch subjects");
        }
    }
);

// Thunk to fetch subjects by class ID
export const fetchSubjectsByClassId = createAsyncThunk(
    "subjects/fetchSubjectsByClassId",
    async (classId, { getState, rejectWithValue }) => {
        const { subjectsStore } = getState();
        if (subjectsStore.cache[classId]) {
            return { classId, subjects: subjectsStore.cache[classId] };
        }
        try {
            const response = await axiosRequest.get(`/subjects/class/${classId}/subjects`);
            return { classId, subjects: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch subjects");
        }
    }
);

const subjectsSlice = createSlice({
    name: "subjects",
    initialState: {
        subjects: [],
        loading: false,
        error: null,
        cache: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubjects.fulfilled, (state, action) => {
                state.loading = false;
                state.subjects = action.payload;
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchSubjectsByClassId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubjectsByClassId.fulfilled, (state, action) => {
                state.loading = false;
                const { classId, subjects } = action.payload;
                state.cache[classId] = subjects;
                state.subjects = subjects;
            })
            .addCase(fetchSubjectsByClassId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default subjectsSlice.reducer;
