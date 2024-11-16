import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import  Button  from '@mui/material/Button';
import { TextField, Typography } from '@mui/material';
import Navbar from './Navbar';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
 

const CourseList = () => {
    const [COURSE, setName] = useState('');
    const [TITLE, setAge] = useState('');
   
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://localhost:7162/api/Course/CourseDetails');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

    const Add = async(event) => {

        event.preventDefault(); 
       
    
        try {
            const response = await fetch('https://localhost:7162/api/Course/CourseList', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ title:COURSE, description:TITLE,Id:0}),
            });
        
            if (response.ok) {
              const data = await response.json();             
              console.log('Registration successful'); 
              alert(data.message);             
            }          
             
          } catch (error) {
            console.error('Registration error:', error);     
          }
   
       }
  return (
    <div>
        <div>
         <Navbar/>
         </div>
        <div>
       
        <div style={{ marginTop: '4rem' }}>
        <Typography position="center"  variant="h5" height="80px">
          ADD COURSE
          </Typography>
      <TableContainer component={Paper}>
    <TableRow>
        <TableCell>
        <TextField id="outlined-basic" label="ENTER COURSE" variant="outlined" value={COURSE} onChange={(e)=>setName(e.target.value)}/>

        </TableCell>
        <TableCell>
        <TextField id="outlined-basic" label="ENTER TITLE" variant="outlined" value={TITLE} onChange={(e)=>setAge(e.target.value)}/>

        </TableCell>
        <TableCell>
        <Button variant="contained" color="primary" onClick={Add}>Add</Button>

        </TableCell>
    </TableRow>
        </TableContainer>    
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">COURSE</StyledTableCell>
            <StyledTableCell align="right">DESCRIPTION</StyledTableCell>
          
          </TableRow>
        </TableHead>
                  <TableBody>
                      {
                          data && data.length > 0 ?
                              data.map((item, index) => {
                                  return (
                                      <StyledTableRow key={index}>
                                         <StyledTableCell align="right">{item.id}</StyledTableCell>
                                          <StyledTableCell align="right">{item.title}</StyledTableCell>
                                          <StyledTableCell align="right">{item.description}</StyledTableCell>
                                         
                                          <Stack direction="row" spacing={5}>
                                        
                                          </Stack>
                                      </StyledTableRow>
                                  )
                              })
                              :
                              'loading...'
                      }
                  </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </div>
  )
}

export default CourseList

