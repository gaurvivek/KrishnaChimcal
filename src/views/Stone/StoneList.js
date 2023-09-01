import * as React from 'react';
import { Grid } from '@mui/material';
import { AppButton, AppLink } from '../../components';
import { AppSection } from '../../components/forms';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateCoalEntry from './CreateStoneEntry';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ConfirmDialog from '../../components/dialogs/ConfirmationDialog';
import { AppSnackBarAlert } from '../../components/AppSnackBar';
import { stoneList } from '../../store/storeRedux/actions';
import { DataGridTable } from '../../components/DataGridTable';
import Edit from '@mui/icons-material/Edit';

function createData(
  _id,
  sName,
  sQuality,
  sQuantity,
  sChaat,
  dName,
  sFare,
  sRate,
  sInvoiceNumber,
  sDate) {
  return {
    _id,
    sName,
    sQuality,
    sQuantity,
    sChaat,
    dName,
    sFare,
    sRate,
    sInvoiceNumber,
    sDate
  };
}
const StoneListManage = () => {
  const [showStoneManageDialog, setShowStoneManageDialog] = React.useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = React.useState(false);
  const [hideConfirmSuccess, setHideConfirmSuccess] = React.useState(false);
  const [deleteStoneItem, setDeleteStoneItem] = React.useState({});
  const [editStoneItem, setEditStoneItem] = React.useState({});
  const [tableRows, setTableRows] = React.useState([]);
  const dispatch = useDispatch();
  let stoneListArr = useSelector((state) => state.stoneList);
  const dataColumns = [
    {
      name: "Company Name",
      selector: (row, i) => row.sName,
      sortable: true
    },
    {
      name: "Stone Quality",
      selector: (row, i) => row.sQuality,
      sortable: true,
      // cell: (d) => (
      //   <a href="https://google.com" target="_blank" className="dlink">
      //     {d.director}
      //   </a>
      // )
    },
    {
      name: "Stone Quantity(Tons)",
      selector: (row, i) => row.sQuantity,
      sortable: true,
      cell: (d) => <span>{d.sQuantity} Tons</span>
      // cell: (d) => <span>{d.genres.join(", ")}</span>
    },
    {
      name: "Stone Chaat(Tons)",
      selector: (row, i) => row.sChaat,
      sortable: true,
      cell: (d) => <span>{d.sChaat} Tons</span>
    },
    {
      name: "Driver Name",
      selector: (row, i) => row.dName,
      sortable: true
    },
    {
      name: "Transport Fare",
      selector: (row, i) => row.sFare,
      sortable: true
    },
    {
      name: "Stone Amount",
      selector: (row, i) => row.sRate,
      sortable: true
    },
    {
      name: "Invoice Number",
      selector: (row, i) => row.sInvoiceNumber,
      sortable: true
    },
    {
      name: "Unload Date",
      selector: (row, i) => row.sDate,
      sortable: true
    },
    {
      name: "Action",
      sortable: false,
      selector: "null",
      cell: (d) => [
        <DeleteIcon onClick={() => {setOpenDeleteConfirm(true); setDeleteStoneItem({_id: d._id, sName: d.sName})}} sx={{ cursor: 'pointer' }} />,
        <Edit onClick={() => handleEditStoneItem(d._id, d.sName)} sx={{ cursor: 'pointer' }}/>
      ]
    }
  ];
  const updateStoneList = (stoneList) => {
    const stoneTableList = [];
    if(stoneListArr && stoneListArr.length){
      stoneListArr.map(cList => {
        stoneTableList.push(createData(
          cList._id,
          cList.sName,
          cList.sQuality,
          cList.sQuantity,
          cList.sChaat,
          cList.dName,
          cList.sFare,
          cList.sRate,
          cList.sInvoiceNumber,
          cList.sDate
        ));
      })
      setTableRows(stoneTableList)
      console.log(stoneTableList)
    }else{
      setTableRows([]);
    }
  }
  useEffect( () => {
    updateStoneList(stoneListArr);
  }, [stoneListArr])
  const handleCreateEntry = () => {
    setShowStoneManageDialog(true);
  };
  const onClose = () => {
    setShowStoneManageDialog(false);
    setOpenDeleteConfirm(false);
    setDeleteStoneItem({});
    setHideConfirmSuccess(false)
    setEditStoneItem({});
  };
  const onConfirm = () => {
    updateStoneList(stoneListArr);
    setShowStoneManageDialog(false);
    setEditStoneItem({});
  };
  const handleDeleteStoneItem = () => {
    console.log(deleteStoneItem._id, deleteStoneItem.sName, deleteStoneItem.index)
    setOpenDeleteConfirm(false);
    setHideConfirmSuccess(true)
    const filteredStoneList = stoneListArr.filter(function(cItem) { 
      return cItem._id !== deleteStoneItem._id;
    });
    dispatch(stoneList(filteredStoneList));
    setDeleteStoneItem({});
  }
  const handleEditStoneItem = (_id, sName) => {
    const filteredStoneList = stoneListArr.filter(function(cItem) { 
      return cItem._id === _id;
    });
    if(filteredStoneList && filteredStoneList.length){
      setEditStoneItem(filteredStoneList[0]); 
      setShowStoneManageDialog(true);
    }
    console.log(filteredStoneList);
  }
  return (
    <Grid container spacing={2}>
      <CreateCoalEntry title={'Add Stone Entry'} editStoneItem={editStoneItem} open={showStoneManageDialog} onClose={onClose} onConfirm={onConfirm} />
      <ConfirmDialog title="Delete Stone Entry" text={<span>Do you want to delete <b>{deleteStoneItem.sName}</b> entry ?</span>} open={openDeleteConfirm} onClose={onClose} onConfirm={handleDeleteStoneItem}/>
      <AppSnackBarAlert
          key="2"
          open={hideConfirmSuccess}
          message={'Stone Entry Deleted Successfully...'}
          severity="success"
          onClose={onClose}
        />
      <Grid item xs={12}>
        <AppSection title="Stone Managment">
          <AppButton startIcon="add" label="Add Stone Entry" color="primary" onClick={handleCreateEntry}/>
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

export default StoneListManage;
