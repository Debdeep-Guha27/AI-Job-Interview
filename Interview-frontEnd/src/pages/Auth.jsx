import React, { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import assets from "../assets/assest";
import { useNavigate } from "react-router-dom";
import { Particles } from "@/components/ui/particles";
import { AlertTriangle, Loader, Loader2 } from "lucide-react";
import useSignin from "@/hooks/useSignin";
import useSignup from "@/hooks/useSignup";
import { toast } from "sonner"

const Auth = () => {
  const { auth, setAuth } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [validationerror, setValidationError] = useState(false);
  const [validationmessage, setValidationMessage] = useState("");
  const { isPending: signinpending, isSuccess, error, mutateAsync:Signinfunction } = useSignin();
  const { isPending:signuppending, isSuccess:signupsuccess, error:signuperror, mutateAsync:signupfunction } = useSignup();


  async function handleSubmit(e) {
    e.preventDefault();
    console.log(auth)
    if (auth === "login") {
      if (!email || !username || !password) {
        setValidationError(true);
        setValidationMessage("Please fill all the fields");
        return;
      }
      const LoginObject = {
        email: email,
        username: username,
        password: password,
      }
      console.log(LoginObject);
      try {
        await Signinfunction(LoginObject);
        toast("Logged in", {
          style: {
            backgroundColor: "Green",
            color: "white",
          },
        });
      } catch (error) {
        toast("Login failed, Please try again", {
          style: {
            backgroundColor: "red",
            color: "white",
          },
        });
      }
    }
    else {
      console.log(auth)
      if (!email || !username || !password) {
        setValidationError(true);
        setValidationMessage("Please fill all the fields");
        return;
      }
      if(password !== confirmpassword){
        setValidationError(true);
        setValidationMessage("Password and Confirm Password should be same");
        return;
      }
      const SignupObject = {
        email: email,
        username: username,
        password: password
      }
      try {
        await signupfunction(SignupObject);
        toast("Signup Successful, login to continue", {
            style: {
              backgroundColor: "green",
              color: "white",
            },
          });
          setAuth("login");
      } catch (error) {
          toast("Signup failed, Please try again", {
            style: {
              backgroundColor: "red",
              color: "white",
            },
          });
        }
      }
    }

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <div className="bg-black text-gray-300 w-screen h-screen flex flex-col justify-center items-center px-4">
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <button
        onClick={() => navigate("/")}
        className="absolute top-10 right-10  p-2 rounded-full transition duration-300"
      >
        <img src={assets.crossicon} alt="Close" className="w-6 h-6" />
      </button>

      <div className="border border-white bg-gray-900/50  p-10 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-[#38BDF8] mb-6">
          {auth === "login" ? "Welcome Back!" : "Create an Account"}
        </h1>
        {validationerror && (
          <div className="flex items-center w-full p-3 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg">
            <AlertTriangle className="w-5 h-5 mr-2 text-red-700" />
            <span className="font-semibold">{validationmessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
          />
          {
            auth !== "login" && (
              <input
                type="password"
                name="password"
                placeholder="confirmpassword"
                autoComplete="off"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              />
            )
          }
          <button
            type="submit"
            className="w-full text-white rounded-lg font-semibold shadow-md hover:bg-[#2a5cc8] transition duration-300 flex justify-center items-center"
          >
            {
              signinpending ? (
                <div className="w-full h-full py-2 flex rounded-lg justify-center items-center bg-[#38BDF8]"><Loader size={35} className="animate-spin text-black"/></div>
              ):
              (
                  <div className="w-full h-full py-2 flex rounded-lg justify-center items-center bg-[#38BDF8]">{auth === "login" ? "Log in" : "Sign up"}</div>
              )
            }
          </button>
        </form>
        <p className="mt-6 text-gray-400">
          {auth === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            onClick={() => {
              setAuth(auth === "login" ? "signup" : "login")
              setValidationError(false);
              setValidationMessage("");
              setEmail("");
              setUsername("");
              setPassword("");
              setConfirmPassword("");
            }}
            className="text-[#38BDF8] font-semibold hover:underline"
          >
            {auth === "login" ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
