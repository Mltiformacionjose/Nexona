/** Fondo de las pantallas sin sesión (acceso, registro, recuperación). */
export default function PublicLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_50%_20%,#211b3b_0,var(--canvas)_52%)] px-4 py-10">
      {children}
    </main>
  );
}
