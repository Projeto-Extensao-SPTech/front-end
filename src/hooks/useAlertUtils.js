import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"

export function useAlertUtils() {
  const navigate = useNavigate()

  const baseSwalOptions = {
    background: '#EFEFEF',
    confirmButtonColor: '#052759',
    cancelButtonColor: '#6B7280',
    iconColor: '#052759',
  }

  return {
    loading: (
      title = "Carregando...",
      text = "Aguarde um momento enquanto processamos suas informações"
    ) => {
      Swal.fire({
        title,
        text,
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })
    },

    confirm: async (
      title = "Confirmação",
      text = "",
      confirmButtonText = "Confirmar",
      cancelButtonText = "Cancelar",
      icon = "warning"
    ) => {
      return await Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        ...baseSwalOptions,
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
        confirmButtonText: "OK",
        ...baseSwalOptions,
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
        confirmButtonText: "Tentar novamente",
        ...baseSwalOptions,
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
        confirmButtonText: "Entendi",
        ...baseSwalOptions,
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
        confirmButtonText: "Ir para o login",
        ...baseSwalOptions,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/auth?mode=login")
        }
      })
    },

    close: () => Swal.close(),
  }
}
