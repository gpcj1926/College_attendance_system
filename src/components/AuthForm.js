import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "util/auth";
import { updateUser } from "util/db";

function AuthForm(props) {
  // console.log(process.env.CODE_FOR_REGISTRATION)
  const auth = useAuth();

  const [pending, setPending] = useState(false);
  const { handleSubmit, register, errors, getValues } = useForm();

  const submitHandlersByType = {
    signin: ({ email, pass }) => {
      return auth.signin(email, pass).then((user) => {
        // Call auth complete handler
        props.onAuth(user);
      });
    },
    signup: ({ email, pass, roleas, name }) => {
      return auth.signup(email, pass).then((user) => {
        props.onAuth(user);
        updateUser(user?.id, { roleas: roleas, name: name });
      });
    },
    forgotpass: ({ email }) => {
      return auth.sendPasswordResetEmail(email).then(() => {
        setPending(false);
        // Show success alert message
        props.onFormAlert({
          type: "success",
          message: "Password reset email sent",
        });
      });
    },
    changepass: ({ pass }) => {
      return auth.confirmPasswordReset(pass).then(() => {
        setPending(false);
        // Show success alert message
        props.onFormAlert({
          type: "success",
          message: "Your password has been changed",
        });
      });
    },
  };

  // Handle form submission
  const onSubmit = ({ email, pass, roleas, name, secret_code }) => {
    // Show pending indicator
    setPending(true);

    // Call submit handler for auth type
    submitHandlersByType[props.type]({
      email,
      pass,
      roleas,
      name,
      secret_code,
    }).catch((error) => {
      setPending(false);
      // Show error alert message
      props.onFormAlert({
        type: "error",
        message: error.message,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {["signup"].includes(props.type) && (
        <div className="mb-2">
          <h1 className="text-left text-lg font-semibold mb-1">Name :</h1>
          <input
            className="py-1 px-3 w-full leading-8 rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1"
            name="name"
            type="text"
            placeholder="Name"
            ref={register({
              required: "Please enter your name",
            })}
          />

          {errors.name && (
            <p className="mt-1 text-sm text-left text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>
      )}

      {["signup"].includes(props.type) && (
        <div className="mb-2">
          <h1 className="text-left text-lg font-semibold mb-1">Role :</h1>
          <select
            className="py-1 px-3 w-full leading-8 bg-white rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1"
            name="roleas"
            type="text"
            ref={register({
              required: "Please select your role",
              validate: true,
            })}
          >
            <option></option>
            <option value='department_admin' >Department Admin</option>
            <option value='teacher'>Teacher</option>
          </select>

          {errors.roleas && (
            <p className="mt-1 text-sm text-left text-red-600">
              {errors.roleas.message}
            </p>
          )}
        </div>
      )}
      {["signup"].includes(props.type) && (
        <div className="mb-2">
          <h1 className="text-left text-lg font-semibold mb-1">Secret Code :</h1>
          <input
            className="py-1 px-3 w-full leading-8 rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1"
            name="secret_code"
            type="text"
            placeholder="Secret Code"
            ref={register({
              required: "Please enter secret code",
              validate: (value) => {
                if (value === "12345678") {
                  return true;
                } else {
                  return "You entered a wrong secret code";
                }
              },
            })}
          />

          {errors.secret_code && (
            <p className="mt-1 text-sm text-left text-red-600">
              {errors.secret_code.message}
            </p>
          )}
        </div>
      )}
      {["signup", "signin", "forgotpass"].includes(props.type) && (
        <div className="mb-2">
          <h1 className="text-left text-lg font-semibold mb-1">Email :</h1>
          <input
            className="py-1 px-3 w-full leading-8 rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1"
            name="email"
            type="email"
            placeholder="Email"
            ref={register({
              required: "Please enter an email",
            })}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-left text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>
      )}

      {["signup", "signin", "changepass"].includes(props.type) && (
        <div className="mb-2">
          <h1 className="text-left text-lg font-semibold mb-1">Password :</h1>
          <input
            className="py-1 px-3 w-full leading-8 bg-white rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1"
            name="pass"
            type="password"
            placeholder="Password"
            ref={register({
              required: "Please enter a password",
            })}
          />

          {errors.pass && (
            <p className="mt-1 text-sm text-left text-red-600">
              {errors.pass.message}
            </p>
          )}
        </div>
      )}

      {["signup", "changepass"].includes(props.type) && (
        <div className="mb-2">
          <h1 className="text-left text-lg font-semibold mb-1">Confirm Password :</h1>
          <input
            className="py-1 px-3 w-full leading-8 bg-white rounded border border-gray-300 outline-none focus:border-red-500 focus:ring-1"
            name="confirmPass"
            type="password"
            placeholder="Confirm Password"
            ref={register({
              required: "Please enter your password again",
              validate: (value) => {
                if (value === getValues().pass) {
                  return true;
                } else {
                  return "This doesn't match your password";
                }
              },
            })}
          />

          {errors.confirmPass && (
            <p className="mt-1 text-sm text-left text-red-600">
              {errors.confirmPass.message}
            </p>
          )}
        </div>
      )}

      <button
        className="py-2 px-4 w-full text-white bg-red-500 rounded border-0 hover:bg-red-600 focus:outline-none"
        type="submit"
        disabled={pending}
      >
        {pending ? "..." : props.buttonAction}
      </button>
    </form>
  );
}

export default AuthForm;
