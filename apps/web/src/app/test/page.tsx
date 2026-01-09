export default function TestPage() {
  return (
    <div className="p-10 bg-red-500">
      <h1 className="text-white text-4xl font-bold">Test Page</h1>
      <p className="text-white mt-4">If you see red background and white text, Tailwind is working!</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Test Button
      </button>
    </div>
  );
}
