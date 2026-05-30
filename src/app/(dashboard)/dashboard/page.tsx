import { Typography, Box } from "@mui/material";

export default function DashboardPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Select a section from the sidebar to manage Users or Products.
      </Typography>
    </Box>
  );
}
