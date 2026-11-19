import type { Metadata } from "next";
import { ListsScreen } from "@/features/lists/lists-screen";

export const metadata: Metadata = { title: "Mis listas · TaskIn" };

/** WF-002 Mis listas. */
export default function ListsPage() {
  return <ListsScreen />;
}
