import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="header">Landing Page</h1>
        <p>
          This is the home page.
        </p>
      </div>
      <div className="col-6 form-widget">
        <Link href="/login">Auth page</Link>
      </div>
    </div>
  )
}
