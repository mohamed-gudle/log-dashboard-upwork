"use client";
import { getLog } from "@/data/log";
import {
  Box,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { DataGrid, GridToolbar, gridClasses } from "@mui/x-data-grid";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";

const ODD_OPACITY = 0.2;

const sample_data = [
  {
    id: 1,
    action: "End",
    details: {
      email: "alice@example.com",
      subject: "Application Submission for Alice Johnson",
    },
    timestamp: "2024-10-30T04:10:05.346003+00:00",
    workflow: "Application Submission",
  },
  {
    id: 2,
    action: "Email Sent",
    details: {
      email: "alice@example.com",
      subject: "Application Submission for Alice Johnson",
    },
    timestamp: "2024-10-30T04:09:05.346003+00:00",
    workflow: "Application Submission",
  },
  {
    id: 3,
    action: "Start",
    details: {
      email: "alice@example.com",
      subject: "Application Submission for Alice Johnson",
    },
    timestamp: "2024-10-30T04:08:05.346003+00:00",
    workflow: "Application Submission",
  },
  {
    id: 4,
    action: "End",
    details: {
      email: "bob@example.com",
      subject: "IMMI Notification for Bob Brown",
    },
    timestamp: "2024-10-30T05:20:15.122003+00:00",
    workflow: "IMMI Notification",
  },
  {
    id: 5,
    action: "Email Sent",
    details: {
      email: "bob@example.com",
      subject: "IMMI Notification for Bob Brown",
    },
    timestamp: "2024-10-30T05:19:15.122003+00:00",
    workflow: "IMMI Notification",
  },
  {
    id: 6,
    action: "Start",
    details: {
      email: "bob@example.com",
      subject: "IMMI Notification for Bob Brown",
    },
    timestamp: "2024-10-30T05:18:15.122003+00:00",
    workflow: "IMMI Notification",
  },
  {
    id: 7,
    action: "End",
    details: {
      email: "charlie@example.com",
      subject: "Welcome Packet for Charlie Clark",
    },
    timestamp: "2024-10-30T06:15:45.766003+00:00",
    workflow: "Welcome Packet",
  },
  {
    id: 8,
    action: "Email Sent",
    details: {
      email: "charlie@example.com",
      subject: "Welcome Packet for Charlie Clark",
    },
    timestamp: "2024-10-30T06:14:45.766003+00:00",
    workflow: "Welcome Packet",
  },
  {
    id: 9,
    action: "Start",
    details: {
      email: "charlie@example.com",
      subject: "Welcome Packet for Charlie Clark",
    },
    timestamp: "2024-10-30T06:13:45.766003+00:00",
    workflow: "Welcome Packet",
  },
  {
    id: 10,
    action: "End",
    details: {
      email: "diana@example.com",
      subject: "Profile Update Confirmation for Diana Prince",
    },
    timestamp: "2024-10-30T07:05:32.086003+00:00",
    workflow: "Profile Update",
  },
  {
    id: 11,
    action: "Email Sent",
    details: {
      email: "diana@example.com",
      subject: "Profile Update Confirmation for Diana Prince",
    },
    timestamp: "2024-10-30T07:04:32.086003+00:00",
    workflow: "Profile Update",
  },
  {
    id: 12,
    action: "Start",
    details: {
      email: "diana@example.com",
      subject: "Profile Update Confirmation for Diana Prince",
    },
    timestamp: "2024-10-30T07:03:32.086003+00:00",
    workflow: "Profile Update",
  },
];

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
  {
    field: "email",
    headerName: "Email",
    width: 200,
    valueGetter: (value, row) => row.details.email,
  },
  {
    field: "subject",
    headerName: "Subject",
    width: 200,
    valueGetter: (value, row) => row.details.subject,
  },
];

export default function Home() {
  const { trigger,isMutating,data,error } = useSWRMutation(
    "log",
    getLog
  );

  useEffect(() => {
    trigger({logType:"IMMI", date:new Date()});
  }, []);




  const handleWorkFlowChange = (event) => {
    console.log(event.target.value);
  };

  const handleDateChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <Paper sx={{ minHeight: "90vh" }}>
      <Stack direction="column" sx={{ padding: "20px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
            Email Logs
          </Typography>
          <Stack direction="row" spacing={2}>
            <Select
              label="Log Type"
              variant="outlined"
              defaultValue="IMMI"
              sx={{ width: "200px" }}
              onChange={handleWorkFlowChange}
            >
              <MenuItem value="IMMI">IMMI</MenuItem>
              <MenuItem value="bridging">Bridging</MenuItem>
              <MenuItem value="jotform">Jotform</MenuItem>
              <MenuItem value="s56">S56</MenuItem>
            </Select>
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              sx={{ width: "200px" }}
              defaultValue="2021-10-01"
              onChange={handleDateChange}
            />
          </Stack>
        </Box>

        <Box sx={{ minWidth: "80vh" }}>
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
      </Stack>
    </Paper>
  );
}
