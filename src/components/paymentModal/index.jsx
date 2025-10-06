import React, { useState } from "react";

const PaymentModal = ({ isOpen, onClose, totalPrice, eventName }) => {
  const [selectedPayment, setSelectedPayment] = useState("yape");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardholderName, setCardholderName] = useState("");

  if (!isOpen) return null;

  const handlePayment = () => {
    alert(`Pago procesado con ${selectedPayment} por S/.${totalPrice}.00`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="w-[40%] max-h-[80%] overflow-y-auto bg-white rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute z-10 text-gray-500 transition-colors top-4 right-4 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-4 text-white bg-green">
          <h2 className="text-xl font-itcbold">Realizar pago</h2>
          <p className="text-sm font-itcbook">{eventName}</p>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-itcmedium">Total a pagar:</h3>
            <p className="text-2xl text-green-600 font-itcbold">S/.{totalPrice}.00</p>
          </div>

          {/* Métodos de pago */}
          <div className="mb-6">
            <h3 className="mb-3 text-lg font-itcmedium">Selecciona método de pago:</h3>
            
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="yape"
                  checked={selectedPayment === "yape"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <div className="ml-3">
                  <span className="font-itcmedium">Yape</span>
                  <p className="text-sm text-gray-500">Pago rápido con QR</p>
                </div>
               {/** 
                <img src="/yape-logo.png" alt="Yape" className="w-8 h-8 ml-auto" />
                */}
              </label>

              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={selectedPayment === "creditCard"}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <div className="ml-3">
                  <span className="font-itcmedium">Tarjeta de Crédito</span>
                  <p className="text-sm text-gray-500">Visa, Mastercard, etc.</p>
                </div>
                <div className="flex gap-1 ml-auto">
                    {/** 
                  <img src="/visa-logo.png" alt="Visa" className="w-6 h-6" />
                  <img src="/mastercard-logo.png" alt="Mastercard" className="w-6 h-6" />
                  */}
                </div>
              </label>
            </div>
          </div>

          {/* Formulario de tarjeta */}
          {selectedPayment === "creditCard" && (
            <div className="p-4 mb-6 border rounded-lg bg-gray-50">
              <div className="mb-4">
                <label className="block mb-2 text-sm font-itcmedium">Número de tarjeta</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  maxLength="19"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block mb-2 text-sm font-itcmedium">Fecha de expiración</label>
                  <input
                    type="text"
                    placeholder="MM/AA"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    maxLength="5"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-itcmedium">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-full p-3 border rounded-lg"
                    maxLength="3"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-itcmedium">Nombre del titular</label>
                <input
                  type="text"
                  placeholder="JUAN PEREZ"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          )}

          {/* QR de Yape (solo visible cuando se selecciona Yape) */}
          {selectedPayment === "yape" && (
            <div className="p-4 mb-6 text-center border rounded-lg bg-gray-50">
              <div className="inline-block p-4 mb-3 bg-white rounded-lg">
                {/* QR code placeholder */}
                <div className="flex items-center justify-center w-32 h-32 mx-auto bg-gray-200">
                  <span className="text-sm text-gray-500">QR Code</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Escanea el código QR con Yape para completar el pago</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 p-4 bg-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 font-itcmedium"
          >
            Cancelar
          </button>
          <button
            onClick={handlePayment}
            className="flex-1 px-4 py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 font-itcmedium"
          >
            Confirmar Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;