import "./App.css";
import React, { useState } from "react";
import { toast } from "react-toastify";

const App: React.FC = () => {

  const [email, setEmail] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean >(false);

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      toast.info("Vui lòng nhập email.");
    }
    if (!emailRegex.test(email)) {
      toast.info("Vui lòng nhập đúng cú pháp email");
      return;
    }
    
    if(!checkEmail){
      toast.info("Vui lòng check đông ý");
    }


    if(checkEmail===true){
      const data = {
        email: email
      };
      toast.success("Bạn đã gửi thành công")
      localStorage.setItem('checkEmail', JSON.stringify(data));
      const date = new Date();
      date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
      const expires = "; expires=" + date.toUTCString();
      document.cookie = `email=${email}${expires}`;
      sessionStorage.setItem('checkEmail', JSON.stringify(data));
    }
    

  };

  return (
    <div className="flex justify-center items-center h-[700px]">
      <div className="bg-white flex justify-center text-center rounded-[24px] w-[1094px]  h-[432px]">
        <form onSubmit={handleSubscribe}>
          <div>
            <h1 className="text-[#111827] font-bold text-[40px] mt-[74px] ">
              Level Up Your Frontend Skills
            </h1>
            <p className="text-[24px] font-normal text-[#374151]">
              Sign up for our free newsletter to receive weekly coding
              chanllenges that <br /> will help you improve your frontend
              development skills.
            </p>
            <div className="mt-[24px] mb-[12px]">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border focus:outline-none w-[599px] h-[72px] rounded-lg pl-[32px] pt-[16px] pb-[16px]  "
              />{" "}
              <button
                type="submit"
                className="bg-[#111827] text-white w-[185px] h-[72px] rounded-[8px] ml-6 p-[16px,32px]"
              >
                Subscribe
              </button>
            </div>

            <input type="checkbox"  checked={checkEmail || false}
              onChange={(event) => setCheckEmail(event.target.checked)} />
            <span className="ml-4 text-[14px] font-normal text-[#111827]">
              By checking this box, you agree to receive our weekly newsletter
              containing coding challenges, tips, and other <br /> related
              content. You may unsubscribe from the newsletter at any time
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
