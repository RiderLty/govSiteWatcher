import json
import time
import requests
from lxml import etree
from datetime import datetime, date
from cacheout import Cache
import openpyxl


def read_xlsx_to_array(file_path):
    wb = openpyxl.load_workbook(file_path)
    sheet = wb.active
    data = []
    for row in sheet.iter_rows(values_only=True):
        data.append(row)
    return data


def colorPrint(color):
    def inner(text):
        colors = {
            'black': '\033[30m',
            'red': '\033[31m',
            'green': '\033[32m',
            'yellow': '\033[33m',
            'blue': '\033[34m',
            'magenta': '\033[35m',
            'cyan': '\033[36m',
            'white': '\033[37m'
        }
        if color not in colors:
            raise ValueError(
                "Invalid color. Please choose one of the following: 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'")
        colored_text = colors[color] + text + '\033[0m'
        print(colored_text)
    return inner


def extract_from_html(html, xpath):
    try:
        tree = etree.HTML(html)
        result = tree.xpath(xpath)
        if result:
            return result[0]
        else:
            return None
    except Exception as e:
        print(f"Error occurred: {e}")
        return None


@Cache(maxsize=256, ttl=0, timer=time.time, default=None).memoize()
def cacheGet(url):
    return requests.get(url).text


def calcDate(siteInfo, onSuccess: callable = None, onError: callable = None):
    try:
        html = cacheGet(siteInfo[1])
        date_string = extract_from_html(html, siteInfo[2])
        date_target = datetime.strptime(date_string, siteInfo[3])
        # print("date_string",date_string,"date_target",date_target)
        days_remain = (date.today() - date_target.date()).days
        daysLeft = siteInfo[4] - days_remain
        onSuccess and onSuccess(siteInfo, daysLeft)
        return daysLeft
    except Exception as e:
        onError and onError(siteInfo, e)


if __name__ == "__main__":
    siteList = read_xlsx_to_array("data.xlsx")
    # with open("jsData.json", 'w', encoding="UTF-8") as f:
    #     f.write(json.dumps(siteList, indent=4, ensure_ascii=False))

    for siteInfo in siteList[2:-1]:
        rest = calcDate(siteInfo)
        text = f"{siteInfo[0]}\t{calcDate(siteInfo)}\t{siteInfo[1]}"
        if rest < 1:
            colorPrint("red")(text)
        else:
            print(text)
