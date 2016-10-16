/**
 * Created by Xi on 10/15/2016.
 */
Template.home.created = function(){
};
Template.homeNav.events({
    'click #new': function(e) {
        e.preventDefault();
        Router.go("/new");
    }
});