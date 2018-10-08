"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

window.onload = function () {
  init(); //世界真美好

  var loginUsernameInput = document.getElementsByClassName('adminName')[0];
  var loginPasswordInput = document.getElementsByClassName('adminPass')[0];
  var loginButton = document.getElementsByClassName('adminLogin')[0];
  var loginBox = document.getElementsByClassName('adminLoginBox')[0];
  var userInfo = document.getElementsByClassName("userName")[0];
  var userIcon = document.getElementsByClassName("userIcon")[0];
  var addBtn = document.getElementsByClassName("addBtn")[0];
  var lookInfoBtn = document.getElementsByClassName("lookInfoBtn")[0];
  var section = document.getElementsByTagName("section")[0];
  var addStaffModal = document.getElementsByClassName("addStaffModal")[0];
  var title = document.getElementsByClassName("title")[0];
  var footer = document.getElementsByTagName("footer")[0];
  var addExperienceBox = document.getElementsByClassName("addExperience")[0];
  var educationInfo = document.getElementsByClassName("educationInfo")[0];
  var deleteExperienceBox = document.getElementsByClassName("deleteExperience")[0];
  var closeModalBtn = document.getElementsByClassName("closeModal")[0];
  var sendStaffInfoBtn = document.getElementsByClassName("sendStaffInfo")[0];
  var upDataBtn = document.getElementsByClassName("upData")[0];
  var phone = document.getElementsByName("newPhone")[0];
  var number = document.getElementsByName("newNumber")[0];
  var name = document.getElementsByName("newName")[0];
  var male = document.getElementsByClassName("male")[0];
  var female = document.getElementsByClassName("female")[0];
  var department = document.getElementsByName("newDepartment")[0];
  var idCard = document.getElementsByName("newIDCard")[0];
  var joinDate = document.getElementsByName("newJoinDate")[0];
  var birthday = document.getElementsByName("newBirthday")[0];
  var viewInfomationBtn = document.getElementsByClassName("lookInfoBtn")[0];
  var viewInfoModal = document.getElementsByClassName("viewInfoModal")[0];
  var viewInfoBox = document.getElementsByClassName("viewInfoBox")[0];
  var closeViewModalBtn = document.getElementsByClassName("closeViewModal")[0];
  var infoTitle = document.getElementsByClassName("infoTitle")[0];
  var searchBtn = document.getElementsByClassName("searchBtn")[0];
  var searchInput = document.getElementsByClassName("searchInput")[0];
  var startDate = document.getElementsByName("startDate");
  var viewStartDate = document.getElementsByClassName("viewStartDate");
  var description = document.getElementsByName("description");
  var viewDescription = document.getElementsByClassName("viewDescription");
  var endDate = document.getElementsByName("endDate");
  var viewEndDate = document.getElementsByClassName("viewEndDate");
  var infoItem = document.getElementsByClassName("infoItem");
  var moreInfoJson = {};

  if (!sendJsonBase) {
    var sendJsonBase = {};
    sendJsonBase.Sex = "male";
  } // var sendJsonBase = {};
  // var sendJsonExperience = {}


  if (sessionStorage.logInStatus === "管理员登录") {
    loginBox.style.display = "none";
    userInfo.innerHTML = sessionStorage.adminName;
    userIcon.innerHTML = '管理'; // sessionStorage.logInStatus = '管理员登录';

    section.style.display = "flex";
    section.style.justifyContent = "center";
    addBtn.style.marginLeft = 100 + "px";
    addBtn.style.marginRight = 100 + "px";
    lookInfoBtn.style.marginLeft = 100 + "px";
    lookInfoBtn.style.marginRight = 100 + "px";
    footer.innerHTML = "欢迎管理员" + sessionStorage.adminName;
  } //打开添加新员模态框 时刷新显示状态


  if (sessionStorage.showStatus === "1") {
    addStaffModal.style.display = "block";
    footer.innerHTML = "添加员工信息";
    var count = sessionStorage.experienceCount = 1;

    for (var i = 1; i < count; i++) {
      console.log(i);
      var oExperience = document.createElement("div");
      oExperience.setAttribute("class", "experience");
      oExperience.innerHTML = "\n\t\t\t\t\t\t\t<span>\u8D77\u59CB\u65F6\u95F4</span><input type=\"date\" name=\"startDate\">\n\t\t\t\t\t\t\t<span>\u63CF\u8FF0</span><input type=\"text\" name=\"description\">\n\t\t\t\t\t\t\t<span>\u622A\u6B62\u65F6\u95F4</span><input type=\"date\" name=\"endDate\">\n\t\t\t\t\t\t\t<span class=\"deleteExperience\">X</span>\n\t\t\t\t\t\t\t";
      educationInfo.appendChild(oExperience);

      (function (i) {
        // console.log(i)
        // document.getElementsByClassName("deleteExperience")[i].style.background = "pink";
        document.getElementsByClassName("deleteExperience")[i].addEventListener('click', function (event) {
          // console.log(event.target)
          educationInfo.removeChild(event.target.parentNode);
          sessionStorage.experienceCount = sessionStorage.experienceCount - 1;
        });
      })(i);
    }
  } //不打开模态框默认状态


  if (sessionStorage.showStatus === "0") {
    addStaffModal.style.display = "none";
  } //打开查看信息模态框


  if (sessionStorage.showStatus === "2") {
    viewInfoModal.style.display = "block", footer.innerHTML = "查看信息";
    viewInfomation();
  }
  /*Login
  * 判断登录信息是否齐全，  齐全调用 myAjax  post 方法，将用户名，密码发送到  asp文件  
  * 解码返回的json判断返回的API的信息  让登录框消失，新增，查找框居中,更改页面上的一些信息
  * 登录成功  给session一个值    随机数   将这个值同时传给admin表
  **/


  function init() {
    var body = document.getElementsByTagName("body")[0];
    body.innerHTML = "\n\t\t\t<header>\n\t\t\t\t<div class=\"title\">\u7528\u6237\u7BA1\u7406</div>\n\t\t\t\t<div class=\"logo\">maxxis</div>\n\t\t\t\t<div class=\"userControl\">\n\t\t\t\t\t<div class=\"userIcon\">\u6E38\u5BA2</div>\n\t\t\t\t\t<div class=\"userName\">\u8BF7\u767B\u5F55</div>\n\t\t\t\t</div>\n\t\t\t</header>\n\t\t\t<section>\n\t\t\t\t<div class=\"addBtn\">\u6DFB\u52A0\u65B0\u5458</div>\n\t\t\t\t<div class=\"lookInfoBtn\">\u67E5\u770B\u4FE1\u606F</div>\n\t\t\t\t<div class=\"adminLoginBox\">\n\t\t\t\t\t<div class=\"userSwitch\">\u7BA1\u7406\u5458\u767B\u5F55</div>\n\t\t\t\t\t<input type=\"text\" name=\"username\" placeholder=\"\u8BF7\u8F93\u5165\u8D26\u53F7 admin\" class=\"adminName\">\n\t\t\t\t\t<input type=\"password\" name=\"password\" placeholder=\"\u8BF7\u8F93\u5165\u5BC6\u7801 admin\" class=\"adminPass\">\n\t\t\t\t\t<input type=\"button\" value=\"\u7BA1\u7406\u5458\u767B\u5F55\" class=\"adminLogin\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"addStaffModal\">\n\t\t\t\t\t<div class=\"baseInfo\">\n\t\t\t\t\t\t<h3>\u57FA\u7840\u4FE1\u606F</h3>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>\u7535\u8BDD\u53F7\u7801:</span><input type=\"text\" name=\"newPhone\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>\u5458\u5DE5\u7F16\u53F7:</span><input type=\"text\" name=\"newNumber\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>\u5458\u5DE5\u59D3\u540D:</span><input type=\"text\" name=\"newName\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>\u6027&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\u522B:</span>&nbsp;&nbsp;&nbsp;\n\t\t\t\t\t\t\t<span>\u7537</span><input type=\"radio\" class=\"male\" checked=\"checked\" name=\"sex\">\n\t\t\t\t\t\t\t<span>\u5973</span><input type=\"radio\" class=\"female\" name=\"sex\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>\u6240\u5728\u90E8\u95E8:</span><input type=\"text\" name=\"newDepartment\">\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>\u8EAB\u4EFD\u8BC1\u53F7:</span><input type=\"text\" name=\"newIDCard\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>\u52A0\u5165\u65F6\u95F4:</span><input type=\"date\" name=\"newJoinDate\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t<span>\u5458\u5DE5\u751F\u65E5:</span><input type=\"date\" name=\"newBirthday\">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"educationInfo\">\n\t\t\t\t\t\t<h3>\u5B66\u4E60\u7ECF\u5386</h3>\n\t\t\t\t\t\t<div class=\"experience\">\n\t\t\t\t\t\t\t<span>\u8D77\u59CB\u65F6\u95F4</span><input type=\"date\" name=\"startDate\">\n\t\t\t\t\t\t\t<span>\u63CF\u8FF0</span><input type=\"text\" name=\"description\">\n\t\t\t\t\t\t\t<span>\u622A\u6B62\u65F6\u95F4</span><input type=\"date\" name=\"endDate\">\n\t\t\t\t\t\t\t<span class=\"deleteExperience\">X</span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"addExperience\">\u6DFB\u52A0\u7ECF\u5386</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"closeModal\">\u5173\u95ED</div>\n\t\t\t\t\t<div class=\"sendStaffInfo\">\u63D0\u4EA4</div>\n\t\t\t\t\t<div class=\"upData\">\u66F4\u65B0</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"viewInfoModal\">\n\t\t\t\t\t<input type=\"search\" placeholder=\"\u8BF7\u8F93\u5165 \u59D3\u540D/\u5DE5\u53F7\" class=\"searchInput\" autofocus>\n\t\t\t\t\t<div class=\"searchBtn\">\u67E5\u8BE2</div>\n\t\t\t\t\t<div class=\"closeViewModal\">\u5173\u95ED</div>\n\t\t\t\t\t<div class=\"viewInfoBox\">\n\n\t\t\t\t\t\t<div class=\"infoTitle\">\n\t\t\t\t\t\t\t<div class=\"staffNumber\">\u5458\u5DE5\u7F16\u53F7</div>\n\t\t\t\t\t\t\t<div class=\"staffName\">\u59D3\u540D</div>\n\t\t\t\t\t\t\t<div class=\"staffDepartment\">\u90E8\u95E8</div>\n\t\t\t\t\t\t\t<div class=\"staffPhone\">\u7535\u8BDD</div>\n\t\t\t\t\t\t\t<div class=\"info\">\u8BE6\u7EC6</div>\n\t\t\t\t\t\t\t<div class=\"write\">\u7F16\u8F91</div>\n\t\t\t\t\t\t\t<div class=\"delete\">\u5220\u9664</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<!-- <div class=\"infoItem\">\n\t\t\t\t\t\t\t<div class=\"staffNumber\">182722</div>\n\t\t\t\t\t\t\t<div class=\"staffName\">\u8D75\u4F1F\u658C</div>\n\t\t\t\t\t\t\t<div class=\"staffDepartment\">\u54A8\u8BE2\u90E8-\u81EA\u52A8\u5316\u7CFB\u7EDF\u7EC4</div>\n\t\t\t\t\t\t\t<div class=\"staffPhone\">15764501228</div>\n\t\t\t\t\t\t\t<div class=\"info\">></div>\n\t\t\t\t\t\t\t<div class=\"write\">/</div>\n\t\t\t\t\t\t\t<div class=\"delete\">X</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"detailInfoBox\">\n\t\t\t\t\t\t\t<div class=\"moreInfo\">\n\t\t\t\t\t\t\t\t<div class=\"idCardName\">\u8EAB\u4EFD\u8BC1:</div><div class=\"idCard\">23102419961228301X</div>\n\t\t\t\t\t\t\t\t<div class=\"sexName\">\u6027\u522B:</div><div class=\"sex\">male</div>\n\t\t\t\t\t\t\t\t<div class=\"joinDateName\">\u52A0\u5165\u65F6\u95F4:</div><div class=\"joinDate\">2018-8-1</div>\n\t\t\t\t\t\t\t\t<div class=\"birthdayName\">\u751F\u65E5:</div><div class=\"birthday\">1996-12-28</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"experienceItem\">\n\t\t\t\t\t\t\t\t<div class=\"startDate\">2014-9-1</div>\n\t\t\t\t\t\t\t\t<span>~</span><div class=\"endDate\">2018-6-30</div>\n\t\t\t\t\t\t\t\t<div></div><div class=\"description\">\u54C8\u5C14\u6EE8\u7406\u5DE5\u5927\u5B66,\u6D4B\u63A7\u6280\u672F\u4E0E\u901A\u4FE1\u5DE5\u7A0B\u7CFB</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div> -->\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t<footer>footer</footer>\n\t\t";
  }

  function login(event) {
    if (!loginUsernameInput.value || !loginPasswordInput.value) {
      footer.innerHTML = '用户员登录，能不能认真点，你这账号密码都没写全';
      return;
    } else {
      // console.log('不缺信息');
      var obj = {
        UserName: loginUsernameInput.value,
        PassWord: loginPasswordInput.value
      };
      myAjax.post('http://172.17.147.2/staff/asp/adminLogin.asp', obj, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          // console.log(res.split(","))
          // console.log(res)
          // str = res
          // console.log(JSON.parse(res));
          var json = JSON.parse(res);

          if (json.code === 0) {
            // console.log(loginBox.style)
            loginBox.style.display = "none";
            userInfo.innerHTML = json.data.UserName;
            userIcon.innerHTML = '管理';
            sessionStorage.logInStatus = '管理员登录';
            sessionStorage.adminName = json.data.UserName;
            section.style.display = "flex";
            section.style.justifyContent = "center";
            addBtn.style.marginLeft = 100 + "px";
            addBtn.style.marginRight = 100 + "px";
            lookInfoBtn.style.marginLeft = 100 + "px";
            lookInfoBtn.style.marginRight = 100 + "px";
            footer.innerHTML = "欢迎管理员" + json.data.UserName;
          } else if (json.code === 1) {
            footer.innerHTML = json.msg;
          }
        }
      });
    }
  }
  /*addData
  * 先判断是否登录，游客不许新增数据，通过判断session里的值 判断是否已登录   加强版就是将这个随机数与数据库中的对比，以防  更改session里的值从而登录成功
  * 再在session里面添加一个experienceCount = 1这是初始化  学习经历的个数   在addExperience函数中会用到
  * 
  **/


  function addData() {
    if (sessionStorage.logInStatus != "管理员登录") {
      footer.innerHTML = '管理员未登录，游客不允许添加信息，请先登录';
      return;
    } else {
      addStaffModal.style.display = "block";
      sessionStorage.showStatus = 1; // location.reload();

      footer.innerHTML = "添加新员工信息";
      title.innerHTML = "添加新员工信息";

      if (!sessionStorage.experienceCount && sessionStorage.showStatus === "1") {
        console.log('初始化  experienceCount 为1');
        sessionStorage.experienceCount = 1;
      }

      sendJsonBase.Sex = "male";

      male.onclick = function () {
        sendJsonBase.Sex = "male"; // console.log(sendJsonBase.Sex)
      };

      female.onclick = function () {
        sendJsonBase.Sex = "female"; // console.log(sendJsonBase.Sex)
      };
    }
  }
  /*addExperience
  * 点击添加经历   动态添加  一条经历 ，并给 
  * .deleteExperience 即删除按钮  绑定click事件， 
  * removeChile(event.target.parentNode)，删除这条记录，并使sessionstorage里的experienceCount减一
  **/


  function addExperience(event) {
    if (sessionStorage.experienceCount >= 8) {
      footer.innerHTML = "行了你太优秀了这些就足够了";
      return;
    } else {
      // console.log(sessionStorage.experienceCount)
      var oExperience = document.createElement("div");
      oExperience.setAttribute("class", "experience");
      oExperience.innerHTML = "\n\t\t\t\t\t\t\t<span>\u8D77\u59CB\u65F6\u95F4</span><input type=\"date\" name=\"startDate\">\n\t\t\t\t\t\t\t<span>\u63CF\u8FF0</span><input type=\"text\" name=\"description\">\n\t\t\t\t\t\t\t<span>\u622A\u6B62\u65F6\u95F4</span><input type=\"date\" name=\"endDate\">\n\t\t\t\t\t\t\t<span class=\"deleteExperience\">X</span>\n\t\t\t\t\t";
      educationInfo.appendChild(oExperience);
      document.getElementsByClassName("deleteExperience")[sessionStorage.experienceCount].addEventListener('click', function (event) {
        // console.log(sessionStorage.experienceCount)
        educationInfo.removeChild(event.target.parentNode);
        sessionStorage.experienceCount = sessionStorage.experienceCount - 1;
      });
      sessionStorage.experienceCount++; // console.log(sessionStorage.experienceCount)
    }
  }
  /*deleteExperience
  * 删除一条经历，并使  sessionStorage.experienceCount减一
  **/


  function deleteExperience(event) {
    // console.log("删除")
    educationInfo.removeChild(event.target.parentNode);
    sessionStorage.experienceCount = sessionStorage.experienceCount - 1;
  }
  /**
  *关闭增加信息的模态框
  */


  function closeModal() {
    addStaffModal.style.display = "none";
    sessionStorage.showStatus = 0;
    sessionStorage.experienceCount = 1; // location.reload();
  }
  /*发送源工信息，及匹配信息等
  **/


  function sendStaffInfo() {
    if (dataTest()) {
      // console.log(sendJsonBase)
      //所有base数据验证成功到达这里  post提交
      myAjax.post("http://172.17.147.2/staff/asp/addBaseInfo.asp", sendJsonBase, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          var json1 = JSON.parse(res); // console.log(json1)
          // console.log(typeof json1.code)

          if (json1.code === 1) {
            footer.innerHTML = "输入的number已经存在 " + json1.times + " 次，因为不允许number重复，是否要更新 " + json1.Number + " 的信息？"; // sendStaffInfoBtn.style.display = "none";

            upDataBtn.style.display = "block";
            return;
          } else {
            var oSeccess = false,
                json2;

            for (var i = 0; i < sessionStorage.experienceCount; i++) {
              var sendJsonExperience = {};
              sendJsonExperience.StartTime = startDate[i].value;
              sendJsonExperience.Description = description[i].value;
              sendJsonExperience.EndTime = endDate[i].value;
              sendJsonExperience.Number = sendJsonBase.Number;
              console.log(sendJsonExperience);
              myAjax.post("http://172.17.147.2/staff/asp/addExperienceInfo.asp", sendJsonExperience, function (err, res) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(res);
                  json2 = JSON.parse(res);

                  if (json2.code === 0) {
                    oSeccess = true;
                    console.log(oSeccess);
                    console.log(json2);
                  }
                }
              }, false);
            }

            if (oSeccess) {
              console.log("success");
              addStaffModal.style.display = "none"; // footer.innerHTML = json2.Number + "号员工的信息添加成功!";

              alert(json2.Number + "号员工的信息添加成功!");
              title.innerHTML = "用户管理";
              sessionStorage.showStatus = 0;
              sessionStorage.experienceCount = 1;
              location.reload();
            }
          }
        }
      });
    }
  }
  /*点击查看信息
  **/


  function viewInfomation() {
    viewInfoModal.style.display = "block";
    sessionStorage.showStatus = 2;
    myAjax.post("http://172.17.147.2/staff/asp/search.asp", {
      "Status": 1
    }, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        // console.log(res)
        moreInfoJson = JSON.parse(res); // console.log(moreInfoJson)

        if (moreInfoJson.code === 0) {
          addItemBindEvent();
        }
      }
    });
  }
  /*关闭查看模态框
  **/


  function closeViewModal() {
    // viewInfoModal.style.display = "none";
    sessionStorage.showStatus = 0;
    location.reload();
  }
  /*更新数据
  * 删除number号的信息并重新添加 页面里的符合条件的数据
  **/


  function upData() {
    if (dataTest()) {
      myAjax.post("http://172.17.147.2/staff/asp/delete.asp", {
        Number: sendJsonBase.Number
      }, function (err, res) {
        if (err) {
          console.log(err);
        } else {
          sendStaffInfo();
          footer.innerHTML = "信息更新成功";
        }
      });
    }
  }
  /*正则匹配  所有都通过才能到达最后 return ture
  **/


  function dataTest() {
    //对phone进行判断，输入且符合条件则添加至sendJsonBase
    if (!phone) {
      footer.innerHTML = "请输入电话";
      return false;
    } else if (!/^1\d{10}$/.test(phone.value)) {
      //phone存在且   满足以1开头的11为数字
      footer.innerHTML = "输入电话格式不匹配，请输入以1开头的11位数字";
      return false;
    } else {
      sendJsonBase.Phone = phone.value; // console.log(sendJsonBase)
    } //对number进行判断，输入且符合条件则添加至sendJsonBase


    if (!number) {
      footer.innerHTML = "请输入员工编号";
      return false;
    } else if (!/^\d{6}$/.test(number.value)) {
      //number存在且   满足6数字
      footer.innerHTML = "输入员工编号格式不匹配，请输入6位数字";
      return false;
    } else {
      sendJsonBase.Number = number.value; // console.log(sendJsonBase)
    } //对number进行判断，输入且符合条件则添加至sendJsonBase


    if (!name) {
      footer.innerHTML = "请输入员工姓名";
      return false;
    } else if (!/^[a-zA-Z]|[\u4E00-\u9FA5]+$/.test(name.value)) {
      //name存在  且 满足  由多个字母或 汉子组成
      footer.innerHTML = "员工姓名应为多个汉字或字母";
      return false;
    } else {
      sendJsonBase.Name = name.value; // console.log(sendJsonBase)
    } //对department进行判断，输入且符合条件则添加至sendJsonBase


    if (!department) {
      footer.innerHTML = "请输入员工所在部门";
      return false;
    } else if (!/^[a-zA-Z]|[\u4E00-\u9FA5]|\d-+$/.test(department.value)) {
      //department存在  
      // console.log(department.value)
      footer.innerHTML = "部门名仅为汉字,英文,和 - 组成";
      return false;
    } else {
      sendJsonBase.Department = department.value; // console.log(sendJsonBase)
    } //对idCard进行判断，输入且符合条件则添加至sendJsonBase


    if (!idCard) {
      footer.innerHTML = "请输入员工身份证号码";
      return false;
    } else if (!/^\d{17}\d|X$/.test(idCard.value)) {
      //department存在  
      // console.log(idCard.value)
      footer.innerHTML = "身份证号应有17为数字加一位数字或X";
      return false;
    } else {
      sendJsonBase.IDCard = idCard.value; // console.log(sendJsonBase)
    } //对idCard进行判断，输入且符合条件则添加至sendJsonBase


    if (!joinDate) {
      footer.innerHTML = "请输入员工加入时间";
      return false;
    } else if (!/\d{4}(-|\/|\.)\d{1,2}(-|\/|\.)\d{1,2}/.test(joinDate.value)) {
      //joindate存在  
      // console.log(joinDate.value)
      footer.innerHTML = "时间格式 年-月-日";
      return false;
    } else {
      sendJsonBase.JoinDate = joinDate.value; // console.log(sendJsonBase)
    }

    if (!birthday) {
      footer.innerHTML = "请输入员工生日";
      return false;
    } else if (!/\d{4}(-|\/|\.)\d{1,2}(-|\/|\.)\d{1,2}/.test(birthday.value)) {
      //joindate存在  
      // console.log(birthday.value)
      footer.innerHTML = "时间格式 年-月-日";
      return false;
    } else {
      sendJsonBase.Birthday = birthday.value;
    }

    if (sessionStorage.experienceCount === "0") {
      return false;
      footer.innerHTML = "请添加至少一条经历！"; // console.log("请添加至少一条经历！")
    } else {
      // console.log(experienceCount)
      for (var i = 0; i < sessionStorage.experienceCount; i++) {
        // console.log("添加经历")
        if (!startDate[i].value || !description[i].value || !endDate[i].value) {
          console.log(startDate[i].value + "------" + description[i].value + '-------------' + endDate[i].value);
          footer.innerHTML = "第" + i + "条经历信息不全";
          return false;
        } else if (!/\d{4}(-|\/|\.)\d{1,2}(-|\/|\.)\d{1,2}/.test(startDate[i].value)) {
          footer.innerHTML = "第" + i + "条经历的起始时间格式不匹配，应为yyyy-mm-dd";
          return false;
        } else if (!/\d{4}(-|\/|\.)\d{1,2}(-|\/|\.)\d{1,2}/.test(endDate[i].value)) {
          footer.innerHTML = "第" + i + "条经历的结束时间格式不匹配，应为yyyy-mm-dd";
          return false;
        }
      }
    }

    return true;
  }
  /* 将ajax返回的json字符串解析到 moreInfoJson，就可以调用此方在viewInfoBox里添加infoItem
  **/


  function addItemBindEvent() {
    for (var i = 1; i <= moreInfoJson.count; i++) {
      var staffItem = document.createElement("div");
      staffItem.setAttribute("class", "infoItem");
      staffItem.setAttribute("data-index", i);
      staffItem.innerHTML = "\n\t\t\t\t<div class=\"staffNumber\"><input typeof=\"text\" value=\"".concat(moreInfoJson.data[i].Number, "\" disabled=\"disabled\"> </div>\n\t\t\t\t<div class=\"staffName\"><input typeof=\"text\" value=\"").concat(moreInfoJson.data[i].Name, "\" disabled=\"disabled\"></div>\n\t\t\t\t<div class=\"staffDepartment\"><input typeof=\"text\" value=\"").concat(moreInfoJson.data[i].Department, "\" disabled=\"disabled\"></div>\n\t\t\t\t<div class=\"staffPhone\"><input typeof=\"text\" value=\"").concat(moreInfoJson.data[i].Phone, "\" disabled=\"disabled\"></div>\n\t\t\t\t<div class=\"info\" data-flag=\"0\">></div>\n\t\t\t\t<div class=\"write\" data-flag=\"0\"></div>\n\t\t\t\t<div class=\"delete\">X</div>\n\t\t\t\t");
      viewInfoBox.appendChild(staffItem); //在添加一条信息后面加一个空的div，以便点击详情时候插入详情DOM

      var detail = document.createElement("div");
      detail.setAttribute("class", "detailInfoBox");
      viewInfoBox.appendChild(detail);
    } //点击三角号 显示详细信息


    var showInfoBtn = document.querySelectorAll(".infoItem .info");

    for (var i = 0; i < showInfoBtn.length; i++) {
      // console.log(showInfoBtn[i])
      showInfoBtn[i].addEventListener("click", showInfo);
    } //点击删除 执行事件deleteViewInfoItem


    var deleteViewInfoCli = document.querySelectorAll(".infoItem .delete");

    for (var i = 0; i < deleteViewInfoCli.length; i++) {
      deleteViewInfoCli[i].addEventListener("click", deleteViewInfoItem);
    } //点击编辑按钮


    var editCli = document.querySelectorAll(".infoItem .write");

    for (var i = 0; i < editCli.length; i++) {
      editCli[i].addEventListener("click", editItem);
    }
  } //nav吸顶效果


  function lockTop(event) {
    // console.log(infoTitle)
    // console.log(infoTitle.parentNode)
    if (event.target.scrollTop >= 10) {
      infoTitle.style.position = "absolute";
      infoTitle.style.top = event.target.scrollTop - 10 + "px";
    } else {
      // console.log(event.target.scrollTop)
      infoTitle.style.position = "relative";
      infoTitle.style.top = 0;
    }
  } //查询按钮执行程序  添加事件  根据input内是否可以isNAN来判断输入的员工编号还是 模糊姓名 进行status不同的post请求


  function search(event) {
    if (!searchInput.value) {
      searchInput.focus();
      footer.innerHTML = "请输入要查询的内容";
    } else {
      // console.log(typeof(searchInput.value))
      var detailInfoBox = document.getElementsByClassName("detailInfoBox");

      if (isNaN(searchInput.value)) {
        // console.log("不能转为数字")
        myAjax.post("http://172.17.147.2/staff/asp/search.asp", {
          "Status": "3",
          "Value": searchInput.value
        }, function (err, res) {
          if (err) {
            console.log(err);
          } else {
            moreInfoJson = JSON.parse(res);

            if (moreInfoJson.code === 0) {
              // console.log(infoItem)
              for (var j = 0, len = infoItem.length; j < len; j++) {
                // console.log(j +"-------" + infoItem[j]);
                viewInfoBox.removeChild(infoItem[0]);
                viewInfoBox.removeChild(detailInfoBox[0]);
              }

              addItemBindEvent();
            } else if (moreInfoJson.code === 1) {
              footer.innerHTML = "数据库中没有此数据！";
            }
          }
        });
      } else {
        // console.log("能")
        myAjax.post("http://172.17.147.2/staff/asp/search.asp", {
          "Status": "2",
          "Value": searchInput.value
        }, function (err, res) {
          if (err) {
            console.log(err);
          } else {
            moreInfoJson = JSON.parse(res);

            if (moreInfoJson.code === 0) {
              // console.log(infoItem)
              for (var j = 0, len = infoItem.length; j < len; j++) {
                // console.log(j +"-------" + infoItem[j]);
                viewInfoBox.removeChild(infoItem[0]);
                viewInfoBox.removeChild(detailInfoBox[0]);
              }

              addItemBindEvent();
            } else if (moreInfoJson.code === 1) {
              footer.innerHTML = "数据库中没有此数据！";
            }
          }
        });
      }
    }
  } // >三角号显示详细信息  


  function showInfo(event) {
    if (sessionStorage.logInStatus !== "管理员登录") {
      footer.innerHTML = "查看详细信息需管理员权限，请以管理员身份登录！";
      return;
    } else {
      // console.log(event.target.nextSibling.nextSibling.dataset.flag)
      //第一次点击  根据Number查询P_UserEducationBackground表
      if (event.target.dataset.flag === "0") {
        //让除自身所有的初始化
        var detailInfoBox = document.getElementsByClassName("detailInfoBox"); // console.log(detailInfoBox);

        for (var i = 0; i < detailInfoBox.length; i++) {
          detailInfoBox[i].innerHTML = "";
          detailInfoBox[i].style.display = "none"; // console.log(detailInfoBox[i].previousSibling.children[4])
          //初始化 使input 变为disable

          detailInfoBox[i].previousSibling.children[3].children[0].setAttribute("disabled", "disabled");
          detailInfoBox[i].previousSibling.children[2].children[0].setAttribute("disabled", "disabled");
          detailInfoBox[i].previousSibling.children[1].children[0].setAttribute("disabled", "disabled");
          detailInfoBox[i].previousSibling.children[5].setAttribute("data-flag", 0);
          detailInfoBox[i].previousSibling.children[5].style.backgroundImage = "url(http://172.17.147.2/staff/img/pen.png)";

          if (event.target.parentNode.nextSibling === detailInfoBox[i]) {
            // console.log("自己个")
            continue;
          } //自身的 flag，以及 旋转不初始化  ，因为 查看详情与 编辑 都是插入到一个  detailInfoBox里面所以  detailInfobox的innerhtml要初始化


          detailInfoBox[i].previousSibling.children[4].setAttribute("data-flag", 0);
          detailInfoBox[i].previousSibling.children[4].style.transform = "rotate(0deg)";
        } // console.log("是0")
        // console.log(json)


        event.target.setAttribute("data-flag", 1);
        event.target.style.transform = "rotate(90deg)";
        var index = event.target.parentNode.dataset.index; // console.log(index);
        // console.log(event.target.parentNode.children[0].children[0].value)

        myAjax.post("http://172.17.147.2/staff/asp/search.asp", {
          "Status": 4,
          "value": event.target.parentNode.children[0].children[0].value
        }, function (err, res) {
          if (err) {
            console.log(err);
          } else {
            // console.log(res);
            var json1 = JSON.parse(res); // console.log(json)

            if (json1.code === 0) {
              // console.log(json1);
              var moreInfo = document.createElement("div");
              moreInfo.setAttribute("class", "moreInfo"); // console.log(index)
              // console.log(moreInfoJson.data[index])

              moreInfo.innerHTML = "\n\t\t\t\t\t\t\t\t<div class=\"idCardName\">\u8EAB\u4EFD\u8BC1:</div><div class=\"idCard\"><input type=\"text\" disabled=\"disabled\" value=\"".concat(moreInfoJson.data[index].IDCard, "\"></div>\n\t\t\t\t\t\t\t\t<div class=\"sexName\">\u6027\u522B:</div><div class=\"sex\"><input type=\"text\" disabled=\"disabled\" value=\"").concat(moreInfoJson.data[index].Sex, "\"></div>\n\t\t\t\t\t\t\t\t<div class=\"joinDateName\">\u52A0\u5165\u65F6\u95F4:</div><div class=\"joinDate\"><input type=\"text\" disabled=\"disabled\" value=\"").concat(moreInfoJson.data[index].JoinDate, "\"></div>\n\t\t\t\t\t\t\t\t<div class=\"birthdayName\">\u751F\u65E5:</div><div class=\"birthday\"><input type=\"text\" disabled=\"disabled\" value=\"").concat(moreInfoJson.data[index].Birthday, "\"></div>\n\t\t\t\t\t\t\t"); // event.target.nextSibling.appendChild(detailInfoBox);

              event.target.parentNode.nextSibling.appendChild(moreInfo);

              for (var i = 1; i <= json1.count; i++) {
                var experienceItem = document.createElement("div");
                experienceItem.setAttribute("class", "experienceItem");
                experienceItem.innerHTML = "\n\t\t\t\t\t\t\t\t\t<div class=\"startDate\"><input type=\"text\" disabled=\"disabled\" value=\"".concat(json1.data[i].StartTime, "\"></div>\n\t\t\t\t\t\t\t\t\t<span>~</span>\n\t\t\t\t\t\t\t\t\t<div class=\"endDate\"><input type=\"text\" disabled=\"disabled\" value=\"").concat(json1.data[i].EndTime, "\"></div>\n\t\t\t\t\t\t\t\t\t<div class=\"description\"><input type=\"text\" disabled=\"disabled\" value=\"").concat(json1.data[i].Description, "\"></div>\n\t\t\t\t\t\t\t\t");
                event.target.parentNode.nextSibling.appendChild(experienceItem);
              }

              event.target.parentNode.nextSibling.style.display = "block";
            }
          }
        });
      } else {
        //第二次点击关闭自身，并将flag调成0，rotate0deg
        // console.log(event.target.dataset.flag)
        event.target.setAttribute("data-flag", 0);
        event.target.style.transform = "rotate(0deg)";
        event.target.parentNode.nextSibling.style.display = "none";
        event.target.parentNode.nextSibling.innerHTML = "";
      }
    }
  } //点击删除，进行删除操作  


  function deleteViewInfoItem(event) {
    if (sessionStorage.logInStatus !== "管理员登录") {
      footer.innerHTML = "删除信息需管理员权限，请以管理员身份登录！";
      return;
    } else {
      // console.log("删除");
      // this.parentNode.style.background = "gray";
      var num = this.parentNode.children[0].children[0].value;

      if (window.confirm("\u786E\u5B9A\u8981\u5220\u9664".concat(num, "\u6B64\u6761\u4FE1\u606F\uFF1F"))) {
        myAjax.post("http://172.17.147.2/staff/asp/delete.asp", {
          Number: this.parentNode.children[0].children[0].value
        }, function (err, res) {
          if (err) {
            console.log(err);
          } else {
            alert(num + "的信息删除成功");
            location.reload();
          }
        });
      } else {
        return;
      }
    }
  }

  var oNumber, oName, oDepartment, oPhone, oIdCard, oSex, oJoinDate, oBirthday;
  var oSendJsonExperienceCli = {}; //点击编辑按钮

  function editItem(event) {
    if (sessionStorage.logInStatus !== "管理员登录") {
      footer.innerHTML = "编辑详细信息需管理员权限，请以管理员身份登录！";
      return;
    } else {
      //第一次点击
      if (event.target.dataset.flag === "0") {
        //点击 铅笔 之前先初始化
        var oDetailInfoBox = document.getElementsByClassName("detailInfoBox");

        for (var i = 0; i < oDetailInfoBox.length; i++) {
          // console.log(i)
          oDetailInfoBox[i].innerHTML = "";
          oDetailInfoBox[i].style.display = "none"; //初始化 使input 变为disable

          oDetailInfoBox[i].previousSibling.children[3].children[0].setAttribute("disabled", "disabled");
          oDetailInfoBox[i].previousSibling.children[2].children[0].setAttribute("disabled", "disabled");
          oDetailInfoBox[i].previousSibling.children[1].children[0].setAttribute("disabled", "disabled");
          oDetailInfoBox[i].previousSibling.children[4].setAttribute("data-flag", 0);
          oDetailInfoBox[i].previousSibling.children[4].style.transform = "rotate(0deg)";

          if (event.target.parentNode.nextSibling === oDetailInfoBox[i]) {
            // console.log('自己个')
            continue;
          }

          oDetailInfoBox[i].previousSibling.children[5].style.backgroundImage = "url(http://172.17.147.2/staff/img/pen.png)";
          oDetailInfoBox[i].previousSibling.children[5].setAttribute("data-flag", 0);
        } // console.log("是0")
        // console.log(json)
        // event.target.style.transform = "rotate(90deg)";
        // console.log(this)
        //点击前遍历一遍让所有的  flag 为 0 ， infoItem的innerhtml为空
        //点击后 设置flag为1


        event.target.setAttribute("data-flag", 1);
        this.style.backgroundImage = "url(http://172.17.147.2/staff/img/right.png)";
        var index = event.target.parentNode.dataset.index; // console.log(index);
        // console.log(event.target.parentNode.children[0].children[0].value)

        myAjax.post("http://172.17.147.2/staff/asp/search.asp", {
          "Status": 4,
          "value": event.target.parentNode.children[0].children[0].value
        }, function (err, res) {
          if (err) {
            console.log(err);
          } else {
            // console.log(res);
            var json1 = JSON.parse(res); // console.log(json)

            if (json1.code === 0) {
              // console.log(json1);
              var moreInfo = document.createElement("div");
              moreInfo.setAttribute("class", "moreInfo"); // console.log(index)
              // console.log(moreInfoJson.data[index])

              if (moreInfoJson.data[index].Sex === "female") {
                otherSex = 'male';
              } else {
                otherSex = "female";
              }

              moreInfo.innerHTML = "\n\t\t\t\t\t\t\t\t<div class=\"idCardName\">\u8EAB\u4EFD\u8BC1:</div><div class=\"idCard\"><input type=\"text\"  value=\"".concat(moreInfoJson.data[index].IDCard, "\"></div>\n\t\t\t\t\t\t\t\t<div class=\"sexName\">\u6027\u522B:</div><div class=\"sex\"><select><option selected>").concat(moreInfoJson.data[index].Sex, "</potion><option>").concat(otherSex, "</option></select></div>\n\t\t\t\t\t\t\t\t<div class=\"joinDateName\">\u52A0\u5165\u65F6\u95F4:</div><div class=\"joinDate\"><input type=\"text\"  value=\"").concat(moreInfoJson.data[index].JoinDate, "\"></div>\n\t\t\t\t\t\t\t\t<div class=\"birthdayName\">\u751F\u65E5:</div><div class=\"birthday\"><input type=\"text\"  value=\"").concat(moreInfoJson.data[index].Birthday, "\"></div>\n\t\t\t\t\t\t\t"); // event.target.nextSibling.appendChild(detailInfoBox);

              event.target.parentNode.nextSibling.appendChild(moreInfo);

              for (var i = 1; i <= json1.count; i++) {
                var experienceItem = document.createElement("div");
                experienceItem.setAttribute("class", "experienceItem");
                experienceItem.innerHTML = "\n\t\t\t\t\t\t\t\t\t<div class=\"viewStartDate\"><input type=\"text\"  value=\"".concat(json1.data[i].StartTime, "\"></div>\n\t\t\t\t\t\t\t\t\t<span>~</span>\n\t\t\t\t\t\t\t\t\t<div class=\"viewEndDate\"><input type=\"text\"  value=\"").concat(json1.data[i].EndTime, "\"></div>\n\t\t\t\t\t\t\t\t\t<div class=\"viewDescription\"><input type=\"text\" value=\"").concat(json1.data[i].Description, "\"></div>\n\t\t\t\t\t\t\t\t\t<div class=\"viewExperienceReduceBtn\">-</div>\n\t\t\t\t\t\t\t\t");
                event.target.parentNode.nextSibling.appendChild(experienceItem); // console.log(experienceItem.lastChild.previousSibling)

                experienceItem.lastChild.previousSibling.onclick = function (event) {
                  //删除事件
                  event.target.parentNode.parentNode.removeChild(this.parentNode);
                  json1.count--;
                };
              } // console.log(event.target.parentNode.nextSibling.lastChild);
              //添加按钮


              var viewExperienceAddBtn = document.createElement("div");
              viewExperienceAddBtn.setAttribute("class", "viewExperienceAddBtn");
              viewExperienceAddBtn.innerHTML = "+";

              viewExperienceAddBtn.onclick = function (event) {
                if (json1.count >= 8) {
                  footer.innerHTML = "已经够优秀了，这么多条够多了！";
                  return;
                } else {
                  // console.log(event.target.parentNode.parentNode);
                  json1.count++;
                  var experienceItem = document.createElement("div");
                  experienceItem.setAttribute("class", "experienceItem");
                  experienceItem.innerHTML = "\n\t\t\t\t\t\t\t\t\t\t<div class=\"viewStartDate\"><input type=\"text\"  value=\"\u8D77\u59CB\u65F6\u95F4\"></div>\n\t\t\t\t\t\t\t\t\t\t<span>~</span>\n\t\t\t\t\t\t\t\t\t\t<div class=\"viewEndDate\"><input type=\"text\"  value=\"\u622A\u6B62\u65F6\u95F4\"></div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"viewDescription\"><input type=\"text\" value=\"\u63CF\u8FF0\"></div>\n\t\t\t\t\t\t\t\t\t\t<div class=\"viewExperienceReduceBtn\">-</div>\n\t\t\t\t\t\t\t\t\t"; // console.log(event.target.parentNode)

                  event.target.parentNode.appendChild(experienceItem); //删除按钮

                  var viewExperienceReduceBtnCli = document.querySelectorAll(".viewExperienceReduceBtn"); // console.log(viewExperienceReduceBtnCli[viewExperienceReduceBtnCli.length-1])

                  viewExperienceReduceBtnCli[viewExperienceReduceBtnCli.length - 1].onclick = function (event) {
                    event.target.parentNode.parentNode.removeChild(this.parentNode);
                    json1.count--;
                  };
                }
              }; // console.log(event.target.parentNode.nextSibling)


              event.target.parentNode.nextSibling.appendChild(viewExperienceAddBtn);
              event.target.parentNode.nextSibling.style.display = "block"; // event.target.parentNode.children[0].children[0].removeAttribute("disabled");
              //不允许在这里修改number

              event.target.parentNode.children[1].children[0].removeAttribute("disabled");
              event.target.parentNode.children[2].children[0].removeAttribute("disabled");
              event.target.parentNode.children[3].children[0].removeAttribute("disabled");
              footer.innerHTML = "现在可以对" + event.target.parentNode.children[0].children[0].value + "的信息进行更改";
            }

            oNumber = event.target.parentNode.children[0].children[0].value;
            oName = event.target.parentNode.children[1].children[0].value;
            oDepartment = event.target.parentNode.children[2].children[0].value;
            oPhone = event.target.parentNode.children[3].children[0].value;
            oIdCard = event.target.parentNode.nextSibling.children[0].children[1].children[0].value;
            oSex = event.target.parentNode.nextSibling.children[0].children[3].children[0].value;
            oJoinDate = event.target.parentNode.nextSibling.children[0].children[5].children[0].value;
            oBirthday = event.target.parentNode.nextSibling.children[0].children[7].children[0].value; // console.log(oNumber,oName ,oDepartment,oPhone,oIdCard,oSex,oJoinDate,oBirthday)
            // var oMoreInfoExperienceCli = document.querySelectorAll(".experienceItem");
            //这里本打算使用  post来的 经历对象，与 再次点击，用来提交的经历对象进行对比，对比每一个值是否变化，拼接字符串，并提示
            //但是考虑的不周到，没想到在第二次点击前  删除一行之后又添加一行，  通过前后两次的行数是否变化进行判断是否添加几行/删除几行就行不通了
            //所以  第二次提交的时候还是要从第0行全部验证，    这样部分 生成 msg 的判断就无效了 但是 任然可以确保  提交的信息没问题
            //其实也可以 设置一个reduceCount 这样 记录点击几次减少， 但是新增的无效的数据减少也可以 
            //这里要用  基于ajax请求回来的json的count值 经过  而不是动态获取

            var oSendJsonExperienceCliSource = {};
            oSendJsonExperienceCliSource.count = json1.count; // console.log(viewEndDate[0].children[0].value)

            for (var i = 0, len = json1.count; i < len; i++) {
              // console.log(i)
              oSendJsonExperienceCliSource[i] = {
                oStartTime: viewStartDate[i].children[0].value,
                oDescription: viewDescription[i].children[0].value,
                oEndTime: viewEndDate[i].children[0].value,
                oNumber: oNumber.value // console.log(oSendJsonExperienceCli);

              };
            } //深度克隆一下这个对象， 在后面比较值得时候用得到


            deepClone(oSendJsonExperienceCli, oSendJsonExperienceCliSource);
          }
        }); // setTimeout(function(){
        // 	console.log(oNumber,oName ,oDepartment,oPhone,oIdCard,oSex,oJoinDate,oBirthday)
        // },200)
        //由于AJAX异步所以 很容易会得不到值
        //再次点击  data-flag = 1 时 Eles
      } else {
        // console.log(oName,oDepartment,oPhone,oIdCard,oSex,oBirthday,oJoinDate)
        var number = event.target.parentNode.children[0].children[0];
        var name = event.target.parentNode.children[1].children[0];
        var department = event.target.parentNode.children[2].children[0];
        var phone = event.target.parentNode.children[3].children[0];
        var idCard = event.target.parentNode.nextSibling.children[0].children[1].children[0];
        var sex = event.target.parentNode.nextSibling.children[0].children[3].children[0];
        var joinDate = event.target.parentNode.nextSibling.children[0].children[5].children[0];
        var birthday = event.target.parentNode.nextSibling.children[0].children[7].children[0]; // console.log(joinDate)
        // console.log(number,name,department,phone,idCard,sex,joinDate,birthday)
        //这里懒了一下，就用之前的名字吧， 在这个函数作用域里面是可以的  不会影响到dataTest,sendJsonBase也是优先在局部变量中的

        var sendJsonBase = {};

        if (!phone) {
          footer.innerHTML = "请输入电话";
          return;
        } else if (!/^1\d{10}$/.test(phone.value)) {
          //phone存在且   满足以1开头的11为数字
          footer.innerHTML = "输入电话格式不匹配，请输入以1开头的11位数字"; // console.log(phone)

          return;
        } else {
          sendJsonBase.Phone = phone.value; // console.log(sendJsonBase)
        } //对number进行判断，输入且符合条件则添加至sendJsonBase


        if (!number) {
          footer.innerHTML = "请输入员工编号";
          return;
        } else if (!/^\d{6}$/.test(number.value)) {
          //number存在且   满足6数字
          footer.innerHTML = "输入员工编号格式不匹配，请输入6位数字";
          return;
        } else {
          sendJsonBase.Number = number.value; // console.log(sendJsonBase)
        } //对number进行判断，输入且符合条件则添加至sendJsonBase


        if (!name) {
          footer.innerHTML = "请输入员工姓名";
          return;
        } else if (!/^[a-zA-Z]|[\u4E00-\u9FA5]+$/.test(name.value)) {
          //name存在  且 满足  由多个字母或 汉子组成
          footer.innerHTML = "员工姓名应为多个汉字或字母";
          return;
        } else {
          sendJsonBase.Name = name.value; // console.log(sendJsonBase)
        } //对department进行判断，输入且符合条件则添加至sendJsonBase


        if (!department) {
          footer.innerHTML = "请输入员工所在部门";
          return;
        } else if (!/^[a-zA-Z]|[\u4E00-\u9FA5]|\d-+$/.test(department.value)) {
          //department存在  
          // console.log(department.value)
          footer.innerHTML = "部门名仅为汉字,英文,和 - 组成";
          return;
        } else {
          sendJsonBase.Department = department.value; // console.log(sendJsonBase)
        } //对idCard进行判断，输入且符合条件则添加至sendJsonBase


        if (!idCard) {
          footer.innerHTML = "请输入员工身份证号码";
          return;
        } else if (!/^\d{17}\d|X$/.test(idCard.value)) {
          //department存在  
          // console.log(idCard.value)
          footer.innerHTML = "身份证号应有17为数字加一位数字或X";
          return;
        } else {
          sendJsonBase.IDCard = idCard.value; // console.log(sendJsonBase)
        } //对idCard进行判断，输入且符合条件则添加至sendJsonBase


        if (!joinDate) {
          footer.innerHTML = "请输入员工加入时间";
          return;
        } else if (!/\d{4}(-|\/|\.)\d{1,2}(-|\/|\.)\d{1,2}/.test(joinDate.value)) {
          //joindate存在  
          console.log(joinDate.value);
          footer.innerHTML = "时间格式 年-月-日或 年/月/日";
          return;
        } else {
          sendJsonBase.JoinDate = joinDate.value; // console.log(sendJsonBase)
        }

        if (!birthday) {
          footer.innerHTML = "请输入员工生日";
          return;
        } else if (!/\d{4}(-|\/|\.)\d{1,2}(-|\/|\.)\d{1,2}/.test(birthday.value)) {
          //joindate存在  
          console.log(birthday.value);
          footer.innerHTML = "生日时间格式 年-月-日或 年/月/日";
          return;
        } else {
          sendJsonBase.Birthday = birthday.value; //
        }

        sendJsonBase.Sex = sex.value; // console.log(sendJsonBase)
        // 添加 遍历经历 并判断

        var moreInfoExperienceCli = document.querySelectorAll(".experienceItem");
        var sendJsonExperience = {};
        sendJsonExperience.count = moreInfoExperienceCli.length; // console.log()

        if (moreInfoExperienceCli.length === 0) {
          // console.log()
          footer.innerHTML = "请输入至少一条经历";
          return;
        }

        for (var i = 0, len = moreInfoExperienceCli.length; i < len; i++) {
          sendJsonExperience[i] = {
            StartTime: viewStartDate[i].children[0].value,
            Description: viewDescription[i].children[0].value,
            EndTime: viewEndDate[i].children[0].value,
            Number: sendJsonBase.Number // console.log(sendJsonExperience);

          };
        } //现在存在了一个问题就是取得old的值在对象中时索引类型，会时时改变，所以要对其进行克隆
        // console.log(oName+"-+-+-+-+-"+name.value)


        var msg = "是否要将";

        if (oName != name.value) {
          msg += "姓名:" + oName + "-->" + name.value;
        } else if (oDepartment != department.value) {
          msg += "部门:" + oDepartment + "-->" + department.value;
        } else if (oPhone != phone.value) {
          msg += "电话" + oPhone + "-->" + phone.value;
        } else if (oIdCard != idCard.value) {
          msg += "身份证号:" + oIdCard + "-->" + idCard.value;
        } else if (oSex != sex.value) {
          msg += "性别:" + oSex + "-->" + sex.value;
        } else if (oJoinDate != joinDate.value) {
          msg += "加入时间:" + oJoinDate + "-->" + joinDate.value;
        } else if (oBirthday != birthday.value) {
          msg += "生日:" + oBirthday + "-->" + birthday.value;
        } else if (oSendJsonExperienceCli.count !== sendJsonExperience.count) {
          if (oSendJsonExperienceCli.count > sendJsonExperience.count) {
            msg += "并且删除" + Math.abs(oSendJsonExperienceCli.count - sendJsonExperience.count) + "条经历";
          } else {
            msg += "并且增加" + Math.abs(oSendJsonExperienceCli.count - sendJsonExperience.count) + "条经历"; // console.log(oSendJsonExperienceCli.count)
            // console.log(sendJsonExperience.count)
            //还是要全部验证

            for (var i = 0; i < sendJsonExperience.count; i++) {
              // console.log(viewStartDate,i,oSendJsonExperienceCli.count)
              // console.log(viewStartDate[i ].children[0])
              // console.log(viewDescription[i].children[0])
              // console.log(viewEndDate[i].children[0])
              if (!viewStartDate[i].children[0].value || !viewDescription[i].children[0].value || !viewEndDate[i].children[0].value) {
                console.log(viewStartDate[i].children[0].value + "------" + viewDescription[i].children[0].value + '-------------' + viewEndDate[i].children[0].value);
                footer.innerHTML = "第" + i - oSendJsonExperienceCli.count + "条经历信息不全";
                return false;
              } else if (!/\d{4}(-|\/|\.)\d{1,2}(-|\/|\.)\d{1,2}/.test(viewStartDate[i].children[0].value)) {
                // console.log(i + "dsfasdf" + oSendJsonExperienceCli.count)
                footer.innerHTML = "第" + (i - oSendJsonExperienceCli.count + 1) + "条经历的起始时间格式不匹配，应为yyyy-mm-dd";
                return false;
              } else if (!/\d{4}(-|\/|\.)\d{1,2}(-|\/|\.)\d{1,2}/.test(viewEndDate[i].children[0].value)) {
                // console.log(viewEndDate[i].children[0].value)
                footer.innerHTML = "第" + (i - oSendJsonExperienceCli.count + 1) + "条经历的结束时间格式不匹配，应为yyyy-mm-dd";
                return false;
              } else if (viewDescription[i].children[0].value === "") {
                console.log(viewDescription[i].children[0].value);
                msg += "第" + (i - oSendJsonExperienceCli.count + 1) + "不能为空!";
                return false;
              }
            }
          }
        } else {
          for (var i = 0, count = sendJsonExperience.count; i < count; i++) {
            if (sendJsonExperience[i].StartTime !== oSendJsonExperienceCli[i].oStartTime) {
              msg += "更改第" + (i + 1) + "条经历的 起始时间：" + oSendJsonExperienceCli[i].oStartTime + "-->" + sendJsonExperience[i].StartTime;
            } else if (sendJsonExperience[i].EndTime !== oSendJsonExperienceCli[i].oEndTime) {
              msg += "更改第" + (i + 1) + "条经历的 截止时间：" + oSendJsonExperienceCli[i].oEndTime + "-->" + sendJsonExperience[i].EndTime;
            } else if (sendJsonExperience[i].Description !== oSendJsonExperienceCli[i].oDescription) {
              msg += "更改第" + (i + 1) + "条经历的 描述：" + oSendJsonExperienceCli[i].oDescription + "-->" + sendJsonExperience[i].Description;
            }
          }
        }

        ; // console.log(msg)
        //之后confirm 决定是否post到add.asp
        //信息没有被改变
        // console.log(msg)

        if (msg !== "是否要将") {
          console.log("有更改" + msg);

          if (confirm(msg)) {
            myAjax.post("http://172.17.147.2/staff/asp/delete.asp", {
              "Number": oNumber
            }, function (err, res) {
              if (err) {
                console.log(err);
              } else {
                console.log(sendJsonBase);
                console.log(sendJsonExperience);

                if (JSON.parse(res).code === 0) {
                  myAjax.post("http://172.17.147.2/staff/asp/addBaseInfo.asp", sendJsonBase, function (err, res) {
                    if (err) {
                      console.log(err);
                    } else {
                      for (var i = 0, count = sendJsonExperience.count; i < count; i++) {
                        myAjax.post("http://172.17.147.2/staff/asp/addExperienceInfo.asp", sendJsonExperience[i], function (err, res) {
                          if (err) {
                            console.log(err);
                            return;
                          } else {}
                        });
                      }
                    }
                  }, false);
                  event.target.setAttribute("data-flag", 0); // event.target.style.transform = "rotate(0deg)";

                  event.target.style.backgroundImage = "url(http://172.17.147.2/staff/img/pen.png)"; // event.target.parentNode.children[0].children[0].setAttribute("disabled","disabled");

                  event.target.parentNode.children[1].children[0].setAttribute("disabled", "disabled");
                  event.target.parentNode.children[2].children[0].setAttribute("disabled", "disabled");
                  event.target.parentNode.children[3].children[0].setAttribute("disabled", "disabled");
                  alert("信息更改成功！");
                  event.target.parentNode.nextSibling.style.display = "none";
                  event.target.parentNode.nextSibling.innerHTML = "";
                  footer.innerHTML = "查看信息";
                  location.reload();
                }
              }
            });
          }
        } else {
          console.log("没更改" + msg);
          event.target.setAttribute("data-flag", 0); // event.target.style.transform = "rotate(0deg)";

          event.target.style.backgroundImage = "url(http://172.17.147.2/staff/img/pen.png)"; // event.target.parentNode.children[0].children[0].setAttribute("disabled","disabled");

          event.target.parentNode.children[1].children[0].setAttribute("disabled", "disabled");
          event.target.parentNode.children[2].children[0].setAttribute("disabled", "disabled");
          event.target.parentNode.children[3].children[0].setAttribute("disabled", "disabled");
          event.target.parentNode.nextSibling.style.display = "none";
          event.target.parentNode.nextSibling.innerHTML = "";
          footer.innerHTML = "查看信息";
        }
      } // console.log( event.target.parentNode)
      // console.log(event.target.parentNode.nextSibling)

    }
  }

  function deepClone(target, source) {
    var target = target || {};

    for (var prop in source) {
      if (_typeof(source[prop]) === "object") {
        target[prop] = source[prop].constructor === "Array" ? [] : {};
        deepClone(target[prop], source[prop]);
      } else {
        target[prop] = source[prop];
      }
    }

    return target;
  }

  function logOut() {
    if (sessionStorage.logInStatus) {
      if (confirm("确定要退出当前登录？")) {
        sessionStorage.removeItem("logInStatus");
        sessionStorage.showStatus = 0;
        location.reload();
      }
    } else {
      footer.innerHTML = "这没登录,去登录吧,就算你登录了这也没什么可管理的，也就能再退出，是不是很闲？";
    }
  } //点击登录按钮执行 login函数


  loginButton.onclick = login; //点击添加新员

  addBtn.onclick = addData; //添加一条学习经历

  addExperienceBox.onclick = addExperience; //删除一条学习经历

  deleteExperienceBox.onclick = deleteExperience; //关闭添加信息模态框

  closeModalBtn.onclick = closeModal;
  sendStaffInfoBtn.onclick = sendStaffInfo; //新添员工失败，number重复，是否更新页面

  upDataBtn.onclick = upData; //点击查看信息 打开查看信息模态框

  viewInfomationBtn.onclick = viewInfomation; //关闭查看信息模态框	

  closeViewModalBtn.onclick = closeViewModal; //吸顶   不过实现的很low

  viewInfoBox.onscroll = lockTop; //点击查询按钮

  searchBtn.onclick = search; //输入框输入数据

  searchInput.onkeyup = search; //登出

  userIcon.onclick = logOut;
};