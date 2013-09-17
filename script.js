$(function(){

    //model
    var Language = Backbone.Model.extend({

        defaults:{
            title: 'Programming languages',
            checked: false
        },

        //function for checking/unchecking checkbox
        toggle: function(){
            this.set('checked', !this.get('checked'));
        }
    });

    //collection
    var LanguageList = Backbone.Collection.extend({

        model: Language,

        // Return an checked array 
        getChecked: function(){
            return this.where({checked:true});
        }
    });  

	//languages
    var lang = new LanguageList([
        new Language({ title: 'PHP'}),
        new Language({ title: 'JAVA'}),
        new Language({ title: 'Perl'}),
		new Language({ title: 'ASP'}),
        new Language({ title: 'C/C++'})
    ]);

    //view 
    var LanguageView = Backbone.View.extend({
        tagName: 'li',

        events:{
            'click': 'toggleService'
        },

        initialize: function(){
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){

            //HTML
            this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title'));
            this.$('input').prop('checked', this.model.get('checked'));
            return this;
        },

        toggleService: function(){
            this.model.toggle();
        }
    });

    //view
    var App = Backbone.View.extend({

        el: $('#main'),

        initialize: function(){

            this.total = $('#total span');
            this.list = $('#languages');

            this.listenTo(lang, 'change', this.render);
			
            lang.each(function(service){

                var view = new LanguageView({ model: service });
                this.list.append(view.render().el);

            }, this);
        },

        render: function(){

            var total = 0;

            _.each(lang.getChecked(), function(elem){
				 total ++;
            });

            // show total selected
            this.total.text(''+total);

            return this;
        }
    });

    new App();

});
