"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button, ButtonLink } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { LIMITS, hasErrors, validateRegister, type FieldErrors } from "@/lib/validation";
import { register } from "@/services/auth";
import { ApiError, errorMessage } from "@/services/errors";
import type { RegisterInput } from "@/types/api";

type RegisterState = {
  values: RegisterInput;
  errors: FieldErrors<RegisterInput>;
  formError?: string;
  /** Nombre de la cuenta creada; si existe, se muestra la confirmación. */
  created?: string;
};

const initialState: RegisterState = { values: { username: "", email: "", password: "" }, errors: {} };

const FIELDS: (keyof RegisterInput)[] = ["username", "email", "password"];

/**
 * Formulario de WF-008. El contrato no indica que el registro inicie sesión,
 * así que tras crear la cuenta se invita a iniciar sesión.
 */
export function RegisterForm() {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(async (_prev, formData) => {
    const values: RegisterInput = {
      username: String(formData.get("username") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
    };
    const errors = validateRegister(values);
    if (hasErrors(errors)) return { values, errors };
    try {
      const user = await register(values);
      return { values, errors: {}, created: user.username };
    } catch (error) {
      // Si el backend señala un campo (p. ej. correo duplicado), el error va junto a él.
      const field = error instanceof ApiError ? FIELDS.find((f) => error.fields.includes(f)) : undefined;
      if (field) return { values, errors: { [field]: errorMessage(error) } };
      return { values, errors: {}, formError: errorMessage(error) };
    }
  }, initialState);

  if (state.created) {
    return (
      <>
        <Alert tone="success">
          Cuenta creada. Ya puedes iniciar sesión, <strong>{state.created}</strong>.
        </Alert>
        <ButtonLink href="/login" className="w-full">
          Ir a iniciar sesión
        </ButtonLink>
      </>
    );
  }

  return (
    <form action={formAction} noValidate>
      {state.formError && <Alert>{state.formError}</Alert>}
      <TextField
        label="Nombre de usuario"
        name="username"
        autoComplete="username"
        placeholder="Tu nombre de usuario"
        maxLength={LIMITS.usernameMax}
        defaultValue={state.values.username}
        error={state.errors.username}
        required
      />
      <TextField
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="tu@correo.com"
        maxLength={LIMITS.emailMax}
        defaultValue={state.values.email}
        error={state.errors.email}
        required
      />
      <TextField
        label="Contraseña"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder={`Mínimo ${LIMITS.passwordMin} caracteres`}
        minLength={LIMITS.passwordMin}
        defaultValue={state.values.password}
        hint="Utiliza una contraseña segura que no compartas con otros servicios."
        error={state.errors.password}
        required
      />
      <Button type="submit" className="mt-[5px] w-full" disabled={pending}>
        {pending ? "Creando cuenta…" : "Crear cuenta"}
      </Button>
    </form>
  );
}
