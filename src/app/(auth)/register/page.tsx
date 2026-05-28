'use client'
import InputComponent, { InputProps } from "@/src/shared/ui/input.component";
import { type ChangeEvent, type FormEvent, useState } from "react";
import CheckboxComponent, { CheckboxProps } from "@/src/shared/ui/checkbox.component";
import Link from "next/link";
import { registerSchema, RegisterSchema } from "@/src/features/auth/schemas/register.schema";

export default function Register() {
    const [formValue, setFormValue] = useState<RegisterSchema>({
            email: '',
            password: '',
            confirmPassword: '',
            termsCondition: false,
        })
        const [errors, setErrors] = useState<Partial<Record<keyof RegisterSchema, string>>>({});
    
        const getValidationErrors = (values: RegisterSchema) => {
            const result = registerSchema.safeParse(values);
    
            if (result.success) {
                return {};
            }
    
            const fieldErrors = result.error.flatten().fieldErrors;
    
            return Object.fromEntries(
                Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0] ?? "Invalid value"])
            ) as Partial<Record<keyof RegisterSchema, string>>;
        }
    
        const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
            const { name, type, checked, value } = event.target;
            const nextValue = type === "checkbox" ? checked : value;
            const nextFormValue = {
                ...formValue,
                [name]: nextValue,
            } as RegisterSchema;
    
            setFormValue(nextFormValue);
            setErrors(getValidationErrors(nextFormValue));
        }
    
        const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
    
            const result = registerSchema.safeParse(formValue);
    
            if (!result.success) {
                setErrors(getValidationErrors(formValue));
                return;
            }
    
            setErrors({});
            console.log(result.data);
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
    
        const confirmPasswordData: InputProps = {
            label: "Confirm Password",
            type: "password",
            name: "confirmPassword",
            id: "confirmPassword",
            placeholder: "••••••••",
            required: true,
            value: formValue.confirmPassword,
            error: Boolean(errors.confirmPassword),
            errorMessage: errors.confirmPassword ?? "",
            onChange: handleOnChange,
        }
    
        const checkboxData: CheckboxProps = {
            label: (
                <>
                    I accept the{" "}
                    <Link href="/terms" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Terms and Conditions
                    </Link>
                </>
            ),
            name: "termsCondition",
            id: "termsCondition",
            required: true,
            error: Boolean(errors.termsCondition),
            errorMessage: errors.termsCondition ?? "",
            checked: Boolean(formValue.termsCondition),
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
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <InputComponent inputdata={emailData} />
                <InputComponent inputdata={passwordData} />
                <InputComponent inputdata={confirmPasswordData} />
                  <CheckboxComponent checkboxData={checkboxData} />
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  );
}
