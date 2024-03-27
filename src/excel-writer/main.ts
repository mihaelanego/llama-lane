import * as Excel from "exceljs";
import fs from "fs";
import { Font } from "exceljs";
import { AddressInfo } from "../extractor/prompt";

type Results = {
  [domain: string]: AddressInfo[];
};

function applyStyleEmptyRow(row: Excel.Row, worksheet: Excel.Worksheet) {
  worksheet.mergeCells(`B${row.number}:G${row.number}`);

  const cellA = row.getCell("A");
  const cellB = row.getCell("B");

  cellB.value = "Missing address information.";

  cellA.style = {
    font: {
      name: "Aptos Narrow",
      bold: false,
      size: 11,
    } as Font,
    alignment: { vertical: "middle", horizontal: "center", wrapText: true },
  };

  cellB.style = {
    font: {
      name: "Aptos Narrow",
      bold: false,
      italic: true,
      size: 11,
      color: { argb: "ff7f7f7f" },
    } as Font,
    alignment: { vertical: "middle", horizontal: "center", wrapText: true },
  };
}

function applyStyleRow(row: Excel.Row) {
  row.eachCell((cell) => {
    cell.style = {
      font: {
        name: "Aptos Narrow",
        bold: false,
        size: 11,
      } as Font,
      alignment: { vertical: "middle", horizontal: "center", wrapText: true },
    };
  });
}

async function main() {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet("Address");

  worksheet.columns = [
    { header: "Domain", key: "domain", width: 40 },
    { header: "Street", key: "street", width: 40 },
    { header: "Street Number", key: "streetNumber", width: 20 },
    { header: "City", key: "city", width: 20 },
    { header: "Region", key: "region", width: 20 },
    { header: "Zip Code", key: "zipCode", width: 20 },
    { header: "Country", key: "country", width: 20 },
  ];

  worksheet.views = [{ state: "frozen", xSplit: 1, ySplit: 1 }];

  const headerCells = ["A1", "B1", "C1", "D1", "E1", "F1", "G1"];

  for (let cell of headerCells) {
    worksheet.getCell(cell).style = {
      font: {
        name: "Aptos Display",
        bold: true,
        size: 12,
      } as Font,
      alignment: { vertical: "middle", horizontal: "center", wrapText: true },
      fill: {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "fff2f2f2" },
      },
      border: { bottom: { style: "medium", color: { argb: "ff008000" } } },
    };
  }

  const data: Results = JSON.parse(
    fs.readFileSync("./data/results.json", "utf-8")
  );

  for (const domain in data) {
    if (data[domain].length === 0) {
      applyStyleEmptyRow(worksheet.addRow({ domain }), worksheet);
      continue;
    }

    for (const address of data[domain]) {
      applyStyleRow(
        worksheet.addRow({
          domain,
          street: address.street ?? "-",
          streetNumber: address.streetNumber ?? "-",
          city: address.city ?? "-",
          region: address.region ?? "-",
          zipCode: address.postalCode ?? "-",
          country: address.country ?? "-",
        })
      );
    }

    if (data[domain].length > 1) {
      worksheet.mergeCells(
        `A${worksheet.rowCount - data[domain].length + 1}:A${worksheet.rowCount}`
      );
    }
  }

  await workbook.xlsx.writeFile("./data/results.xlsx");
}

main();
