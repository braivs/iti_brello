(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{106:function(t,e,n){},107:function(t,e,n){},136:function(t,e,n){"use strict";n.r(e);var c=n(0),a=n.n(c),i=n(10),o=n.n(i);n(106),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));n(107);var r,s,l=n(182),d=n(183),u=n(184),j=n(175),b=n(138),O=n(178),f=n(186),h=n(187),T=n(185),m=n(17),p=n(8),v=n(59),g=n(81),x=n.n(g).a.create(Object(p.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"api-key":"06e9c310-f07c-441a-811c-ffc5ac00e636"}})),k=function(){return x.get("todo-lists")},S=function(t){return x.post("todo-lists",{title:t})},I=function(t){return x.delete("todo-lists/".concat(t))},E=function(t,e){return x.put("todo-lists/".concat(t),{title:e})},y=function(t){return x.get("todo-lists/".concat(t,"/tasks"))},C=function(t,e){return x.post("/todo-lists/".concat(t,"/tasks"),{title:e})},L=function(t,e){return x.delete("todo-lists/".concat(t,"/tasks/").concat(e))},D=function(t,e,n){return x.put("/todo-lists/".concat(t,"/tasks/").concat(e),n)},w=function(t){return x.post("auth/login",t)},A=function(){return x.delete("auth/login")},P=function(){return x.get("auth/me")};!function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(r||(r={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(s||(s={}));var N=function(t,e){t.messages.length?e(M(t.messages[0])):e(M("Some error occurred")),e(H("failed"))},R=function(t,e){e(M(t.message?t.message:"Some error occurred")),e(H("failed"))},F={isLoggedIn:!1},G=function(t){return{type:"login/SET-IS-LOGGED-IN",value:t}},K={status:"idle",error:null,isInitialized:!1},M=function(t){return{type:"APP/SET-ERROR",error:t}},H=function(t){return{type:"APP/SET-STATUS",status:t}},U=function(t){return{type:"APP/SET-IS-INITIALIZED",value:t}},V=[],q=function(t,e){return{type:"CHANGE-TODOLIST-ENTITY-STATUS",status:t,id:e}},z=n(36),B={},J=function(t,e,n){return function(c,a){var i=a().tasks[n].find((function(e){return e.id===t}));if(i){var o=Object(p.a)({deadline:i.deadline,description:i.description,priority:i.priority,startDate:i.startDate,title:i.title,status:i.status},e);D(n,t,o).then((function(a){if(0===a.data.resultCode){var i={type:"UPDATE-TASK",taskID:t,model:e,todoListID:n};c(i)}else N(a.data,c)})).catch((function(t){R(t,c)}))}else console.warn("task not found it the state")}},W=n(179),Y=n(137),Z=n(44),$=n(188),_=n(176),Q=n(3),X=a.a.memo((function(t){var e=t.addItem,n=t.disabled,a=void 0!==n&&n,i=Object(c.useState)(""),o=Object(Z.a)(i,2),r=o[0],s=o[1],l=Object(c.useState)(!1),d=Object(Z.a)(l,2),u=d[0],b=d[1],O=function(){var t=r.trim();t?e(t):b(!0),s("")},f=u?Object(Q.jsx)("div",{style:{color:"red"},children:"Title is required!"}):null;return Object(Q.jsxs)("div",{children:[Object(Q.jsx)($.a,{variant:"outlined",disabled:a,error:!!u,value:r,onChange:function(t){s(t.currentTarget.value),null!==u&&b(!1)},onKeyPress:function(t){"Enter"===t.key&&O()},label:"Text",helperText:f}),Object(Q.jsx)(j.a,{color:"primary",onClick:O,disabled:a,children:Object(Q.jsx)(_.a,{})})]})})),tt=n(91),et=n(170),nt=a.a.memo((function(t){console.log("EditableSpan called");var e=Object(c.useState)(t.title),n=Object(Z.a)(e,2),a=n[0],i=n[1],o=Object(c.useState)(!1),r=Object(Z.a)(o,2),s=r[0],l=r[1],d=function(){l(!1),t.changeTitle(a)};return s?Object(Q.jsx)(et.a,{color:"primary",value:a,autoFocus:!0,onBlur:d,onChange:function(t){return i(t.currentTarget.value)},onKeyPress:function(t){"Enter"===t.key&&d()}}):Object(Q.jsx)("span",{onDoubleClick:function(){return l(!0)},children:t.title})})),ct=n(177),at=n(190),it=a.a.memo((function(t){return Object(Q.jsxs)("div",{className:t.task.status===r.Completed?"is-done":"",children:[Object(Q.jsx)(at.a,{checked:t.task.status===r.Completed,color:"primary",onChange:function(e){var n=e.currentTarget.checked;t.changeTaskStatus(t.task.id,n?r.Completed:r.New,t.todolistId)}}),Object(Q.jsx)(nt,{title:t.task.title,changeTitle:function(e){t.changeTaskTitle(t.task.id,e,t.todolistId)}}),Object(Q.jsx)(j.a,{onClick:function(){t.removeTask(t.task.id,t.todolistId)},children:Object(Q.jsx)(ct.a,{})})]},t.task.id)})),ot=["demo"],rt=a.a.memo((function(t){var e=t.demo,n=void 0!==e&&e,a=Object(tt.a)(t,ot);console.log("Todolist");var i=Object(m.b)();Object(c.useEffect)((function(){if(!n){var t,e=(t=a.todolist.id,function(e){e(H("loading")),y(t).then((function(n){var c=n.data.items;e(function(t,e){return{type:"SET-TASKS",tasks:t,todolistId:e}}(c,t)),e(H("succeeded"))}))});i(e)}}),[]);var o=a.tasks,s=o;"active"===a.todolist.filter&&(s=o.filter((function(t){return t.status===r.New}))),"completed"===a.todolist.filter&&(s=o.filter((function(t){return t.status===r.Completed})));var l=s.map((function(t){return Object(Q.jsx)(it,{todolistId:a.todolist.id,task:t,changeTaskStatus:a.changeTaskStatus,changeTaskTitle:a.changeTaskTitle,removeTask:a.removeTask},t.id)})),d=Object(c.useCallback)((function(t){return a.addTask(t,a.todolist.id)}),[a.addTask,a.todolist.id]),u=Object(c.useCallback)((function(t){return a.changeTodoListTitle(t,a.todolist.id)}),[]),b=Object(c.useCallback)((function(){return a.changeFilter("all",a.todolist.id)}),[]),f=Object(c.useCallback)((function(){return a.changeFilter("active",a.todolist.id)}),[]),h=Object(c.useCallback)((function(){return a.changeFilter("completed",a.todolist.id)}),[]);return Object(Q.jsxs)("div",{children:[Object(Q.jsxs)("h3",{children:[Object(Q.jsx)(nt,{title:a.todolist.title,changeTitle:u}),Object(Q.jsx)(j.a,{onClick:function(){a.removeTodoList(a.todolist.id)},disabled:"loading"===a.todolist.entityStatus,children:Object(Q.jsx)(ct.a,{})})]}),Object(Q.jsx)(X,{addItem:d,disabled:"loading"===a.todolist.entityStatus}),l,Object(Q.jsxs)("div",{children:[Object(Q.jsx)(O.a,{variant:"all"===a.todolist.filter?"outlined":"text",onClick:b,color:"default",children:"All"}),Object(Q.jsx)(O.a,{variant:"active"===a.todolist.filter?"outlined":"text",onClick:f,color:"primary",children:"Active"}),Object(Q.jsx)(O.a,{variant:"completed"===a.todolist.filter?"outlined":"text",onClick:h,color:"secondary",children:"Completed"})]})]})})),st=n(14),lt=function(t){var e=t.demo,n=void 0!==e&&e,a=Object(m.c)((function(t){return t.todolists})),i=Object(m.c)((function(t){return t.tasks})),o=Object(m.c)((function(t){return t.auth.isLoggedIn})),r=Object(m.b)();Object(c.useEffect)((function(){if(!n&&o){var t=function(t){t(H("loading")),k().then((function(e){t({type:"SET-TODOLISTS",todolists:e.data}),t(H("succeeded"))})).catch((function(e){R(e,t)}))};r(t)}}),[]);var s=Object(c.useCallback)((function(t,e){var n,c,a=(n=t,c=e,function(t){L(c,n).then((function(e){var a=function(t,e){return{type:"REMOVE-TASK",tasksId:t,todolistId:e}}(n,c);t(a)})).catch((function(e){R(e,t)}))});r(a)}),[]),l=Object(c.useCallback)((function(t,e){var n=function(t,e){return function(n){n(H("loading")),C(e,t).then((function(t){if(0===t.data.resultCode){var e={type:"ADD-TASK",task:t.data.data.item};n(e),n(H("succeeded"))}else N(t.data,n)})).catch((function(t){R(t,n)}))}}(t,e);r(n)}),[]),d=Object(c.useCallback)((function(t,e,n){var c=J(t,{status:e},n);r(c)}),[]),u=Object(c.useCallback)((function(t,e,n){var c=J(t,{title:e},n);r(c)}),[]),j=Object(c.useCallback)((function(t,e){var n=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",filter:t,id:e}}(t,e);r(n)}),[]),b=Object(c.useCallback)((function(t){var e,n=(e=t,function(t){t(H("loading")),t(q("loading",e)),I(e).then((function(n){t(function(t){return{type:"REMOVE-TODOLIST",id:t}}(e)),t(H("succeeded"))})).catch((function(n){R(n,t),t(q("idle",e))}))});r(n)}),[]),O=Object(c.useCallback)((function(t,e){var n=function(t,e){return function(n){E(e,t).then((function(c){0===c.data.resultCode?n(function(t,e){return{type:"CHANGE-TODOLIST-TITLE",title:t,id:e}}(t,e)):N(c.data,n)})).catch((function(t){R(t,n)}))}}(t,e);r(n)}),[]),f=Object(c.useCallback)((function(t){var e=function(t){return function(e){e(H("loading")),S(t).then((function(t){0===t.data.resultCode?(e({type:"ADD-TODOLIST",todolist:t.data.data.item}),e(H("succeeded"))):N(t.data,e)})).catch((function(t){R(t,e)}))}}(t);r(e)}),[r]);return o?Object(Q.jsxs)(Q.Fragment,{children:[Object(Q.jsx)(W.a,{container:!0,style:{padding:"20px"},children:Object(Q.jsx)(X,{addItem:f})}),Object(Q.jsx)(W.a,{container:!0,spacing:3,children:a.map((function(t){return Object(Q.jsx)(W.a,{item:!0,children:Object(Q.jsx)(Y.a,{style:{padding:"10px"},children:Object(Q.jsx)(rt,{todolist:t,tasks:i[t.id],removeTask:s,changeFilter:j,addTask:l,changeTaskStatus:d,removeTodoList:b,changeTaskTitle:u,changeTodoListTitle:O,demo:n},t.id)})},t.id)}))})]}):Object(Q.jsx)(st.a,{to:"login"})},dt=n(192),ut=n(189);function jt(t){return Object(Q.jsx)(ut.a,Object(p.a)({elevation:6,variant:"filled"},t))}function bt(){var t=Object(m.c)((function(t){return t.app.error})),e=Object(m.b)(),n=function(t,n){"clickaway"!==n&&e(M(null))},c=null!==t;return Object(Q.jsx)(dt.a,{open:c,autoHideDuration:6e3,onClose:n,children:Object(Q.jsx)(jt,{onClose:n,severity:"error",children:t})})}var Ot=n(50),ft=n(193),ht=n(174),Tt=n(180),mt=n(181),pt=n(90),vt=function(){var t=Object(m.b)(),e=Object(m.c)((function(t){return t.auth.isLoggedIn})),n=Object(pt.a)({validate:function(t){return t.email?t.password?void 0:{password:"Password if required"}:{email:"Email if required"}},initialValues:{email:"",password:"",rememberMe:!1},onSubmit:function(e){var n;t((n=e,function(t){t(H("loading")),w(n).then((function(e){0===e.data.resultCode?(t(G(!0)),t(H("succeeded"))):N(e.data,t)})).catch((function(e){R(e,t)}))}))}});return e?Object(Q.jsx)(st.a,{to:"/"}):Object(Q.jsx)(W.a,{container:!0,justify:"center",children:Object(Q.jsx)(W.a,{item:!0,xs:4,children:Object(Q.jsx)("form",{onSubmit:n.handleSubmit,children:Object(Q.jsxs)(ft.a,{children:[Object(Q.jsxs)(ht.a,{children:[Object(Q.jsxs)("p",{children:["To log in get registered ",Object(Q.jsx)("a",{href:"https://social-network.samuraijs.com/",target:"_blank",children:"here"})]}),Object(Q.jsx)("p",{children:"or use common test account credentials:"}),Object(Q.jsx)("p",{children:"Email: free@samuraijs.com"}),Object(Q.jsx)("p",{children:"Password: free"})]}),Object(Q.jsxs)(Tt.a,{children:[Object(Q.jsx)($.a,Object(p.a)({label:"Email",margin:"normal"},n.getFieldProps("email"))),n.errors.email?Object(Q.jsx)("div",{children:n.errors.email}):null,Object(Q.jsx)($.a,Object(p.a)({type:"password",label:"Password",margin:"normal"},n.getFieldProps("password"))),n.errors.password?Object(Q.jsx)("div",{children:n.errors.password}):null,Object(Q.jsx)(mt.a,{label:"Remember me",control:Object(Q.jsx)(at.a,Object(p.a)(Object(p.a)({},n.getFieldProps("rememberMe")),{},{checked:n.values.rememberMe}))}),Object(Q.jsx)(O.a,{type:"submit",variant:"contained",color:"primary",children:"Login"})]})]})})})})};var gt=function(t){var e=t.demo,n=void 0!==e&&e,a=Object(m.c)((function(t){return t.app.status})),i=Object(m.c)((function(t){return t.app.isInitialized})),o=Object(m.c)((function(t){return t.auth.isLoggedIn})),r=Object(m.b)();Object(c.useEffect)((function(){r((function(t){P().then((function(e){0===e.data.resultCode&&(t(G(!0)),t(U(!0))),t(U(!0))}))}))}),[]);var s=Object(c.useCallback)((function(){r((function(t){t(H("loading")),A().then((function(e){0===e.data.resultCode?(t(G(!1)),t(H("succeeded"))):N(e.data,t)})).catch((function(e){R(e,t)}))}))}),[]);return i?Object(Q.jsx)(Ot.a,{children:Object(Q.jsxs)("div",{className:"App",children:[Object(Q.jsx)(bt,{}),Object(Q.jsxs)(d.a,{position:"static",children:[Object(Q.jsxs)(u.a,{children:[Object(Q.jsx)(j.a,{edge:"start",color:"inherit","aria-label":"menu",children:Object(Q.jsx)(T.a,{})}),Object(Q.jsx)(b.a,{variant:"h6",children:"News"}),o&&Object(Q.jsx)(O.a,{color:"inherit",onClick:s,children:"Log out"})]}),"loading"===a&&Object(Q.jsx)(f.a,{})]}),Object(Q.jsxs)(h.a,{fixed:!0,children:[Object(Q.jsx)(st.b,{exact:!0,path:"/",render:function(){return Object(Q.jsx)(lt,{demo:n})}}),Object(Q.jsx)(st.b,{path:"/login",render:function(){return Object(Q.jsx)(vt,{})}})]})]})}):Object(Q.jsx)("div",{style:{position:"fixed",top:"30%",textAlign:"center",width:"100%"},children:Object(Q.jsx)(l.a,{})})},xt=n(60),kt=n(89),St=Object(xt.b)({tasks:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TASK":return Object(p.a)(Object(p.a)({},t),{},Object(z.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.tasksId}))));case"ADD-TASK":return Object(p.a)(Object(p.a)({},t),{},Object(z.a)({},e.task.todoListId,[e.task].concat(Object(v.a)(t[e.task.todoListId]))));case"UPDATE-TASK":return Object(p.a)(Object(p.a)({},t),{},Object(z.a)({},e.todoListID,t[e.todoListID].map((function(t){return t.id===e.taskID?Object(p.a)(Object(p.a)({},t),e.model):t}))));case"ADD-TODOLIST":return Object(p.a)(Object(p.a)({},t),{},Object(z.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var n=Object(p.a)({},t);return delete n[e.id],n;case"SET-TODOLISTS":var c=Object(p.a)({},t);return e.todolists.forEach((function(t){c[t.id]=[]})),c;case"SET-TASKS":return Object(p.a)(Object(p.a)({},t),{},Object(z.a)({},e.todolistId,e.tasks));default:return t}},todolists:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:V,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.id}));case"ADD-TODOLIST":return[Object(p.a)(Object(p.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"})].concat(Object(v.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.id?Object(p.a)(Object(p.a)({},t),{},{title:e.title}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.id?Object(p.a)(Object(p.a)({},t),{},{filter:e.filter}):t}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.id?Object(p.a)(Object(p.a)({},t),{},{entityStatus:e.status}):t}));case"SET-TODOLISTS":return e.todolists.map((function(t){return Object(p.a)(Object(p.a)({},t),{},{filter:"all",entityStatus:"idle"})}));default:return t}},app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(p.a)(Object(p.a)({},t),{},{status:e.status});case"APP/SET-ERROR":return Object(p.a)(Object(p.a)({},t),{},{error:e.error});case"APP/SET-IS-INITIALIZED":return Object(p.a)(Object(p.a)({},t),{},{isInitialized:e.value});default:return Object(p.a)({},t)}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(p.a)(Object(p.a)({},t),{},{isLoggedIn:e.value});default:return t}}}),It=Object(xt.c)(St,Object(xt.a)(kt.a));window.store=It,o.a.render(Object(Q.jsx)(m.a,{store:It,children:Object(Q.jsx)(gt,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[136,1,2]]]);
//# sourceMappingURL=main.a7f62fb0.chunk.js.map