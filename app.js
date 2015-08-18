$(window).scroll(function() {
if ($(this).scrollTop() > 20){  
    $('header').addClass("sticky");
  }
  else{
    $('header').removeClass("sticky");
  }
});

var TreeModel= Backbone.Model.extend({
	defaults : {'id':'', 'name': '', 'icon':''},

	badgeCall: function(){
		var model = this;
		$.ajax({
		  url: "http://teamtreehouse.com/richardjohnson5.json",
		  beforeSend: function( xhr ) {
		    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
		  }
		})
		  .done(function( data, view ) {
		  	
		  	var results= JSON.parse(data)
		    console.log(results.badges.length)
		    for (var i=0; i<results.badges.length; i++){
		    	model.set({'id': results.badges[i].id, 'name': results.badges[i].name, 'icon': results.badges[i].icon_url})
		    	console.log('hello')
		    	// $('#badges').append(view.$el)
		    }

		  });
	}

})


var TreeView= Backbone.View.extend({
	tagName: 'p',
	render: function (){
		console.log('hello1')
		var name = this.model.get('name')
		var id = this.model.get('id')
		var icon = this.model.get('icon')
		this.$el=$('#badges');
		this.$el.append('<p> <img class="badge_img" src="'+ icon+ '">'+name+ '</p>')
	},
	 initialize: function () {
            this.model.on("change", this.render, this);
        }
})

var treeModel = new TreeModel({})
var treeView = new TreeView({model: treeModel})

treeModel.badgeCall();


