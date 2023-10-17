import { RentCallHeadCell } from "./rentCall.interface";

export const rentCallHeadCells: readonly RentCallHeadCell[] = [
  {
    id: "month",
    numeric: false,
    disablePadding: false,
    label: "Mois",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "amount",
    numeric: false,
    disablePadding: false,
    label: "montant",
  },
  {
    id: "tenantId",
    numeric: false,
    disablePadding: false,
    label: "locataire",
  },
];
