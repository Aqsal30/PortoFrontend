export default function LoadingComponent() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}