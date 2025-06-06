interface IModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  winner: string;
  isDraw: boolean;
}

export function Modal({
  showModal,
  setShowModal,
  winner,
  isDraw,
}: IModalProps) {
  return (
    showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={() => setShowModal(false)}
      >
        <div
          className="mx-4 max-w-md rounded-lg bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            {!isDraw ? (
              <>
                <div className="mb-4 text-6xl">🎉</div>
                <h2 className="mb-2 text-2xl font-bold text-green-600">
                  {winner} Wins!
                </h2>
                <p className="mb-4 text-gray-600">
                  Congratulations! {winner} has won the game!
                </p>
              </>
            ) : (
              <>
                <div className="mb-4 text-6xl">🤝</div>
                <h2 className="mb-2 text-2xl font-bold text-yellow-600">
                  It's a Draw!
                </h2>
                <p className="mb-4 text-gray-600">
                  Good game! No one wins this time.
                </p>
              </>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
