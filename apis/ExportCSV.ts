const handleExportCSV = () => {
  const input = document.getElementById("export-table");

  if (!input) {
    console.error('Element with id "export-table" not found');
    return;
  }

  const rows = input.querySelectorAll("tr");
  let csvContent = "data:text/csv;charset=utf-8,";

  rows.forEach((row) => {
    const rowData: string[] = [];
    row.querySelectorAll("td").forEach((cell) => {
      rowData.push(cell.textContent || "");
    });
    csvContent += rowData.join(",") + "\n";
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "table.csv");
  document.body.appendChild(link);
  link.click();
};

export default handleExportCSV;
