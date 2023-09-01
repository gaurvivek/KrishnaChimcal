import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, FormControl, FormGroup, Grid, MenuItem, TextField } from '@mui/material';
import { useDialogMinWidth } from '../../components/dialogs/utils';
import { AppDialogTitle } from '../../components/dialogs/components';
import { AppButton, ErrorMessage } from '../../components';
import { AppForm } from '../../components/AppForm';
import { useAppStore } from '../../store';
import uuid from 'react-uuid';
import { useDispatch, useSelector } from 'react-redux';
import { stoneList } from '../../store/storeRedux/actions';

/**
 * Shows modal "Change email" dialog
 * @param {string} props.email - data object
 * @param {function} props.onConfirm - event for Save/Confirm button
 * @param {function} props.onClose - event for Close and Cancel buttons and the backdrop
 */
const CreateCoalEntry = ({ open = false, title, onConfirm, onClose, editStoneItem, ...props }) => {
  const [sName, setsName] = useState('');
  const [sQuality, setsQuality] = useState('');
  const [sChaat, setsChaat] = useState('');
  const [sQuantity, setsQuantity] = useState('');
  const [dName, setDName] = useState('');
  const [dNumber, setDNumber] = useState('');
  const [dVihNumber, setDVihNumber] = useState('');
  const [sFare, setsFare] = useState('');
  const [sRate, setsRate] = useState('');
  const [sDate, setsDate] = useState('');
  const [sInvoiceNumber, setsInvoiceNumber] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [formError, setFormError] = useState(true);
  const paperMinWidth = useDialogMinWidth('xl');
  const dispatch = useDispatch();
  let stoneListArr = useSelector((state) => state.stoneList);
  const isEdit = editStoneItem && editStoneItem._id ? true : false;
  useEffect(() => {
    if(editStoneItem){
      setsName(editStoneItem.sName || '');
      setsQuality(editStoneItem.sQuality || '');
      setsChaat(editStoneItem.sChaat || '');
      setsQuantity(editStoneItem.sQuantity || '');
      setDName(editStoneItem.dName || '');
      setDNumber(editStoneItem.dNumber || '');
      setDVihNumber(editStoneItem.dVihNumber || '');
      setsFare(editStoneItem.sFare || '');
      setsRate(editStoneItem.sRate || '');
      setsDate(editStoneItem.sDate || '');
      setsInvoiceNumber(editStoneItem.sInvoiceNumber || '');
    }
    if(isEdit){
      setFormError(false);
    }
  }, [editStoneItem, isEdit])
  const handleInputChange = useCallback((event) => {
    switch (event.target.name) {
      case 'sName':
        setsName(event.target.value);
        break;
      case 'sQuality':
        setsQuality(event.target.value);
        break;
      case 'sChaat':
        setsChaat(event.target.value);
        break;
      case 'sQuantity':
        setsQuantity(event.target.value);
        break;
      case 'dName':
        setDName(event.target.value);
        break;
      case 'dNumber':
        setDNumber(event.target.value);
        break;
      case 'dVihNumber':
        setDVihNumber(event.target.value);
        break;
      case 'sFare':
        setsFare(event.target.value);
        break;
      case 'sRate':
        setsRate(event.target.value);
        break;
      case 'sDate':
        setsDate(event.target.value);
        break;
      case 'sInvoiceNumber':
        setsInvoiceNumber(event.target.value);
        break;
      default:
        break;
    }
    setErrorMessage('');
  }, []);
  useEffect(() => {
    if (
      sName &&
      sQuality &&
      sChaat &&
      sQuantity &&
      dName &&
      dNumber &&
      dVihNumber &&
      sFare &&
      sRate &&
      sDate &&
      sInvoiceNumber
    ) {
      setFormError(false);
    } else {
      setFormError(true);
    }
  }, [
    sName,
    sQuality,
    sChaat,
    sQuantity,
    dName,
    dNumber,
    dVihNumber,
    sFare,
    sRate,
    sDate,
    sInvoiceNumber,
    errorMessage,
    formError,
  ]);

  const handleOnConfirm = async () => {
    // if(!sName) { setErrorMessage("Enter coal company name"); return; }
    // if(!sQuality) { setErrorMessage("Select coal quality"); return; }
    // if(!sChaat) { setErrorMessage("Enter water quantity in coal"); return; }
    // if(!sQuantity) { setErrorMessage("Enter coal quantity"); return; }
    // if(!dNumber) { setErrorMessage("Enter driver number"); return; }
    // if(!dVihNumber) { setErrorMessage("Enter driven vahicle number"); return; }
    // if(!sFare) { setErrorMessage("Enter coal fare"); return; }
    // if(!sRate) { setErrorMessage("Enter coal amount"); return; }
    // if(!sDate) { setErrorMessage("Enter unload data"); return; }
    // if(!sInvoiceNumber) { setErrorMessage("Enter invoice number"); return; }
    // if(!dName) { setErrorMessage("Enter driver name"); return; }
    setErrorMessage('');
    const stoneListInitial = stoneListArr && stoneListArr.length ? stoneListArr : [];
    const coalObj = {
      _id: isEdit ? editStoneItem._id : uuid(),
      sName,
      sQuality,
      sChaat,
      sQuantity,
      dName,
      dNumber,
      dVihNumber,
      sRate,
      sFare,
      sDate,
      sInvoiceNumber,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if(isEdit){
      const updatedstoneList = await stoneListInitial.map(function(cItem) {
        if(cItem._id === editStoneItem._id){
          return coalObj;
        }
        return cItem
      });
      setFormError(true);
      await dispatch(stoneList(updatedstoneList));
    }else{
      stoneListInitial.push(coalObj);
      setFormError(true);
      await dispatch(stoneList(stoneListInitial));
    }
    setTimeout(() => {
      onConfirm();
    }, 300);
    // onConfirm();
    // if (onConfirm && typeof onConfirm === 'function') onConfirm("");
  }

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          minWidth: paperMinWidth,
        },
      }}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      {...props}
    >
      <AppDialogTitle id="form-dialog-title" onClose={onClose}>
        {isEdit ? "Edit " + editStoneItem.sName + " Record" : title || 'Add Coal Entry'}
      </AppDialogTitle>
      <DialogContent sx={{ py: 1 }}>
        <FormGroup>
          <FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="sName"
                  name="sName"
                  label="Company Name"
                  type="text"
                  fullWidth
                  value={sName}
                  placeholder="Enter Stone Comany Name"
                  helperText={<ErrorMessage message="Enter Stone Comany Name" error={sName ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="sQuantity"
                  name="sQuantity"
                  label="Stone Quantity(In Tons)"
                  type="number"
                  fullWidth
                  value={sQuantity}
                  placeholder="Enter Coal Quantity. Eg 15.50"
                  helperText={<ErrorMessage message="Enter Stone Quantity. Eg 15.50" error={sQuantity ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="sQuality"
                  name="sQuality"
                  label="Stone Quality"
                  type="select"
                  select
                  fullWidth
                  value={sQuality}
                  placeholder="Select Stone Quality"
                  helperText={<ErrorMessage message="Select Stone Quality" error={sQuality ? false : true} />}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Excellent">Excellent</MenuItem>
                  <MenuItem value="Good">Good</MenuItem>
                  <MenuItem value="Average">Average</MenuItem>
                  <MenuItem value="Bad">Bad</MenuItem>
                  <MenuItem value="Worst">Worst</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="sChaat"
                  name="sChaat"
                  label="Stone Chaat Quantity(In Tons)"
                  type="number"
                  fullWidth
                  value={sChaat}
                  placeholder="Enter Stone Chaat Quantity. Eg 2"
                  helperText={<ErrorMessage message="Enter Stone Chaat Quantity. Eg 2" error={sChaat ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="dName"
                  name="dName"
                  label="Driver Name"
                  type="text"
                  fullWidth
                  value={dName}
                  placeholder="Enter Driver Name"
                  helperText={<ErrorMessage message="Enter Driver Name" error={dName ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="dNumber"
                  name="dNumber"
                  label="Driver Number"
                  type="number"
                  fullWidth
                  value={dNumber}
                  placeholder="Enter Driver Contact Number"
                  helperText={<ErrorMessage message="Enter Driver Contact Number" error={dNumber ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="sRate"
                  name="sRate"
                  label="Stone Amount in RS"
                  type="number"
                  fullWidth
                  value={sRate}
                  placeholder="Enter Stone Amount in Rupees. Eg 88,5000"
                  helperText={<ErrorMessage message="Enter Stone Amount in Rupees. Eg 88,5000" error={sRate ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="sFare"
                  name="sFare"
                  label="Stone Vichle Face"
                  type="number"
                  fullWidth
                  value={sFare}
                  placeholder="Enter Stone Fare/Kiraya. Eg 5000"
                  helperText={<ErrorMessage message="Enter Stone Fare/Kiraya. Eg 5000" error={sFare ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
              <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="dVihNumber"
                  name="dVihNumber"
                  label="Driver Vehicle Number"
                  type="text"
                  fullWidth
                  value={dVihNumber}
                  placeholder="Enter Vehicle Number"
                  helperText={<ErrorMessage message="Enter Vehicle Number" error={dVihNumber ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="sInvoiceNumber"
                  name="sInvoiceNumber"
                  label="Stone Invoice Number"
                  type="number"
                  fullWidth
                  value={sInvoiceNumber}
                  placeholder="Enter Invoice/bill number"
                  helperText={
                    <ErrorMessage message="Enter Invoice/bill number" error={sInvoiceNumber ? false : true} />
                  }
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={1}>
                <TextField
                  sx={{ m: 0.3 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="sDate"
                  name="sDate"
                  label="Stone Unload Date"
                  type="date"
                  fullWidth
                  value={sDate}
                  placeholder="Select Stone Unload Date"
                  helperText={<ErrorMessage message="Select Stone Unload Date" error={sDate ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions sx={{ px: 3 }}>
        <p style={{ color: 'orangered' }}>{errorMessage}</p>
        <AppButton onClick={onClose}>Cancel</AppButton>
        <AppButton onClick={handleOnConfirm} color="primary" sx={{ mr: 0 }} disabled={formError}>
          Confirm and Save
        </AppButton>
      </DialogActions>
    </Dialog>
  );
};

CreateCoalEntry.propTypes = {
  title: PropTypes.string,
  editStoneItem: PropTypes.object,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateCoalEntry;
