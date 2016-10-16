/**
 * Created by Xi on 10/15/2016.
 */
Template.home.created = function(){
};
Template.homeNav.events({
    'click #new': function() {
        console.log('going to new event');
        Router.go('new');
    }
});