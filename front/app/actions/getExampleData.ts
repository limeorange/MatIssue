import path from "path";
import fs from "fs/promises";

export const getExampleData = async () => {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data.example;
};

export const getExampleListingData = async () => {
  const filePath = path.join(process.cwd(), "data", "data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData.toString());
  return data.items;
};

//데이터 fetch해오는 함수
