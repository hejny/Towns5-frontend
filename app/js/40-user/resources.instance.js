/**
 * @author ©Towns.cz
 * @fileOverview Load my resources
 * todo (static) object of me
 */
//======================================================================================================================
T.setNamespace("User");

T.User.resources = new T.Resources({
  wood: 10000,
  clay: 10000,
  stone: 10000,
  iron: 10000,
});

// todo movo to other file
$(function () {
  //$('#resources').html(resources.toHTML());//todo maybe sync resources with
  //callback
});
