<%@ language="vbscript" codepage="65001"%>
<!--#include file="./connection.asp" -->

<%
	set Res = server.createObject("adodb.recordset")


	dim Phone, Number, Name, Sex, Department, IDCard, JoinDate, Birthday

	Phone = request.form("Phone")
	Number = request.form("Number")
	Name = request.form("Name")
	Sex = request.form("Sex")
	Department = request.form("Department")
	IDCard = request.form("IDCard")
	JoinDate = request.form("JoinDate")
	Birthday = request.form("Birthday")


	

	Res.Open "Select Number From User Where Number = '"& Number &"'",Conn,3,1
	' Res.Open "Select Number From User Where Number = '182720'",Conn,3,1

	' Response.Write(Res.RecordCount)

	if Res.RecordCount > 0 then
		Response.Write("{""code"":1,""msg"":""the Number "&Number&"have been repeat "&Res.RecordCount&" times"",""times"":"&Res.RecordCount&",""Number"":"""&Number&"""}")
	else
		Conn.Execute "Insert Into User (Phone, Number, Name, Sex, Department, IDCard, JoinDate, Birthday) Values ('"&Phone&"','"&Number&"','"&Name&"','"&Sex&"','"&Department&"','"&IDCard&"','"&JoinDate&"','"&Birthday&"')"
	' Response.Write(Conn.errors.count)
		

		If Conn.errors.count = 0 then 
		
			Response.Write "{""code"":0,""msg"":""baseInfor insert success""}"
		

		end If

	end if



	Res.close
	set Res = nothing
	Conn.close
	set Conn = nothing
%>