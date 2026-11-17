import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/features/auth/auth-card";
import { LoginForm } from "@/features/auth/login-form";

export const metadata: Metadata = { title: "Iniciar sesión · Nexora" };

/** WF-007 Acceso. */
export default function LoginPage() {
  return (
    <AuthCard
      eyebrow="Bienvenido de nuevo"
      title="Inicia sesión"
      description="Accede a tus tareas y listas desde un mismo lugar."
      footer={
        <>
          ¿Todavía no tienes cuenta?{" "}
          <Link href="/register" className="text-accent-text hover:underline">
            Crear una cuenta
          </Link>
        </>
      }
      note="Al continuar aceptas los términos de uso de Nexora."
    >
      <LoginForm />
    </AuthCard>
  );
}
