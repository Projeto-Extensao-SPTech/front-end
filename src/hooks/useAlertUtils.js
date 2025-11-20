import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export function useAlertUtils() {
  const navigate = useNavigate()

  return {
    loading: (
      title = "Carregando...",
      text = "Aguarde um momento enquanto processamos suas informações"
    ) => {
      Swal.fire({
        title,
        text,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })
    },

    success: async (
      title = "Sucesso!",
      text = "Operação concluída!"
    ) => {
      await Swal.fire({
        title,
        text,
        icon: "success",
        confirmButtonColor: "#052759",
        confirmButtonText: "OK",
      })
    },

    error: async (
      title = "Erro!",
      text = "Algo deu errado."
    ) => {
      await Swal.fire({
        title,
        text,
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "Tentar novamente",
      })
    },

    warn: async (
      title = "Atenção!",
      text = "Algo precisa da sua atenção."
    ) => {
      await Swal.fire({
        title,
        text,
        icon: "warning",
        confirmButtonColor: "#d33",
        confirmButtonText: "Entendi",
      })
    },

    forbidden: async (
      title = "Sessão expirada!",
      text = "Faça login novamente para continuar."
    ) => {
      await Swal.fire({
        title,
        text,
        icon: "warning",
        confirmButtonColor: "#d33",
        confirmButtonText: "Ir para o login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth?mode=login")
        }
      })
    },

    close: () => Swal.close(),
  }
}
