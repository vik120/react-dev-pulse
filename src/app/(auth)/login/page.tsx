'use client'
import { loginSchema, type LoginSchema } from "@/src/features/auth/schemas/login.schema";
import CheckboxComponent, { CheckboxProps } from "@/src/shared/ui/checkbox.component";
import InputComponent, { InputProps } from "@/src/shared/ui/input.component";
import Link from "next/link";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

function Page() {
    const router = useRouter();
    const [formValue, setFormValue] = useState<LoginSchema>({
        email: '',
        password: '',
        rememberMe: false,
    })
    const [errors, setErrors] = useState<Partial<Record<keyof LoginSchema, string>>>({});

    const getValidationErrors = (values: LoginSchema) => {
        const result = loginSchema.safeParse(values);

        if (result.success) {
            return {};
        }

        const fieldErrors = result.error.flatten().fieldErrors;

        return Object.fromEntries(
            Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0] ?? "Invalid value"])
        ) as Partial<Record<keyof LoginSchema, string>>;
    }

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = event.target;
        const nextValue = type === "checkbox" ? checked : value;
        const nextFormValue = {
            ...formValue,
            [name]: nextValue,
        } as LoginSchema;

        setFormValue(nextFormValue);
        setErrors(getValidationErrors(nextFormValue));
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = loginSchema.safeParse(formValue);

        if (!result.success) {
            setErrors(getValidationErrors(formValue));
            return;
        }

        setErrors({});
        console.log(result.data);
        router.push("/dashboard");
    }

    const emailData: InputProps = {
        label: "Email",
        type: "email",
        name: "email",
        id: "email",
        placeholder: "name@company.com",
        required: true,
        value: formValue.email,
        error: Boolean(errors.email),
        errorMessage: errors.email ?? "",
        onChange: handleOnChange,
    }

    const passwordData: InputProps = {
        label: "Password",
        type: "password",
        name: "password",
        id: "password",
        placeholder: "••••••••",
        required: true,
        value: formValue.password,
        error: Boolean(errors.password),
        errorMessage: errors.password ?? "",
        onChange: handleOnChange,
    }

    const checkboxData: CheckboxProps = {
        label: "Remember me",
        name: "rememberMe",
        id: "remember",
        checked: Boolean(formValue.rememberMe),
        onChange: handleOnChange,
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        
                            <InputComponent inputdata={emailData} />
                            <InputComponent inputdata={passwordData} />
                           
                            <div className="flex items-center justify-between">
                                <CheckboxComponent checkboxData={checkboxData} />
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <div className="mb-6">
                    <label htmlFor="danger" className="block mb-2.5 text-sm font-medium text-red-700 dark:text-red-500">Your name</label>
                    <input type="text" id="danger" className="block w-full rounded-lg border border-red-500 bg-red-50 px-3 py-2.5 text-sm text-red-900 placeholder-red-700 shadow-xs focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500" placeholder="Error input" />
                    <p className="mt-2.5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oh, snap!</span> Some error message.</p>
                </div>

            </div>
        </section>
    )
}

export default Page
