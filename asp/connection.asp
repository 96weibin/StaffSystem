<%
	set Conn = server.CreateObject("adodb.connection")
	Conn.ConnectionString = "Driver=SQL Server;Server=10.30.1.99;UID=dev;PWD=dev;DataBase=Development"
	Conn.Open
%>