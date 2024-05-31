import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core'
import  Visibility  from '@material-ui/icons/Visibility'
import VisibilityOff  from '@material-ui/icons/VisibilityOff'

const Input = ({ name, half,handleShowPassword, handleChange, label, type, autoFocus }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        type={type}
        autoFocus={autoFocus}
        InputProps={name == "password" ? {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}></IconButton>
              {type === "password" ? <Visibility /> : <VisibilityOff />}
            </InputAdornment>
          )
        }:null}
      />
    </Grid>
  )
}

export default Input