import { cookies } from "next/headers";
import Link from "next/link";

export default function Home() {
    return (<div>
        <Link href="/login">
            Login
        </Link>
        <br/>
        <Link href="/protected-route">
            Protected Route
        </Link>
        <br />
        <Link href="/update-user">
            Profile
        </Link>
        <br />
        { cookies().get("access_token")?.value ? <div>
        <Link href="/signout" prefetch={false}>
             Sign out
         </Link>
        </div> : <p>User not logged in</p>
        }
    </div>)
}
