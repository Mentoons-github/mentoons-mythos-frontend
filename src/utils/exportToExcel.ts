import { Career } from "../types/redux/careerInterface";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const prepareExcelData = (applications: Career[]) => {
  return applications.map((app, index) => ({
    "S.No": index + 1,
    Name: app.name,
    Email: app.email,
    Phone: app.mobileNumber,
    Gender: app.gender,
    Location: app.cLocation,
    "Job Title": app.position,
    "Applied Date": new Date(app.createdAt ?? "").toLocaleDateString(),
    Resume: app.resume,
  }));
};

export const exportToExcel = (applications: Career[]) => {
  const excelData = prepareExcelData(applications);

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  worksheet["!cols"] = [
    { wch: 5 }, // S.No
    { wch: 20 }, // Name
    { wch: 25 }, // Email
    { wch: 12 }, // Phone
    { wch: 15 }, // Gender
    { wch: 15 }, // Location
    { wch: 15 }, // Job Title
    { wch: 13 }, // Applied Date
    { wch: 25 }, // Resume
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });

  saveAs(data, "job_applications.xlsx");
};
