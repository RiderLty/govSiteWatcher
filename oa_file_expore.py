import requests
import time
import json
import re

def getSession(username,password):
    data = {
        'uid': username,
        'password': password,
        'code': '',
        'sw': 'false',
    }
    session = requests.Session()
    session.headers = {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'DNT': '1',
        'Origin': 'http://59.203.54.120:8080',
        'Referer': 'http://59.203.54.120:8080/oa/login',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
        'X-Requested-With': 'XMLHttpRequest',
    }


    response = session.post(f'http://59.203.54.120:8080/oa/login/loginPost?etc={int(time.time()) * 1000}', data=data, verify=False)
    assert response.json()["desc"] == "操作成功" , "登录失败"
    return session

def listDoc(session):
    docsList = []
    index = 0
    while True:
        data = {
            'startDate': '',
            'endDate': '',
            'receiveStatus': '',
            'docTypeId': '',
            'sendYear': '2023',
            'docNo': '',
            'sendDocNum': '',
            'sendUnitName': '',
            'title': '',
            'isHistory': '0',
            'pageIndex': str(index),
            'pageSize': '30',
            'sortField': '',
            'sortOrder': '',
        }
        index += 1
        response = session.post(
            'http://59.203.54.120:8080/gwcl/document/receiveDocument/getHandledDocsPage?dataFlag=1',
            data=data,
            verify=False,
        )
        result = response.json()
        docsList += result["data"]
        print("listing...",result["pageIndex"], "/",result["pageCount"] - 1)
        if result["pageIndex"] == result["pageCount"] - 1:
            break
    return docsList[::-1]

def getDoc(session,doc):
    print(doc)
    html = session.get(f"http://59.203.54.120:8080/gwcl/document/receiveDocument/receiveForm?receiveDocumentId={doc['receiveDocumentId']}&viewForm=1").text
    
    #还有查看正文
    
    
    pattern = r"caseId:\s+'(\d+)'"
    match = re.search(pattern, html)
    caseId = match.group(1)
    print("caseId",caseId)
    data = {
        'caseType': 'Document',
        'caseId': str(caseId),
    }
    response = session.post(
        f'http://59.203.54.120:8080/gwcl/fileUpload/getUsedFileList?etc={int(time.time()) * 1000}',
        data=data,
        verify=False,
    )
    print(response.json())
    return [doc,response.json(),html]

def getFile(session,fileList):
    fileList



if __name__ == "__main__":
    session = getSession('lintianyue','b4560adfec4a1f6421a6987b9b435eddaa887b5524f26a92471a382debfdea06f584d9668cdf09160cd0660eef72e846c7eb56bf55e0790186ed54a6d6a17d612ae357d44a5fb209dad3a61018890d7fe7b207d61c00af576bd43e87b88228300c57f61cdf34308717c84097b3e3349b4a706ee53de4c0d471e98a59e7da071b')    
    docs = listDoc(session)
    
    [doc,fileList,html] = getDoc(session,docs[0])
    print(fileList)















