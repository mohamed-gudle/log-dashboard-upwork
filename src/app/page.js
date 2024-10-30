"use client";
import {
  Box,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider, AdapterDayjs } from "@mui/x-date-pickers";

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const columns = [
  { field: "financeInstrument", headerName: "Finance Instrument", flex: 1 },
  {
    field: "createdAt",
    headerName: "Date of Application",
    flex: 1,
    type: "dateTime",
    valueFormatter: (value) => {
      return formatDate(value);
    },
  },
];

export default function Home() {
  return (
    <Paper sx={{ minHeight: "90vh" }}>
      <Box
        sx={{
          height: "80vh",
          p: 3,
          display: "flex",
          flexDirection: "column",
          gap: "2",
        }}
      >
        <Box sx={{ display: "flex", alignItems:"center", justifyContent:"space-between"}}>
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
            Email Logs
          </Typography>
          <Stack direction="row" spacing={2}>
            <Select
              label="Log Type"
              variant="outlined"
              defaultValue="IMMI"
              sx={{ width: "200px" }}
            >
              <option value="IMMI">IMMI</option>
              <option value="bridging">Bridging</option>
              <option value="jotform">Jotform</option>
              <option value="s56">S56</option>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              variant="outlined"
              sx={{ width: "200px" }}
              defaultValue={new Date()}
              renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
          </Stack>
        </Box>

        <Box sx={{ flexGrow: "1", width: "100%" }}>
          <StripedDataGrid
            rows={[]}
            columns={columns}
            // slots={{ toolbar: GridToolbar }}
            // slotProps={{ toolbar: { showQuickFilter: true } }}
            disableDensitySelector
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
          />
        </Box>
      </Box>
    </Paper>
  );
}