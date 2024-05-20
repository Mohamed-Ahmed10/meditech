import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const prescriptionsDetails = createAsyncThunk(
  "prescriptions/prescriptionsDetails",
  async ({ userId, patientId }) => {
    try {
      let url_api = `https://meditech20240517184700.azurewebsites.net/api/Presiption/prescriptions/${userId}/${patientId}`;
      const res = await axios.get(url_api);
      const data = res.data;
      return data;
    } catch(error) {
      console.log(error)
    }
  }
);

const presSlice = createSlice({
  name: "prescriptions",
  initialState: {
    showPrescriptions: [],
    loading: null,
    data: {
      medicationNames: [],
      testNames: [],
      digitalXRayNames: [],
      illnessDescription: null,
      patientId: null,
      doctorId: null,
    },
  },
  reducers: {
    addMedication: (state, action) => {
      const data = action.payload;
      if(Array.isArray(data)) {
        state.data.medicationNames = data;
      } else {
        state.data.medicationNames = [...state.data.medicationNames, action.payload];
      }
    },
    addTest: (state, action) => {
      const data = action.payload;
      if(Array.isArray(data)) {
        state.data.testNames = data;
      } else {
        state.data.testNames = [...state.data.testNames, action.payload];
      }
    },
    addDigitalXRay: (state, action) => {
      const data = action.payload;
      if(Array.isArray(data)) {
        state.data.digitalXRayNames = data;
      } else {
        state.data.digitalXRayNames = [...state.data.digitalXRayNames, action.payload];
      }
    },
    addIllnessDescription: (state, action) => {
      state.data.illnessDescription = action.payload;
    },
    addPatientId: (state, action) => {
      state.data.patientId = +action.payload;
    },
    addDoctorId: (state, action) => {
      state.data.doctorId = +action.payload;
    },
    clear: (state, action) => {
      state.data.medicationNames = [];
      state.data.testNames = [];
      state.data.digitalXRayNames = [];
      state.data.illnessDescription = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(prescriptionsDetails.pending, (state, action) => {
      state.loading = true;
      state.showPrescriptions = [];
    });
    builder.addCase(prescriptionsDetails.fulfilled, (state, action) => {
      if (action.payload) {
        state.showPrescriptions = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(prescriptionsDetails.rejected, (state, action) => {
      state.loading = false;
      state.showPrescriptions = [];
    });
  },
});
export const {
  addMedication,
  addTest,
  addDigitalXRay,
  addIllnessDescription,
  addPatientId,
  addDoctorId,
  clear,
} = presSlice.actions;
export default presSlice.reducer;
