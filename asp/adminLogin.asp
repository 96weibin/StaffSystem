<%@ language="vbscript" codepage="65001"%>
<!--#include file="./connection.asp" -->

<%
	set Res = server.createObject("adodb.recordSet")
	' response.write(Conn.state)
	'获取账号密码'
	dim UserName, PassWord, msg
	UserName = request.form("UserName")
	PassWord = request.form("PassWord")
	' msg = "你最帅"
	' response.write("{ ""用户名"" : """ & UserName  & """,  ""密码"":""" & PassWord &  """}")
	' response.write(response.contentType)
	Res.open "SELECT * from Staff_User where (UserName = '" & UserName & "')and (PassWord = '"&PassWord&"')",Conn
	' response.write(Res)
	if not (Res.eof and Res.bof) then 
		response.write("{ ""code"" : 0,  ""msg"":""账号密码匹配成功"",""data"":{""UserName"":"" "&UserName&"  ""}}")
	else
		response.write("{""code"" : 1, ""msg"" : ""账号密码不匹配""}")
	end if
	Res.close
	set Res = nothing
	Conn.close
	set Conn = nothing
%>