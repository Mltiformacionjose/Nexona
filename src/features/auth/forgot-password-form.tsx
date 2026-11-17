"use client";

import { useActionState } from "react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/field";
import { LIMITS, validateLogin } from "@/lib/validation";
import { requestPasswordReset } from "@/services/auth";
import { errorMessage } from "@/services/errors";

type ForgotState = { email: string; error?: string; formError?: string; sent?: boolean };

/** Formulario de WF-009. El mensaje final es el mismo exista o no la cuenta. */
export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState<ForgotState, FormData>(
    async (_prev, formData) => {
      const email = String(formData.get("email") ?? "").trim();
      const error = validateLogin({ email, password: "-" }).email;
      if (error) return { email, error };
      try {
        await requestPasswordReset(email);
        return { email, sent: true };
      } catch (err) {
        return { email, formError: errorMessage(err) };
      }
    },
    { email: "" },
  );

  if (state.sent) {
    return (
      <Alert tone="success">
        Si existe una cuenta con esa dirección, recibirás instrucciones para restablecer tu contraseña.
      </Alert>
    );
  }

  return (
    <form action={formAction} noValidate>
      {state.formError && <Alert>{state.formError}</Alert>}
      <TextField
        label="Correo electrónico"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="tu@correo.com"
        maxLength={LIMITS.emailMax}
        defaultValue={state.email}
        error={state.error}
        required
      />
      <Button type="submit" className="mt-[5px] w-full" disabled={pending}>
        {pending ? "Enviando…" : "Enviar instrucciones"}
      </Button>
    </form>
  );
}
