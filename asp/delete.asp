<%@ language="vbscript" codepage="65001"%>
<!--#include file="./connection.asp" -->

<%
	dim Number
	Number = request.form("Number")


	Conn.execute "delete from User where Number = '"&Number&"'"
	Conn.execute "delete from UserEducationBackground where Number = '"&Number&"'"
	response.write("{""code"":0,""msg"":""删除成功！""}")

	Conn.close
	set Conn = nothing
%>