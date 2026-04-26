import ComponentsNavbar from "@/src/component/navbar";

export default function Layout({ children }:{ children: React.ReactNode }) {
  return (
    <>
    <ComponentsNavbar />
         {children}
    </>
  );
}