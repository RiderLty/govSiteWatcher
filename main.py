import json
import requests
from lxml import etree
from datetime import datetime, date


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


def calcDate(siteInfo, onSuccess: callable = None, onError: callable = None):
    try:
        html = requests.get(siteInfo["url"]).text
        date_string = extract_from_html(html, siteInfo["xpath"])
        date_target = datetime.strptime(date_string, siteInfo["format"])
        days_remain = (date.today() - date_target.date()).days
        daysLeft = siteInfo["limit"] - days_remain
        onSuccess and onSuccess(siteInfo, daysLeft)
        return daysLeft
    except Exception as e:
        onError and onError(siteInfo, e)

if __name__ == "__main__":
    siteList = json.load(open("data.json", 'r', encoding="UTF-8"))
    for siteInfo in siteList:
        print(siteInfo["name"],calcDate(siteInfo))