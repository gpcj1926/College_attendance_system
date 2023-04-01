const supabase = require("./_supabase");

/**** USERS ****/

// Get user by uid
function getUser(uid) {
  return supabase.from("users").select("*").eq("id", uid).single().then(handle);
}

/**** HELPERS ****/

// Get response data or throw error if there is one
function handle(response) {
  if (response.error) throw response.error;
  return response.data;
}

module.exports = {
  getUser
};
