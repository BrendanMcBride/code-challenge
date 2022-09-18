import { Card, CircularProgress, Autocomplete, TextField } from "@mui/material";
import { getStarships } from "../Utility/SWAPIService";
import { useQuery } from "@tanstack/react-query";
import BasicTable from "../Components/BasicTable";
import { useMemo, useState } from "react";
import { Box } from "@mui/system";

export const Starships = () => {
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const starships = useQuery(["getStarships"], getStarships);

  const manufacturers = useMemo(() => {
    if ((starships?.data ?? null) == null) {
      return [];
    }

    const tempManufacturers = [];
    starships.data.forEach((starship) => {
      starship.manufacturer.split(",").forEach((starshipManufacturer) => {
        tempManufacturers.push(starshipManufacturer);
      });
    });

    return [...new Set(tempManufacturers)];
  }, [starships.data]);

  if (starships.isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "25px",
      }}
    >
      <Card sx={{ display: "flex", flexDirection: "column" }}>
        <Autocomplete
          id="answer"
          value={selectedManufacturer}
          options={manufacturers}
          autoComplete
          includeInputInList
          onChange={(event, newValue) => {
            setSelectedManufacturer(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Filter Manufacturer"
              variant="standard"
            />
          )}
        />
        <BasicTable
          rows={starships.data}
          manufacturerFilter={selectedManufacturer}
        />
      </Card>
    </Box>
  );
};
