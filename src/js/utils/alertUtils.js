import Swal from "sweetalert2";


  // Uma função que serve para exibir uma tela de carregamento para o usuário, com parâmetro tem como passar o título que deseja e o texto para ser exibido 
export const AlertUtils = {
  loading: (title = "Carregando...", text = "Aguarde um momento enquanto processamos suas informações") => {
    Swal.fire({
      title,
      text,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  },

 // Uma função que serve para exibir uma tela de sucesso para o usuário, com parâmetro tem como passar o título que deseja e o texto para ser exibido 
  success: async (title = "Sucesso!", text = "Operação concluída!") => {
    await Swal.fire({
      title,
      text,
      icon: "success",
      confirmButtonColor: "#052759",
      confirmButtonText: "OK",
    });
  },

   // Uma função que serve para exibir uma tela de erro para o usuário, com parâmetro tem como passar o título que deseja e o texto para ser exibido 

  error: async (title = "Erro!", text = "Algo deu errado.") => {
    await Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonColor: "#d33",
      confirmButtonText: "Tentar novamente",
    });
  },

  close: () => Swal.close(),
};
