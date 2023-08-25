import {
  useQuery,
  QueryClient,
  QueryClientProvider as QueryClientProviderBase,
} from "react-query";
import supabase from "./supabase";

// React Query client
const client = new QueryClient();

/**** USERS ****/

// Fetch user data
// Note: This is called automatically in `auth.js` and data is merged into `auth.user`
export function useUser(uid) {
  // Manage data fetching with React Query: https://react-query.tanstack.com/overview
  return useQuery(
    // Unique query key: https://react-query.tanstack.com/guides/query-keys
    ["user", { uid }],
    // Query function that fetches data
    () => supabase.from("users").select().eq("id", uid).single().then(handle),
    // Only call query function if we have a `uid`
    { enabled: !!uid }
  );
}
// Fetch all users
export function useAllUsers() {
  return useQuery(
    "users",
    () => supabase.from("users").select("*").then(handle),
    { enabled: true }
  );
}
// Fetch user data (non-hook)
// Useful if you need to fetch data from outside of a component
export function getUser(uid) {
  return supabase.from("users").select().eq("id", uid).single().then(handle);
}

// Update an existing user
export async function updateUser(uid, data) {
  const response = await supabase
    .from("users")
    .update(data)
    .eq("id", uid)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["user", { uid }]);
  return response;
}

// delete an existing user
export async function deleteUser(uid) {
  const response = await supabase.auth.deleteUser(uid);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["user", { uid }]);
  return response;
}

// Create a new student
export async function createStudent(data) {
  const response = await supabase.from("students").insert([data]).then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["students"]);
  return response;
}

// Fetch all student
export function useAllStudents() {
  return useQuery(
    "students",
    () => supabase.from("students").select("*").then(handle),
    { enabled: true }
  );
}


// Update an student
export async function updateStudent(id, data) {
  const response = await supabase
    .from("students")
    .update(data)
    .eq("id", id)
    .then(handle);
  await Promise.all([
    client.invalidateQueries(["student", { id }]),
    client.invalidateQueries(["students"]),
  ]);
  return response;
}

// Delete an student
export async function deleteStudent(id) {
  const response = await supabase
    .from("students")
    .delete()
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["student", { id }]),
    client.invalidateQueries(["students"]),
  ]);
  return response;
}



//*****************classes data********************

// Fetch all classes by
export function useAllclasses() {
  return useQuery(
    "classes",
    () => supabase.from("classes").select("*").then(handle),
    { enabled: true }
  );
}

// Delete an class
export async function deleteClass(id) {
  const response = await supabase
    .from("classes")
    .delete()
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["classes", { id }]),
    client.invalidateQueries(["classes"]),
  ]);
  return response;
}


// Create a new class
export async function createClass(data) {
  const response = await supabase.from("classes").insert([data]).then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["classes"]);
  return response;
}



// Fetch student class
export function useClass(id) {
  return useQuery(
    ["classes", { id }],
    () => supabase.from("classes").select().eq("id", id).single().then(handle),
    { enabled: !!id }
  );
}


//********Attendance****  */

// Fetch all Attendance
export function useAllAttendance() {
  return useQuery(
    "attendance",
    () => supabase.from("attendance").select("*").then(handle),
    { enabled: true }
  );
}

// Create a new Attendance
export async function createAttendance(data) {
  const response = await supabase.from("attendance").insert(data).then(handle);
  // Invalidate and refetch queries that could have old data
  await client.invalidateQueries(["attendance"]);
  return response;
}

// Update an Attendance
export async function updateAttendance(id, data) {
  const response = await supabase
    .from("attendance")
    .update(data)
    .eq("id", id)
    .then(handle);
  await Promise.all([
    client.invalidateQueries(["attendance", { id }]),
    client.invalidateQueries(["attendance"]),
  ]);
  return response;
}

// Fetch Attendance data
export function useAttendance(id) {
  return useQuery(
    ["attendance", { id }],
    () => supabase.from("attendance").select().eq("id", id).single().then(handle),
    { enabled: !!id }
  );
}

// Delete an Attendance
export async function deleteAttendance(id) {
  const response = await supabase
    .from("attendance")
    .delete()
    .eq("id", id)
    .then(handle);
  // Invalidate and refetch queries that could have old data
  await Promise.all([
    client.invalidateQueries(["attendance", { id }]),
    client.invalidateQueries(["attendance"]),
  ]);
  return response;
}

/**** HELPERS ****/

// Get response data or throw error if there is one
function handle(response) {
  if (response.error) throw response.error;
  return response.data;
}


// React Query context provider that wraps our app
export function QueryClientProvider(props) {
  return (
    <QueryClientProviderBase client={client}>
      {props.children}
    </QueryClientProviderBase>
  );
}
