export default function Loadingpage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
        <p className="mt-4 text-center text-primer">Processing your order...</p>
      </div>
    </div>
  );
}