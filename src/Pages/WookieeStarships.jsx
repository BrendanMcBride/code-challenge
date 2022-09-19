import { Card, CircularProgress, Autocomplete, TextField } from "@mui/material";
import { getWookieeStarships } from "../Utility/SWAPIService";
import { useQuery } from "@tanstack/react-query";
import WookieeBasicTable from "../Components/WookieeBasicTable";
import { useMemo, useState } from "react";
import { Box } from "@mui/system";

export const WookieeStarships = () => {
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const starships = useQuery(["getWookieeStarships"], getWookieeStarships);

  const manufacturers = useMemo(() => {
    if ((starships?.data ?? null) == null) {
      return [];
    }

    const tempManufacturers = [];
    starships.data.forEach((starship) => {
      starship.scrawhhuwwraoaaohurcworc
        .split(",")
        .forEach((starshipManufacturer) => {
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
              label="Scrawhhuwwraoaaohurcworc"
              variant="standard"
            />
          )}
          sx={{ padding: 2 }}
        />
        <WookieeBasicTable
          rows={starships.data}
          manufacturerFilter={selectedManufacturer}
        />
      </Card>
    </Box>
  );
};
