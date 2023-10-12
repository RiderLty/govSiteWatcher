import json
import openpyxl


def read_xlsx_to_array(file_path):
    wb = openpyxl.load_workbook(file_path)
    sheet = wb.active
    data = []
    for row in sheet.iter_rows(values_only=True):
        data.append(row)
    return data

if __name__ == "__main__":
    siteList = read_xlsx_to_array("data.xlsx")
    with open("jsData.json", 'w', encoding="UTF-8") as f:
        f.write(json.dumps(siteList, indent=4, ensure_ascii=False))