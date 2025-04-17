"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Popover } from "@/components/ui/popover";
import { Select, SelectContent, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { SelectItem, SelectTrigger } from "@radix-ui/react-select";
import { format } from "date-fns";
import { CalendarIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    email: z.string().email(),
    accountType: z.enum(["personal", "company"]),
    companyName: z.string().optional(),
    employeesNumber: z.coerce.number().optional(),
    birthDate: z.date().refine((date) => {
      const today = new Date();
      const startDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= startDate;
    }, "You must be at least 18 years old"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .refine((password) => {
        return /^(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/.test(password);
      }, "Password must contain at least 1 special character and 1 uppercase letter"),
    passwordConfirm: z.string(),
    acceptTerms: z
      .boolean({
        required_error: "You must accept the terms and conditions",
      })
      .refine((checked) => checked, "You must accept the terms and conditions"),
  })
  .superRefine((data, ctx) => {
    if (data.passwordConfirm !== data.password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "Passwords do not match",
      });
    }
    if (data.accountType === "company" && !data.companyName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["companyName"],
        message: "Company name is required",
      });
    }

    if (
      data.accountType === "company" &&
      (!data.employeesNumber || data.employeesNumber < 1)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["employeesNumber"],
        message: "Number of employees is required",
      });
    }
  });

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      accountType: "company",
      companyName: "",
      employeesNumber: 1,
    },
  });

  const accountType = form.watch("accountType");
  const fromDate = new Date();
  fromDate.setFullYear(fromDate.getFullYear() - 120);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    router.push("/dashboard");
  }
  return (
    <>
      <PersonStandingIcon size={50} />
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Sign up your new SupportMe account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="johndoe@mail.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account type</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder="Select an account type"
                            {...field}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {accountType === "company" && (
                <>
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="company name"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="employeesNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number Of Employees</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="number of employees"
                            min={0}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col pt-2">
                    <FormLabel>Date of birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="flex justify-between pr-1"
                          >
                            {!!field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent align="center" className="w-auto p-0">
                        <Calendar
                          className="bg-[var(--popover)]"
                          mode="single"
                          defaultMonth={field.value}
                          selected={field.value}
                          onSelect={field.onChange}
                          fixedWeeks
                          weekStartsOn={1}
                          fromDate={fromDate}
                          toDate={new Date()}
                          captionLayout="dropdown-buttons"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Confirm</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-2 items-center">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>I accept the terms and conditions</FormLabel>
                    </div>
                    <FormDescription>
                      By signing up you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:underline"
                      >
                        {" "}
                        terms and conditions
                      </Link>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Sign up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-between">
          <small>Already have an account?</small>
          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Page;
