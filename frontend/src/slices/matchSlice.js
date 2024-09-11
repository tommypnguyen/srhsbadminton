import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const matchSlice = createSlice({
  name: 'match',
  initialState: {
    matches: [],
    record: { wins: 0, losses: 0, totalMatches: 0 },
    recordStatus: 'idle',
    recordError: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    setMatchStatus(state, action) {
      state.status = action.payload
    },
    setRecordStatus(state, action) {
      state.recordStatus = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.matches = action.payload
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteMatch.fulfilled, (state, action) => {
        state.matches = state.matches.filter(
          (match) => match.id !== parseInt(action.payload),
        )
        state.recordStatus = 'idle'
      })
      .addCase(updateMatch.fulfilled, (state, action) => {
        let newMatches = state.matches.map((match) =>
          match.id !== action.payload.id ? match : action.payload,
        )
        newMatches.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
        })
        state.matches = newMatches
        state.recordStatus = 'idle'
      })
      .addCase(addNewMatch.fulfilled, (state, action) => {
        state.matches.push(action.payload)
        let newMatches = [...state.matches]
        newMatches.sort((a, b) => {
          return new Date(b.date) - new Date(a.date)
        })
        state.matches = newMatches
        state.recordStatus = 'idle'
      })
      .addCase(addNewGame.fulfilled, (state, action) => {
        const newMatches = state.matches.map((match) => {
          if (match.id === action.payload.match_id) {
            console.log('updating games')
            return {
              ...match,
              games: [...match.games, action.payload],
            }
          }
          return match
        })
        state.matches = newMatches
      })
      .addCase(fetchRecord.pending, (state) => {
        state.recordStatus = 'loading'
      })
      .addCase(fetchRecord.fulfilled, (state, action) => {
        state.recordStatus = 'succeeded'
        state.record.wins = action.payload.wins
        state.record.losses = action.payload.losses
        state.record.totalMatches = action.payload.total_matches
      })
      .addCase(fetchRecord.rejected, (state, action) => {
        state.recordStatus = 'failed'
        state.recordError = action.error.message
      })
  },
})

export const { setMatchStatus, setRecordStatus } = matchSlice.actions

export default matchSlice.reducer

export const selectAllMatches = (state) => state.match.matches

export const selectRecord = (state) => state.match.record

export const selectMatchById = (state, matchId) =>
  state.match.matches.find((match) => match.id === matchId)

export const fetchMatches = createAsyncThunk(
  'match/fetchMatches',
  async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/matches/`,
      {
        params: data,
      },
    )
    return response.data
  },
)

export const fetchRecord = createAsyncThunk(
  'match/fetchRecord',
  async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/schools/1/`,
      {
        params: data,
      },
    )

    return response.data
  },
)

export const updateMatch = createAsyncThunk(
  'match/updateMatch',
  async (data) => {
    const response = await axios.put(
      `${process.env.REACT_APP_API_URL}/matches/${data.matchId}/`,
      data.updatedMatch,
    )

    return response.data
  },
)

export const deleteMatch = createAsyncThunk('match/deleteMatch', async (id) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/matches/${id}/`)
  return id
})

export const addNewMatch = createAsyncThunk(
  'match/addNewMatch',
  async (initialMatch) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/matches/`,
      initialMatch,
    )

    return response.data
  },
)

export const addNewGame = createAsyncThunk(
  'match/addNewGame',
  async (initialGame) => {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/games/`,
      initialGame,
    )
    return response.data
  },
)
