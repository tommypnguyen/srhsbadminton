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
      .addCase(addNewSchool.fulfilled, (state, action) => {
        let newSchools = state.schools.map((school) =>
          school.id !== action.payload.id ? school : action.payload,
        )
        state.schools = newSchools
        state.status = 'idle'
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
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/schools/`,
    )
    return response.data.results
  },
)

export const addNewSchool = createAsyncThunk(
  'school/addNewSchool',
  async (data, { rejectWithValue }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/schools/`,
      data.initialSchool,
      { headers: data.headers },
    )
    console.log(response)
    if (response.status === 201) {
      return response.data
    } else if (response.statusText === 'Unauthorized') {
      throw rejectWithValue(response.data)
    }
  },
)
