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
import PropertyList from "./organism/table/PropertyList";
import PropertyForm from "./organism/PropertyFormForm";

const Property = () => {
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
          <Typography variant="h4"> Immobiliers </Typography>
        </SectionNavigation>
        <Divider />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <PropertyForm />
        </Grid>
        <Grid item xs={12} md={8} mb={3}>
          <PropertyList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Property;

export const SectionNavigation = styled(Stack)(({}) => ({}));
