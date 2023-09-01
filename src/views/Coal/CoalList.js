import * as React from 'react';
import { Grid } from '@mui/material';
import { AppButton, AppLink } from '../../components';
import { AppSection } from '../../components/forms';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateCoalEntry from './CreateCoalEntry';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ConfirmDialog from '../../components/dialogs/ConfirmationDialog';
import { AppSnackBarAlert } from '../../components/AppSnackBar';
import { coalList } from './../../store/storeRedux/actions';
import { DataGridTable } from '../../components/DataGridTable';
import Edit from '@mui/icons-material/Edit';

function createData(
  _id,
  cName,
  cQuality,
  cQuantity,
  cWater,
  dName,
  cFare,
  cRate,
  cInvoiceNumber,
  cUnloadAmount,
  cType,
  cDate) {
  return {
    _id,
    cName,
    cQuality,
    cQuantity,
    cWater,
    dName,
    cFare,
    cRate,
    cInvoiceNumber,
    cUnloadAmount,
    cType,
    cDate
  };
}
const CoalList = () => {
  const [showCoalManageDialog, setShowCoalManageDialog] = React.useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [hideConfirmSuccess, setHideConfirmSuccess] = React.useState(false);
  const [deleteCoalItem, setDeleteCoalItem] = React.useState({});
  const [editCoalItem, setEditCoalItem] = React.useState({});
  const [tableRows, setTableRows] = React.useState([]);
  const dispatch = useDispatch();
  let coalListArr = useSelector((state) => state.coalList);
  const dataColumns = [
    {
      name: "Company Name",
      selector: (row, i) => row.cName,
      sortable: true,
      cell: (d) => <span style={{color: d.cType === "Rent" ? 'black' :  d.cType === "Lend" ? 'red' : 'grey'}}>{d.cQuantity} Tons</span>
    },
    // {
    //   name: "Coal Quality",
    //   selector: (row, i) => row.cQuality,
    //   sortable: true,
    //   // cell: (d) => (
    //   //   <a href="https://google.com" target="_blank" className="dlink">
    //   //     {d.director}
    //   //   </a>
    //   // )
    // },
    {
      name: "Coal Quantity",
      selector: (row, i) => row.cQuantity,
      sortable: true,
      cell: (d) => <span>{d.cQuantity} Tons</span>
      // cell: (d) => <span>{d.genres.join(", ")}</span>
    },
    {
      name: "Coal Water",
      selector: (row, i) => row.cWater,
      sortable: true,
      cell: (d) => <span>{d.cWater} Tons</span>
    },
    {
      name: "Driver Name",
      selector: (row, i) => row.dName,
      sortable: true
    },
    {
      name: "Coal Amount",
      selector: (row, i) => row.cRate,
      sortable: true,
      cell: (d) => <span>{d.cRate} Rs</span>
      
    },
    {
      name: "Transport Fare",
      selector: (row, i) => row.cFare,
      sortable: true,
      cell: (d) => <span>{d.cFare} Rs</span>
    },
    {
      name: "Unload Amount",
      selector: (row, i) => row.cUnloadAmount,
      sortable: true,
      cell: (d) => <span>{d.cUnloadAmount} Rs</span>
      
    },
    {
      name: "Invoice Number",
      selector: (row, i) => row.cInvoiceNumber,
      sortable: true
    },
    {
      name: "Coal Type",
      selector: (row, i) => row.cType,
      sortable: true
    },
    {
      name: "Unload Date",
      selector: (row, i) => row.cDate,
      sortable: true
    },
    {
      name: "Action",
      sortable: false,
      selector: "null",
      cell: (d) => [
        <DeleteIcon onClick={() => {setOpenDeleteConfirm(true); setDeleteCoalItem({_id: d._id, cName: d.cName})}} sx={{ cursor: 'pointer' }} />,
        <Edit onClick={() => handleEditCoalItem(d._id, d.cName)} sx={{ cursor: 'pointer' }}/>
      ]
    }
  ];
  const updateCoalList = (coalList) => {
    const coalTableList = [];
    if(coalListArr && coalListArr.length){
      coalListArr.map(cList => {
        coalTableList.push(createData(
          cList._id,
          cList.cName,
          cList.cQuality,
          cList.cQuantity,
          cList.cWater,
          cList.dName,
          cList.cFare,
          cList.cRate,
          cList.cUnloadAmount,
          cList.cInvoiceNumber,
          cList.cType,
          cList.cDate
        ));
      })
      setTableRows(coalTableList)
      console.log(coalTableList)
    }else{
      setTableRows([]);
    }
  }
  useEffect( () => {
    updateCoalList(coalListArr);
  }, [coalListArr])
  const handleCreateEntry = () => {
    setShowCoalManageDialog(true);
  };
  const onClose = () => {
    setShowCoalManageDialog(false);
    setOpenDeleteConfirm(false);
    setDeleteCoalItem({});
    setHideConfirmSuccess(false)
    setEditCoalItem({});
  };
  const onConfirm = () => {
    updateCoalList(coalListArr);
    setShowCoalManageDialog(false);
    setEditCoalItem({});
  };
  const handleDeleteCoalItem = () => {
    console.log(deleteCoalItem._id, deleteCoalItem.cName, deleteCoalItem.index)
    setOpenDeleteConfirm(false);
    setHideConfirmSuccess(true)
    const filteredCoalList = coalListArr.filter(function(cItem) { 
      return cItem._id !== deleteCoalItem._id;
    });
    dispatch(coalList(filteredCoalList));
    setDeleteCoalItem({});
  }
  const handleEditCoalItem = (_id, cName) => {
    const filteredCoalList = coalListArr.filter(function(cItem) { 
      return cItem._id === _id;
    });
    if(filteredCoalList && filteredCoalList.length){
      setEditCoalItem(filteredCoalList[0]); 
      setShowCoalManageDialog(true);
    }
    console.log(filteredCoalList);
  }
  return (
    <Grid container spacing={2}>
      <CreateCoalEntry title={'Add Coal Entry'} editCoalItem={editCoalItem} open={showCoalManageDialog} onClose={onClose} onConfirm={onConfirm} />
      <ConfirmDialog title="Delete Coal Entry" text={<span>Do you want to delete <b>{deleteCoalItem.cName}</b> entry ?</span>} open={openDeleteConfirm} onClose={onClose} onConfirm={handleDeleteCoalItem}/>
      <AppSnackBarAlert
          key="2"
          open={hideConfirmSuccess}
          message={'Coal Entry Deleted Successfully...'}
          severity="success"
          onClose={onClose}
        />
      <Grid item xs={12}>
        <AppSection title="Coal Managment">
          <AppButton startIcon="add" label="Add Coal Entry" color="primary" onClick={handleCreateEntry}/>
          <Box sx={{ width: '100%' }}>
            <DataGridTable data={tableRows} columns={dataColumns} />
            {/* <FormControlLabel
              control={<Switch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            /> */}
          </Box>
        </AppSection>
      </Grid>
    </Grid>
  );
};

export default CoalList;
