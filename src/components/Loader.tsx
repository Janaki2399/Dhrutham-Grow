export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen m-5">
      <svg
        className="absolute animate-spin h-8 w-8 rounded-full border-2 border-transparent border-opacity-50"
        style={{ borderRightColor: "#aa3a3a", borderTopColor: "#aa3a3a" }}
        viewBox="0 0 24 24"
      ></svg>
    </div>
  );
};
