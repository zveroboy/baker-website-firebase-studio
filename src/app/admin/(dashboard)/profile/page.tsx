import { getProfileAction } from "@/modules/users/actions";
import { ProfileForm } from "@/modules/users/components/ProfileForm";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const user = await getProfileAction();

    if (!user) {
        redirect("/admin/login");
    }

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Профиль</h1>
            </div>
            <div className="rounded-lg border shadow-sm p-6">
                <ProfileForm user={user} />
            </div>
        </main>
    );
}

