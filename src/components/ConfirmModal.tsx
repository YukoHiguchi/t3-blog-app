type ConfirmModelProps = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const ConfirmModal: React.FC<ConfirmModelProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors ${
        isOpen ? "visible bg-black/50" : "invisible"
      }`}
      onClick={onClose}
    >
      <div
        className={`max-w-md rounded-lg bg-white px-10 py-4 shadow transition-all ${
          isOpen ? "scale-100 opacity-100" : "scale-120 opacity-0"
        }`}
      >
        <span
          onClick={onClose}
          className="alert-del absolute right-2 top-2 cursor-pointer bg-white px-2 py-1 text-xl text-gray-400 hover:text-gray-600"
        >
          &times;
        </span>
        <h3 className="text-md mb-6 mt-6">Are you sure to delete the post?</h3>

        <div className="flex items-center justify-between">
          <button
            onClick={onDelete}
            className="focus:shadow-outline rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700 focus:outline-none"
            type="submit"
          >
            Yes, I am sure
          </button>
          <button
            onClick={onClose}
            className="inline-block align-baseline text-sm text-gray-500 hover:text-red-600"
          >
            Cansel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
