import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import { TextField, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import TableLoading from "../../../shared/loading/TableLoading";

const TenantTableToolbar = () => {
  const { loading } = useAppSelector((state) => state.tenant);
  const [key, setKey] = useState<any>("");
  const router = useRouter();

  // initial search input value
  React.useEffect(() => {
    if (router?.query?.search) {
      setKey(router.query.search);
    }
  }, [router.query.search]);

  const search = (key: string) => {
    const query = { ...router.query, search: key };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  const deboncedSearch = React.useCallback(debounce(search, 300), [
    router.query,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    deboncedSearch(event.target.value);
  };
  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Stack
          direction="row"
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
          Liste des Locataires
          </Typography>
        </Stack>
      </Toolbar>
      {loading && <TableLoading />}
    </>
  );
};

export default TenantTableToolbar;
