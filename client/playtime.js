var getProfile = function () {
  var profileCheck = Misfit.findOne({"rType" : "profile" });
  console.log(profileCheck);
  if(!profileCheck || profileCheck == null || typeof profileCheck == "undefined"){
    if(Meteor.userId()){
      console.log('calling');
      Meteor.call("misfitGetProfile",Meteor.userId());
      return true;
    }
  }else{
    return profileCheck;
  }
  return false;
    // ...
  };
var getDevice = function(){
  var deviceCheck = Misfit.findOne({"deviceType" : {"$exists": true} });
  if(!deviceCheck){
    if(Meteor.userId()){
      Meteor.call("misfitGetDevice",Meteor.userId());
      return true;
    }
  }else{
    return deviceCheck;
  }
  return false;
};
var getSleepData = function(){
  var sleepCheck = Misfit.findOne({"deviceType" : {"$exists": false} ,"summary" : {"$exists": false} , "name" : {"$exists" : false }  });
  console.log(sleepCheck);
  if(!sleepCheck){
    if(Meteor.userId()){
      Meteor.call("misfitSleepData",Meteor.userId());
      return true;
    }
  }else{
    var selectedSleep = Session.get("selectedSleep");
    if(typeof selectedSleep != "undefined" && selectedSleep){
      var r = [];
      sleepCheck.sleeps.filter(function(a){
        console.log(typeof a.datetime);
        console.log(typeof selectedSleep);
        if(a.datetime == selectedSleep){
          console.log('this one');
          r.push(a);
        }

      });
      return r;

    }else{
      return sleepCheck;
    }
    var r = []

  }
  return false;
};

var getSummary = function(){
  var summaryCheck = Misfit.findOne({"summary" : {"$exists": true} });
  console.log(summaryCheck);
  if(!summaryCheck){
    if(Meteor.userId()){
      Meteor.call("misfitGetSummary",Meteor.userId());
      return true;
    }
  }else{
    return summaryCheck;
  }
  return false;
};
Template.misfit.events = {
  'click .sleepData' : function(evt,tmpl){
    console.log(evt);
    console.log(tmpl);
    console.log(this);
    if(typeof this.datetime != "undefined")
      Session.set('selectedSleep',this.datetime);
  }
}

Template.misfit.helpers({
  getProfile: function () {
    return getProfile();
  },
  getDevice:function(){
    return getDevice();
  },
  getSleepData:function(){
    return getSleepData();
  },
  getSummary:function(){
    return getSummary();
  }
});
