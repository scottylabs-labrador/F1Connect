"use client";

import { useFormState } from "react-dom";
import styles from "./registerForm.module.css";
import { register } from "@/lib/actions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const RegisterForm = () => {
  /* //Uncomment when we have a database set up
    const [state, formAction] = useFormState(register, undefined);

    const router = useRouter();

    useEffect(() => {
        state?.success && router.push("/login");
    }, [state?.success, router]);
    */

  return (
    <div>
      {/* <form action={formAction}> */}
      <form className="flex flex-col gap-4 mx-auto">
        <input type="text" placeholder="school email" name="email" />
        <input type="text" placeholder="username" name="username" />
        <input type="text" placeholder="name" name="name" />
        <label htmlFor="countries">Your country of origin:</label>
        <select id="countries" name="country">
          <option value="default">Select</option>
          <option value="china">China</option>
          <option value="korea">South Korea</option>
          <option value="india">India</option>
        </select>
        <label htmlFor="year">Grad year:</label>
        <select id="year" name="year">
          <option value="default">Select</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
        </select>
        <input type="text" placeholder="major" name="major" />
        <input type="password" placeholder="password" name="password" />
        <input
          type="text"
          placeholder="repeat password"
          name="passwordRepeat"
        />
        <button>Register</button>

        {/* {state?.error} */}
      </form>
    </div>
  );
};

export default RegisterForm;
