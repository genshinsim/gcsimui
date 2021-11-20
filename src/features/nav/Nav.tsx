import useLocation from "wouter/use-location";

export default function Nav() {
  const [location, setLocation] = useLocation();
  return (
    <header>
      <div className="mx-auto flex flex-wrap p-2 flex-col md:flex-row mb-1 items-center">
        <button
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          onClick={() => {
            setLocation("/");
          }}
        >
          <span className="ml-3 text-xl border-b-2 border-transparent">
            gsim
          </span>
        </button>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <button
            className={
              location === "/"
                ? "mr-5 hover:text-white border-b-2"
                : "mr-5 hover:text-white border-b-2 border-transparent"
            }
            onClick={() => {
              setLocation("/");
            }}
          >
            Team
          </button>

          <button
            className={
              location === "/sim"
                ? "mr-5 hover:text-white border-b-2"
                : "mr-5 hover:text-white border-b-2 border-transparent"
            }
            onClick={() => {
              setLocation("/sim");
            }}
          >
            Sim
          </button>

          <button
            className={
              location === "/import"
                ? "mr-5 hover:text-white border-b-2"
                : "mr-5 hover:text-white border-b-2 border-transparent"
            }
            onClick={() => {
              setLocation("/import");
            }}
          >
            Import
          </button>
          <button
            className={
              location === "/result"
                ? "mr-5 hover:text-white border-b-2"
                : "mr-5 hover:text-white border-b-2 border-transparent"
            }
            onClick={() => {
              setLocation("/result");
            }}
          >
            Result
          </button>
          <button
            className={
              location === "/debug"
                ? "mr-5 hover:text-white border-b-2"
                : "mr-5 hover:text-white border-b-2 border-transparent"
            }
            onClick={() => {
              setLocation("/debug");
            }}
          >
            Debug
          </button>
          <button
            className={
              location === "/credits"
                ? "mr-5 hover:text-white border-b-2"
                : "mr-5 hover:text-white border-b-2 border-transparent"
            }
            onClick={() => {
              setLocation("/credits");
            }}
          >
            Credits
          </button>
        </nav>
      </div>
    </header>
  );
}
