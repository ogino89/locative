import { Button, Stack, styled } from "@mui/material";
import Link from "next/link";
import React from "react";

const CardModule = ({ children, color, href }: any) => {
  return (
    <Link href={href}>
      <CardModel variant="text" sx={{ boxShadow: 3 }} color={color}>
        <BtnStack>{children}</BtnStack>
      </CardModel>
    </Link>
  );
};

CardModule.defaultProps = {
  href: "",
};

export default CardModule;

const BtnStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const CardModel = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  margin: theme.spacing(2),
  minWidth: 150,
  
}));
