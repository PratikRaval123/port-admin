"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import InputGroup from "@/components/FormElements/InputGroup";
import { EmailIcon, PasswordIcon, UserIcon } from "@/assets/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { register, reset } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";

export default function SignupWithPassword() {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const dispatch = useAppDispatch();
    const router = useRouter();
    const { isLoading, isError, isSuccess, message } = useAppSelector(
        (state) => state.auth
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(register(data));
    };

    useEffect(() => {
        if (isSuccess) {
            // Redirect to login or dashboard?
            // Usually after register, we might want to login automatically or ask them to login.
            // My authSlice register doesn't set token unless API returns it.
            // Assuming API just returns success or maybe token.
            // If auto-login is needed, I'd need to check API response.
            // For now, redirect to sign-in.
            router.push("/auth/sign-in");
            dispatch(reset());
        }
    }, [isSuccess, router, dispatch]);

    return (
        <form onSubmit={handleSubmit}>
            {isError && (
                <div className="mb-4 text-red-500 text-sm font-medium">{message}</div>
            )}
            <InputGroup
                type="text"
                label="Name"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="Enter your full name"
                name="name"
                handleChange={handleChange}
                value={data.name}
                icon={<UserIcon />}
            />

            <InputGroup
                type="email"
                label="Email"
                className="mb-4 [&_input]:py-[15px]"
                placeholder="Enter your email"
                name="email"
                handleChange={handleChange}
                value={data.email}
                icon={<EmailIcon />}
            />

            <InputGroup
                type="password"
                label="Password"
                className="mb-5 [&_input]:py-[15px]"
                placeholder="Enter your password"
                name="password"
                handleChange={handleChange}
                value={data.password}
                icon={<PasswordIcon />}
            />

            <div className="mb-4.5">
                <button
                    type="submit"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                    disabled={isLoading}
                >
                    Sign Up
                    {isLoading && (
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
                    )}
                </button>
            </div>

            <div className="mt-6 text-center">
                <p>
                    Already have an account?{" "}
                    <Link href="/auth/sign-in" className="text-primary">
                        Sign In
                    </Link>
                </p>
            </div>
        </form>
    );
}
