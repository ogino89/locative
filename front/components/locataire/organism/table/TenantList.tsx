import React, { useEffect } from "react";
import { Box, IconButton, Paper, Stack, styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import useFetchTypeJournal from "../../hooks/useFetchTenants";
import { useConfirm } from "material-ui-confirm";
import TypeJournalTableToolbar from "./TenantTableToolbar";
import TypeJournalTableHeader from "./TenantTableHeader";
import Badge from "@mui/material/Badge";
// import useFetchPassenger from "../../hooks/useFetchTenants";
// import PassengerTableToolbar from "./TenantTableToolbar";
// import PassengerTableHeader from "./TenantTableHeader";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  deleteProperty,
  editProperty,
} from "../../../../redux/slices/property";
import useFetchProperty from "../../hooks/useFetchTenants";
import { PropertyItem } from "../../../../redux/slices/property/propertySlice.interface";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../config/table.config";
import useFetchTenant from "../../hooks/useFetchTenants";
import { deleteTenant, editTenant } from "../../../../redux/slices/tenant";
import TenantTableToolbar from "./TenantTableToolbar";
import TenantTableHeader from "./TenantTableHeader";
import { TenantItem } from "../../../../redux/slices/tenant/tenantSlice.interface";

export default function TenantList() {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch: any = useAppDispatch();
  const { tenantList } = useAppSelector((state) => state.tenant);
  const router = useRouter();
  const confirm = useConfirm();

  const getTextType = (type: string | undefined) => {
    switch (type) {
      case "APARTMENT":
        return "Appartement";
        break;
      case "HOUSES":
        return "Maisons";
        break;
    }
  };

  const fetchTenant = useFetchTenant();

  useEffect(() => {
    fetchTenant();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    await dispatch(editTenant({ id }));
  };

  const handleclickDelete = async (id: any) => {
    confirm({
      title: "Supprimer ce Locataire",
      description: "Voulez-vous vraiment supprimer ce locataire ?",
      cancellationText: "Annuler",
      confirmationText: "Supprimer",
      cancellationButtonProps: {
        color: "warning",
      },
      confirmationButtonProps: {
        color: "error",
      },
    })
      .then(async () => {
        await dispatch(deleteTenant({ id }));
        fetchTenant();
      })
      .catch(() => {});
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tenantList.length) : 0;

  return (
    <TableSection>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {/* <PassengerTableToolbar /> */}
          <TenantTableToolbar />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              {/* <PassengerTableHeader /> */}
              <TenantTableHeader />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
            rows.slice().sort(getComparator(order, orderBy)) */}
                {tenantList.map((row: TenantItem, index: any) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align="left"
                      >
                        {row.firstName} {""}
                        {row.lastName}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align="left"
                      >
                        {row.email}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align="left"
                      >
                        {row.postalAddress}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align="left"
                      >
                        {row.phone}
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                        align="center"
                      >
                        <Badge badgeContent={getTextType(row?.property?.type)} />
                      </TableCell>
                      <TableCell align="right">
                        <BtnActionContainer
                          direction="row"
                          justifyContent="flex-end"
                        >
                          <IconButton
                            color="primary"
                            aria-label="Modifier"
                            component="span"
                            onClick={() => handleClickEdit(row.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="warning"
                            aria-label="Supprimer"
                            component="span"
                            onClick={() => handleclickDelete(row.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </BtnActionContainer>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={tenantList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={labelRowsPerPage}
            labelDisplayedRows={defaultLabelDisplayedRows}
          />
        </Paper>
      </Box>
    </TableSection>
  );
}

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));

const TableSection = styled("div")(({ theme }) => ({
  paddingBlock: theme.spacing(2),
  paddingLeft: theme.spacing(2),
}));
