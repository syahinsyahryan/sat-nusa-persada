import { FC } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Box,
  Checkbox,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
} from "@mui/material";
import { TableContentProps } from "@/utils/interface";
import { grey } from "@mui/material/colors";

const StyledTableCell = styled(TableCell)<{ color?: string }>(
  ({ theme, color }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: color || "#eeeeee",
    },
  })
);

export const TableContentHeader: FC<{
  title?: string;
  action?: React.ReactNode;
  alert?: React.ReactNode;
}> = (props) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {props.title && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Typography color="grey.900" fontSize={20}>
            {props.title}
          </Typography>
        </Box>
      )}
      {props.action}
    </Box>
    {props.alert}
  </Box>
);

export const TableContentFooter: FC<{
  onPageChange: (pageNumber: number) => void;
  currentPage: number;
  showLimit: number;
  totalPage: number;
  onChangeLimit: (limit: number) => void;
  totalData?: number;
}> = ({
  onPageChange,
  currentPage,
  showLimit,
  totalPage,
  onChangeLimit,
  totalData,
}) => {
  const pageSize = [2, 5, 10];
  const theme = useTheme();
  const handlePageChange = (e: React.ChangeEvent<unknown>, n: number) => {
    onPageChange(n);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            background: "#F9F9F9",
            borderRadius: "4px",
            padding: "4px 8px",
          }}
        >
          <Typography fontWeight={600}>Menampilkan</Typography>
          {pageSize.map((el) => (
            <Typography
              key={el}
              sx={{
                background: showLimit === el ? "#2eabff" : "none",
                padding: "4px",
                borderRadius: "6px",
                cursor: "pointer",
                minWidth: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              color={showLimit === el ? "#ffffff" : "#697586"}
              onClick={() => {
                onChangeLimit(el);
                onPageChange(1);
              }}
            >
              {el}
            </Typography>
          ))}
          {totalData && (
            <Typography fontWeight={600}> dari {totalData} Data</Typography>
          )}
        </Box>
      </Box>

      <Pagination
        color="primary"
        onChange={handlePageChange}
        page={currentPage}
        count={totalPage}
      />
    </Box>
  );
};

export const TableContent: FC<TableContentProps> = ({
  checkboxes,
  identityKey,
  data,
  actionOptions,
  numberOptions,
  headers,
  showNoDataImage,
  caption,
  icon,
  color,
}) => {
  const isCheckboxes =
    typeof checkboxes?.show === "boolean" && checkboxes?.show;
  const isShowNumber =
    typeof numberOptions?.show === "boolean" && numberOptions?.show;
  const isShowAction =
    typeof actionOptions?.show === "boolean" && actionOptions?.show;

  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            {isShowNumber && (
              <StyledTableCell key="row-number" color={color}>
                <Typography variant="body2">{numberOptions.text}</Typography>
              </StyledTableCell>
            )}
            {isCheckboxes && (
              <StyledTableCell key="row-number" color={color}>
                <Checkbox
                  checked={checkboxes?.selected?.length > 0}
                  onClick={() =>
                    checkboxes.clickAllHandler(data?.map((row) => row.uuid))
                  }
                />
              </StyledTableCell>
            )}
            {headers.map((header) => (
              <StyledTableCell
                key={`${header.text}-${header.text}-${header.sort || ""}`}
                color={color}
                sx={{ cursor: "pointer" }}
              >
                <Typography variant="body2">
                  <Box display="flex" alignItems="center">
                    {header.text}
                  </Box>
                </Typography>
              </StyledTableCell>
            ))}
            {isShowAction && (
              <TableCell key="action" sx={{ bgcolor: "#EEEEEE" }}>
                <Typography variant="body1" textAlign="center">
                  {actionOptions.text}
                </Typography>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        {data.length > 0 ? (
          <TableBody>
            {data.map((row, rowNumber) => (
              <TableRow key={`${row[identityKey]}-${rowNumber}`}>
                {isShowNumber && (
                  <TableCell key={`${numberOptions.text}-${row[identityKey]}`}>
                    {numberOptions.render(row, rowNumber)}
                  </TableCell>
                )}
                {isCheckboxes && (
                  <TableCell key="row-checkbox">
                    <Checkbox
                      checked={checkboxes?.selected?.includes(row?.uuid)}
                      onClick={() => checkboxes.clickHandler(row.uuid)}
                    />
                  </TableCell>
                )}
                {headers.map((header) => (
                  <TableCell
                    key={`${header.text}-${row[identityKey]}`}
                    sx={{ width: "auto" }}
                  >
                    {typeof header.value === "function"
                      ? header.value(row, rowNumber)
                      : row[header.value]}
                  </TableCell>
                ))}

                {isShowAction && (
                  <TableCell key={`${actionOptions.text}-${row[identityKey]}`}>
                    {actionOptions.render(row, rowNumber)}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableRow>
            <TableCell
              colSpan={
                headers.length +
                Number(!!isCheckboxes) +
                Number(!!isShowAction) +
                Number(!!isShowNumber)
              }
              align="center"
            >
              {/* Conditionally render the image */}
              {showNoDataImage ? (
                <>
                  <img
                    src={icon}
                    alt="No Data"
                    style={{
                      width: "160px",
                      height: "160px",
                      marginBottom: "10px",
                    }}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {caption}
                  </Typography>
                </>
              ) : (
                "Data tidak ditemukan!"
              )}
            </TableCell>
          </TableRow>
        )}
      </Table>
    </Box>
  );
};

export const buildNumber = (
  idx: number,
  perPage: number,
  currentPage: number
): number => (currentPage - 1) * perPage + idx + 1;
