"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { hasErrors, validateLogin, type FieldErrors } from "@/lib/validation";
import { login } from "@/services/auth";
import { errorMessage } from "@/services/errors";
import type { LoginInput } from "@/types/api";

type LoginState = {
  values: LoginInput;
  errors: FieldErrors<LoginInput>;
  formError?: string;
};

const initialState: LoginState = { values: { email: "", password: "" }, errors: {} };

/** Formulario de WF-007. Tras iniciar sesión lleva al inicio. */
export function LoginForm() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState<LoginState, FormData>(async (_prev, formData) => {
    const values: LoginInput = {
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };
    const errors = validateLogin(values);
    if (hasErrors(errors)) return { values, errors };
    try {
      await login(values);
    } catch (error) {
      // No se conserva la contraseña tras un fallo.
      return { values: { ...values, password: "" }, errors: {}, formError: errorMessage(error) };
    }
    router.push("/");
    return { values, errors: {} };
  }, initialState);

  return (
    <form action={formAction} noValidate>
      {state.formError && <Alert>{state.formError}</Alert>}
      <TextField
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="tu@correo.com"
        defaultValue={state.values.email}
        error={state.errors.email}
        required
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="Introduce tu contraseña"
        defaultValue={state.values.password}
        error={state.errors.password}
        required
      />
      <p className="-mt-1 mb-[18px] text-right text-sm">
        <Link href="/forgot-password" className="text-accent-text hover:underline">
          ¿Has olvidado tu contraseña?
        </Link>
      </p>
      <Button type="submit" className="mt-[5px] w-full" disabled={pending}>
        {pending ? "Iniciando sesión…" : "Iniciar sesión"}
      </Button>
    </form>
  );
}
