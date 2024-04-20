import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
  Box,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Typography,
} from "@mui/material";

const useStyles = makeStyles({
  buttonContainer: { textAlign: "center", marginTop: "20px" },
});

const Main = () => {
  const classes = useStyles();
  const [rowCount, setRowCount] = useState("");
  const [colCount, setColCount] = useState("");
  const [tableData, setTableData] = useState([]);
  const [handleError, setHandelError] = useState(false);
  const [checkLength, setCheckLength] = useState(false);

  const handleRowCountChange = (e) => {
    setRowCount(e.target.value);
  };
  const handleColCountChange = (e) => {
    setColCount(e.target.value);
  };

  const handleGenerateTable = () => {
    generateTableData(parseInt(rowCount), parseInt(colCount));
    setCheckLength(true);
  };
  const generateTableData = (rows, cols) => {
    const newData = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        row.push("");
      }
      newData.push(row);
    }
    setTableData(newData);
  };
  const handleInputChange = (e, rowIndex, colIndex) => {
    const newData = [...tableData];
    newData[rowIndex][colIndex] = e.target.value;
    setTableData(newData);
  };
  const checkAndSortRows = () => {
    for (let row of tableData) {
      if (row.some((cell) => cell === "")) {
        setHandelError(true);
        return;
      }
    }
    const newData = [...tableData];
    for (let i = 0; i < newData.length; i++) {
      if (i % 2 === 0) {
        newData[i].sort((a, b) => parseInt(a) - parseInt(b));
      } else {
        newData[i].sort((a, b) => parseInt(b) - parseInt(a));
      }
    }
    setTableData(newData);
  };

  return (
    <Box
      sx={{
        marginY: "60px",
        marginX: "40px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Box
          sx={{ display: "flex", justifyContent: "center", p: 1, m: 4 }}
          dir="rtl"
        >
          <TextField
            label="تعداد سطر"
            variant="outlined"
            type="number"
            value={rowCount}
            dir="rtl"
            onChange={handleRowCountChange}
            sx={{ marginX: "20px", width: "260px" }}
            inputProps={{ min: "0", max: "50", step: "1" }}
          />

          <TextField
            label="تعداد ستون"
            variant="outlined"
            type="number"
            sx={{ marginX: "20px", width: "260px" }}
            inputProps={{ min: "0", max: "20", step: "1" }}
            value={colCount}
            onChange={handleColCountChange}
          />
        </Box>

        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "180px",
            marginX: "850px",
          }}
          onClick={handleGenerateTable}
        >
          ساخت جدول
        </Button>
      </Box>
      {tableData.length > 0 && (
        <>
          <TableContainer
            component={Paper}
            sx={{ border: "1px solid ##dee2e6", marginY: "40px" }}
          >
            <Table sx={{ minWidth: 650, direction: "rtl" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      direction: "rtl",

                      backgroundColor: "#e7c6ff",
                    }}
                  >
                    تعداد سطر ها
                  </TableCell>
                  {Array.from(Array(parseInt(colCount)).keys()).map((col) => (
                    <TableCell
                      key={col}
                      sx={{
                        textAlign: "center",
                        direction: "rtl",

                        backgroundColor: "#e7c6ff",
                      }}
                    >
                      ستون {col + 1}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData?.map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    <TableCell
                      sx={{
                        padding: "20px 8px",
                        textAlign: "center",
                        direction: "rtl",
                      }}
                    >
                      {rowIndex + 1}
                    </TableCell>
                    {row?.map((cell, colIndex) => (
                      <TableCell
                        key={`${rowIndex}-${colIndex}`}
                        sx={{
                          padding: "20px 8px",
                          textAlign: "center",
                          direction: "rtl",
                        }}
                      >
                        <TextField
                          variant="outlined"
                          size="small"
                          type="number"
                          value={cell}
                          onChange={(e) =>
                            handleInputChange(e, rowIndex, colIndex)
                          }
                          inputProps={{
                            style: { textAlign: "center", direction: "rtl" },
                          }}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="success"
              onClick={checkAndSortRows}
            >
              بررسی و مرتب سازی سطرها
            </Button>
          </div>
        </>
      )}
      {handleError && (
        <Alert
          severity="error"
          onClose={() => {
            setHandelError(false);
          }}
          sx={{
            position: "fixed",
            bottom: 20,
            left: 10,
            width: "300px",
          }}
        >
          <Typography
            sx={{
              textAlign: "start",
              marginX: "10px",
              justifyContent: "space-evenly",
              display: "flex",
            }}
          >
            ابتدا تمامی فیلد های داخل جدول را پر کنید.
          </Typography>
        </Alert>
      )}
      {tableData.length === 0 && checkLength && (
        <Alert
          severity="warning"
          onClose={() => {
            setCheckLength(false);
          }}
          sx={{
            position: "fixed",
            bottom: 20,
            left: 10,
            width: "300px",
          }}
        >
          <Typography
            sx={{
              textAlign: "start",
              marginX: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            ابتدا فیلد های سطر و ستون را پر کنید.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default Main;
