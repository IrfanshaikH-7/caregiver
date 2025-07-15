import AppRouter from "./router";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <div className="min-h-screen bg-[#FBFBFB] ">
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </div>
  );
}

export default App;
