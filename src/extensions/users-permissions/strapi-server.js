module.exports = (plugin) => {
  plugin.controllers.user.newOneMethod = async (ctx) => {
    let files = {} //object to hold the files uploaded from the body
    let deleted = {} //display what was deleted
    let currentUserID = ctx.state.user.id
    let user = await strapi.entityService.findOne('plugin::users-permissions.user', currentUserID, {populate : {cover : true, profile : true}})

    
    console.log('user ', ctx.state.user)
    console.log('body ', ctx.request.body)
    console.log('files ', ctx.request.files)
    //update the file object if files are sent in the request
    if(ctx.request.files.profile){
      files["profile"] = ctx.request.files.profile
      if(user.profile?.id) deleted["profile"] = await strapi.entityService.delete('plugin::upload.file', user.profile.id)
    } 
    if(ctx.request.files.cover){
      files["cover"] = ctx.request.files.cover
      if(user.cover?.id) deleted["cover"] = await strapi.entityService.delete('plugin::upload.file', user.profile.id)
    } 

    //testing-----------------------------------------------------------------------------
    //get user
    
    try{
      //update user
      let updatedUser = await strapi.entityService.update('plugin::users-permissions.user', currentUserID, {
        "data" : ctx.request.body, 
        "files" : files
      });

      //get updated user
      updatedUser = await strapi.entityService.findOne('plugin::users-permissions.user', currentUserID,{
        populate : {
          cover : true,
          profile : true
        }
      });

      console.log('updatedUser ', updatedUser, 'deleted ', deleted);
      ctx.response.status = 201;
      ctx.send({data : updatedUser});

    }catch(e){
      console.log(e.message, e.msg)
    }
  }
  
  plugin.routes['content-api'].routes.push({
          "method": "POST",
          "path": "/bob",
          "handler": "user.newOneMethod"
  })

  return plugin
}