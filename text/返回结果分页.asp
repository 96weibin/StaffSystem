
<%@ language="vbscript" codepage="65001"%>
<%


set Conn = server.createObject("adodb.connection")
set Rs = server.createObject("adodb.recordSet")

Conn.ConnectionString = "driver={sql server}; server=10.30.1.99;uid=dev;pwd=dev;dataBase=Development"

Conn.Open

dim page, allPage

page = request.Form("page")

Rs.open "SELECT   TOP (200) Phone, Number, Name, Sex, Department, IDCard, JoinDate, Birthday FROM P_User", Conn, 1, 3

 
If Not (Rs.Bof and Rs.Eof) Then
	Rs.PageSize = 5
	allPage = Rs.pageCount

	' response.write RS.RecordCount
	' response.write page
	Rs.Absolutepage = page

	count = 1
	RequireJsonStr = "{""code"":0,""data"":{"
	do while not (Rs.Bof or Rs.Eof)
		RequireJsonStr = RequireJsonStr & """"&count&""":{""Phone"":"""&Rs("Phone")&""",""Number"":"""& Rs("Number") &""",""Name"":"""&Rs("Name")&""",""Sex"":"""& Rs("Sex") &""",""Department"":"""& Rs("Department") &""",""IDCard"":"""&Rs("IDCard")& """,""JoinDate"":"""&Rs("JoinDate")&""",""Birthday"":"""&Rs("Birthday")&"""},"
		count = count + 1
		Rs.movenext
	loop
	' response.write(len(RequireJsonStr))
	RequireJsonStr = left(RequireJsonStr,len(RequireJsonStr) - 1)
	response.write RequireJsonStr &"},""count"":"&count-1&"}"

	Rs.Close
	set Rs = Nothing

Else
	response.write("无数据")
End If

	



Conn.close
set Conn = nothing

%>