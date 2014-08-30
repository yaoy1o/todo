/**
 * New node file
 */

function testController($scope){
	$scope.title='angular test title';

}

function repeatTestController($scope){
	$scope.items=[
			{name:'dddd',value:'ddddd',myclass:"img-circle",isShowBtn:true},
			{name:'aaaa',value:'aaaaa',myclass:'img-thumbnail'},
			{name:'项目构建工具',value:' Bootstrap 编码规范：编写灵活、稳定、高质量的 HTML 和 CSS 代码的规范。',myclass:'img-rounded'}
	];
}
 
$(document).ready(function(){
  
 
	$("#link1").click(function(){
// 		  alert("dddddd");
		   
			$("#menu1").append($("#link1").clone(true));
// 		  $("#menu1").append('<li id="link1"><a href="#">Link</a></li>');
		});
	

	$("#addView").click(function(){
			var myView=$("#myView"); 
			var myViewClone=myView.clone(true);
			var myViewContainer=$("#myViewContainer");
			myViewContainer.append(myViewClone);
		

	});
});