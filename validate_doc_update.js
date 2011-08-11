function (newDoc, oldDoc, userCtx) {
  function forbidden(message) {    
    throw({forbidden : message});
  };
  
  function unauthorized(message) {
    throw({unauthorized : message});
  };

  if ((userCtx.roles.indexOf('_admin') == -1) 
      && (userCtx.roles.indexOf('hf_admins') == -1)) {
    // admin can edit anything, only check when not admin...
    if (newDoc._deleted) {
      forbidden("You must be an administrator to delete a document.");
    } else if (userCtx.roles.indexOf('hf_writers') == -1) {
      forbidden("You must have write access to change a document.");
    }
  }
};
