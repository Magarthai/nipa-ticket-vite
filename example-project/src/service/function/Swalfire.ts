import Swal from "sweetalert2";
interface ISwalFireOptions {
  title: string;
  icon: "success" | "error" | "warning" | "info" | "question";
  text: string;
}

export function swalFire({
  title,
  icon,
  text,
}: ISwalFireOptions): Promise<any> {
  return Swal.fire({
    title: title,
    icon: icon,
    text: text,
    confirmButtonText: "ตกลง",
    confirmButtonColor: "#263A50",
    customClass: {
      confirmButton: "custom-confirm-button",
    },
  });
}
