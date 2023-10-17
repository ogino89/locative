import React from "react";
import Container from "@mui/material/Container";
import {
  Button,
  Grid,
  Stack,
  Divider,
  styled,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import TenantList from "./organism/table/TenantList";
import TenantForm from "./organism/TenantFormForm";

const Tenant = () => {
  return (
    <Container maxWidth="xl">
      <Stack>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          mb={1}
          mt={6}
        >
          <Link href="/">
            <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
              Retour
            </Button>
          </Link>
          <Typography variant="h4"> Locataire </Typography>
        </SectionNavigation>
        <Divider />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TenantForm />
        </Grid>
        <Grid item xs={12} md={8} mb={3}>
          <TenantList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Tenant;

export const SectionNavigation = styled(Stack)(({}) => ({}));
