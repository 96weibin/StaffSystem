<%
	set Conn = server.CreateObject("adodb.connection")
	Conn.ConnectionString = "Driver=SQL Server;Server=47.95.8.174\WEIBINDB;UID=dev;PWD=dev;DataBase=Development"
	Conn.Open
	RESPONSE.WRITE(CONN.STATE)
%>