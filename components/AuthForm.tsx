"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";

const authFormSchema = (type: FormType) => {

  return z.object({
    name: type === "sign-up" ? z.string().min(8) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        toast.success("Account Created successfully. Please Sign-In.");
        router.push('/sign-in')
        console.log("SIGN UP", values);
      } else {
        toast.success("Sign-In successfully.");
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error ${error}`);
    }
  }
  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10 justify-center">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src="/logo.png"
            alt="logo"
            height={52}
            width={58}
            style={{ borderRadius: "30px" }}
          />
          <h1 className="text-5xl font-semibold">Placed.</h1>
        </div>
        <h3 className="text-center">Practice Job interviews with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="abcxyz@gmail.com"
                type = "email"
              />

              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="abc09@xy"
                type = "password"
              />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>

            <p className="text-center">
              {isSignIn ? "No account yet?" : "Have an Account already"}
              <Link
                href={!isSignIn ? "/sign-in" : "/sign-up"}
                className="font-bold text-user-primary ml-1"
              >
                {!isSignIn ? "Sign-in" : "Sign-up"}
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
