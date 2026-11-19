import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/features/auth/auth-card";
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";

export const metadata: Metadata = { title: "Recuperar contraseña · TaskIn" };

/** WF-009 Recuperar contraseña (solicitud). */
export default function ForgotPasswordPage() {
  return (
    <AuthCard
      eyebrow="Recuperación de acceso"
      title="¿Has olvidado tu contraseña?"
      description="Introduce el correo asociado a tu cuenta. Si existe una cuenta con esa dirección, recibirás instrucciones para restablecer tu contraseña."
      footer={
        <Link href="/login" className="text-accent-text hover:underline">
          ← Volver al inicio de sesión
        </Link>
      }
      note="Por seguridad, no indicaremos si una dirección está registrada."
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
