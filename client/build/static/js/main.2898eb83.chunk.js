(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{378:function(e,a,t){e.exports=t(600)},383:function(e,a,t){},568:function(e,a,t){},600:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),o=t(93),r=t.n(o),c=(t(383),t(27)),i=t(28),s=t(32),d=t(29),u=t(31),h=t(63),m=t(619),g=t(611),p=(t(241),t(33)),f=t.n(p),E=t(608),b=t(614),C=t(622),w=t(618),v=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(d.a)(a).call(this,e))).handleItemClick=function(e,a){var n=a.name;console.log("name = "+n),t.setState({activePage:n})},t.handleLogoutItemClick=function(e,a){a.name;console.log("Logging out"),f.a.get("/users/logout"),window.location="/"},t.state={activePage:"home",isAdmin:-1},t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"componentWillMount",value:function(){var e=this;f.a.get("/api/isloggedin").then(function(a){a.data.isAdmin?e.setState({isAdmin:1}):e.setState({isAdmin:0})}).catch(function(e){console.log(e)})}},{key:"adminMenu",value:function(){var e=this.state.activePage.activePage;return l.a.createElement(b.a,{text:"Admin",name:"admin",pointing:!0,className:"link item"},l.a.createElement(b.a.Menu,null,l.a.createElement(b.a.Item,{as:E.a,to:"/admin/users",name:"adminusers",content:"Users",onClick:this.handleItemClick}),l.a.createElement(b.a.Item,{as:E.a,to:"/admin/courses",name:"admincourses",content:"Courses",onClick:this.handleItemClick}),l.a.createElement(b.a.Item,{as:E.a,to:"/admin/tours",name:"admintours",content:"Tours",active:"admintours"===e,onClick:this.handleItemClick})))}},{key:"render",value:function(){var e=this.state.activePage.activePage;return l.a.createElement(C.a,{inverted:!0},l.a.createElement(w.a,{inverted:!0,pointing:!0,secondary:!0},l.a.createElement(w.a.Item,{as:E.a,to:"/home",name:"home",content:"Home",active:"home"===e,onClick:this.handleItemClick}),this.props.getIsAdmin&&this.adminMenu(),l.a.createElement(w.a.Item,{className:"right menu",name:"logout",content:"Logout",active:"logout"===e,onClick:this.handleLogoutItemClick})))}}]),a}(n.Component),k=t(620),O=t(624),j=t(612),S=t(617),y=t(613),N=t(616),I=t(623),H=t(626),M=function(e){function a(){var e,t;Object(c.a)(this,a);for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];return(t=Object(s.a)(this,(e=Object(d.a)(a)).call.apply(e,[this].concat(l)))).state={email:"",password:"",submitting:!1,unknownuser:!1,success:!1},t.close=function(){t.setState({unknownuser:!1,password:""})},t.handleEmailChange=function(e){t.setState({email:e.target.value})},t.handlePasswordChange=function(e){t.setState({password:e.target.value})},t.handleSubmit=function(){t.setState({submitting:!0}),f.a.post("/users/login/",{email:t.state.email,password:t.state.password}).then(function(e){!1===e.data.user?t.setState({unknownuser:!0}):(t.setState({success:!0}),t.props.changeLoggedIn(e.data.user.is_admin))}).catch(function(e){console.log(e)}),t.setState({submitting:!1})},t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){if(!0===this.state.success)return l.a.createElement(I.a,{to:"/home"});var e={color:"black",backgroundImage:"url(./hole.png)",backgroundSize:"cover",height:"100vh",textAlign:"center",fontSize:"400px"};return l.a.createElement("div",{style:e},l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("h1",{fontSize:"400px"},"Holan"),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(k.a,{centered:!0,columns:2},l.a.createElement(k.a.Column,null,l.a.createElement(O.a,{as:"h2",textAlign:"center",color:"violet"}),l.a.createElement(C.a,null,l.a.createElement(j.a,{size:"large"},l.a.createElement(j.a.Input,{fluid:!0,icon:"user",iconPosition:"left",placeholder:"Email address",value:this.state.email,onChange:this.handleEmailChange}),l.a.createElement(j.a.Input,{fluid:!0,icon:"lock",iconPosition:"left",placeholder:"Password",type:"password",value:this.state.password,onChange:this.handlePasswordChange}),l.a.createElement(S.a,{color:"blue",fluid:!0,size:"large",onClick:this.handleSubmit},"Login"))))),l.a.createElement(y.a,{id:"loginErrorModal",size:"tiny",open:this.state.unknownuser,onClose:this.close},l.a.createElement(y.a.Content,null,l.a.createElement(N.a,{error:!0,header:"Unknown username or password",content:"You can only log in with valid account."}))))}}]),a}(n.Component),A=Object(H.a)(M),x=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(d.a)(a).call(this,e))).state={},t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;f.a.get("/api/isloggedin").then(function(a){a.data.loggedIn?e.props.changeLoggedIn(a.data.isAdmin):e.props.history.push({pathname:"/",state:{user:a.data}})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"Home..."))}}]),a}(n.Component),P=Object(H.a)(x),D=t(121),L=t(366),q=t(610),z=t(609),F=(t(568),function(e){function a(){return Object(c.a)(this,a),Object(s.a)(this,Object(d.a)(a).apply(this,arguments))}return Object(u.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("div",{className:"loader"}),l.a.createElement("br",null),l.a.createElement("p",{style:{textAlign:"center"}},"Hinkra\xf0u augnablik ..."))}}]),a}(n.Component)),U=RegExp(/^[a-zA-Z0-9.!#$%&\u2019*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),W=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(d.a)(a).call(this,e))).handleNameChange=function(e){t.setState({fullName:e.target.value})},t.handleEmailChange=function(e){t.setState({email:e.target.value})},t.handleHandicapChange=function(e){t.setState({handicap:e.target.value})},t.handlePW1Change=function(e){t.setState({password1:e.target.value})},t.handlePW2Change=function(e){t.setState({password2:e.target.value})},t.handleCheckboxChange=function(e,a){console.log(a.checked),t.setState({isadmin:a.checked})},t.handleChange=function(e){e.preventDefault();var a=e.target,n=a.name,l=a.value,o=Object(L.a)({},t.state.formErrors);switch(n){case"firstName":o.firstName=l.length<3?"minimum 3 characaters required":"";break;case"lastName":o.lastName=l.length<3?"minimum 3 characaters required":"";break;case"email":o.email=U.test(l)?"":"invalid email address";break;case"password":o.password=l.length<6?"minimum 6 characaters required":""}t.setState(Object(D.a)({formErrors:o},n,l),function(){return console.log(t.state)})},t.handleSubmit=function(){t.setState({loading:!0}),f.a.post("/users/createUser",{fullName:t.state.fullName,email:t.state.email,handicap:parseFloat(t.state.handicap),isadmin:t.state.isadmin,password:t.state.password1}).then(function(e){t.setState({fullName:"",email:"",handicap:"",isadmin:!1,password2:""}),t.setState({loading:!1}),console.log(e),t.props.closeModal()}).catch(function(e){console.log(e)})},t.handleCancel=function(){t.props.closeModal()},t.state={fullName:"",email:"",handicap:"",isadmin:!1,password1:"",password2:"",loading:!1,formErrors:Object(D.a)({fullName:"",email:"",handicap:null,password1:""},"password1","")},t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){return this.state.loading?l.a.createElement(F,null):l.a.createElement("div",null,l.a.createElement(j.a,null,l.a.createElement(j.a.Group,{widths:"equal"},l.a.createElement(j.a.Field,{required:!0,name:"fullName",control:q.a,label:"Name",placeholder:"Name",value:this.state.fullMame,onChange:this.handleNameChange}),l.a.createElement(j.a.Field,{required:!0,name:"email",control:q.a,label:"Email",placeholder:"Email",value:this.state.email,onChange:this.handleEmailChange}),l.a.createElement(j.a.Field,{required:!0,name:"handicap",control:q.a,label:"Handicap",placeholder:"Hcp",width:6,value:this.state.handicap,onChange:this.handleHandicapChange})),l.a.createElement(j.a.Group,{widths:"equal"},l.a.createElement(j.a.Field,{required:!0,name:"password1",control:q.a,label:"Password 1",placeholder:"Password 1",type:"password",value:this.state.password1,onChange:this.handlePW1Change}),l.a.createElement(j.a.Field,{required:!0,name:"password1",control:q.a,label:"Password 2",placeholder:"Password 2",type:"password",value:this.state.password2,onChange:this.handlePW2Change})),l.a.createElement(j.a.Field,{control:z.a,label:"Is admin",placeholder:"Is admin",width:4,checked:this.state.isadmin,onChange:this.handleCheckboxChange}),l.a.createElement(S.a,{primary:!0,onClick:this.handleSubmit},"Submit"),l.a.createElement(S.a,{secondary:!0,onClick:this.handleCancel},"Cancel")))}}]),a}(n.Component),R=t(615),T=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(d.a)(a).call(this,e))).handleAddUser=function(){t.setState({addinguser:!0})},t.state={users:[],addinguser:!1},t.close=t.close.bind(Object(h.a)(Object(h.a)(t))),t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;console.log("admin users..."),f.a.get("/users/getAllUsers").then(function(a){e.setState({users:a.data})}).catch(function(e){console.log(e)})}},{key:"close",value:function(){this.state.addinguser&&this.setState({addinguser:!1})}},{key:"render",value:function(){if(0===this.state.users.length)return l.a.createElement(F,null);var e=this.state.users;return l.a.createElement("div",null,l.a.createElement("h1",null,"Admin Users"),l.a.createElement("br",null),l.a.createElement(S.a,{primary:!0,onClick:this.handleAddUser},"Add new User"),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(R.a,{celled:!0},l.a.createElement(R.a.Header,null,l.a.createElement(R.a.Row,null,l.a.createElement(R.a.HeaderCell,null,"Id"),l.a.createElement(R.a.HeaderCell,null,"Name"),l.a.createElement(R.a.HeaderCell,null,"eMail"),l.a.createElement(R.a.HeaderCell,null,"Handicap"),l.a.createElement(R.a.HeaderCell,null,"Is admin"))),l.a.createElement(R.a.Body,null,e.map(function(e){return l.a.createElement(R.a.Row,{key:e.id},l.a.createElement(R.a.Cell,{collapsing:!0},e.id),l.a.createElement(R.a.Cell,null,e.full_name),l.a.createElement(R.a.Cell,null,e.email),l.a.createElement(R.a.Cell,null,e.handicap),l.a.createElement(R.a.Cell,null,JSON.stringify(e.is_admin)))}))),l.a.createElement(y.a,{id:"adminUsersModal",open:this.state.addinguser,onClose:this.close},l.a.createElement(y.a.Header,null,"Create New User"),l.a.createElement(y.a.Content,null,l.a.createElement(W,{closeModal:this.close}))))}}]),a}(n.Component),_=t(342),B=t(367),G=(t(339),t(340),function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(d.a)(a).call(this,e))).checkEditFunction=function(e){return console.log(e.column),"rowname"!==e.column.colId},t.handleSubmit=function(){console.log("xxxxxxxxxxxxx  "+t.props.courseId),t.setState({loading:!0}),f.a.post("/api/addholes",{courseId:t.props.courseId,rowData:t.state.rowData}).then(function(e){console.log(e),t.setState({loading:!1}),t.props.closeModal()}).catch(function(e){console.log(e),t.props.closeModal()})},t.handleCancel=function(){t.props.closeModal()},t.state={courseId:"",loading:!1,country:"",courseName:"",tee:"",columnDefs:[{headerName:"",field:"rowname"},{headerName:"H1",field:"h1",width:40},{headerName:"H2",field:"h2",width:40},{headerName:"H3",field:"h3",width:40},{headerName:"H4",field:"h4",width:40},{headerName:"H5",field:"h5",width:40},{headerName:"H6",field:"h6",width:40},{headerName:"H7",field:"h7",width:40},{headerName:"H8",field:"h8",width:40},{headerName:"H9",field:"h9",width:40},{headerName:"H10",field:"h10",width:40},{headerName:"H11",field:"h11",width:40},{headerName:"H12",field:"h12",width:40},{headerName:"H13",field:"h13",width:40},{headerName:"H14",field:"h14",width:40},{headerName:"H15",field:"h15",width:40},{headerName:"H16",field:"h16",width:40},{headerName:"H17",field:"h17",width:40},{headerName:"H18",field:"h18",width:40}],rowData:[{rowname:"Par",h1:"",h2:"",h3:"",h4:"",h5:"",h6:"",h7:"",h8:"",h9:"",h10:"",h11:"",h12:"",h13:"",h14:"",h15:"",h16:"",h17:"",h18:""},{rowname:"Hcp",h1:"",h2:"",h3:"",h4:"",h5:"",h6:"",h7:"",h8:"",h9:"",h10:"",h11:"",h12:"",h13:"",h14:"",h15:"",h16:"",h17:"",h18:""}],defaultColDef:{resizable:!1,editable:t.checkEditFunction,width:70,suppressMovable:!0}},t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;console.log("cccccccccc  "+this.props.courseId),f.a.post("/api/getholes",{courseId:this.props.courseId}).then(function(a){console.log(a.data),0===a.data.length&&console.log("no holes for course"),e.setState({loading:!1})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){return this.state.loading?l.a.createElement(F,null):l.a.createElement("div",null,l.a.createElement("h1",null,"Edit holes "),l.a.createElement("br",null),l.a.createElement(B.AgGridReact,{columnDefs:this.state.columnDefs,defaultColDef:this.state.defaultColDef,rowData:this.state.rowData}),l.a.createElement("br",null),l.a.createElement(S.a,{primary:!0,onClick:this.handleSubmit},"Submit"),l.a.createElement(S.a,{secondary:!0,onClick:this.handleCancel},"Cancel"))}}]),a}(n.Component)),J=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(d.a)(a).call(this,e))).handleSubmit=function(){t.setState({loading:!0}),f.a.post("/api/addcourse",{courseName:t.state.courseName,tee:t.state.tee,country:t.state.country,holes:t.state.rowData}).then(function(e){console.log(e),t.setState({loading:!1}),t.props.closeModal()}).catch(function(e){console.log(e)})},t.handleCancel=function(){t.props.closeModal()},t.handleNameChange=function(e){t.setState({courseName:e.target.value})},t.handleTeeChange=function(e){t.setState({tee:e.target.value})},t.handleCountryChange=function(e){t.setState({country:e.target.value})},t.state={country:"",courseName:"",tee:""},t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h1",null,"  Add new Course "),l.a.createElement("br",null),l.a.createElement(j.a,null,l.a.createElement(j.a.Group,null,l.a.createElement(j.a.Field,{required:!0,control:q.a,label:"Name",placeholder:"Name",value:this.state.courseName,onChange:this.handleNameChange}),l.a.createElement(j.a.Field,{required:!0,control:q.a,label:"Tee",placeholder:"Tee",value:this.state.tee,onChange:this.handleTeeChange}),l.a.createElement(j.a.Field,{required:!0,control:q.a,label:"Country",placeholder:"Country",value:this.state.country,onChange:this.handleCountryChange}))),l.a.createElement("br",null),l.a.createElement(S.a,{primary:!0,onClick:this.handleSubmit},"Submit"),l.a.createElement(S.a,{secondary:!0,onClick:this.handleCancel},"Cancel"))}}]),a}(n.Component),Z=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(d.a)(a).call(this,e))).closeCreateModal=function(){t.setState({addingcourse:!1})},t.closeHolesModal=function(){t.setState({addingHoles:!1})},t.handleAddCourse=function(){"/admin/createcourse"!==window.location.pathname&&t.setState({addingcourse:!0})},t.editCourse=function(e,a){console.log("cid = "+e),t.setState({courseId:e}),t.setState({courseName:a}),t.setState({addingHoles:!0})},t.state={courses:[],addingcourse:!1,addingHoles:!1,courseId:"",courseName:""},t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"componentDidMount",value:function(){var e=this;f.a.get("/api/getallcourses").then(function(a){e.setState({courses:a.data}),console.log(a.data)}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this;if(0===this.state.courses.length)return l.a.createElement(F,null);var a=this.state.courses;return l.a.createElement("div",null,l.a.createElement(S.a,{primary:!0,onClick:this.handleAddCourse},"Add new Course"),l.a.createElement("br",null),l.a.createElement("br",null),l.a.createElement(R.a,{celled:!0},l.a.createElement(R.a.Header,null,l.a.createElement(R.a.Row,null,l.a.createElement(R.a.HeaderCell,{width:"1"},"Edit"),l.a.createElement(R.a.HeaderCell,{width:"3"},"Name"),l.a.createElement(R.a.HeaderCell,{width:"2"},"Tee"),l.a.createElement(R.a.HeaderCell,{width:"3"},"Country"))),l.a.createElement(R.a.Body,null,a.map(function(a){return l.a.createElement(R.a.Row,{key:a.id},l.a.createElement(R.a.Cell,null,l.a.createElement(_.a,{name:"edit",link:!0,onClick:function(){return e.editCourse(a.id,a.course_name)}})),l.a.createElement(R.a.Cell,null,a.course_name),l.a.createElement(R.a.Cell,null,a.tee),l.a.createElement(R.a.Cell,null,a.country))}))),l.a.createElement(y.a,{size:"fullscreen",open:this.state.addingcourse,onClose:this.closeCreateModal},l.a.createElement(y.a.Header,null,"Add new course"),l.a.createElement(y.a.Content,null,l.a.createElement(J,{closeModal:this.closeCreateModal}))),l.a.createElement(y.a,{size:"fullscreen",open:this.state.addingHoles,onClose:this.close},l.a.createElement(y.a.Header,null,this.state.courseName),l.a.createElement(y.a.Content,null,l.a.createElement(G,{closeModal:this.closeHolesModal,courseId:this.state.courseId,courseName:this.state.courseName}))))}}]),a}(n.Component),$=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(s.a)(this,Object(d.a)(a).call(this,e))).state={isLoggedIn:!1,isAdmin:!1,showMenu:!0},t.changeLoggedIn=t.changeLoggedIn.bind(Object(h.a)(Object(h.a)(t))),t.toggleShowMenu=t.toggleShowMenu.bind(Object(h.a)(Object(h.a)(t))),t}return Object(u.a)(a,e),Object(i.a)(a,[{key:"changeLoggedIn",value:function(e){this.setState({isLoggedIn:!0}),this.setState({isAdmin:e})}},{key:"toggleShowMenu",value:function(e){this.setState({showMenu:e})}},{key:"componentDidMount",value:function(){var e=this;f.a.get("/api/isloggedin").then(function(a){a.data.loggedIn&&e.setState({isLoggedIn:a.data.loggedIn,isAdmin:a.data.isAdmin})}).catch(function(e){console.log(e)})}},{key:"render",value:function(){var e=this;return this.state.isLoggedIn?l.a.createElement(m.a,null,l.a.createElement("div",null,this.state.showMenu&&l.a.createElement(v,{getIsAdmin:this.state.isAdmin}),l.a.createElement("div",{id:"mainView"},l.a.createElement(g.a,{exact:!0,path:"/home",render:function(a){return l.a.createElement(P,Object.assign({},a,{changeLoggedIn:e.changeLoggedIn}))}}),l.a.createElement(g.a,{exact:!0,path:"/admin/users",component:T}),l.a.createElement(g.a,{exact:!0,path:"/admin/adduser",component:W}),l.a.createElement(g.a,{exact:!0,path:"/admin/courses",component:Z}),l.a.createElement(g.a,{exact:!0,path:"/admin/createcourse",render:function(a){return l.a.createElement(G,Object.assign({},a,{toggleShowMenu:e.toggleShowMenu}))}})))):l.a.createElement(m.a,null,l.a.createElement("div",null,l.a.createElement(g.a,{exact:!0,path:"/",render:function(a){return l.a.createElement(A,Object.assign({},a,{changeLoggedIn:e.changeLoggedIn}))}})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement($,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[378,2,1]]]);
//# sourceMappingURL=main.2898eb83.chunk.js.map