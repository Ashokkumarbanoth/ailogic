import { PRODUCTS_PATH } from "@/lib/constants";
import {redirect} from "next/navigation";

export default function Home() {
  redirect(PRODUCTS_PATH);
}
