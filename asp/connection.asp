<%
	'链接数据库  这样是不是会暴露我的数据库 的密码 密码  老哥 请对我下手轻点
	set Conn = server.CreateObject("adodb.connection")
	Conn.ConnectionString = "Driver=SQL Server;Server=iZ2ze2ezw3wajpZ\WEIBINSERVER;UID=dev;PWD=dev;DataBase=dev"
	Conn.Open
%>