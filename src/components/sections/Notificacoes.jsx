import { useEffect, useState } from "react";
import { api } from "../../api/apiUserService";

export function Notificacoes({ onClose }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const [erro, setErro] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggleNotification, setToggleNotification] = useState(true);
  const [user, setUser] = useState({});

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const size = 5;

  useEffect(() => {
    buscarNotificacoes();
    const userData = JSON.parse(sessionStorage.getItem("USER_DATA"));
    setUser(userData);
    setToggleNotification(userData.receive_notification);
  }, [page]);

  async function alterarNotificacaoToggle() {
    try {
      await api.patch(`users/notification/${user.id}/${!toggleNotification}`);
      setToggleNotification(!toggleNotification);
      updateUserData("receive_notification", !toggleNotification);
    } catch (e) {
      console.error(e);
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  async function buscarNotificacoes() {
    setLoading(true);
    try {
      const notificationRes = await api.get(
        `/notifications?page=${page}&size=${size}`,
      );
      const dadosPaginados = notificationRes.data;
      console.log("=== DEBUG PAGINAÇÃO ===");
      console.log("dadosPaginados:", dadosPaginados);
      console.log("totalPages:", dadosPaginados.totalPages);
      console.log("totalElements:", dadosPaginados.totalElements);
      console.log("page:", dadosPaginados.page);
      console.log("=========================");

      setNotificacoes(dadosPaginados.data || []);
      setTotalPages(dadosPaginados.total_pages || 0);
      setTotalElements(dadosPaginados.total_elements || 0);
    } catch (e) {
      console.error(e);
      setErro(true);
    } finally {
      setLoading(false);
    }
  }

  function toSubject(type) {
    switch (type) {
      case "FAIR":
        return "Feira de adoção se aproximando";
      case "DONATION":
        return "Precisamos de doações";
      case "VOLUNTEER":
        return "Precisamos de voluntários";
      default:
        return "Notificação";
    }
  }

  function updateUserData(key, value) {
    const updatedUserData = { ...user, [key]: value };
    sessionStorage.setItem("USER_DATA", JSON.stringify(updatedUserData));
  }

  function formatDate(dateString) {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      const now = new Date();
      const diffMs = now - date;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return "Hoje";
      } else if (diffDays === 1) {
        return "Ontem";
      } else if (diffDays < 7) {
        return `${diffDays} dias atrás`;
      } else {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        return `${day}/${month}`;
      }
    } catch {
      return "";
    }
  }

  const proximaPagina = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const paginaAnterior = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div
      className="w-[420px] max-w-full bg-white rounded-xl overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="px-6 py-4 bg-gradient-to-r from-[#052759] to-[#052759]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <svg
                className="w-6 h-6 text-[#052759]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Notificações</h2>
              <p className="text-sm text-gray-300">
                Fique por dentro das novidades
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Notificações por e-mail
            </p>
            <p className="text-xs text-gray-500">Receba alertas importantes</p>
          </div>
          <button
            onClick={alterarNotificacaoToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${toggleNotification ? "bg-green-500" : "bg-gray-300"}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${toggleNotification ? "translate-x-6" : "translate-x-1"}`}
            />
          </button>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {loading ? (
          <div className="py-12">
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#052759] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Carregando notificações...</p>
            </div>
          </div>
        ) : erro ? (
          <div className="py-12 px-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Erro ao carregar
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Não foi possível carregar as notificações
              </p>
            </div>
          </div>
        ) : notificacoes.length === 0 ? (
          <div className="py-12 px-6">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Nenhuma notificação
              </h3>
              <p className="text-gray-600 text-sm">
                Você está em dia com todas as novidades
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-100">
              {notificacoes.map((n) => (
                <div
                  key={n.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#052759]">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-900 group-hover:text-[#052759] transition-colors">
                          {toSubject(n.type)}
                        </h4>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {formatDate(n.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-between">
                  <button
                    onClick={paginaAnterior}
                    disabled={page === 0}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      page === 0
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#052759] text-white hover:bg-[#0a3a8a]"
                    }`}
                  >
                    ← Anterior
                  </button>

                  <span className="text-sm text-gray-600">
                    Página {page + 1} de {totalPages}
                  </span>

                  <button
                    onClick={proximaPagina}
                    disabled={page >= totalPages - 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      page >= totalPages - 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-[#052759] text-white hover:bg-[#0a3a8a]"
                    }`}
                  >
                    Próximo →
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {totalElements > 0 && !loading && !erro && (
        <div className="px-6 py-3 border-t border-gray-100 bg-gray-50">
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Mostrando {notificacoes.length} de {totalElements} notificaç
              {totalElements === 1 ? "ão" : "ões"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
