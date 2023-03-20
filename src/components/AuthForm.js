import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "util/auth";

function AuthForm(props) {
  const auth = useAuth();
// console.log(auth)
  const [pending, setPending] = useState(false);
  const { handleSubmit, register, errors, getValues } = useForm();

  const submitHandlersByType = {
    signin: ({ email, pass }) => {
      return auth.signin(email, pass).then((user) => {
        // Call auth complete handler
        props.onAuth(user);
      });
    },
    signup: ({ email, pass, role }) => {
      return auth
        .signup(email,pass)
        .then((user) => {
          props.onAuth(user);
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
  const onSubmit = ({ email, pass, role }) => {
    // Show pending indicator
    setPending(true);

    // Call submit handler for auth type
    submitHandlersByType[props.type]({
      email,
      pass,
      role,
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
      {["signup", "signin", "forgotpass"].includes(props.type) && (
        <div className="mb-2">
          <input
            className="py-1 px-3 w-full leading-8 rounded border border-gray-300 outline-none focus:border-blue-500 focus:ring-1"
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
          <input
            className="py-1 px-3 w-full leading-8 bg-white rounded border border-gray-300 outline-none focus:border-blue-500 focus:ring-1"
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
          <input
            className="py-1 px-3 w-full leading-8 bg-white rounded border border-gray-300 outline-none focus:border-blue-500 focus:ring-1"
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
      {["signup"].includes(props.type) && (
        <div className="mb-2">
          As{" "}
          <select
            name="role"
            ref={register({
              required: "Please enter your user again",
            })}
          >
            <option>admin</option>
            <option>teacher</option>
            <option>student</option>
          </select>
        </div>
      )}
      <button
        className="py-2 px-4 w-full text-white bg-blue-500 rounded border-0 hover:bg-blue-600 focus:outline-none"
        type="submit"
        disabled={pending}
      >
        {pending ? "..." : props.buttonAction}
      </button>
    </form>
  );
}

export default AuthForm;
