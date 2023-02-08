import React, {useState, useEffect} from "react"

import { AddAPhoto, AddBox } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import { Tooltip } from "@mui/material"

function Reply(){

    return(
        <div className="d-flex flex-column text-area-container">

            <div className = "text-area">
                <textarea className="form-control" placeholder="Add a reply..."></textarea> 
            </div>

            <div className="d-flex justify-content-end p-2 text-area-images">

            <Tooltip title="Add Photos">
                <IconButton><AddAPhoto ></AddAPhoto></IconButton>

            </Tooltip>

                <IconButton><AddBox></AddBox></IconButton>

            </div>



        </div>
    )





}

export default Reply