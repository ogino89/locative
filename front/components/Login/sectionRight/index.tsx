import { styled, Typography } from '@mui/material'
import React from 'react'
// import Logo from '../../Images/Logo/Logo'
import ImgLogin from '../../Images/Login/ImgLogin'

const SectionRightContainer = styled('div')(({ theme }) => ({
    padding: 56,
    border: `1px solid ${theme.palette.grey[400]}`,
    borderRadius: 20,
    minHeight: "100vh",
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
}))

const SectionRight = () => {
  return (
    <SectionRightContainer>
        {/* <Logo/> */}
        <Typography variant="h3" color="initial" sx={{my: 5}}>Bienvenue</Typography>
        <ImgLogin/>
    </SectionRightContainer>
  )
}

export default SectionRight