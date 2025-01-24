import { Contact } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const MobileSkeleton = () => {
  // Skeleton de 8 contactos
  const skeletonContacts = Array(9).fill(null);
  const skeletonActives = Array(1).fill(null);

  return (
    <aside className="h-full lg:hidden py-4  w-full flex flex-col transition-all duration-200 bg-white">
      {/* Sección de Contactos */}
      <div className="px-4 flex justify-center items-center">
        <div className="w-full rounded-2xl space-y-4 p-6 bg-indigo-200">
          <div className="flex  text-gray-800 justify-start items-center gap-2 font-semibold text-sm">
            <Contact size={20} />
            <h2 className="block text-base font-sans">Usuarios</h2>
          </div>

          <div className="mt-3 flex items-center gap-2">
            {skeletonActives.map((_, act) => (
              <div key={act} className="w-full">
                <div className="text-left min-w-0 flex-1">
                  <div className="skeleton h-4 w-28 mb-2 bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-h-[660px]  flex-1 p-3 my-2 overflow-y-auto space-y-3 w-full scrollbar-transparent hover:scrollbar-default scrollbar-thin scrollbar-thumb-buttonColor scrollbar-track-transparent">
        {skeletonContacts.map((_, idx) => (
          <div
            key={idx}
            className="w-full p-3 flex items-center  gap-3 rounded-md"
          >
            <div className="relative">
              <div className="skeleton size-12 rounded-full bg-gray-100" />
            </div>

            <div className="text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2 bg-gray-100" />
              <div className="skeleton h-3 w-16 bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 flex justify-center items-center mt-2">
        <div className="w-full rounded-2xl text-gray-800 font-semibold text-sm p-6 bg-gray-100">
          <p>Ten precaución con la información que compartes.</p>
        </div>
      </div>
    </aside>
  );
};

export default MobileSkeleton;
