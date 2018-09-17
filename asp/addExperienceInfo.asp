<%@ language="vbscript" codepage="65001"%>
<!--#include file="./connection.asp" -->

<%
	dim Number, StartDate, EndDate, Description

	Number = request.form("Number")
	StartTime = request.form("StartTime")
	EndTime = request.form("EndTime")
	Description = request.form("Description")

	Conn.Execute "Insert Into P_UserEducationBackground (Number, StartTime, EndTime, Description) values('"&Number&"','"&StartTime&"','"&EndTime&"','"&Description&"')"
	if Conn.errors.count = 0 then 
		response.write("{""code"":0,""msg"":""教育经历添加成功！"",""Number"":"""&Number&"""}")
	else
		response.write(Conn.errors.source)
	end if


	set Conn = nothing
%>