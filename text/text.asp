<%@ language="vbscript" codepage="65001"%>

<%
	dim UserName, PassWord

	UserName = request.form("UserName")
	PassWord = request.form("PassWord")


	' UserName = request.queryString("UserName")
	' PassWord = request.queryString("PassWord")


	' UserName = "赵魏斌"
	' PassWord = "98746512"


	response.write("用户名:" & UserName &"密码:"& PassWord )

	' response.write(request.form)

%>