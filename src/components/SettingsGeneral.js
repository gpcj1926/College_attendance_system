import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "util/auth";
import { useUser } from "util/db";

function SettingsGeneral(props) {
  const auth = useAuth();
  const [pending, setPending] = useState(false);

  const { register, handleSubmit, errors } = useForm();
  const user = auth?.user?.uid;
  const { data: userData } = useUser(user);

  const onSubmit = (data) => {
    // Show pending indicator
    setPending(true);

    return auth
      .updateProfile(data)
      .then(() => {
        // Set success status
        props.onStatus({
          type: "success",
          message: "Your profile has been updated",
        });
      })
      .catch((error) => {
        if (error.code === "auth/requires-recent-login") {
          props.onStatus({
            type: "requires-recent-login",
            // Resubmit after reauth flow
            callback: () => onSubmit(data),
          });
        } else {
          // Set error status
          props.onStatus({
            type: "error",
            message: error.message,
          });
        }
      })
      .finally(() => {
        // Hide pending indicator
        setPending(false);
      });
  };

  return (
    <>
      {userData && (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-red-100">
          <div>
            <h1 className="text-left text-lg font-semibold mb-1">Name :</h1>
            <input
              className="py-1 px-3 w-full leading-8 bg-white rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1 mt-1"
              name="name"
              type="text"
              placeholder="Name"
              defaultValue={userData?.name}
              ref={register({
                required: "Please enter your name",
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-left text-red-600">
                {errors?.name?.message}
              </p>
            )}
          </div>
          <div className="mt-3 flex justify-between items-center">
            <h1 className="text-left text-lg font-semibold mb-1">department :</h1>
            <p className="font-semibold text-green-600">
              {userData?.department ? userData?.department : "----"}
            </p>
          </div>

          {userData.roleas === "super_admin" ? (
            <div className="mt-3 flex justify-between items-center">
              <h1 className="text-left text-lg font-semibold mb-1">Role :</h1>
              <p className="font-semibold text-green-600">
                Super Admin
              </p>
            </div>
          ) : (
            <div className="mt-3">
              Role
              <select
                className="py-2 px-3 w-full leading-8 bg-white rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1"
                name="roleas"
                type="text"
                defaultValue={userData?.roleas}
                ref={register({
                  required: "Please select your role",
                  validate: true,
                })}
              >
                <option>Department Admin</option>
                <option>Teacher</option>
              </select>
              {errors.roleas && (
                <p className="mt-1 text-sm text-left text-red-600">
                  {errors?.roleas?.message}
                </p>
              )}
            </div>
          )}
          <div className="mt-3">
            <h1 className="text-left text-lg font-semibold mb-1">Number :</h1>
            <input
              className="py-1 px-3 w-full leading-8 bg-white rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1 mt-1"
              name="mobileno"
              type="mobileno"
              placeholder="0312-3456789"
              defaultValue={userData.mobileno}
              ref={register({
                required: "Please enter your number",
              })}
            />
            {errors.mobileno && (
              <p className="mt-1 text-sm text-left text-red-600">
                {errors.mobileno.message}
              </p>
            )}
          </div>
          <div className="mt-3">
            <h1 className="text-left text-lg font-semibold mb-1">Email :</h1>
            <input
              className="py-1 px-3 w-full leading-8 bg-white rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1 mt-1"
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={auth.user.email}
              ref={register({
                required: "Please enter your email",
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-left text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className="py-2 px-4 w-full text-white bg-red-500 rounded border-0 hover:bg-red-600 focus:outline-none mt-4"
            type="submit"
            disabled={pending}
          >
            {pending ? "..." : "Save"}
          </button>
        </form>
      )}
    </>
  );
}

export default SettingsGeneral;
