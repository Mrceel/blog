---
title: openprxl
date: 2018-08-29 20:06:19
tag: [Python]
category: Python
---
操作Excel文件建议使用openpyxl 兼容office2016
<!-- more -->
打开excel文件，获取工作表
```python
import openpyxl
wb=openpyxl.load_workbook('ttt.xlsx')  #打开excel文件
print(wb.get_sheet_names())  #获取工作簿所有工作表名

sheet=wb.get_sheet_by_name('Sheet1')  #获取工作表
print(sheet.title) 

sheet02=wb.get_active_sheet()  #获取活动的工作表
print(sheet02.title)
```
操作单元格
```python
print(sheet['A1'].value)  #获取单元格A1值
print(sheet['A1'].column)  #获取单元格列值
print(sheet['A1'].row)  #获取单元格行号

print(sheet.cell(row=1,column=1).value)  #获取单元格A1值，column与row依然可用

for i in range(1,4,1):
    print(sheet.cell(row=i,column=1).value) #更加方便实用

print(sheet.max_column)  #获取最大列数
print(sheet.max_row)  #获取最大行数
```
读取excel文件
```python
#读取excel文件 sheetname可为空
def readwb(wbname,sheetname):
    wb=openpyxl.load_workbook(filename=wbname,read_only=True)
    if (sheetname==""):
        ws=wb.active
    else:
        ws=wb[sheetname]
    i=1
    fields=[]
    data=[]
    for row in ws.rows:
        list=[]
        for cell in row:
            aa=str(cell.value)
            if (aa==""):
                aa="1"
            list.append(aa)
        if(i<5):
            pass
        elif (i==5):
            fields=list
        else:
            data.append(list)
        i=i+1
    data.sort(key=lambda x:x[0])
    print (wbname +"-"+sheetname+"- 已成功读取")
    return fields,data
```
新建excel，并写入数据
```python
#新建excel
def creatwb(wbname):  
    wb=openpyxl.Workbook()
    wb.save(filename=wbname)
    print ("新建Excel："+wbname+"成功")

# 写入excel文件中 date 数据， fields 表头
def savetoexcel(data,fields,sheetname,wbname):   
    print("写入excel：")
    wb=openpyxl.load_workbook(filename=wbname)

    sheet=wb.active
    sheet.title=sheetname  

    field=1
    for field in range(1,len(fields)+1):   # 写入表头
        _=sheet.cell(row=1,column=field,value=str(fields[field-1]))

    row1=1
    col1=0
    for row1 in range(2,len(data)+2):  # 写入数据
        for col1 in range(1,len(data[row1-2])+1):
            _=sheet.cell(row=row1,column=col1,value=str(data[row1-2][col1-1]))

    wb.save(filename=wbname)
    print("保存成功")
```