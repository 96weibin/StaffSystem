<%@ language="vbscript" codepage="65001"%>
<!--#include file="./connection.asp" -->

<%
	'链接数据库'
	set Res = server.createObject("adodb.recordSet")

	dim Status, Value, RequireJsonStr, count
	Status = request.form("Status")

	'如果 post来请求  status为1 则返回200条user表里的数据的 api
	if Cint(Status) = 1 then
		Res.Open "SELECT   TOP (200) Phone, Number, Name, Sex, Department, IDCard, JoinDate, Birthday FROM P_User", Conn
		count = 1
		RequireJsonStr = "{""code"":0,""data"":{"
		do while not (Res.Bof or Res.Eof)
			RequireJsonStr = RequireJsonStr & """"&count&""":{""Phone"":"""&Res("Phone")&""",""Number"":"""& Res("Number") &""",""Name"":"""&Res("Name")&""",""Sex"":"""& Res("Sex") &""",""Department"":"""& Res("Department") &""",""IDCard"":"""&Res("IDCard")& """,""JoinDate"":"""&Res("JoinDate")&""",""Birthday"":"""&Res("Birthday")&"""},"
			count = count + 1
			Res.movenext
		loop
		' response.write(len(RequireJsonStr))
		RequireJsonStr = left(RequireJsonStr,len(RequireJsonStr) - 1)
		response.write RequireJsonStr &"},""count"":"&count-1&"}"
		Res.Close
		set Res = Nothing
	end if

	'根据Number 值在P_User里查找 工号对应的
	if Cint(Status) = 2 then
		Value = request.form("Value")
		Res.Open "SELECT Phone, Number, Name, Sex, Department, IDCard, JoinDate, Birthday FROM P_User WHERE ( Number like '%"& Value &"%')", Conn
		if not (Res.Eof or Res.Bof) then

			count = 1
			RequireJsonStr = "{""code"":0,""data"":{"
			do while not (Res.Bof or Res.Eof)
				RequireJsonStr = RequireJsonStr & """"&count&""":{""Phone"":"""&Res("Phone")&""",""Number"":"""& Res("Number") &""",""Name"":"""&Res("Name")&""",""Sex"":"""& Res("Sex") &""",""Department"":"""& Res("Department") &""",""IDCard"":"""&Res("IDCard")& """,""JoinDate"":"""&Res("JoinDate")&""",""Birthday"":"""&Res("Birthday")&"""},"
				count = count + 1
				Res.movenext
			loop
			' response.write(len(RequireJsonStr))
			RequireJsonStr = left(RequireJsonStr,len(RequireJsonStr) - 1)
			response.write RequireJsonStr &"},""count"":"&count-1&"}"
		else
			response.write("{""code"":1,""count"":""0"",""msg"":""no such Value!""}")
		end if

		Res.Close
		set Res = Nothing
	end if

	'输入汉字 在P_User 进行 模糊搜索 名字相关的
	if Cint(Status) = 3 then
		Value = request.form("Value")
		Res.Open "SELECT Phone, Number, Name, Sex, Department, IDCard, JoinDate, Birthday FROM P_User WHERE ( Name like '%"& Value &"%')", Conn
		if not( Res.Eof or Res.Bof) then

			count = 1
			RequireJsonStr = "{""code"":0,""data"":{"
			do while not (Res.Bof or Res.Eof)
				RequireJsonStr = RequireJsonStr & """"&count&""":{""Phone"":"""&Res("Phone")&""",""Number"":"""& Res("Number") &""",""Name"":"""&Res("Name")&""",""Sex"":"""& Res("Sex") &""",""Department"":"""& Res("Department") &""",""IDCard"":"""&Res("IDCard")& """,""JoinDate"":"""&Res("JoinDate")&""",""Birthday"":"""&Res("Birthday")&"""},"
				count = count + 1
				Res.movenext
			loop
			' response.write(len(RequireJsonStr))
			RequireJsonStr = left(RequireJsonStr,len(RequireJsonStr) - 1)
			response.write RequireJsonStr &"},""count"":"&count - 1&"}"
		else
			response.write("{""code"":1,""count"":""0"",""msg"":""no such Value!""}")
		end if
		Res.Close
		set Res = Nothing
	end if

	'向P_UserEducationBackground添加数据
	if Cint(Status) = 4 then
		Value = request.form("Value")
		Res.Open "SELECT Number, StartTime, EndTime, Description FROM P_UserEducationBackground WHERE ( Number = '"& Value &"')", Conn
		if not( Res.Eof or Res.Bof) then
			count = 1
			RequireJsonStr = "{""code"":0,""data"":{ "
			do while not(Res.Bof or Res.Eof) 
				RequireJsonStr = RequireJsonStr & """"&count&""":{""Number"":"""&Res("Number")&""",""StartTime"":"""& Res("StartTime") &""",""EndTime"":"""&Res("EndTime")&""",""Description"":"""& Res("Description") &"""},"
				count = count + 1
				Res.movenext
			loop
			RequireJsonStr = left(RequireJsonStr,len(RequireJsonStr) - 1)
			response.write RequireJsonStr &"},""count"":"&count - 1&"}"
		end if
		Res.Close
		set Res = Nothing
	end if



	' response.write "{""code"":0,""msg"":{""name"":""weibin"",""age"":12}}"



	Conn.Close
	set Conn = Nothing
%>