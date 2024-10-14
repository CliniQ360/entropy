import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Box,
  FormGroup,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Toolbar,
  IconButton,
  AppBar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const FamilyInsuranceForm = ({
  handleOpenDialog,
  handleCloseDialog,
  openDialog,
  handleRelationshipChange,
  proposer,
  handleDialogSubmit,
  handleChange,
  formData,
  person,
  isCoverageAmtDisabled,
  coverageAmount,
}) => {
  const handleSubmit = (e) => {
    // e.preventDefault();
    // Handle form submission here
    // setOpenDialog(true);
    handleOpenDialog();
  };

  return (
    <>
      <Box style={{ padding: "20px" }}>
        <Grid container spacing={6}>
          {formData && (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Relation"
                  name="relation"
                  value={formData.relation}
                  fullWidth
                  disabled
                />
                {/* <FormControl fullWidth
                InputLabelProps={{ shrink: true }}>
                    <InputLabel>Relationship With Proposer</InputLabel>
                    <Select name="relation" value={formData.relation} onChange={handleChange} label="Relationship With Proposer">
                      
                        <MenuItem value="Spouse">Spouse</MenuItem>
                        <MenuItem value="Child">Child</MenuItem>
                        <MenuItem value="Parent">Parent</MenuItem>
                        <MenuItem value="Sibling">Sibling</MenuItem>
                    </Select>
                </FormControl> */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth InputLabelProps={{ shrink: true }}>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    label="Gender"
                  >
                    <MenuItem value="M">Male</MenuItem>
                    <MenuItem value="F">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth InputLabelProps={{ shrink: true }}>
                  <InputLabel>PED</InputLabel>
                  <Select
                    name="PED"
                    value={formData.PED}
                    onChange={handleChange}
                    label="PED"
                  >
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="diabetes"
                      checked={formData.diabetes}
                      onChange={handleChange}
                    />
                  }
                  label="Diabetes"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="bloodPressure"
                      checked={formData.bloodPressure}
                      onChange={handleChange}
                    />
                  }
                  label="Blood Pressure/Hypertension"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="heartAilments"
                      checked={formData.heartAilments}
                      onChange={handleChange}
                    />
                  }
                  label="Heart Ailments"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="other"
                      checked={formData.other}
                      onChange={handleChange}
                    />
                  }
                  label="Other Health Issues"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Coverage Amount"
                  name="amount"
                  value={coverageAmount}
                  onChange={handleChange}
                  disabled={isCoverageAmtDisabled}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="panIndia"
                      checked={formData.panIndia}
                      onChange={handleChange}
                    />
                  }
                  label="PAN India Cover"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="politicallyExposedPerson"
                        checked={formData.politicallyExposedPerson}
                        onChange={handleChange}
                      />
                    }
                    label="Politically Exposed"
                  />
                </FormGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="GSTIN"
                  name="gstin"
                  value={formData.gstin}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Height (Foot)"
                  name="heightfoot"
                  value={formData.heightfoot}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Height (Inches)"
                  name="heightinch"
                  value={formData.heightinch}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </>
          )}
          <Grid item xs={12} style={{ textAlign: "center", marginTop: "10px" }}>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Add another member
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth={"xs"}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Add Another Member
              </Typography>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseDialog}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel>Relationship With Proposer</InputLabel>
              <Select
                value={proposer}
                onChange={handleRelationshipChange}
                label="Relationship With Proposer"
              >
                <MenuItem value="Self">Self</MenuItem>
                <MenuItem value="Spouse">Spouse</MenuItem>
                <MenuItem value="Child">Child</MenuItem>
                <MenuItem value="Parent">Parent</MenuItem>
                <MenuItem value="Sibling">Sibling</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleDialogSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default FamilyInsuranceForm;
