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
import { coalList } from './../../store/storeRedux/actions';

/**
 * Shows modal "Change email" dialog
 * @param {string} props.email - data object
 * @param {function} props.onConfirm - event for Save/Confirm button
 * @param {function} props.onClose - event for Close and Cancel buttons and the backdrop
 */
const CreateCoalEntry = ({ open = false, title, onConfirm, onClose, editCoalItem, ...props }) => {
  const [cName, setCName] = useState('');
  const [cQuality, setCQuality] = useState('');
  const [cWater, setCWater] = useState('');
  const [cQuantity, setCQuantity] = useState('');
  const [dName, setDName] = useState('');
  const [dNumber, setDNumber] = useState('');
  const [dVihNumber, setDVihNumber] = useState('');
  const [cFare, setCFare] = useState('');
  const [cRate, setCRate] = useState('');
  const [cDate, setCDate] = useState('');
  const [cInvoiceNumber, setCInvoiceNumber] = useState('');
  const [cUnloadAmount, setCUnloadAmount] = useState('');
  const [cType, setCType] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [formError, setFormError] = useState(true);
  const paperMinWidth = useDialogMinWidth('xl');
  const dispatch = useDispatch();
  let coalListArr = useSelector((state) => state.coalList);
  const isEdit = editCoalItem && editCoalItem._id ? true : false;
  useEffect(() => {
    setCName(editCoalItem.cName || '');
    setCQuality(editCoalItem.cQuality || '');
    setCWater(editCoalItem.cWater || '');
    setCQuantity(editCoalItem.cQuantity || '');
    setDName(editCoalItem.dName || '');
    setDNumber(editCoalItem.dNumber || '');
    setDVihNumber(editCoalItem.dVihNumber || '');
    setCFare(editCoalItem.cFare || '');
    setCRate(editCoalItem.cRate || '');
    setCDate(editCoalItem.cDate || '');
    setCInvoiceNumber(editCoalItem.cInvoiceNumber || '');
    setCUnloadAmount(editCoalItem.cUnloadAmount || '');
    setCType(editCoalItem.cType || '');
    if(isEdit){
      setFormError(false);
    }
  }, [editCoalItem, isEdit])
  const handleInputChange = useCallback((event) => {
    switch (event.target.name) {
      case 'cName':
        setCName(event.target.value);
        break;
      case 'cQuality':
        setCQuality(event.target.value);
        break;
      case 'cWater':
        setCWater(event.target.value);
        break;
      case 'cQuantity':
        setCQuantity(event.target.value);
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
      case 'cFare':
        setCFare(event.target.value);
        break;
      case 'cRate':
        setCRate(event.target.value);
        break;
      case 'cDate':
        setCDate(event.target.value);
        break;
      case 'cInvoiceNumber':
        setCInvoiceNumber(event.target.value);
        break;
      case 'cUnloadAmount':
        setCUnloadAmount(event.target.value);
        break;
      case 'cType':
        setCType(event.target.value);
        break;
      default:
        break;
    }
    setErrorMessage('');
  }, []);
  useEffect(() => {
    if (
      cName &&
      cQuality &&
      cWater &&
      cQuantity &&
      dName &&
      dNumber &&
      dVihNumber &&
      cFare &&
      cRate &&
      cDate &&
      cInvoiceNumber &&
      cUnloadAmount &&
      cType
    ) {
      setFormError(false);
    } else {
      setFormError(true);
    }
  }, [
    cName,
    cQuality,
    cWater,
    cQuantity,
    dName,
    dNumber,
    dVihNumber,
    cFare,
    cRate,
    cDate,
    cInvoiceNumber,
    errorMessage,
    formError,
    cUnloadAmount,
    cType
  ]);

  const handleOnConfirm = async () => {
    // if(!cName) { setErrorMessage("Enter coal company name"); return; }
    // if(!cQuality) { setErrorMessage("Select coal quality"); return; }
    // if(!cWater) { setErrorMessage("Enter water quantity in coal"); return; }
    // if(!cQuantity) { setErrorMessage("Enter coal quantity"); return; }
    // if(!dNumber) { setErrorMessage("Enter driver number"); return; }
    // if(!dVihNumber) { setErrorMessage("Enter driven vahicle number"); return; }
    // if(!cFare) { setErrorMessage("Enter coal fare"); return; }
    // if(!cRate) { setErrorMessage("Enter coal amount"); return; }
    // if(!cDate) { setErrorMessage("Enter unload data"); return; }
    // if(!cInvoiceNumber) { setErrorMessage("Enter invoice number"); return; }
    // if(!dName) { setErrorMessage("Enter driver name"); return; }
    setErrorMessage('');
    const coalListInitial = coalListArr && coalListArr.length ? coalListArr : [];
    const coalObj = {
      _id: isEdit ? editCoalItem._id : uuid(),
      cName,
      cQuality,
      cWater,
      cQuantity,
      dName,
      dNumber,
      dVihNumber,
      cRate,
      cFare,
      cDate,
      cInvoiceNumber,
      cUnloadAmount,
      cType,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    if(isEdit){
      const updatedCoalList = await coalListInitial.map(function(cItem) {
        if(cItem._id === editCoalItem._id){
          return coalObj;
        }
        return cItem
      });
      setFormError(true);
      await dispatch(coalList(updatedCoalList));
    }else{
      coalListInitial.push(coalObj);
      setFormError(true);
      await dispatch(coalList(coalListInitial));
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
        {isEdit ? "Edit " + editCoalItem.cName + " Record" : title || 'Add Coal Entry'}
      </AppDialogTitle>
      <DialogContent sx={{ py: 1 }}>
        <FormGroup>
          <FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cName"
                  name="cName"
                  label="Company Name"
                  type="text"
                  fullWidth
                  value={cName}
                  placeholder="Enter Coal Comany Name"
                  helperText={<ErrorMessage message="Enter Coal Comany Name" error={cName ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cQuantity"
                  name="cQuantity"
                  label="Coal Quantity(In Tons)"
                  type="number"
                  fullWidth
                  value={cQuantity}
                  placeholder="Enter Coal Quantity. Eg 35.50"
                  helperText={<ErrorMessage message="Enter Coal Quantity. Eg 35.50" error={cQuantity ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cQuality"
                  name="cQuality"
                  label="Coal Quality"
                  type="select"
                  select
                  fullWidth
                  value={cQuality}
                  placeholder="Select Coal Quality"
                  helperText={<ErrorMessage message="Select Coal Quality" error={cQuality ? false : true} />}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Excellent">Excellent</MenuItem>
                  <MenuItem value="Good">Good(Minor Dust)</MenuItem>
                  <MenuItem value="Average">Average(Medium Dust)</MenuItem>
                  <MenuItem value="Bad">Bad(High Dust)</MenuItem>
                  <MenuItem value="Worst">Worst(Full Dust)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cWater"
                  name="cWater"
                  label="Coal Water Quantity(In Tons)"
                  type="number"
                  fullWidth
                  value={cWater}
                  placeholder="Enter Coal Water Quantity. Eg 2"
                  helperText={<ErrorMessage message="Enter Coal Water Quantity. Eg 2" error={cWater ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
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
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
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
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cRate"
                  name="cRate"
                  label="Coal Amount in RS"
                  type="number"
                  fullWidth
                  value={cRate}
                  placeholder="Enter Coal Amount in Rupees. Eg 555,5000"
                  helperText={<ErrorMessage message="Enter Coal Amount in Rupees. Eg 555,5000" error={cRate ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cFare"
                  name="cFare"
                  label="Coal Vichle Face"
                  type="number"
                  fullWidth
                  value={cFare}
                  placeholder="Enter Coal Fare/Kiraya. Eg 55000"
                  helperText={<ErrorMessage message="Enter Coal Fare/Kiraya. Eg 55000" error={cFare ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
              <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cUnloadAmount"
                  name="cUnloadAmount"
                  label="Enter Unload Amount"
                  type="number"
                  fullWidth
                  value={cUnloadAmount}
                  placeholder="Enter Unload Amount"
                  helperText={<ErrorMessage message="Enter Unload Amount. Eg 700" error={cUnloadAmount ? false : true} />}
                  onChange={handleInputChange}
                />
                </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
              <TextField
                  sx={{ m: 0.2 }}
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
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cInvoiceNumber"
                  name="cInvoiceNumber"
                  label="Coal Invoice Number"
                  type="number"
                  fullWidth
                  value={cInvoiceNumber}
                  placeholder="Enter Invoice/bill number"
                  helperText={
                    <ErrorMessage message="Enter Invoice/bill number" error={cInvoiceNumber ? false : true} />
                  }
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cDate"
                  name="cDate"
                  label="Coal Unload Date"
                  type="date"
                  fullWidth
                  value={cDate}
                  placeholder="Select Coal Unload Date"
                  helperText={<ErrorMessage message="Select Coal Unload Date" error={cDate ? false : true} />}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </FormControl>
          <FormControl>
            <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} p={0.3}>
                <TextField
                  sx={{ m: 0.2 }}
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="cType"
                  name="cType"
                  label="Coal Type"
                  type="number"
                  fullWidth
                  value={cType}
                  placeholder="Select Coal Type"
                  helperText={
                    <ErrorMessage message="Coal Type Purchase/Rent/Lend" error={cType ? false : true} />
                  }
                  select
                  onChange={handleInputChange}
                >
                  <MenuItem value="Purchase">Purchase</MenuItem>
                  <MenuItem value="Lend">Lend</MenuItem>
                  <MenuItem value="Rent">Rent</MenuItem>
                </TextField>
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
  editCoalItem: PropTypes.object,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateCoalEntry;
