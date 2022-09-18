import { useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ rows, manufacturerFilter }) {
  const filteredShips = useMemo(() => {
    if (!manufacturerFilter) {
      return rows;
    }
    return rows.filter((row) => {
      return row.manufacturer
        .toLowerCase()
        .includes(manufacturerFilter.toLowerCase());
    });
  }, [rows, manufacturerFilter]);

  return (
    <TableContainer
      sx={{ width: { xs: "100%", md: "1000px" } }}
      component={Paper}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Names</strong>
            </TableCell>
            <TableCell>
              <strong>Manufacturer</strong>
            </TableCell>
            <TableCell>
              <strong>Class</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredShips.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.manufacturer}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.starship_class}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
