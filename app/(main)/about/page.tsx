import { redirect } from 'next/navigation'
export const dynamic = "force-static";
export const revalidate = 60;

export default function AboutPage() {
  redirect('/about/ospoly-profile')
}