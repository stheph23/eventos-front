import React, { useEffect, useState } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import CardEvent from "../../../components/cardEvent";
import { fetchAllEvents, deleteEvent } from "../../../client/events";
import { useNavigate, Link } from "react-router-dom";
import ModalDelete from "../../../components/modalDelete";
import ModalSuccess from "../../../components/modalSuccess";

export default function AdminEvents() {
  const nav = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showDelete, setShowDelete] = useState(false);
  const [toDelete, setToDelete] = useState({ id: null, title: "" });
  const [deleting, setDeleting] = useState(false);


const [showSuccess, setShowSuccess] = useState(false);
const closeSuccess = () => setShowSuccess(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await fetchAllEvents();
      setEvents(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openDeleteModal = (id, title) => {
    setToDelete({ id, title });
    setShowDelete(true);
  };
  const closeDeleteModal = () => {
    if (deleting) return;
    setShowDelete(false);
    setToDelete({ id: null, title: "" });
  };

  const acceptDelete = async () => {
    if (!toDelete.id) return;
    setDeleting(true);
    try {
      await deleteEvent(toDelete.id);
      setShowDelete(false);
      setToDelete({ id: null, title: "" });
      await load();
      setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 1800); 
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar. Revisa consola.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="px-[5%] py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-itcbold">Administrar eventos</h1>
          <button
            onClick={() => nav("/admin/events/new")}
            className="px-4 py-2 text-white rounded-md font-itc-book bg-blue"
          >
            Crear evento
          </button>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className="grid items-start justify-center w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((ev) => (
              <div key={ev.id} className="relative">
                <Link to={`/admin/events/${ev.id}`}>
                  <CardEvent
                    id={ev.id}
                    imageUrl={ev.image_url}
                    title={ev.title}
                    startDateTime={ev.start_datetime}
                  />
                </Link>
                <div className="absolute flex gap-2 top-2 right-2">
                  <button
                    className="px-2 py-1 text-sm border rounded font-itcbook bg-white/90"
                    onClick={() => nav(`/admin/events/${ev.id}`)}
                  >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 21.2852C3.71667 21.2852 3.47933 21.1892 3.288 20.9972C3.09667 20.8052 3.00067 20.5678 3 20.2852V17.8602C3 17.5935 3.05 17.3392 3.15 17.0972C3.25 16.8552 3.39167 16.6428 3.575 16.4602L16.2 3.86016C16.4 3.67682 16.621 3.53516 16.863 3.43516C17.105 3.33516 17.359 3.28516 17.625 3.28516C17.891 3.28516 18.1493 3.33516 18.4 3.43516C18.6507 3.53516 18.8673 3.68516 19.05 3.88516L20.425 5.28516C20.625 5.46849 20.7707 5.68516 20.862 5.93516C20.9533 6.18516 20.9993 6.43516 21 6.68516C21 6.95182 20.954 7.20616 20.862 7.44816C20.77 7.69016 20.6243 7.91082 20.425 8.11016L7.825 20.7102C7.64167 20.8935 7.429 21.0352 7.187 21.1352C6.945 21.2352 6.691 21.2852 6.425 21.2852H4ZM17.6 8.08516L19 6.68516L17.6 5.28516L16.2 6.68516L17.6 8.08516Z" fill="#86c246"/>
                    </svg>
                  </button>
                  <button
                    className="px-2 py-1 text-sm border rounded bg-white/90 font-itcbook"
                    onClick={() => openDeleteModal(ev.id, ev.title)} 
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.241 4.00616L15.534 6.03516H19.5C19.6989 6.03516 19.8897 6.11417 20.0303 6.25483C20.171 6.39548 20.25 6.58624 20.25 6.78516C20.25 6.98407 20.171 7.17483 20.0303 7.31549C19.8897 7.45614 19.6989 7.53516 19.5 7.53516H18.731L17.858 17.7202C17.805 18.3402 17.762 18.8502 17.693 19.2622C17.623 19.6912 17.516 20.0752 17.307 20.4312C16.9788 20.9903 16.4909 21.4385 15.906 21.7182C15.534 21.8952 15.142 21.9682 14.708 22.0022C14.291 22.0352 13.78 22.0352 13.158 22.0352H10.842C10.22 22.0352 9.709 22.0352 9.292 22.0022C8.858 21.9682 8.466 21.8952 8.094 21.7182C7.50908 21.4385 7.02118 20.9903 6.693 20.4312C6.483 20.0752 6.378 19.6912 6.307 19.2622C6.238 18.8492 6.195 18.3402 6.142 17.7202L5.269 7.53516H4.5C4.30109 7.53516 4.11032 7.45614 3.96967 7.31549C3.82902 7.17483 3.75 6.98407 3.75 6.78516C3.75 6.58624 3.82902 6.39548 3.96967 6.25483C4.11032 6.11417 4.30109 6.03516 4.5 6.03516H8.466L8.759 4.00616L8.77 3.94516C8.952 3.15516 9.63 2.53516 10.48 2.53516H13.52C14.37 2.53516 15.048 3.15516 15.23 3.94516L15.241 4.00616ZM9.981 6.03516H14.018L13.762 4.25916C13.714 4.09216 13.592 4.03516 13.519 4.03516H10.481C10.408 4.03516 10.286 4.09216 10.238 4.25916L9.981 6.03516ZM11.25 10.7852C11.25 10.5862 11.171 10.3955 11.0303 10.2548C10.8897 10.1142 10.6989 10.0352 10.5 10.0352C10.3011 10.0352 10.1103 10.1142 9.96967 10.2548C9.82902 10.3955 9.75 10.5862 9.75 10.7852V15.7852C9.75 15.9841 9.82902 16.1748 9.96967 16.3155C10.1103 16.4561 10.3011 16.5352 10.5 16.5352C10.6989 16.5352 10.8897 16.4561 11.0303 16.3155C11.171 16.1748 11.25 15.9841 11.25 15.7852V10.7852ZM14.25 10.7852C14.25 10.5862 14.171 10.3955 14.0303 10.2548C13.8897 10.1142 13.6989 10.0352 13.5 10.0352C13.3011 10.0352 13.1103 10.1142 12.9697 10.2548C12.829 10.3955 12.75 10.5862 12.75 10.7852V15.7852C12.75 15.9841 12.829 16.1748 12.9697 16.3155C13.1103 16.4561 13.3011 16.5352 13.5 16.5352C13.6989 16.5352 13.8897 16.4561 14.0303 16.3155C14.171 16.1748 14.25 15.9841 14.25 15.7852V10.7852Z" fill="#dc2626"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


<ModalSuccess
  showModalSuccess={showSuccess}
  closeModalSuccess={closeSuccess}
  fill="#86c246"
  text="¡Evento eliminado con éxito!"
/>

      <ModalDelete
        showModalDelete={showDelete}
        closeModal={closeDeleteModal}
        accept={deleting ? () => {} : acceptDelete}
        textType={toDelete.title}
      />
      <Footer />
    </div>
  );
}
