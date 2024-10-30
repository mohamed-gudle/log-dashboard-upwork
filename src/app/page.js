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

const ODD_OPACITY = 0.2;

const sample_data = 
[
  {
    id: 1,
    "action": "End",
    "details": {
      "email": "alice@example.com",
      "subject": "Application Submission for Alice Johnson"
    },
    "timestamp": "2024-10-30T04:10:05.346003+00:00",
    "workflow": "Application Submission"
  },
  {
    id: 2,
    "action": "Email Sent",
    "details": {
      "email": "alice@example.com",
      "subject": "Application Submission for Alice Johnson"
    },
    "timestamp": "2024-10-30T04:09:05.346003+00:00",
    "workflow": "Application Submission"
  },
  {
    id: 3,
    "action": "Start",
    "details": {
      "email": "james@example.com",
      "subject": "Application Submission for Alice Johnson"
    },
    "timestamp": "2024-10-30T04:08:05.346003+00:00",
    "workflow": "Application Submission"
  },
]


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
  { field: "workflow", headerName: "Workflow", width: 200 },
  { field: "action", headerName: "Action", width: 200 },
  { field: "email", headerName: "Email", width: 200, valueGetter: (value,row) => row.details.email },
  { field: "subject", headerName: "Subject", width: 200, valueGetter: (value,row) => row.details.subject },
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
        <Box sx={{ display: "flex", alignItems:"center", justifyContent:"space-between", margin:'10px'}}>
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
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              sx={{ width: "200px" }}
              defaultValue="2021-10-01"
            />

          </Stack>
        </Box>

        <Box sx={{ flexGrow: "1", width: "100%" }}>
          <StripedDataGrid
            rows={sample_data}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{ toolbar: { showQuickFilter: true } }}
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
