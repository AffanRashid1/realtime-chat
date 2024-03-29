import { Box, Grid } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar'
import SideBar from '../SideBar/SideBar'

const Layout = ({ children }) => {
    return (
        <>
            <Box
                sx={{
                    maxHeight: "100vh",
                    bgcolor: "background.default",
                    overflow: 'hidden'
                }}
            >
                <Navbar />
                <Grid container>
                    <Grid item xs={3} >
                        <SideBar />
                    </Grid>
                    <Grid item xs={9}>
                        {children}
                    </Grid>
                </Grid>
            </Box >

        </>
    )
}

export default Layout