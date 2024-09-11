import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    schools: [],
    status: 'idle',
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.schools = action.payload
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default schoolSlice.reducer

export const selectAllSchools = (state) => state.school.schools

export const selectSchoolByName = (state, name) =>
  state.school.schools.find(
    (school) => school.name.toLowerCase() === name.toLowerCase(),
  )

export const fetchSchools = createAsyncThunk(
  'school/fetchSchools',
  async () => {
    const response = await axios.get('http://localhost:8000/schools/')
    return response.data.results
  },
)
