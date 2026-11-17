import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/features/auth/auth-card";
import { RegisterForm } from "@/features/auth/register-form";

export const metadata: Metadata = { title: "Crear cuenta · Nexora" };

/** WF-008 Registro. */
export default function RegisterPage() {
  return (
    <AuthCard
      eyebrow="Empieza a organizarte"
      title="Crea tu cuenta"
      description="Regístrate para gestionar tus tareas y colaborar con otras personas."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-accent-text hover:underline">
            Iniciar sesión
          </Link>
        </>
      }
      note="Al registrarte aceptas los términos de uso de Nexora."
    >
      <RegisterForm />
    </AuthCard>
  );
}
