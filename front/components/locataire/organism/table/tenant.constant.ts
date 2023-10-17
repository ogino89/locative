import { TenantHeadCell } from "./tenant.interface";

export const tenantHeadCells: readonly TenantHeadCell[] = [
  {
    id: "firstName",
    numeric: false,
    disablePadding: false,
    label: "Nom/Prénom",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "postalAddress",
    numeric: false,
    disablePadding: false,
    label: "adresse postale",
  },
  {
    id: "phone",
    numeric: false,
    disablePadding: false,
    label: "Téléphone",
  },
  {
    id: "propertyId",
    numeric: false,
    disablePadding: false,
    label: "Propriété",
  },
];
