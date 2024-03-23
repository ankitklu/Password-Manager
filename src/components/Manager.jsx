import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords=async()=>{
    let req= fetch("http://localhost:3000/");
    let passwords = await req.json();
    
    console.log(passwords);
    setPasswordArray(passwords);
    
  }
  // const getPasswords = async () => {
  //   try {
  //     let req = await fetch("http://localhost:3000/");
  //     if (!req.ok) {
  //       throw new Error("Failed to fetch passwords");
  //     }
  //     let passwords = await req.json();
  //     console.log(passwords);
  //     setPasswordArray(passwords);
  //   } catch (error) {
  //     console.error("Error fetching passwords:", error);
  //     // Handle error here, for example, show a toast or log it
  //     toast.error("Error fetching passwords. Please try again later.");
  //   }
  // };

  useEffect(() => {
    getPasswords();

  }, []);

  const showPassword = () => {
    passwordRef.current.type = "password";

    if (ref.current.src.includes("icons/eyecross2.png")) {
      ref.current.src = "icons/eye2.jpeg";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross2.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){

        setPasswordArray([...passwordArray, {...form,id:uuidv4()}]); //spreads the passwordArray and pushes from the form
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}])); //uploads to local storage
        console.log(form);
        setForm({ site: "", username: "", password: "" });
        toast("Password Saved Successfully !!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      toast("Password not saved !!");
    }
  };
  // const savePassword=()=>{
  //   console.log({
  //     site: form.site,
  //     username: form.username,
  //     password: form.password
  //   });

  //   axios.post('http://localhost:3000/insert',{
  //     site: form.site,
  //     username: form.username,
  //     password: form.password
  //   }).then((response)=>{
  //     console.log(response.data);
  //   })

  // }

  const deletePassword=(id)=>{
    let c= confirm("Do u want to delete the selected password?");
    if(c){
      console.log("Deleting password with id",id);
      setPasswordArray(passwordArray.filter(item=>item.id!==id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
    
      toast("Password Deleted !!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  // const deletePassword=()=>{

  // }

  const editPassword=(id)=>{
   
    console.log("Editing password ")
    setForm(passwordArray.filter(i=>i.id===id)[0]);
    setPasswordArray(passwordArray.filter(item=>item.id!==id))  //it will delete the password to be edited and the prev credentials appears on the text area
    
  }


  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to clip-board", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
        </div>
      </div>
      <div className="p-2 md:p-0 md:mycontainer min-h-[89vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-800">&lt;</span>
          Pass
          <span className="text-green-500">MANAGER /&gt;</span>
        </h1>
        <p className="text-green-900 text-center text-lg">
          Your Own Password Manager
        </p>
        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            placeholder="Enter Website URL"
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-500 w-full text-black p-4 py-1"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full text-black p-4 py-1"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative">
              <input
                placeholder="Enter Password"
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full text-black p-4 py-1"
                type="text"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[4px] top-[5px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye2.jpeg"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="rounded-full flex justify-center items-center bg-green-500 px-4 py-2 w-fit hover:bg-green-400 gap-4 border-green-800"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">UserName</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-50">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                heght: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/zyzoecaw.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                heght: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/zyzoecaw.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                heght: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/zyzoecaw.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center" >
                        <span className="cursor-pointer" onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/ifsxxxte.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span  className="cursor-pointer p-3" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
